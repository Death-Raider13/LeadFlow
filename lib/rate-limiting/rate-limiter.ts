import { RateLimit, RateLimitResult, UsageStats, RateLimitKey } from './types'
import { rateLimitStorage } from './storage'

export interface RateLimiter {
  checkLimit(key: string, limits: RateLimit[]): Promise<RateLimitResult>
  incrementCounter(key: string, limits: RateLimit[]): Promise<void>
  resetCounter(key: string, limits: RateLimit[]): Promise<void>
  getUsage(key: string, limits: RateLimit[]): Promise<UsageStats>
}

class MultiTierRateLimiter implements RateLimiter {
  async checkLimit(identifier: string, limits: RateLimit[]): Promise<RateLimitResult> {
    // Check all limits and return the most restrictive result
    let mostRestrictive: RateLimitResult = {
      allowed: true,
      remaining: Infinity,
      resetTime: new Date(Date.now() + 60000), // Default 1 minute
    }
    
    for (const limit of limits) {
      const key: RateLimitKey = {
        type: limit.tier,
        identifier,
        window: limit.window,
      }
      
      const entry = await rateLimitStorage.get(key)
      const now = new Date()
      
      if (!entry) {
        // No existing entry, all good
        const remaining = limit.maxRequests - 1 // Account for this request
        const resetTime = new Date(now.getTime() + limit.window * 1000)
        
        if (remaining < mostRestrictive.remaining) {
          mostRestrictive = {
            allowed: true,
            remaining,
            resetTime,
          }
        }
        continue
      }
      
      const remaining = Math.max(0, limit.maxRequests - entry.count)
      const allowed = entry.count < limit.maxRequests
      
      if (!allowed || remaining < mostRestrictive.remaining) {
        mostRestrictive = {
          allowed,
          remaining,
          resetTime: entry.resetTime,
          retryAfter: allowed ? undefined : Math.ceil((entry.resetTime.getTime() - now.getTime()) / 1000),
        }
      }
      
      // If any limit is exceeded, deny the request
      if (!allowed) {
        mostRestrictive.allowed = false
        break
      }
    }
    
    return mostRestrictive
  }
  
  async incrementCounter(identifier: string, limits: RateLimit[]): Promise<void> {
    // Increment counters for all applicable limits
    for (const limit of limits) {
      const key: RateLimitKey = {
        type: limit.tier,
        identifier,
        window: limit.window,
      }
      
      await rateLimitStorage.increment(key)
    }
  }
  
  async resetCounter(identifier: string, limits: RateLimit[]): Promise<void> {
    // Reset counters for all applicable limits
    for (const limit of limits) {
      const key: RateLimitKey = {
        type: limit.tier,
        identifier,
        window: limit.window,
      }
      
      await rateLimitStorage.reset(key)
    }
  }
  
  async getUsage(identifier: string, limits: RateLimit[]): Promise<UsageStats> {
    // Return usage stats for the most restrictive limit
    let mostRestrictive: UsageStats = {
      current: 0,
      limit: Infinity,
      resetTime: new Date(Date.now() + 60000),
      windowStart: new Date(),
    }
    
    for (const limit of limits) {
      const key: RateLimitKey = {
        type: limit.tier,
        identifier,
        window: limit.window,
      }
      
      const entry = await rateLimitStorage.get(key)
      
      if (entry) {
        const remaining = Math.max(0, limit.maxRequests - entry.count)
        if (remaining < (mostRestrictive.limit - mostRestrictive.current)) {
          mostRestrictive = {
            current: entry.count,
            limit: limit.maxRequests,
            resetTime: entry.resetTime,
            windowStart: entry.windowStart,
          }
        }
      }
    }
    
    return mostRestrictive
  }
}

export const rateLimiter = new MultiTierRateLimiter()