import { migrationManager } from "../migrations"
import { initialIndexesMigration } from "./001-initial-indexes"
import { addLeadMetadataMigration } from "./002-add-lead-metadata"

// Register all migrations
export function registerMigrations(): void {
  migrationManager.registerMigration(initialIndexesMigration)
  migrationManager.registerMigration(addLeadMetadataMigration)
}

// Export migration manager for external use
export { migrationManager }
export * from "../migrations"