import { NextRequest } from 'next/server'
import { rateLimiter } from '@/lib/rate-limiting/rate-limiter'
import { getRateLimitsForUser, RATE_LIMIT_CONFIG } from '@/lib/rate-limiting/config'
import { getClientIP } from '@/lib/rate-limiting/middleware'
import { createApiHandler } from '@/lib/api/handler-wrapper'

async function rateLimitUsageHandler(request: NextRequest, context: any) {
  // Get user information (in a real app, this would come from authentication)
  const userId = request.headers.get('x-user-id')
  const subscriptionPlan = request.headers.get('x-subscription-plan') || 'free'
  const ipAddress = getClientIP(request)
  
  const usage = {
    global: await rateLimiter.getUsage('global', RATE_LIMIT_CONFIG.global),
    ip: await rateLimiter.getUsage(ipAddress, RATE_LIMIT_CONFIG.ip),
    user: userId ? await rateLimiter.getUsage(userId, getRateLimitsForUser(subscriptionPlan)) : null,
  }
  
  return usage
}

export const GET = createApiHandler(rateLimitUsageHandler, {
  rateLimit: false // Don't rate limit the rate limit usage endpoint
})