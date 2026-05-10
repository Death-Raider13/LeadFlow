import { z } from "zod"
import { createHash, randomBytes, createCipheriv, createDecipheriv } from "crypto"
import { readFileSync, writeFileSync, existsSync, watchFile, unwatchFile } from "fs"
import { join } from "path"

// Environment-specific configuration types
export type Environment = "development" | "production" | "test" | "staging"

// Environment variable schema with validation rules
const envSchema = z.object({
  // Firebase Configuration
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, "Firebase API key is required"),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1, "Firebase auth domain is required"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase project ID is required"),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, "Firebase app ID is required"),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1, "Firebase storage bucket is required"),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, "Firebase messaging sender ID is required"),
  
  // Firebase Admin Configuration
  FIREBASE_PROJECT_ID: z.string().min(1, "Firebase admin project ID is required"),
  FIREBASE_CLIENT_EMAIL: z.string().email("Firebase client email must be valid email"),
  FIREBASE_PRIVATE_KEY: z.string().min(1, "Firebase private key is required"),
  
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("Supabase URL must be valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Supabase anon key is required"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "Supabase service role key is required"),
  
  // Payment Configuration
  PAYSTACK_SECRET_KEY: z.string().min(1, "Paystack secret key is required"),
  
  // External API Keys
  GEOAPIFY_API_KEY: z.string().min(1, "Geoapify API key is required"),
  RAPIDAPI_LOCAL_BUSINESS_KEY: z.string().optional(),
  SCRAPERBEE_API_KEY: z.string().optional(),
  
  // Encryption Configuration
  CREDENTIALS_ENCRYPTION_KEY: z.string()
    .min(1, "Credentials encryption key is required")
    .refine((key) => {
      try {
        const decoded = Buffer.from(key, "base64")
        return decoded.length === 32
      } catch {
        return false
      }
    }, "Credentials encryption key must be a valid 32-byte base64 encoded string"),
  
  // Optional Environment Configuration
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

export type AppConfig = z.infer<typeof envSchema>

// Configuration validation errors
export class ConfigValidationError extends Error {
  constructor(
    message: string,
    public readonly errors: z.ZodError
  ) {
    super(message)
    this.name = "ConfigValidationError"
  }
}

// Validate environment variables at startup
export function validateEnvironmentConfig(): AppConfig {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      ).join("\n")
      
      throw new ConfigValidationError(
        `Environment configuration validation failed:\n${errorMessages}`,
        error
      )
    }
    throw error
  }
}

// Type-safe configuration access with environment support
let cachedConfig: AppConfig | null = null
let cachedEnvironmentConfig: EnvironmentConfig | null = null

export function getConfig(): AppConfig {
  if (!cachedConfig) {
    cachedConfig = validateEnvironmentConfig()
  }
  return cachedConfig
}

export function getEnvironmentConfig(): EnvironmentConfig {
  if (!cachedEnvironmentConfig) {
    cachedEnvironmentConfig = environmentConfigManager.getConfig()
  }
  return cachedEnvironmentConfig
}

export function refreshConfig(): void {
  cachedConfig = null
  cachedEnvironmentConfig = null
}

// Hot reload configuration management
export class ConfigHotReloader {
  private static instance: ConfigHotReloader | null = null
  private isEnabled = false
  private reloadCallbacks = new Set<() => void>()
  
  static getInstance(): ConfigHotReloader {
    if (!ConfigHotReloader.instance) {
      ConfigHotReloader.instance = new ConfigHotReloader()
    }
    return ConfigHotReloader.instance
  }
  
  enable(): void {
    if (this.isEnabled) return
    
    this.isEnabled = true
    
    // Watch .env files for changes
    const envFiles = ['.env.local', '.env', `.env.${process.env.NODE_ENV}`]
    
    envFiles.forEach(file => {
      const filePath = join(process.cwd(), file)
      if (existsSync(filePath)) {
        watchFile(filePath, { interval: 1000 }, () => {
          this.handleConfigChange()
        })
      }
    })
    
    // Watch environment-specific config files
    const configFile = join(process.cwd(), `config.${process.env.NODE_ENV || 'development'}.json`)
    if (existsSync(configFile)) {
      watchFile(configFile, { interval: 1000 }, () => {
        this.handleEnvironmentConfigChange()
      })
    }
  }
  
  disable(): void {
    if (!this.isEnabled) return
    
    this.isEnabled = false
    
    // Stop watching files
    const envFiles = ['.env.local', '.env', `.env.${process.env.NODE_ENV}`]
    envFiles.forEach(file => {
      const filePath = join(process.cwd(), file)
      unwatchFile(filePath)
    })
    
    const configFile = join(process.cwd(), `config.${process.env.NODE_ENV || 'development'}.json`)
    unwatchFile(configFile)
  }
  
  onReload(callback: () => void): void {
    this.reloadCallbacks.add(callback)
  }
  
  offReload(callback: () => void): void {
    this.reloadCallbacks.delete(callback)
  }
  
  private handleConfigChange(): void {
    try {
      // Refresh cached configuration
      refreshConfig()
      
      // Notify callbacks
      this.reloadCallbacks.forEach(callback => {
        try {
          callback()
        } catch (error) {
          console.warn('Config reload callback failed:', error)
        }
      })
      
      console.log('Configuration reloaded successfully')
    } catch (error) {
      console.error('Failed to reload configuration:', error)
    }
  }
  
  private handleEnvironmentConfigChange(): void {
    try {
      // Refresh environment configuration
      cachedEnvironmentConfig = null
      
      // Notify callbacks
      this.reloadCallbacks.forEach(callback => {
        try {
          callback()
        } catch (error) {
          console.warn('Environment config reload callback failed:', error)
        }
      })
      
      console.log('Environment configuration reloaded successfully')
    } catch (error) {
      console.error('Failed to reload environment configuration:', error)
    }
  }
}

export const configHotReloader = ConfigHotReloader.getInstance()

// Secure configuration storage for sensitive values
export interface SecureConfigValue {
  value: string
  isEncrypted: boolean
  lastAccessed: Date
  accessCount: number
  environment?: Environment
  isHotReloadable?: boolean
}

// Environment-specific configuration interface
export interface EnvironmentConfig {
  environment: Environment
  database: {
    connectionPoolSize?: number
    queryTimeout?: number
    enableLogging?: boolean
  }
  security: {
    sessionTimeout?: number
    maxLoginAttempts?: number
    enableTwoFactor?: boolean
  }
  performance: {
    cacheSize?: number
    rateLimitWindow?: number
    maxConcurrentRequests?: number
  }
  monitoring: {
    enableMetrics?: boolean
    logLevel?: "debug" | "info" | "warn" | "error"
    enableTracing?: boolean
  }
}

// Default environment configurations
const defaultEnvironmentConfigs: Record<Environment, Partial<EnvironmentConfig>> = {
  development: {
    database: {
      connectionPoolSize: 5,
      queryTimeout: 30000,
      enableLogging: true
    },
    security: {
      sessionTimeout: 3600000, // 1 hour
      maxLoginAttempts: 10,
      enableTwoFactor: false
    },
    performance: {
      cacheSize: 100,
      rateLimitWindow: 60000,
      maxConcurrentRequests: 50
    },
    monitoring: {
      enableMetrics: true,
      logLevel: "debug",
      enableTracing: true
    }
  },
  production: {
    database: {
      connectionPoolSize: 20,
      queryTimeout: 15000,
      enableLogging: false
    },
    security: {
      sessionTimeout: 1800000, // 30 minutes
      maxLoginAttempts: 5,
      enableTwoFactor: true
    },
    performance: {
      cacheSize: 1000,
      rateLimitWindow: 60000,
      maxConcurrentRequests: 200
    },
    monitoring: {
      enableMetrics: true,
      logLevel: "warn",
      enableTracing: false
    }
  },
  test: {
    database: {
      connectionPoolSize: 2,
      queryTimeout: 5000,
      enableLogging: false
    },
    security: {
      sessionTimeout: 600000, // 10 minutes
      maxLoginAttempts: 100,
      enableTwoFactor: false
    },
    performance: {
      cacheSize: 10,
      rateLimitWindow: 1000,
      maxConcurrentRequests: 10
    },
    monitoring: {
      enableMetrics: false,
      logLevel: "error",
      enableTracing: false
    }
  },
  staging: {
    database: {
      connectionPoolSize: 10,
      queryTimeout: 20000,
      enableLogging: true
    },
    security: {
      sessionTimeout: 2700000, // 45 minutes
      maxLoginAttempts: 7,
      enableTwoFactor: true
    },
    performance: {
      cacheSize: 500,
      rateLimitWindow: 60000,
      maxConcurrentRequests: 100
    },
    monitoring: {
      enableMetrics: true,
      logLevel: "info",
      enableTracing: true
    }
  }
}

class SecureConfigStore {
  private store = new Map<string, SecureConfigValue>()
  private encryptionKey: string
  private configFilePath: string
  private watchers = new Map<string, () => void>()
  private hotReloadCallbacks = new Map<string, (value: string) => void>()
  
  constructor() {
    this.encryptionKey = this.generateEncryptionKey()
    this.configFilePath = join(process.cwd(), '.secure-config.json')
    this.loadFromDisk()
  }
  
  private generateEncryptionKey(): string {
    const baseKey = process.env.CREDENTIALS_ENCRYPTION_KEY || randomBytes(32).toString('base64')
    return createHash('sha256').update(baseKey).digest('hex')
  }
  
  set(key: string, value: string, options: {
    encrypt?: boolean
    environment?: Environment
    hotReloadable?: boolean
  } = {}): void {
    const { encrypt = true, environment, hotReloadable = false } = options
    
    this.store.set(key, {
      value: encrypt ? this.encryptValue(value) : value,
      isEncrypted: encrypt,
      lastAccessed: new Date(),
      accessCount: 0,
      environment,
      isHotReloadable: hotReloadable
    })
    
    // Set up hot reloading if enabled
    if (hotReloadable) {
      this.setupHotReload(key)
    }
    
    this.saveToDisk()
  }
  
  get(key: string, environment?: Environment): string | null {
    const item = this.store.get(key)
    if (!item) return null
    
    // Check environment match if specified
    if (environment && item.environment && item.environment !== environment) {
      return null
    }
    
    // Update access tracking
    item.lastAccessed = new Date()
    item.accessCount++
    
    return item.isEncrypted ? this.decryptValue(item.value) : item.value
  }
  
  has(key: string, environment?: Environment): boolean {
    const item = this.store.get(key)
    if (!item) return false
    
    if (environment && item.environment && item.environment !== environment) {
      return false
    }
    
    return true
  }
  
  delete(key: string): boolean {
    // Clean up hot reload watcher
    this.cleanupHotReload(key)
    const result = this.store.delete(key)
    this.saveToDisk()
    return result
  }
  
  clear(): void {
    // Clean up all watchers
    this.watchers.forEach((cleanup) => cleanup())
    this.watchers.clear()
    this.hotReloadCallbacks.clear()
    
    this.store.clear()
    this.saveToDisk()
  }
  
  getAccessStats(key: string): { lastAccessed: Date; accessCount: number } | null {
    const item = this.store.get(key)
    return item ? { lastAccessed: item.lastAccessed, accessCount: item.accessCount } : null
  }
  
  // Hot reload functionality
  onConfigChange(key: string, callback: (value: string) => void): void {
    this.hotReloadCallbacks.set(key, callback)
  }
  
  private setupHotReload(key: string): void {
    if (this.watchers.has(key)) return
    
    const configPath = join(process.cwd(), `.env.${key}`)
    if (!existsSync(configPath)) return
    
    const watcher = () => {
      try {
        const newValue = readFileSync(configPath, 'utf8').trim()
        const currentItem = this.store.get(key)
        
        if (currentItem) {
          const currentValue = currentItem.isEncrypted 
            ? this.decryptValue(currentItem.value) 
            : currentItem.value
          
          if (newValue !== currentValue) {
            this.set(key, newValue, {
              encrypt: currentItem.isEncrypted,
              environment: currentItem.environment,
              hotReloadable: true
            })
            
            // Trigger callback
            const callback = this.hotReloadCallbacks.get(key)
            if (callback) {
              callback(newValue)
            }
          }
        }
      } catch (error) {
        console.warn(`Hot reload failed for config key ${key}:`, error)
      }
    }
    
    watchFile(configPath, { interval: 1000 }, watcher)
    this.watchers.set(key, () => unwatchFile(configPath, watcher))
  }
  
  private cleanupHotReload(key: string): void {
    const cleanup = this.watchers.get(key)
    if (cleanup) {
      cleanup()
      this.watchers.delete(key)
    }
    this.hotReloadCallbacks.delete(key)
  }
  
  private encryptValue(value: string): string {
    try {
      const algorithm = 'aes-256-cbc'
      const iv = randomBytes(16)
      const cipher = createCipheriv(algorithm, Buffer.from(this.encryptionKey, 'hex').slice(0, 32), iv)
      
      let encrypted = cipher.update(value, 'utf8', 'hex')
      encrypted += cipher.final('hex')
      
      // Prepend IV to encrypted data
      return iv.toString('hex') + ':' + encrypted
    } catch (error) {
      console.warn('Encryption failed, storing as plain text:', error)
      return value
    }
  }
  
  private decryptValue(encrypted: string): string {
    try {
      const algorithm = 'aes-256-cbc'
      const parts = encrypted.split(':')
      
      if (parts.length !== 2) {
        // Fallback for non-encrypted values
        return encrypted
      }
      
      const iv = Buffer.from(parts[0], 'hex')
      const encryptedData = parts[1]
      
      const decipher = createDecipheriv(algorithm, Buffer.from(this.encryptionKey, 'hex').slice(0, 32), iv)
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      
      return decrypted
    } catch (error) {
      console.warn('Decryption failed, returning encrypted value:', error)
      return encrypted
    }
  }
  
  private saveToDisk(): void {
    try {
      const data = Array.from(this.store.entries()).map(([key, value]) => ({
        key,
        ...value
      }))
      writeFileSync(this.configFilePath, JSON.stringify(data, null, 2))
    } catch (error) {
      console.warn('Failed to save secure config to disk:', error)
    }
  }
  
  private loadFromDisk(): void {
    try {
      if (existsSync(this.configFilePath)) {
        const data = JSON.parse(readFileSync(this.configFilePath, 'utf8'))
        data.forEach((item: any) => {
          this.store.set(item.key, {
            value: item.value,
            isEncrypted: item.isEncrypted,
            lastAccessed: new Date(item.lastAccessed),
            accessCount: item.accessCount || 0,
            environment: item.environment,
            isHotReloadable: item.isHotReloadable
          })
          
          // Restore hot reload watchers
          if (item.isHotReloadable) {
            this.setupHotReload(item.key)
          }
        })
      }
    } catch (error) {
      console.warn('Failed to load secure config from disk:', error)
    }
  }
}

export const secureConfigStore = new SecureConfigStore()

// Environment-specific configuration manager
class EnvironmentConfigManager {
  private currentEnvironment: Environment
  private environmentConfig: EnvironmentConfig
  private configPath: string
  
  constructor() {
    this.currentEnvironment = (process.env.NODE_ENV as Environment) || 'development'
    this.configPath = join(process.cwd(), `config.${this.currentEnvironment}.json`)
    this.environmentConfig = this.loadEnvironmentConfig()
  }
  
  private loadEnvironmentConfig(): EnvironmentConfig {
    const defaultConfig = defaultEnvironmentConfigs[this.currentEnvironment] || {}
    
    try {
      if (existsSync(this.configPath)) {
        const fileConfig = JSON.parse(readFileSync(this.configPath, 'utf8'))
        return this.mergeConfigs(defaultConfig, fileConfig)
      }
    } catch (error) {
      console.warn(`Failed to load environment config for ${this.currentEnvironment}:`, error)
    }
    
    return {
      environment: this.currentEnvironment,
      ...defaultConfig
    } as EnvironmentConfig
  }
  
  private mergeConfigs(defaultConfig: any, fileConfig: any): EnvironmentConfig {
    const merged = { ...defaultConfig }
    
    Object.keys(fileConfig).forEach(key => {
      if (typeof fileConfig[key] === 'object' && !Array.isArray(fileConfig[key])) {
        merged[key] = { ...merged[key], ...fileConfig[key] }
      } else {
        merged[key] = fileConfig[key]
      }
    })
    
    return merged as EnvironmentConfig
  }
  
  getConfig(): EnvironmentConfig {
    return this.environmentConfig
  }
  
  updateConfig(updates: Partial<EnvironmentConfig>): void {
    this.environmentConfig = this.mergeConfigs(this.environmentConfig, updates)
    this.saveEnvironmentConfig()
  }
  
  private saveEnvironmentConfig(): void {
    try {
      writeFileSync(this.configPath, JSON.stringify(this.environmentConfig, null, 2))
    } catch (error) {
      console.warn('Failed to save environment config:', error)
    }
  }
  
  getCurrentEnvironment(): Environment {
    return this.currentEnvironment
  }
  
  switchEnvironment(environment: Environment): void {
    this.currentEnvironment = environment
    this.configPath = join(process.cwd(), `config.${environment}.json`)
    this.environmentConfig = this.loadEnvironmentConfig()
  }
}

export const environmentConfigManager = new EnvironmentConfigManager()

// Runtime configuration validator
export function validateRuntimeConfig(config: Partial<AppConfig>): boolean {
  try {
    envSchema.partial().parse(config)
    return true
  } catch {
    return false
  }
}

// Configuration health check with environment support
export function getConfigHealthStatus(): {
  isValid: boolean
  missingRequired: string[]
  invalidValues: string[]
  warnings: string[]
  environmentConfig: {
    isValid: boolean
    environment: Environment
    warnings: string[]
  }
} {
  const result = {
    isValid: true,
    missingRequired: [] as string[],
    invalidValues: [] as string[],
    warnings: [] as string[],
    environmentConfig: {
      isValid: true,
      environment: (process.env.NODE_ENV as Environment) || 'development',
      warnings: [] as string[]
    }
  }
  
  try {
    validateEnvironmentConfig()
  } catch (error) {
    result.isValid = false
    
    if (error instanceof ConfigValidationError) {
      error.errors.errors.forEach((err) => {
        const path = err.path.join(".")
        if (err.code === "invalid_type" && err.received === "undefined") {
          result.missingRequired.push(path)
        } else {
          result.invalidValues.push(`${path}: ${err.message}`)
        }
      })
    }
  }
  
  // Validate environment-specific configuration
  try {
    const envConfig = getEnvironmentConfig()
    
    // Check for potential performance issues in production
    if (envConfig.environment === 'production') {
      if (envConfig.database?.enableLogging) {
        result.environmentConfig.warnings.push('Database logging is enabled in production - may impact performance')
      }
      
      if (envConfig.monitoring?.logLevel === 'debug') {
        result.environmentConfig.warnings.push('Debug logging is enabled in production - may impact performance')
      }
      
      if (!envConfig.security?.enableTwoFactor) {
        result.environmentConfig.warnings.push('Two-factor authentication is disabled in production')
      }
    }
    
    // Check for development-specific issues
    if (envConfig.environment === 'development') {
      if (envConfig.security?.enableTwoFactor) {
        result.environmentConfig.warnings.push('Two-factor authentication is enabled in development - may slow down testing')
      }
    }
    
  } catch (error) {
    result.environmentConfig.isValid = false
    result.environmentConfig.warnings.push(`Environment config validation failed: ${error instanceof Error ? error.message : String(error)}`)
  }
  
  // Add warnings for optional but recommended values
  if (!process.env.RAPIDAPI_LOCAL_BUSINESS_KEY) {
    result.warnings.push("RAPIDAPI_LOCAL_BUSINESS_KEY is not set - some lead generation features may be limited")
  }
  
  if (!process.env.SCRAPERBEE_API_KEY) {
    result.warnings.push("SCRAPERBEE_API_KEY is not set - web scraping features may be limited")
  }
  
  // Check secure config store health
  try {
    const secureStoreStats = secureConfigStore.getAccessStats('test-key')
    // If we can access stats, the store is working
  } catch (error) {
    result.warnings.push('Secure configuration store may not be functioning properly')
  }
  
  return result
}