import { 
  validateEnvironmentConfig, 
  getConfigHealthStatus, 
  getEnvironmentConfig,
  configHotReloader,
  ConfigValidationError 
} from "./validation"

// Startup configuration validator
export class StartupValidator {
  private static instance: StartupValidator | null = null
  private isValidated = false
  private validationErrors: string[] = []
  
  static getInstance(): StartupValidator {
    if (!StartupValidator.instance) {
      StartupValidator.instance = new StartupValidator()
    }
    return StartupValidator.instance
  }
  
  async validateStartupConfiguration(): Promise<{
    success: boolean
    errors: string[]
    warnings: string[]
    environment: string
  }> {
    const errors: string[] = []
    const warnings: string[] = []
    
    try {
      // Validate environment variables
      validateEnvironmentConfig()
      
      // Get detailed health status
      const healthStatus = getConfigHealthStatus()
      
      if (!healthStatus.isValid) {
        errors.push(...healthStatus.missingRequired.map(key => `Missing required environment variable: ${key}`))
        errors.push(...healthStatus.invalidValues)
      }
      
      warnings.push(...healthStatus.warnings)
      warnings.push(...healthStatus.environmentConfig.warnings)
      
      // Validate Firebase configuration
      await this.validateFirebaseConfig()
      
      // Validate encryption setup
      this.validateEncryptionConfig()
      
      // Validate environment-specific configuration
      this.validateEnvironmentSpecificConfig()
      
      // Enable hot reload in development
      if (process.env.NODE_ENV === 'development') {
        try {
          configHotReloader.enable()
          warnings.push('Configuration hot reload enabled for development')
        } catch (error) {
          warnings.push('Failed to enable configuration hot reload')
        }
      }
      
      this.isValidated = errors.length === 0
      this.validationErrors = errors
      
      return {
        success: this.isValidated,
        errors,
        warnings,
        environment: process.env.NODE_ENV || 'development'
      }
      
    } catch (error) {
      const errorMessage = error instanceof ConfigValidationError 
        ? error.message 
        : `Startup validation failed: ${error instanceof Error ? error.message : String(error)}`
      
      errors.push(errorMessage)
      this.isValidated = false
      this.validationErrors = errors
      
      return {
        success: false,
        errors,
        warnings,
        environment: process.env.NODE_ENV || 'development'
      }
    }
  }
  
  private async validateFirebaseConfig(): Promise<void> {
    try {
      // Basic Firebase configuration validation
      const requiredFirebaseVars = [
        "FIREBASE_PROJECT_ID",
        "FIREBASE_CLIENT_EMAIL", 
        "FIREBASE_PRIVATE_KEY"
      ]
      
      for (const varName of requiredFirebaseVars) {
        if (!process.env[varName]) {
          throw new Error(`Missing Firebase configuration: ${varName}`)
        }
      }
      
      // Validate private key format
      const privateKey = process.env.FIREBASE_PRIVATE_KEY
      if (privateKey && !privateKey.includes("BEGIN PRIVATE KEY")) {
        throw new Error("FIREBASE_PRIVATE_KEY appears to be in invalid format")
      }
      
    } catch (error) {
      throw new Error(`Firebase configuration validation failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  private validateEncryptionConfig(): void {
    try {
      const encryptionKey = process.env.CREDENTIALS_ENCRYPTION_KEY
      if (!encryptionKey) {
        throw new Error("CREDENTIALS_ENCRYPTION_KEY is required")
      }
      
      // Validate key format and length
      const keyBuffer = Buffer.from(encryptionKey, "base64")
      if (keyBuffer.length !== 32) {
        throw new Error("CREDENTIALS_ENCRYPTION_KEY must be exactly 32 bytes when base64 decoded")
      }
      
    } catch (error) {
      throw new Error(`Encryption configuration validation failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  private validateEnvironmentSpecificConfig(): void {
    try {
      const envConfig = getEnvironmentConfig()
      
      // Validate environment-specific settings
      if (envConfig.environment === 'production') {
        // Production-specific validations
        if (envConfig.database?.enableLogging) {
          throw new Error('Database logging should be disabled in production for performance')
        }
        
        if (envConfig.monitoring?.logLevel === 'debug') {
          throw new Error('Debug logging should not be enabled in production')
        }
        
        if (envConfig.database?.connectionPoolSize && envConfig.database.connectionPoolSize < 10) {
          throw new Error('Production database connection pool size should be at least 10')
        }
      }
      
      // Validate required configuration sections
      if (!envConfig.database) {
        throw new Error('Database configuration is required')
      }
      
      if (!envConfig.security) {
        throw new Error('Security configuration is required')
      }
      
      if (!envConfig.monitoring) {
        throw new Error('Monitoring configuration is required')
      }
      
    } catch (error) {
      throw new Error(`Environment-specific configuration validation failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  isConfigurationValid(): boolean {
    return this.isValidated
  }
  
  getValidationErrors(): string[] {
    return [...this.validationErrors]
  }
  
  // Force re-validation (useful for testing or config changes)
  reset(): void {
    this.isValidated = false
    this.validationErrors = []
  }
}

// Convenience function for startup validation
export async function validateStartup(): Promise<void> {
  const validator = StartupValidator.getInstance()
  const result = await validator.validateStartupConfiguration()
  
  if (!result.success) {
    console.error("❌ Startup configuration validation failed:")
    result.errors.forEach(error => console.error(`  - ${error}`))
    throw new Error("Application startup failed due to configuration errors")
  }
  
  if (result.warnings.length > 0) {
    console.warn("⚠️  Configuration warnings:")
    result.warnings.forEach(warning => console.warn(`  - ${warning}`))
  }
  
  console.log("✅ Configuration validation passed")
}

// Export singleton instance
export const startupValidator = StartupValidator.getInstance()