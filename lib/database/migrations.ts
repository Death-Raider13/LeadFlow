import { firebaseAdminDb } from "@/lib/firebase/admin"
import { Timestamp, Transaction } from "firebase-admin/firestore"

// Migration interface
export interface Migration {
  id: string
  name: string
  version: number
  description: string
  up: (tx: Transaction) => Promise<void>
  down: (tx: Transaction) => Promise<void>
}

// Migration record stored in database
interface MigrationRecord {
  id: string
  name: string
  version: number
  description: string
  applied_at: Timestamp
  checksum: string
}

// Migration status
export interface MigrationStatus {
  id: string
  name: string
  version: number
  applied: boolean
  applied_at?: Date
}

// Migration errors
export class MigrationError extends Error {
  constructor(
    message: string,
    public code: string,
    public migrationId?: string,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = "MigrationError"
  }
}

// Migration manager class
class DatabaseMigrationManager {
  private db = firebaseAdminDb
  private migrationsCollection = "_migrations"
  private registeredMigrations: Map<string, Migration> = new Map()

  // Register a migration
  registerMigration(migration: Migration): void {
    // Validate migration
    this.validateMigration(migration)
    
    // Check for duplicate IDs or versions
    if (this.registeredMigrations.has(migration.id)) {
      throw new MigrationError(
        `Migration with ID ${migration.id} already registered`,
        "DUPLICATE_MIGRATION_ID",
        migration.id
      )
    }

    // Check for version conflicts
    for (const [, existingMigration] of this.registeredMigrations) {
      if (existingMigration.version === migration.version) {
        throw new MigrationError(
          `Migration version ${migration.version} already exists`,
          "DUPLICATE_VERSION",
          migration.id,
          { existingMigrationId: existingMigration.id }
        )
      }
    }

    this.registeredMigrations.set(migration.id, migration)
  }

  // Validate migration structure
  private validateMigration(migration: Migration): void {
    if (!migration.id || typeof migration.id !== "string") {
      throw new MigrationError("Migration ID is required and must be a string", "INVALID_MIGRATION")
    }
    
    if (!migration.name || typeof migration.name !== "string") {
      throw new MigrationError("Migration name is required and must be a string", "INVALID_MIGRATION")
    }
    
    if (typeof migration.version !== "number" || migration.version <= 0) {
      throw new MigrationError("Migration version must be a positive number", "INVALID_MIGRATION")
    }
    
    if (typeof migration.up !== "function") {
      throw new MigrationError("Migration up function is required", "INVALID_MIGRATION")
    }
    
    if (typeof migration.down !== "function") {
      throw new MigrationError("Migration down function is required", "INVALID_MIGRATION")
    }
  }

  // Get applied migrations from database
  private async getAppliedMigrations(): Promise<MigrationRecord[]> {
    try {
      const snapshot = await this.db
        .collection(this.migrationsCollection)
        .orderBy("version", "asc")
        .get()

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MigrationRecord))
    } catch (error) {
      throw new MigrationError(
        `Failed to get applied migrations: ${error instanceof Error ? error.message : "Unknown error"}`,
        "READ_FAILED"
      )
    }
  }

  // Get migration status
  async getMigrationStatus(): Promise<MigrationStatus[]> {
    const appliedMigrations = await this.getAppliedMigrations()
    const appliedMap = new Map(appliedMigrations.map(m => [m.id, m]))

    const status: MigrationStatus[] = []

    // Add registered migrations
    for (const [id, migration] of this.registeredMigrations) {
      const applied = appliedMap.get(id)
      status.push({
        id,
        name: migration.name,
        version: migration.version,
        applied: !!applied,
        applied_at: applied?.applied_at.toDate()
      })
    }

    // Add any applied migrations that are no longer registered
    for (const applied of appliedMigrations) {
      if (!this.registeredMigrations.has(applied.id)) {
        status.push({
          id: applied.id,
          name: applied.name,
          version: applied.version,
          applied: true,
          applied_at: applied.applied_at.toDate()
        })
      }
    }

    // Sort by version
    return status.sort((a, b) => a.version - b.version)
  }

  // Get pending migrations
  async getPendingMigrations(): Promise<Migration[]> {
    const appliedMigrations = await this.getAppliedMigrations()
    const appliedIds = new Set(appliedMigrations.map(m => m.id))

    const pending: Migration[] = []
    for (const [id, migration] of this.registeredMigrations) {
      if (!appliedIds.has(id)) {
        pending.push(migration)
      }
    }

    // Sort by version
    return pending.sort((a, b) => a.version - b.version)
  }

  // Calculate migration checksum
  private calculateChecksum(migration: Migration): string {
    const content = JSON.stringify({
      id: migration.id,
      name: migration.name,
      version: migration.version,
      description: migration.description,
      up: migration.up.toString(),
      down: migration.down.toString()
    })
    
    // Simple hash function (in production, use crypto.createHash)
    let hash = 0
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(16)
  }

  // Apply a single migration
  private async applyMigration(migration: Migration): Promise<void> {
    try {
      await this.db.runTransaction(async (tx) => {
        // Check if migration is already applied
        const migrationDoc = await tx.get(
          this.db.collection(this.migrationsCollection).doc(migration.id)
        )
        
        if (migrationDoc.exists) {
          throw new MigrationError(
            `Migration ${migration.id} is already applied`,
            "ALREADY_APPLIED",
            migration.id
          )
        }

        // Execute migration
        await migration.up(tx)

        // Record migration as applied
        const migrationRecord: Omit<MigrationRecord, "id"> = {
          name: migration.name,
          version: migration.version,
          description: migration.description,
          applied_at: Timestamp.now(),
          checksum: this.calculateChecksum(migration)
        }

        tx.set(
          this.db.collection(this.migrationsCollection).doc(migration.id),
          migrationRecord
        )
      })
    } catch (error) {
      throw new MigrationError(
        `Failed to apply migration ${migration.id}: ${error instanceof Error ? error.message : "Unknown error"}`,
        "APPLY_FAILED",
        migration.id
      )
    }
  }

  // Rollback a single migration
  private async rollbackMigration(migration: Migration): Promise<void> {
    try {
      await this.db.runTransaction(async (tx) => {
        // Check if migration is applied
        const migrationDoc = await tx.get(
          this.db.collection(this.migrationsCollection).doc(migration.id)
        )
        
        if (!migrationDoc.exists) {
          throw new MigrationError(
            `Migration ${migration.id} is not applied`,
            "NOT_APPLIED",
            migration.id
          )
        }

        // Execute rollback
        await migration.down(tx)

        // Remove migration record
        tx.delete(this.db.collection(this.migrationsCollection).doc(migration.id))
      })
    } catch (error) {
      throw new MigrationError(
        `Failed to rollback migration ${migration.id}: ${error instanceof Error ? error.message : "Unknown error"}`,
        "ROLLBACK_FAILED",
        migration.id
      )
    }
  }

  // Apply all pending migrations
  async migrate(): Promise<MigrationStatus[]> {
    const pendingMigrations = await this.getPendingMigrations()
    
    if (pendingMigrations.length === 0) {
      return await this.getMigrationStatus()
    }

    console.log(`Applying ${pendingMigrations.length} pending migrations...`)

    for (const migration of pendingMigrations) {
      console.log(`Applying migration ${migration.id}: ${migration.name}`)
      await this.applyMigration(migration)
    }

    console.log("All migrations applied successfully")
    return await this.getMigrationStatus()
  }

  // Rollback to a specific version
  async rollbackTo(targetVersion: number): Promise<MigrationStatus[]> {
    const appliedMigrations = await this.getAppliedMigrations()
    
    // Find migrations to rollback (in reverse order)
    const migrationsToRollback = appliedMigrations
      .filter(m => m.version > targetVersion)
      .sort((a, b) => b.version - a.version) // Descending order

    if (migrationsToRollback.length === 0) {
      return await this.getMigrationStatus()
    }

    console.log(`Rolling back ${migrationsToRollback.length} migrations to version ${targetVersion}...`)

    for (const migrationRecord of migrationsToRollback) {
      const migration = this.registeredMigrations.get(migrationRecord.id)
      
      if (!migration) {
        throw new MigrationError(
          `Cannot rollback migration ${migrationRecord.id}: migration not found in registered migrations`,
          "MIGRATION_NOT_FOUND",
          migrationRecord.id
        )
      }

      console.log(`Rolling back migration ${migration.id}: ${migration.name}`)
      await this.rollbackMigration(migration)
    }

    console.log("Rollback completed successfully")
    return await this.getMigrationStatus()
  }

  // Rollback last migration
  async rollbackLast(): Promise<MigrationStatus[]> {
    const appliedMigrations = await this.getAppliedMigrations()
    
    if (appliedMigrations.length === 0) {
      throw new MigrationError("No migrations to rollback", "NO_MIGRATIONS")
    }

    const lastMigration = appliedMigrations[appliedMigrations.length - 1]
    const migration = this.registeredMigrations.get(lastMigration.id)
    
    if (!migration) {
      throw new MigrationError(
        `Cannot rollback migration ${lastMigration.id}: migration not found in registered migrations`,
        "MIGRATION_NOT_FOUND",
        lastMigration.id
      )
    }

    console.log(`Rolling back last migration ${migration.id}: ${migration.name}`)
    await this.rollbackMigration(migration)
    
    return await this.getMigrationStatus()
  }

  // Validate migration integrity
  async validateMigrations(): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = []
    const appliedMigrations = await this.getAppliedMigrations()

    for (const applied of appliedMigrations) {
      const migration = this.registeredMigrations.get(applied.id)
      
      if (!migration) {
        issues.push(`Applied migration ${applied.id} not found in registered migrations`)
        continue
      }

      // Check checksum
      const currentChecksum = this.calculateChecksum(migration)
      if (currentChecksum !== applied.checksum) {
        issues.push(`Migration ${applied.id} checksum mismatch - migration may have been modified`)
      }
    }

    return {
      valid: issues.length === 0,
      issues
    }
  }
}

// Export singleton instance
export const migrationManager = new DatabaseMigrationManager()
export default migrationManager

// Example migration helper
export function createMigration(
  id: string,
  name: string,
  version: number,
  description: string,
  up: (tx: Transaction) => Promise<void>,
  down: (tx: Transaction) => Promise<void>
): Migration {
  return { id, name, version, description, up, down }
}