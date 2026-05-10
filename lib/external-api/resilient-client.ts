import { CircuitBreaker, circuitBreakerManager } from './circuit-breaker'
import { ExponentialBackoff, isRetryableError } from './exponential-backoff'
import { serviceCacheManager, CacheKeyGenerator, ExternalApiCacheManager } from './cache-manager'
import { PerformanceMonitor } from '../monitoring/metrics'

export interface ResilientClientOptions {
  serviceName: string
  circuitBreakerOptions?: {
    failureThreshold?: number
    recoveryTimeout?: number
    monitoringPeriod?: number
  }
  backoffOptions?: {
    initialDelay?: number
    maxDelay?: number
    multiplier?: number
    maxRetries?: number
    jitter?: boolean
  }
  cacheOptions?: {
    defaultTtl?: number
    maxSize?: number
    enableCache?: boolean
  }
  timeout?: number
  fallbackEnabled?: boolean
}

export interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

export interface FallbackOptions<T> {
  fallbackFn?: () => Promise<T>
  fallbackValue?: T
  useCachedResponse?: boolean
  cacheKey?: string
  cacheTtl?: number
  cacheTags?: string[]
}

export class ResilientApiClient {
  private circuitBreaker: CircuitBreaker
  private backoff: ExponentialBackoff
  private options: ResilientClientOptions
  private cacheManager: ExternalApiCacheManager

  constructor(options: ResilientClientOptions) {
    this.options = {
      timeout: 10000, // 10 seconds default
      fallbackEnabled: true,
      ...options,
    }

    this.circuitBreaker = circuitBreakerManager.getCircuitBreaker(
      options.serviceName,
      options.circuitBreakerOptions
    )

    this.backoff = new ExponentialBackoff(options.backoffOptions)

    // Initialize cache manager for this service
    this.cacheManager = serviceCacheManager.getServiceCache(
      options.serviceName,
      {
        enableMetrics: true,
        ...options.cacheOptions,
      }
    )
  }

  /**
   * Make a resilient HTTP request with circuit breaker and retry logic
   */
  async request<T>(
    requestOptions: RequestOptions,
    fallbackOptions?: FallbackOptions<T>
  ): Promise<T> {
    const cacheKey = fallbackOptions?.cacheKey || 
      CacheKeyGenerator.forApiRequest(
        this.options.serviceName,
        requestOptions.url,
        requestOptions.body,
        requestOptions.method
      )

    // Check cache first for GET requests (or if explicitly enabled)
    const enableCache = this.options.cacheOptions?.enableCache !== false
    if (enableCache && (requestOptions.method === 'GET' || !requestOptions.method)) {
      const cached = this.cacheManager.get<T>(cacheKey)
      if (cached) {
        return cached
      }
    }

    // Track external API call performance
    const performanceTracker = PerformanceMonitor.trackExternalApiCall(
      this.options.serviceName,
      requestOptions.url
    )

    try {
      // Execute request with circuit breaker protection
      const result = await this.circuitBreaker.execute(async () => {
        // Execute request with exponential backoff
        return await this.backoff.execute(
          () => this.makeHttpRequest<T>(requestOptions),
          (error, attempt) => {
            // Only retry on retryable errors and if we haven't exceeded max attempts
            return isRetryableError(error) && attempt < (this.options.backoffOptions?.maxRetries ?? 3)
          }
        )
      })

      // Cache successful response if caching is enabled
      if (enableCache && (requestOptions.method === 'GET' || !requestOptions.method)) {
        const cacheTtl = fallbackOptions?.cacheTtl || this.options.cacheOptions?.defaultTtl
        const cacheTags = fallbackOptions?.cacheTags
        this.cacheManager.set(cacheKey, result, cacheTtl, cacheTags)
      }

      performanceTracker.end(true)
      return result
    } catch (error) {
      performanceTracker.end(false, (error as any)?.status)
      console.error(`Request failed for ${this.options.serviceName}:`, error)

      // Try fallback mechanisms
      if (this.options.fallbackEnabled && fallbackOptions) {
        return await this.handleFallback(cacheKey, fallbackOptions, error as Error)
      }

      throw error
    }
  }

  /**
   * Make the actual HTTP request
   */
  private async makeHttpRequest<T>(options: RequestOptions): Promise<T> {
    const controller = new AbortController()
    const timeout = options.timeout || this.options.timeout!

    // Set up timeout
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(options.url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
        ;(error as any).status = response.status
        throw error
      }

      const data = await response.json()
      return data as T
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`)
      }
      
      throw error
    }
  }

  /**
   * Handle fallback mechanisms
   */
  private async handleFallback<T>(
    cacheKey: string,
    fallbackOptions: FallbackOptions<T>,
    originalError: Error
  ): Promise<T> {
    // Try cached response first
    if (fallbackOptions.useCachedResponse) {
      const cached = this.cacheManager.get<T>(cacheKey)
      if (cached) {
        console.log(`Using cached response for ${this.options.serviceName}`)
        return cached
      }
    }

    // Try fallback function
    if (fallbackOptions.fallbackFn) {
      try {
        console.log(`Using fallback function for ${this.options.serviceName}`)
        return await fallbackOptions.fallbackFn()
      } catch (fallbackError) {
        console.error(`Fallback function failed for ${this.options.serviceName}:`, fallbackError)
      }
    }

    // Use fallback value
    if (fallbackOptions.fallbackValue !== undefined) {
      console.log(`Using fallback value for ${this.options.serviceName}`)
      return fallbackOptions.fallbackValue
    }

    // No fallback available, throw original error
    throw originalError
  }

  /**
   * Cache a response with tags for invalidation
   */
  cacheResponse<T>(key: string, data: T, ttl?: number, tags?: string[]): void {
    this.cacheManager.set(key, data, ttl, tags)
  }

  /**
   * Get cached response
   */
  getCachedResponse<T>(key: string): T | null {
    return this.cacheManager.get<T>(key)
  }

  /**
   * Invalidate cache entries by tags
   */
  invalidateCache(tags: string[]): number {
    return this.cacheManager.invalidateByTags(tags)
  }

  /**
   * Clear all cached responses for this service
   */
  clearCache(): void {
    this.cacheManager.clear()
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.cacheManager.getStats()
  }

  /**
   * Get circuit breaker stats
   */
  getStats() {
    return {
      circuitBreaker: this.circuitBreaker.getStats(),
      backoffOptions: this.backoff.getOptions(),
      cache: this.cacheManager.getStats(),
    }
  }

  /**
   * Check if the service is available
   */
  isAvailable(): boolean {
    return this.circuitBreaker.isAvailable()
  }

  /**
   * Manually reset the circuit breaker
   */
  reset(): void {
    this.circuitBreaker.manualReset()
    this.clearCache()
  }
}

/**
 * Factory function to create resilient clients for different services
 */
export function createResilientClient(options: ResilientClientOptions): ResilientApiClient {
  return new ResilientApiClient(options)
}

/**
 * Pre-configured clients for common external services
 */
export const externalApiClients = {
  geoapify: createResilientClient({
    serviceName: 'geoapify',
    circuitBreakerOptions: {
      failureThreshold: 3,
      recoveryTimeout: 30000, // 30 seconds
    },
    backoffOptions: {
      initialDelay: 1000,
      maxDelay: 10000,
      maxRetries: 2,
    },
    cacheOptions: {
      defaultTtl: 600000, // 10 minutes for location data
      maxSize: 500,
      enableCache: true,
    },
  }),

  rapidApi: createResilientClient({
    serviceName: 'rapidapi',
    circuitBreakerOptions: {
      failureThreshold: 5,
      recoveryTimeout: 60000, // 1 minute
    },
    backoffOptions: {
      initialDelay: 2000,
      maxDelay: 15000,
      maxRetries: 3,
    },
    cacheOptions: {
      defaultTtl: 300000, // 5 minutes for general API data
      maxSize: 1000,
      enableCache: true,
    },
  }),

  scraperBee: createResilientClient({
    serviceName: 'scraperbee',
    circuitBreakerOptions: {
      failureThreshold: 3,
      recoveryTimeout: 45000, // 45 seconds
    },
    backoffOptions: {
      initialDelay: 1500,
      maxDelay: 12000,
      maxRetries: 2,
    },
    cacheOptions: {
      defaultTtl: 180000, // 3 minutes for web scraping data
      maxSize: 300,
      enableCache: true,
    },
  }),
}