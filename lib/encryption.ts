import crypto from "crypto"
import { getConfig } from "@/lib/config"

// Enhanced encryption interfaces
export interface EncryptedData {
  ciphertext: string
  iv: string
  authTag: string
  keyVersion: number
  algorithm: string
  userId?: string
}

export interface KeyMetadata {
  version: number
  createdAt: Date
  algorithm: string
  isActive: boolean
  rotatedAt?: Date
}

export interface UserKeyInfo {
  userId: string
  keyVersion: number
  wrappedKey: EncryptedData
  metadata: KeyMetadata
}

// Enhanced Encryption Service
export class EnhancedEncryptionService {
  private static instance: EnhancedEncryptionService | null = null
  private keyVersions = new Map<number, Buffer>()
  private userKeys = new Map<string, UserKeyInfo>()
  private currentKeyVersion = 1
  private readonly algorithm = "aes-256-gcm"
  
  static getInstance(): EnhancedEncryptionService {
    if (!EnhancedEncryptionService.instance) {
      EnhancedEncryptionService.instance = new EnhancedEncryptionService()
    }
    return EnhancedEncryptionService.instance
  }
  
  constructor() {
    // Initialize with master key
    this.initializeMasterKey()
  }
  
  // Initialize master key and key versioning
  private initializeMasterKey(): void {
    try {
      const config = getConfig()
      const masterKey = Buffer.from(config.CREDENTIALS_ENCRYPTION_KEY, "base64")
      
      if (masterKey.length !== 32) {
        throw new Error("Master key must be exactly 32 bytes")
      }
      
      // Store current master key version
      this.keyVersions.set(this.currentKeyVersion, masterKey)
      
      console.log(`Encryption service initialized with key version ${this.currentKeyVersion}`)
      
    } catch (error) {
      throw new Error(`Failed to initialize encryption service: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  // Encrypt user data with per-user key isolation
  async encryptUserData(userId: string, data: string): Promise<EncryptedData> {
    try {
      // Get or create user-specific key
      const userKey = await this.getUserKey(userId)
      
      // Get the actual key bytes from the wrapped key
      const keyBytes = Buffer.from(this.unwrapUserKeyFromMaster(userKey.wrappedKey), 'base64')
      
      // Encrypt with user key
      const iv = crypto.randomBytes(12) // 12 bytes for GCM
      const cipher = crypto.createCipheriv(this.algorithm, keyBytes, iv)
      
      const encrypted = Buffer.concat([
        cipher.update(data, "utf8"),
        cipher.final()
      ])
      
      const authTag = cipher.getAuthTag()
      
      return {
        ciphertext: encrypted.toString("base64"),
        iv: iv.toString("base64"),
        authTag: authTag.toString("base64"),
        keyVersion: userKey.keyVersion,
        algorithm: this.algorithm,
        userId: userId
      }
      
    } catch (error) {
      throw new Error(`Encryption failed for user ${userId}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  // Decrypt user data with key version support
  async decryptUserData(userId: string, encrypted: EncryptedData): Promise<string> {
    try {
      // Validate that the encrypted data belongs to this user
      if (encrypted.userId && encrypted.userId !== userId) {
        throw new Error("Encrypted data does not belong to the specified user")
      }
      
      // Get user key for the specific version
      const userKey = await this.getUserKey(userId, encrypted.keyVersion)
      
      // Get the actual key bytes from the wrapped key
      const keyBytes = Buffer.from(this.unwrapUserKeyFromMaster(userKey.wrappedKey), 'base64')
      
      const iv = Buffer.from(encrypted.iv, "base64")
      const authTag = Buffer.from(encrypted.authTag, "base64")
      const ciphertext = Buffer.from(encrypted.ciphertext, "base64")
      
      const decipher = crypto.createDecipheriv(encrypted.algorithm, keyBytes, iv)
      decipher.setAuthTag(authTag)
      
      const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final()
      ])
      
      return decrypted.toString("utf8")
      
    } catch (error) {
      throw new Error(`Decryption failed for user ${userId}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  // Rotate user key to new version
  async rotateUserKey(userId: string): Promise<void> {
    try {
      const currentUserKey = this.userKeys.get(userId)
      
      if (!currentUserKey) {
        throw new Error(`No existing key found for user ${userId}`)
      }
      
      // Generate new user key
      const newUserKey = crypto.randomBytes(32)
      const newKeyVersion = this.currentKeyVersion
      
      // Wrap new key with current master key
      const wrappedNewKey = this.wrapUserKeyWithMaster(newUserKey.toString("base64"), newKeyVersion)
      
      // Update user key info
      const newUserKeyInfo: UserKeyInfo = {
        userId,
        keyVersion: newKeyVersion,
        wrappedKey: wrappedNewKey,
        metadata: {
          version: newKeyVersion,
          createdAt: new Date(),
          algorithm: this.algorithm,
          isActive: true,
          rotatedAt: new Date()
        }
      }
      
      // Mark old key as inactive
      currentUserKey.metadata.isActive = false
      currentUserKey.metadata.rotatedAt = new Date()
      
      // Store new key
      this.userKeys.set(userId, newUserKeyInfo)
      
      console.log(`User key rotated for ${userId}: v${currentUserKey.keyVersion} -> v${newKeyVersion}`)
      
    } catch (error) {
      throw new Error(`Key rotation failed for user ${userId}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  // Validate key integrity
  async validateKeyIntegrity(): Promise<boolean> {
    try {
      // Test master key integrity
      for (const [version, key] of this.keyVersions.entries()) {
        if (key.length !== 32) {
          console.error(`Master key version ${version} has invalid length: ${key.length}`)
          return false
        }
        
        // Test encryption/decryption round trip
        const testData = "integrity-test-data"
        const testKey = crypto.randomBytes(32).toString("base64")
        
        try {
          const encrypted = encryptWithKey(testKey, testData)
          const decrypted = decryptWithKey(testKey, encrypted)
          
          if (decrypted !== testData) {
            console.error(`Key integrity test failed for version ${version}`)
            return false
          }
        } catch (error) {
          console.error(`Key integrity test error for version ${version}:`, error)
          return false
        }
      }
      
      // Test user key integrity
      for (const [userId, userKeyInfo] of this.userKeys.entries()) {
        try {
          // Verify user key can be unwrapped
          const unwrapped = this.unwrapUserKeyFromMaster(userKeyInfo.wrappedKey)
          if (!unwrapped || unwrapped.length === 0) {
            console.error(`User key integrity failed for ${userId}`)
            return false
          }
        } catch (error) {
          console.error(`User key integrity test failed for ${userId}:`, error)
          return false
        }
      }
      
      return true
      
    } catch (error) {
      console.error("Key integrity validation error:", error)
      return false
    }
  }
  
  // Get or create user-specific key
  private async getUserKey(userId: string, version?: number): Promise<UserKeyInfo> {
    const existingKey = this.userKeys.get(userId)
    
    // If requesting specific version, validate it matches
    if (version && existingKey && existingKey.keyVersion !== version) {
      throw new Error(`User key version mismatch: requested ${version}, have ${existingKey.keyVersion}`)
    }
    
    // Return existing key if available
    if (existingKey && (!version || existingKey.keyVersion === version)) {
      return existingKey
    }
    
    // Create new user key
    const userKey = crypto.randomBytes(32)
    const keyVersion = version || this.currentKeyVersion
    
    // Wrap user key with master key
    const wrappedKey = this.wrapUserKeyWithMaster(userKey.toString("base64"), keyVersion)
    
    const userKeyInfo: UserKeyInfo = {
      userId,
      keyVersion,
      wrappedKey,
      metadata: {
        version: keyVersion,
        createdAt: new Date(),
        algorithm: this.algorithm,
        isActive: true
      }
    }
    
    this.userKeys.set(userId, userKeyInfo)
    
    console.log(`Created new user key for ${userId} (version ${keyVersion})`)
    
    return userKeyInfo
  }
  
  // Wrap user key with master key
  private wrapUserKeyWithMaster(userKeyBase64: string, keyVersion: number): EncryptedData {
    const masterKey = this.keyVersions.get(keyVersion)
    if (!masterKey) {
      throw new Error(`Master key version ${keyVersion} not found`)
    }
    
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv(this.algorithm, masterKey, iv)
    
    const encrypted = Buffer.concat([
      cipher.update(userKeyBase64, "utf8"),
      cipher.final()
    ])
    
    const authTag = cipher.getAuthTag()
    
    return {
      ciphertext: encrypted.toString("base64"),
      iv: iv.toString("base64"),
      authTag: authTag.toString("base64"),
      keyVersion,
      algorithm: this.algorithm
    }
  }
  
  // Unwrap user key from master key
  private unwrapUserKeyFromMaster(wrappedKey: EncryptedData): string {
    const masterKey = this.keyVersions.get(wrappedKey.keyVersion)
    if (!masterKey) {
      throw new Error(`Master key version ${wrappedKey.keyVersion} not found`)
    }
    
    const iv = Buffer.from(wrappedKey.iv, "base64")
    const authTag = Buffer.from(wrappedKey.authTag, "base64")
    const ciphertext = Buffer.from(wrappedKey.ciphertext, "base64")
    
    const decipher = crypto.createDecipheriv(wrappedKey.algorithm, masterKey, iv)
    decipher.setAuthTag(authTag)
    
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final()
    ])
    
    return decrypted.toString("utf8")
  }
  
  // Get user key information
  getUserKeyInfo(userId: string): UserKeyInfo | null {
    return this.userKeys.get(userId) || null
  }
  
  // List all user keys (for admin purposes)
  getAllUserKeys(): UserKeyInfo[] {
    return Array.from(this.userKeys.values())
  }
  
  // Get key statistics
  getKeyStatistics(): {
    totalUsers: number
    activeKeys: number
    keyVersions: number[]
    oldestKey: Date | null
    newestKey: Date | null
  } {
    const userKeys = Array.from(this.userKeys.values())
    const activeKeys = userKeys.filter(key => key.metadata.isActive)
    
    const dates = userKeys.map(key => key.metadata.createdAt)
    
    return {
      totalUsers: userKeys.length,
      activeKeys: activeKeys.length,
      keyVersions: Array.from(this.keyVersions.keys()),
      oldestKey: dates.length > 0 ? new Date(Math.min(...dates.map(d => d.getTime()))) : null,
      newestKey: dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : null
    }
  }
}

// Legacy functions for backward compatibility
export function generateRandomKey(): string {
  return crypto.randomBytes(32).toString("base64")
}

export interface EncryptedPayload {
  ciphertext: string
  iv: string
  authTag: string
}

export function encryptWithKey(keyBase64: string, plaintext: string): EncryptedPayload {
  const key = Buffer.from(keyBase64, "base64")
  if (key.length !== 32) {
    throw new Error("Encryption key must be 32 bytes (base64-encoded)")
  }

  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)

  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()

  return {
    ciphertext: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  }
}

export function decryptWithKey(keyBase64: string, payload: EncryptedPayload): string {
  const key = Buffer.from(keyBase64, "base64")
  if (key.length !== 32) {
    throw new Error("Encryption key must be 32 bytes (base64-encoded)")
  }

  const iv = Buffer.from(payload.iv, "base64")
  const authTag = Buffer.from(payload.authTag, "base64")
  const ciphertext = Buffer.from(payload.ciphertext, "base64")

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  return decrypted.toString("utf8")
}

// Get master key from validated configuration
function getMasterKey(): Buffer {
  try {
    const config = getConfig()
    const key = Buffer.from(config.CREDENTIALS_ENCRYPTION_KEY, "base64")
    if (key.length !== 32) {
      throw new Error("CREDENTIALS_ENCRYPTION_KEY must be a 32-byte key encoded in base64")
    }
    return key
  } catch (error) {
    throw new Error(`Failed to get master encryption key: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Legacy wrap/unwrap functions using enhanced service
export function wrapUserKey(userKeyBase64: string): EncryptedPayload {
  const enhancedService = EnhancedEncryptionService.getInstance()
  const wrappedKey = enhancedService['wrapUserKeyWithMaster'](userKeyBase64, 1)
  
  return {
    ciphertext: wrappedKey.ciphertext,
    iv: wrappedKey.iv,
    authTag: wrappedKey.authTag
  }
}

export function unwrapUserKey(payload: EncryptedPayload): string {
  const enhancedService = EnhancedEncryptionService.getInstance()
  const wrappedKey: EncryptedData = {
    ...payload,
    keyVersion: 1,
    algorithm: "aes-256-gcm"
  }
  
  return enhancedService['unwrapUserKeyFromMaster'](wrappedKey)
}

// Export enhanced encryption service instance
export const enhancedEncryption = EnhancedEncryptionService.getInstance()
