import { RateLimitConfig, RateLimit } from './types'

export const RATE_LIMIT_CONFIG: RateLimitConfig = {
  // Global limits apply to all requests
  global: [
    { window: 60, maxRequests: 1000, tier: 'global' }, // 1000 requests per minute globally
    { window: 3600, maxRequests: 10000, tier: 'global' }, // 10k requests per hour globally
  ],
  
  // User limits based on subscription plan
  user: {
    free: [
      { window: 60, maxRequests: 10, tier: 'user' }, // 10 requests per minute
      { window: 3600, maxRequests: 100, tier: 'user' }, // 100 requests per hour
      { window: 86400, maxRequests: 500, tier: 'user' }, // 500 requests per day
    ],
    starter: [
      { window: 60, maxRequests: 30, tier: 'user' }, // 30 requests per minute
      { window: 3600, maxRequests: 500, tier: 'user' }, // 500 requests per hour
      { window: 86400, maxRequests: 2000, tier: 'user' }, // 2k requests per day
    ],
    pro: [
      { window: 60, maxRequests: 100, tier: 'user' }, // 100 requests per minute
      { window: 3600, maxRequests: 2000, tier: 'user' }, // 2k requests per hour
      { window: 86400, maxRequests: 10000, tier: 'user' }, // 10k requests per day
    ],
  },
  
  // IP-based limits to prevent abuse
  ip: [
    { window: 60, maxRequests: 60, tier: 'ip' }, // 60 requests per minute per IP
    { window: 3600, maxRequests: 1000, tier: 'ip' }, // 1k requests per hour per IP
  ],
  
  // Endpoint-specific limits for expensive operations
  endpoint: {
    '/api/leads/generate': [
      { window: 60, maxRequests: 5, tier: 'endpoint' }, // 5 lead generations per minute
      { window: 3600, maxRequests: 20, tier: 'endpoint' }, // 20 per hour
    ],
    '/api/leads/import': [
      { window: 60, maxRequests: 2, tier: 'endpoint' }, // 2 imports per minute
      { window: 3600, maxRequests: 10, tier: 'endpoint' }, // 10 per hour
    ],
    '/api/campaigns/email/send': [
      { window: 60, maxRequests: 10, tier: 'endpoint' }, // 10 email sends per minute
      { window: 3600, maxRequests: 100, tier: 'endpoint' }, // 100 per hour
    ],
    '/api/campaigns/sms/send': [
      { window: 60, maxRequests: 5, tier: 'endpoint' }, // 5 SMS sends per minute
      { window: 3600, maxRequests: 50, tier: 'endpoint' }, // 50 per hour
    ],
  },
}

export function getRateLimitsForUser(subscriptionPlan: string): RateLimit[] {
  return RATE_LIMIT_CONFIG.user[subscriptionPlan] || RATE_LIMIT_CONFIG.user.free
}

export function getRateLimitsForEndpoint(endpoint: string): RateLimit[] {
  return RATE_LIMIT_CONFIG.endpoint[endpoint] || []
}