import { NextRequest, NextResponse } from 'next/server'
import { rateLimiter } from './rate-limiter'
import { RATE_LIMIT_CONFIG, getRateLimitsForUser, getRateLimitsForEndpoint } from './config'
import { RateLimit } from './types'

interface RateLimitContext {
  userId?: string
  subscriptionPlan?: string
  ipAddress: string
  endpoint: string
}

export async function rateLimitMiddleware(
  request: NextRequest,
  context: RateLimitContext
): Promise<NextResponse | null> {
  const { userId, subscriptionPlan, ipAddress, endpoint } = context
  
  try {
    // Collect all applicable rate limits
    const allLimits: { identifier: string; limits: RateLimit[] }[] = []
    
    // Global limits
    allLimits.push({
      identifier: 'global',
      limits: RATE_LIMIT_CONFIG.global,
    })
    
    // IP-based limits
    allLimits.push({
      identifier: ipAddress,
      limits: RATE_LIMIT_CONFIG.ip,
    })
    
    // User-based limits (if authenticated)
    if (userId && subscriptionPlan) {
      allLimits.push({
        identifier: userId,
        limits: getRateLimitsForUser(subscriptionPlan),
      })
    }
    
    // Endpoint-specific limits
    const endpointLimits = getRateLimitsForEndpoint(endpoint)
    if (endpointLimits.length > 0) {
      allLimits.push({
        identifier: `${endpoint}:${userId || ipAddress}`,
        limits: endpointLimits,
      })
    }
    
    // Check all limits
    for (const { identifier, limits } of allLimits) {
      const result = await rateLimiter.checkLimit(identifier, limits)
      
      if (!result.allowed) {
        // Rate limit exceeded
        const response = NextResponse.json(
          {
            error: {
              code: 'RATE_LIMIT_EXCEEDED',
              message: 'Rate limit exceeded. Please try again later.',
              details: {
                remaining: result.remaining,
                resetTime: result.resetTime.toISOString(),
                retryAfter: result.retryAfter,
              },
            },
          },
          { status: 429 }
        )
        
        // Add rate limit headers
        response.headers.set('X-RateLimit-Limit', limits[0]?.maxRequests.toString() || '0')
        response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
        response.headers.set('X-RateLimit-Reset', Math.floor(result.resetTime.getTime() / 1000).toString())
        
        if (result.retryAfter) {
          response.headers.set('Retry-After', result.retryAfter.toString())
        }
        
        return response
      }
    }
    
    // All limits passed, increment counters
    for (const { identifier, limits } of allLimits) {
      await rateLimiter.incrementCounter(identifier, limits)
    }
    
    return null // Continue to next middleware/handler
  } catch (error) {
    console.error('Rate limiting error:', error)
    // On error, allow the request to continue (fail open)
    return null
  }
}

export function getClientIP(request: NextRequest): string {
  // Try to get real IP from various headers (for production behind proxies)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  
  // Fallback to request IP (Next.js doesn't have request.ip in edge runtime)
  return '127.0.0.1'
}