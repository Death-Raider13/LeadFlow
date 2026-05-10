import { 
  getConfig, 
  getEnvironmentConfig, 
  secureConfigStore, 
  environmentConfigManager,
  getConfigHealthStatus,
  validateEnvironmentConfig 
} from "@/lib/config"

describe("Configuration Management", () => {
  beforeEach(() => {
    // Clean up secure config store before each test
    secureConfigStore.clear()
  })

  describe("Environment Configuration", () => {
    it("should load environment-specific configuration", () => {
      const envConfig = getEnvironmentConfig()
      
      expect(envConfig).toBeDefined()
      expect(envConfig.environment).toBeDefined()
      expect(envConfig.database).toBeDefined()
      expect(envConfig.security).toBeDefined()
      expect(envConfig.performance).toBeDefined()
      expect(envConfig.monitoring).toBeDefined()
    })

    it("should have different settings for different environments", () => {
      const currentEnv = process.env.NODE_ENV
      
      // Test development environment
      process.env.NODE_ENV = 'development'
      environmentConfigManager.switchEnvironment('development')
      const devConfig = environmentConfigManager.getConfig()
      
      // Test production environment  
      process.env.NODE_ENV = 'production'
      environmentConfigManager.switchEnvironment('production')
      const prodConfig = environmentConfigManager.getConfig()
      
      // Restore original environment
      process.env.NODE_ENV = currentEnv
      
      expect(devConfig.database?.enableLogging).toBe(true)
      expect(prodConfig.database?.enableLogging).toBe(false)
      expect(devConfig.security?.enableTwoFactor).toBe(false)
      expect(prodConfig.security?.enableTwoFactor).toBe(true)
    })
  })

  describe("Secure Configuration Store", () => {
    it("should store and retrieve encrypted values", () => {
      const testKey = "test-secret"
      const testValue = "sensitive-data-123"
      
      secureConfigStore.set(testKey, testValue, { encrypt: true })
      const retrieved = secureConfigStore.get(testKey)
      
      expect(retrieved).toBe(testValue)
    })

    it("should store and retrieve plain text values", () => {
      const testKey = "test-plain"
      const testValue = "non-sensitive-data"
      
      secureConfigStore.set(testKey, testValue, { encrypt: false })
      const retrieved = secureConfigStore.get(testKey)
      
      expect(retrieved).toBe(testValue)
    })

    it("should track access statistics", () => {
      const testKey = "test-stats"
      const testValue = "test-value"
      
      secureConfigStore.set(testKey, testValue)
      
      // Access the value multiple times
      secureConfigStore.get(testKey)
      secureConfigStore.get(testKey)
      
      const stats = secureConfigStore.getAccessStats(testKey)
      expect(stats).toBeDefined()
      expect(stats!.accessCount).toBe(2)
      expect(stats!.lastAccessed).toBeInstanceOf(Date)
    })

    it("should handle environment-specific configuration", () => {
      const testKey = "env-specific"
      const testValue = "dev-value"
      
      secureConfigStore.set(testKey, testValue, { 
        encrypt: false, 
        environment: 'development' 
      })
      
      // Should retrieve for matching environment
      const retrieved = secureConfigStore.get(testKey, 'development')
      expect(retrieved).toBe(testValue)
      
      // Should not retrieve for different environment
      const notRetrieved = secureConfigStore.get(testKey, 'production')
      expect(notRetrieved).toBeNull()
    })

    it("should delete configuration values", () => {
      const testKey = "test-delete"
      const testValue = "to-be-deleted"
      
      secureConfigStore.set(testKey, testValue)
      expect(secureConfigStore.has(testKey)).toBe(true)
      
      const deleted = secureConfigStore.delete(testKey)
      expect(deleted).toBe(true)
      expect(secureConfigStore.has(testKey)).toBe(false)
    })
  })

  describe("Configuration Health Check", () => {
    it("should provide configuration health status", () => {
      const healthStatus = getConfigHealthStatus()
      
      expect(healthStatus).toBeDefined()
      expect(healthStatus.isValid).toBeDefined()
      expect(healthStatus.missingRequired).toBeInstanceOf(Array)
      expect(healthStatus.invalidValues).toBeInstanceOf(Array)
      expect(healthStatus.warnings).toBeInstanceOf(Array)
      expect(healthStatus.environmentConfig).toBeDefined()
      expect(healthStatus.environmentConfig.environment).toBeDefined()
    })

    it("should validate basic configuration", () => {
      // Store original values
      const originalKey = process.env.CREDENTIALS_ENCRYPTION_KEY
      
      // Set a valid encryption key for testing
      process.env.CREDENTIALS_ENCRYPTION_KEY = "DTDYMpgS/8PODx/LFGild6P/kSbtWCTEUK91RY/03Cs="
      
      expect(() => {
        validateEnvironmentConfig()
      }).not.toThrow()
      
      // Restore original value
      if (originalKey) {
        process.env.CREDENTIALS_ENCRYPTION_KEY = originalKey
      }
    })
  })

  describe("Configuration Validation", () => {
    it("should validate required environment variables", () => {
      const originalEnv = process.env.FIREBASE_PROJECT_ID
      
      // Test missing required variable
      delete process.env.FIREBASE_PROJECT_ID
      
      expect(() => {
        validateEnvironmentConfig()
      }).toThrow()
      
      // Restore original value
      if (originalEnv) {
        process.env.FIREBASE_PROJECT_ID = originalEnv
      }
    })

    it("should handle encryption key validation", () => {
      const originalKey = process.env.CREDENTIALS_ENCRYPTION_KEY
      
      // Test with valid key
      process.env.CREDENTIALS_ENCRYPTION_KEY = "DTDYMpgS/8PODx/LFGild6P/kSbtWCTEUK91RY/03Cs="
      
      expect(() => {
        validateEnvironmentConfig()
      }).not.toThrow()
      
      // Restore original value
      if (originalKey) {
        process.env.CREDENTIALS_ENCRYPTION_KEY = originalKey
      }
    })
  })
})