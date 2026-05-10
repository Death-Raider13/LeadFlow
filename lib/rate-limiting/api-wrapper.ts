import { NextRequest, NextResponse } from 'next/server'
import { rateLimitMiddleware, getClientIP } from './middleware'
import { Profile } from '@/lib/types'

interface ApiHandlerOptions {
  requireAuth?: boolean
  endpoint?: string
}

type ApiHandler = (
  request: NextRequest,
  context: { params?: any; user?: Profile }
) => Promise<NextResponse>

export function withRateLimit(
  handler: ApiHandler,
  options: ApiHandlerOptions = {}
) {
  return async function rateLimitedHandler(
    request: NextRequest,
    context: { params?: any } = {}
  ): Promise<NextResponse> {
    try {
      // Extract user information if available
      let user: Profile | undefined
      let userId: string | undefined
      let subscriptionPlan: string | undefined
      
      // Try to get user from session (this would need to be implemented based on your auth system)
      // For now, we'll extract from headers or cookies if available
      const sessionCookie = request.cookies.get('firebaseSession')?.value
      if (sessionCookie) {
        // In a real implementation, you'd decode the session and get user info
        // For now, we'll use a placeholder
        const userIdHeader = request.headers.get('x-user-id')
        const planHeader = request.headers.get('x-subscription-plan')
        
        if (userIdHeader) {
          userId = userIdHeader
          subscriptionPlan = planHeader || 'free'
        }
      }
      
      // Get client IP and endpoint
      const ipAddress = getClientIP(request)
      const endpoint = options.endpoint || request.nextUrl.pathname
      
      // Apply rate limiting
      const rateLimitResponse = await rateLimitMiddleware(request, {
        userId,
        subscriptionPlan,
        ipAddress,
        endpoint,
      })
      
      if (rateLimitResponse) {
        return rateLimitResponse
      }
      
      // Rate limiting passed, call the original handler
      return await handler(request, { ...context, user })
    } catch (error) {
      console.error('Rate limit wrapper error:', error)
      
      // On error, return a generic error response
      return NextResponse.json(
        {
          error: {
            code: 'INTERNAL_ERROR',
            message: 'An internal error occurred',
          },
        },
        { status: 500 }
      )
    }
  }
}

// Helper function to add rate limit headers to successful responses
export function addRateLimitHeaders(
  response: NextResponse,
  remaining: number,
  resetTime: Date,
  limit: number
): NextResponse {
  response.headers.set('X-RateLimit-Limit', limit.toString())
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  response.headers.set('X-RateLimit-Reset', Math.floor(resetTime.getTime() / 1000).toString())
  
  return response
}