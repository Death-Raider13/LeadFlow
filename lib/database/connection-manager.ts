import { firebaseAdminDb } from "@/lib/firebase/admin"
import { Firestore } from "firebase-admin/firestore"

// Connection pool configuration
interface ConnectionPoolConfig {
  maxConnections: number
  connectionTimeout: number
  retryAttempts: number
  retryDelay: number
  healthCheckInterval: number
}

// Connection pool metrics
interface ConnectionMetrics {
  activeConnections: number
  totalRequests: number
  failedRequests: number
  averageResponseTime: number
  lastHealthCheck: Date
}

// Connection pool errors
export class ConnectionPoolError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = "ConnectionPoolError"
  }
}

// Connection manager class
class DatabaseConnectionManager {
  private db: Firestore
  private config: ConnectionPoolConfig
  private metrics: ConnectionMetrics
  private healthCheckTimer?: NodeJS.Timeout

  constructor(config: Partial<ConnectionPoolConfig> = {}) {
    this.db = firebaseAdminDb
    this.config = {
      maxConnections: config.maxConnections || 100,
      connectionTimeout: config.connectionTimeout || 30000, // 30 seconds
      retryAttempts: config.retryAttempts || 3,
      retryDelay: config.retryDelay || 1000, // 1 second
      healthCheckInterval: config.healthCheckInterval || 60000 // 1 minute
    }
    
    this.metrics = {
      activeConnections: 0,
      totalRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      lastHealthCheck: new Date()
    }

    this.startHealthCheck()
  }

  // Execute database operation with retry logic and metrics
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    operationName: string,
    retryAttempts?: number
  ): Promise<T> {
    const startTime = Date.now()
    const attempts = retryAttempts || this.config.retryAttempts
    let lastError: Error | null = null

    this.metrics.activeConnections++
    this.metrics.totalRequests++

    try {
      for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
          const result = await Promise.race([
            operation(),
            this.createTimeoutPromise()
          ])
          
          // Update metrics on success
          const responseTime = Date.now() - startTime
          this.updateAverageResponseTime(responseTime)
          
          return result
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error))
          
          // Don't retry on certain errors
          if (this.isNonRetryableError(lastError)) {
            break
          }
          
          // Wait before retry (exponential backoff)
          if (attempt < attempts) {
            const delay = this.config.retryDelay * Math.pow(2, attempt - 1)
            await this.sleep(delay)
          }
        }
      }

      // All attempts failed
      this.metrics.failedRequests++
      throw new ConnectionPoolError(
        `Operation ${operationName} failed after ${attempts} attempts: ${lastError?.message}`,
        "OPERATION_FAILED",
        { 
          operationName, 
          attempts, 
          lastError: lastError?.message,
          responseTime: Date.now() - startTime
        }
      )
    } finally {
      this.metrics.activeConnections--
    }
  }

  // Create timeout promise
  private createTimeoutPromise<T>(): Promise<T> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new ConnectionPoolError(
          `Operation timed out after ${this.config.connectionTimeout}ms`,
          "TIMEOUT",
          { timeout: this.config.connectionTimeout }
        ))
      }, this.config.connectionTimeout)
    })
  }

  // Check if error should not be retried
  private isNonRetryableError(error: Error): boolean {
    const nonRetryableCodes = [
      "PERMISSION_DENIED",
      "INVALID_ARGUMENT", 
      "NOT_FOUND",
      "ALREADY_EXISTS",
      "FAILED_PRECONDITION"
    ]
    
    return nonRetryableCodes.some(code => error.message.includes(code))
  }

  // Sleep utility
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Update average response time
  private updateAverageResponseTime(responseTime: number): void {
    const totalRequests = this.metrics.totalRequests
    const currentAverage = this.metrics.averageResponseTime
    
    // Calculate new average using incremental formula
    this.metrics.averageResponseTime = 
      (currentAverage * (totalRequests - 1) + responseTime) / totalRequests
  }

  // Health check functionality
  private startHealthCheck(): void {
    this.healthCheckTimer = setInterval(async () => {
      try {
        await this.performHealthCheck()
      } catch (error) {
        console.error("Database health check failed:", error)
      }
    }, this.config.healthCheckInterval)
  }

  // Perform health check
  private async performHealthCheck(): Promise<void> {
    try {
      // Simple read operation to test connectivity
      await this.db.collection("_health_check").limit(1).get()
      this.metrics.lastHealthCheck = new Date()
    } catch (error) {
      throw new ConnectionPoolError(
        `Health check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "HEALTH_CHECK_FAILED",
        { error: error instanceof Error ? error.message : String(error) }
      )
    }
  }

  // Get connection metrics
  getMetrics(): ConnectionMetrics {
    return { ...this.metrics }
  }

  // Get connection status
  getStatus(): {
    isHealthy: boolean
    activeConnections: number
    config: ConnectionPoolConfig
    metrics: ConnectionMetrics
  } {
    const timeSinceLastCheck = Date.now() - this.metrics.lastHealthCheck.getTime()
    const isHealthy = timeSinceLastCheck < this.config.healthCheckInterval * 2

    return {
      isHealthy,
      activeConnections: this.metrics.activeConnections,
      config: this.config,
      metrics: this.metrics
    }
  }

  // Shutdown connection manager
  shutdown(): void {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer)
      this.healthCheckTimer = undefined
    }
  }

  // Get database instance (for direct access when needed)
  getDatabase(): Firestore {
    return this.db
  }
}

// Export singleton instance
export const connectionManager = new DatabaseConnectionManager()
export default connectionManager