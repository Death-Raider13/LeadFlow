import { ThrottleOptions } from './types'

interface ThrottleEntry {
  count: number
  windowStart: Date
  burstCount: number
  burstWindowStart: Date
}

export class OperationThrottle {
  private throttleMap = new Map<string, ThrottleEntry>()
  private options: ThrottleOptions

  constructor(options: ThrottleOptions) {
    this.options = {
      burstLimit: options.maxOperationsPerWindow * 2, // Default burst is 2x normal limit
      ...options,
    }
  }

  /**
   * Check if an operation is allowed for the given key
   */
  isAllowed(key: string): { allowed: boolean; retryAfter?: number; reason?: string } {
    const now = new Date()
    const entry = this.getOrCreateEntry(key, now)

    // Check if we're in a new window
    if (now.getTime() - entry.windowStart.getTime() >= this.options.windowSizeMs) {
      // Reset for new window
      entry.count = 0
      entry.windowStart = now
    }

    // Check burst limit (shorter window, higher limit)
    const burstWindowMs = Math.min(this.options.windowSizeMs / 4, 60000) // 1/4 of main window or 1 minute max
    if (now.getTime() - entry.burstWindowStart.getTime() >= burstWindowMs) {
      entry.burstCount = 0
      entry.burstWindowStart = now
    }

    // Check burst limit first
    if (entry.burstCount >= this.options.burstLimit!) {
      const retryAfter = Math.ceil((burstWindowMs - (now.getTime() - entry.burstWindowStart.getTime())) / 1000)
      return {
        allowed: false,
        retryAfter,
        reason: 'Burst limit exceeded',
      }
    }

    // Check main window limit
    if (entry.count >= this.options.maxOperationsPerWindow) {
      const retryAfter = Math.ceil((this.options.windowSizeMs - (now.getTime() - entry.windowStart.getTime())) / 1000)
      return {
        allowed: false,
        retryAfter,
        reason: 'Rate limit exceeded',
      }
    }

    return { allowed: true }
  }

  /**
   * Record an operation for the given key
   */
  recordOperation(key: string): void {
    const now = new Date()
    const entry = this.getOrCreateEntry(key, now)

    // Check if we're in a new window
    if (now.getTime() - entry.windowStart.getTime() >= this.options.windowSizeMs) {
      entry.count = 0
      entry.windowStart = now
    }

    // Check burst window
    const burstWindowMs = Math.min(this.options.windowSizeMs / 4, 60000)
    if (now.getTime() - entry.burstWindowStart.getTime() >= burstWindowMs) {
      entry.burstCount = 0
      entry.burstWindowStart = now
    }

    entry.count++
    entry.burstCount++
  }

  /**
   * Get usage statistics for a key
   */
  getUsage(key: string): {
    count: number
    limit: number
    remaining: number
    resetTime: Date
    burstCount: number
    burstLimit: number
    burstResetTime: Date
  } {
    const now = new Date()
    const entry = this.getOrCreateEntry(key, now)

    // Check if we're in a new window
    if (now.getTime() - entry.windowStart.getTime() >= this.options.windowSizeMs) {
      entry.count = 0
      entry.windowStart = now
    }

    const burstWindowMs = Math.min(this.options.windowSizeMs / 4, 60000)
    if (now.getTime() - entry.burstWindowStart.getTime() >= burstWindowMs) {
      entry.burstCount = 0
      entry.burstWindowStart = now
    }

    return {
      count: entry.count,
      limit: this.options.maxOperationsPerWindow,
      remaining: Math.max(0, this.options.maxOperationsPerWindow - entry.count),
      resetTime: new Date(entry.windowStart.getTime() + this.options.windowSizeMs),
      burstCount: entry.burstCount,
      burstLimit: this.options.burstLimit!,
      burstResetTime: new Date(entry.burstWindowStart.getTime() + burstWindowMs),
    }
  }

  /**
   * Reset throttle for a specific key
   */
  reset(key: string): void {
    this.throttleMap.delete(key)
  }

  /**
   * Clear all throttle data
   */
  clear(): void {
    this.throttleMap.clear()
  }

  /**
   * Get or create throttle entry
   */
  private getOrCreateEntry(key: string, now: Date): ThrottleEntry {
    let entry = this.throttleMap.get(key)
    
    if (!entry) {
      entry = {
        count: 0,
        windowStart: now,
        burstCount: 0,
        burstWindowStart: now,
      }
      this.throttleMap.set(key, entry)
    }

    return entry
  }

  /**
   * Cleanup expired entries
   */
  cleanup(): void {
    const now = new Date()
    const expiredKeys: string[] = []

    for (const [key, entry] of this.throttleMap.entries()) {
      // Remove entries that haven't been used for 2x the window size
      if (now.getTime() - entry.windowStart.getTime() > this.options.windowSizeMs * 2) {
        expiredKeys.push(key)
      }
    }

    expiredKeys.forEach(key => this.throttleMap.delete(key))
  }
}

/**
 * Pre-configured throttles for different operation types
 */
export const operationThrottles = {
  leadGeneration: new OperationThrottle({
    maxOperationsPerWindow: 10,
    windowSizeMs: 60000, // 1 minute
    burstLimit: 15,
  }),

  leadImport: new OperationThrottle({
    maxOperationsPerWindow: 5,
    windowSizeMs: 300000, // 5 minutes
    burstLimit: 8,
  }),

  emailSend: new OperationThrottle({
    maxOperationsPerWindow: 50,
    windowSizeMs: 3600000, // 1 hour
    burstLimit: 75,
  }),

  smsSend: new OperationThrottle({
    maxOperationsPerWindow: 20,
    windowSizeMs: 3600000, // 1 hour
    burstLimit: 30,
  }),
}

// Cleanup expired entries every 5 minutes
setInterval(() => {
  Object.values(operationThrottles).forEach(throttle => throttle.cleanup())
}, 5 * 60 * 1000)