export interface RateLimit {
  window: number // seconds
  maxRequests: number
  tier: 'global' | 'user' | 'ip' | 'endpoint'
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: Date
  retryAfter?: number
}

export interface UsageStats {
  current: number
  limit: number
  resetTime: Date
  windowStart: Date
}

export interface RateLimitConfig {
  global: RateLimit[]
  user: Record<string, RateLimit[]> // keyed by subscription plan
  ip: RateLimit[]
  endpoint: Record<string, RateLimit[]> // keyed by endpoint path
}

export interface RateLimitKey {
  type: 'global' | 'user' | 'ip' | 'endpoint'
  identifier: string // userId, IP address, endpoint path, or 'global'
  window: number
}

export interface RateLimitEntry {
  count: number
  windowStart: Date
  resetTime: Date
}