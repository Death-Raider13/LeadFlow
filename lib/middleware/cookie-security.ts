import { NextRequest, NextResponse } from 'next/server'
import { SecureCookieManager } from '@/lib/security/cookie-config'

/**
 * Middleware to enforce secure cookie policies
 */
export async function cookieSecurityMiddleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next()
  
  // Apply security headers to all responses
  SecureCookieManager.applySecurityHeaders(response)
  
  // Validate existing cookies for security compliance
  const cookieValidationErrors: string[] = []
  
  for (const [name, cookie] of request.cookies) {
    // Check if session cookies are properly secured
    if (name.includes('session') || name.includes('auth')) {
      const validation = SecureCookieManager.validateCookieConfig({
        name: name,
        value: cookie.value,
        httpOnly: true, // We can't check this from the cookie itself
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      })
      
      if (!validation.isSecure) {
        cookieValidationErrors.push(...validation.warnings)
      }
    }
  }
  
  // Log security warnings (in production, you might want to send these to monitoring)
  if (cookieValidationErrors.length > 0) {
    console.warn('Cookie security warnings:', cookieValidationErrors)
  }
  
  // Check for suspicious cookie patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /eval\(/i,
    /document\./i,
  ]
  
  let hasSuspiciousCookies = false
  for (const [name, cookie] of request.cookies) {
    if (suspiciousPatterns.some(pattern => pattern.test(cookie.value))) {
      hasSuspiciousCookies = true
      console.warn(`Suspicious cookie detected: ${name}`)
    }
  }
  
  // If suspicious cookies are detected, clear them and return error
  if (hasSuspiciousCookies) {
    const errorResponse = NextResponse.json(
      { error: 'Security violation detected' },
      { status: 400 }
    )
    
    // Clear all cookies as a security measure
    SecureCookieManager.clearAllAuthCookies(errorResponse)
    SecureCookieManager.applySecurityHeaders(errorResponse)
    
    return errorResponse
  }
  
  return response
}

/**
 * Check if request has valid CSRF protection
 */
export function validateCSRFProtection(request: NextRequest): boolean {
  // Skip CSRF check for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return true
  }
  
  const csrfToken = request.cookies.get('csrf-token')?.value
  const csrfHeader = request.headers.get('x-csrf-token')
  
  if (!csrfToken || !csrfHeader) {
    return false
  }
  
  // Validate CSRF token matches
  return csrfToken === csrfHeader
}

/**
 * Middleware to add CSRF protection
 */
export function addCSRFProtection(response: NextResponse): NextResponse {
  const { response: updatedResponse } = SecureCookieManager.createCSRFCookie(response)
  return updatedResponse
}

/**
 * Check for cookie injection attempts
 */
export function detectCookieInjection(request: NextRequest): boolean {
  const injectionPatterns = [
    /Set-Cookie:/i,
    /\r\n/,
    /\n/,
    /\r/,
    /%0d%0a/i,
    /%0a/i,
    /%0d/i,
  ]
  
  // Check all cookie values for injection patterns
  for (const [name, cookie] of request.cookies) {
    if (injectionPatterns.some(pattern => pattern.test(cookie.value))) {
      return true
    }
  }
  
  // Check headers for cookie injection
  const userAgent = request.headers.get('user-agent') || ''
  const referer = request.headers.get('referer') || ''
  
  return injectionPatterns.some(pattern => 
    pattern.test(userAgent) || pattern.test(referer)
  )
}

/**
 * Comprehensive cookie security check
 */
export async function comprehensiveCookieSecurityCheck(request: NextRequest): Promise<NextResponse | null> {
  // Check for cookie injection
  if (detectCookieInjection(request)) {
    console.warn('Cookie injection attempt detected')
    return NextResponse.json(
      { error: 'Security violation: Cookie injection detected' },
      { status: 400 }
    )
  }
  
  // Validate CSRF for state-changing requests
  if (!validateCSRFProtection(request)) {
    console.warn('CSRF validation failed')
    return NextResponse.json(
      { error: 'CSRF validation failed' },
      { status: 403 }
    )
  }
  
  // Apply cookie security middleware
  return await cookieSecurityMiddleware(request)
}