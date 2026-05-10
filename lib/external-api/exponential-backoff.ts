export interface BackoffOptions {
  initialDelay: number // Initial delay in milliseconds
  maxDelay: number // Maximum delay in milliseconds
  multiplier: number // Backoff multiplier
  maxRetries: number // Maximum number of retries
  jitter: boolean // Add random jitter to prevent thundering herd
}

export interface RetryContext {
  attempt: number
  totalAttempts: number
  delay: number
  error?: Error
}

export class ExponentialBackoff {
  private readonly options: BackoffOptions

  constructor(options: Partial<BackoffOptions> = {}) {
    this.options = {
      initialDelay: options.initialDelay ?? 1000, // 1 second
      maxDelay: options.maxDelay ?? 30000, // 30 seconds
      multiplier: options.multiplier ?? 2,
      maxRetries: options.maxRetries ?? 3,
      jitter: options.jitter ?? true,
    }
  }

  /**
   * Execute a function with exponential backoff retry logic
   */
  async execute<T>(
    fn: () => Promise<T>,
    shouldRetry?: (error: Error, attempt: number) => boolean
  ): Promise<T> {
    let lastError: Error | undefined

    for (let attempt = 0; attempt <= this.options.maxRetries; attempt++) {
      try {
        const result = await fn()
        
        // Log successful retry if this wasn't the first attempt
        if (attempt > 0) {
          console.log(`Operation succeeded after ${attempt} retries`)
        }
        
        return result
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        // Don't retry on the last attempt
        if (attempt === this.options.maxRetries) {
          break
        }
        
        // Check if we should retry this error
        if (shouldRetry && !shouldRetry(lastError, attempt)) {
          break
        }
        
        // Calculate delay for next attempt
        const delay = this.calculateDelay(attempt)
        
        console.warn(`Operation failed (attempt ${attempt + 1}/${this.options.maxRetries + 1}), retrying in ${delay}ms:`, lastError.message)
        
        // Wait before retrying
        await this.sleep(delay)
      }
    }

    throw lastError!
  }

  /**
   * Calculate delay for the given attempt
   */
  private calculateDelay(attempt: number): number {
    // Calculate exponential delay
    let delay = this.options.initialDelay * Math.pow(this.options.multiplier, attempt)
    
    // Cap at maximum delay
    delay = Math.min(delay, this.options.maxDelay)
    
    // Add jitter if enabled
    if (this.options.jitter) {
      // Add random jitter of ±25%
      const jitterRange = delay * 0.25
      const jitter = (Math.random() - 0.5) * 2 * jitterRange
      delay = Math.max(0, delay + jitter)
    }
    
    return Math.floor(delay)
  }

  /**
   * Sleep for the specified number of milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Get the options used by this backoff instance
   */
  getOptions(): BackoffOptions {
    return { ...this.options }
  }
}

/**
 * Default retry condition for network errors
 */
export function isRetryableError(error: Error): boolean {
  const retryableErrors = [
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ENOTFOUND',
    'ECONNRESET',
    'EPIPE',
    'EHOSTUNREACH',
    'EAI_AGAIN',
  ]
  
  const retryableStatusCodes = [408, 429, 500, 502, 503, 504]
  
  // Check for network errors
  if (retryableErrors.some(code => error.message.includes(code))) {
    return true
  }
  
  // Check for HTTP status codes (if error has status property)
  const httpError = error as any
  if (httpError.status && retryableStatusCodes.includes(httpError.status)) {
    return true
  }
  
  return false
}

/**
 * Create a retry function with exponential backoff
 */
export function createRetryFunction<T>(
  options?: Partial<BackoffOptions>,
  shouldRetry?: (error: Error, attempt: number) => boolean
) {
  const backoff = new ExponentialBackoff(options)
  
  return (fn: () => Promise<T>) => backoff.execute(fn, shouldRetry)
}