export enum CircuitBreakerState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN',
}

export interface CircuitBreakerOptions {
  failureThreshold: number
  recoveryTimeout: number
  monitoringPeriod: number
  expectedErrors?: string[]
}

export interface CircuitBreakerStats {
  state: CircuitBreakerState
  failureCount: number
  successCount: number
  totalRequests: number
  lastFailureTime?: Date
  nextAttemptTime?: Date
}

export class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.CLOSED
  private failureCount: number = 0
  private successCount: number = 0
  private totalRequests: number = 0
  private lastFailureTime?: Date
  private nextAttemptTime?: Date
  private readonly options: CircuitBreakerOptions

  constructor(
    private readonly name: string,
    options: Partial<CircuitBreakerOptions> = {}
  ) {
    this.options = {
      failureThreshold: options.failureThreshold ?? 5,
      recoveryTimeout: options.recoveryTimeout ?? 60000, // 1 minute
      monitoringPeriod: options.monitoringPeriod ?? 300000, // 5 minutes
      expectedErrors: options.expectedErrors ?? ['ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND'],
    }
  }

  /**
   * Execute a function with circuit breaker protection
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitBreakerState.OPEN) {
      if (this.shouldAttemptReset()) {
        this.state = CircuitBreakerState.HALF_OPEN
        console.log(`Circuit breaker ${this.name} transitioning to HALF_OPEN`)
      } else {
        throw new Error(`Circuit breaker ${this.name} is OPEN. Next attempt at ${this.nextAttemptTime?.toISOString()}`)
      }
    }

    this.totalRequests++

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure(error)
      throw error
    }
  }

  /**
   * Handle successful execution
   */
  private onSuccess(): void {
    this.successCount++
    
    if (this.state === CircuitBreakerState.HALF_OPEN) {
      console.log(`Circuit breaker ${this.name} transitioning to CLOSED after successful request`)
      this.reset()
    }
  }

  /**
   * Handle failed execution
   */
  private onFailure(error: unknown): void {
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    // Check if this is an expected error that should trigger the circuit breaker
    const isExpectedError = this.options.expectedErrors?.some(expectedError => 
      errorMessage.includes(expectedError)
    ) ?? true

    if (!isExpectedError) {
      // Don't count unexpected errors (like validation errors) towards circuit breaker
      return
    }

    this.failureCount++
    this.lastFailureTime = new Date()

    console.warn(`Circuit breaker ${this.name} recorded failure (${this.failureCount}/${this.options.failureThreshold}): ${errorMessage}`)

    if (this.state === CircuitBreakerState.HALF_OPEN) {
      console.log(`Circuit breaker ${this.name} transitioning to OPEN after failure in HALF_OPEN state`)
      this.trip()
    } else if (this.failureCount >= this.options.failureThreshold) {
      console.log(`Circuit breaker ${this.name} transitioning to OPEN after ${this.failureCount} failures`)
      this.trip()
    }
  }

  /**
   * Trip the circuit breaker (open it)
   */
  private trip(): void {
    this.state = CircuitBreakerState.OPEN
    this.nextAttemptTime = new Date(Date.now() + this.options.recoveryTimeout)
  }

  /**
   * Reset the circuit breaker (close it)
   */
  private reset(): void {
    this.state = CircuitBreakerState.CLOSED
    this.failureCount = 0
    this.nextAttemptTime = undefined
  }

  /**
   * Check if we should attempt to reset the circuit breaker
   */
  private shouldAttemptReset(): boolean {
    return this.nextAttemptTime ? Date.now() >= this.nextAttemptTime.getTime() : false
  }

  /**
   * Get current circuit breaker statistics
   */
  getStats(): CircuitBreakerStats {
    return {
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      totalRequests: this.totalRequests,
      lastFailureTime: this.lastFailureTime,
      nextAttemptTime: this.nextAttemptTime,
    }
  }

  /**
   * Check if circuit breaker is available for requests
   */
  isAvailable(): boolean {
    return this.state === CircuitBreakerState.CLOSED || 
           (this.state === CircuitBreakerState.HALF_OPEN && this.shouldAttemptReset())
  }

  /**
   * Manually reset the circuit breaker
   */
  manualReset(): void {
    console.log(`Circuit breaker ${this.name} manually reset`)
    this.reset()
  }

  /**
   * Get failure rate over the monitoring period
   */
  getFailureRate(): number {
    if (this.totalRequests === 0) {
      return 0
    }
    return this.failureCount / this.totalRequests
  }
}

/**
 * Circuit breaker manager for multiple services
 */
export class CircuitBreakerManager {
  private static instance: CircuitBreakerManager
  private circuitBreakers = new Map<string, CircuitBreaker>()

  static getInstance(): CircuitBreakerManager {
    if (!CircuitBreakerManager.instance) {
      CircuitBreakerManager.instance = new CircuitBreakerManager()
    }
    return CircuitBreakerManager.instance
  }

  /**
   * Get or create a circuit breaker for a service
   */
  getCircuitBreaker(serviceName: string, options?: Partial<CircuitBreakerOptions>): CircuitBreaker {
    if (!this.circuitBreakers.has(serviceName)) {
      this.circuitBreakers.set(serviceName, new CircuitBreaker(serviceName, options))
    }
    return this.circuitBreakers.get(serviceName)!
  }

  /**
   * Get all circuit breaker statistics
   */
  getAllStats(): Record<string, CircuitBreakerStats> {
    const stats: Record<string, CircuitBreakerStats> = {}
    for (const [name, breaker] of this.circuitBreakers) {
      stats[name] = breaker.getStats()
    }
    return stats
  }

  /**
   * Reset all circuit breakers
   */
  resetAll(): void {
    for (const breaker of this.circuitBreakers.values()) {
      breaker.manualReset()
    }
  }

  /**
   * Get services that are currently unavailable
   */
  getUnavailableServices(): string[] {
    const unavailable: string[] = []
    for (const [name, breaker] of this.circuitBreakers) {
      if (!breaker.isAvailable()) {
        unavailable.push(name)
      }
    }
    return unavailable
  }
}

// Export singleton instance
export const circuitBreakerManager = CircuitBreakerManager.getInstance()