import { NextResponse } from 'next/server'
import crypto from 'crypto'

export interface SecureCookieOptions {
  name: string
  value: string
  maxAge?: number
  expires?: Date
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  path?: string
  domain?: string
  signed?: boolean
  priority?: 'low' | 'medium' | 'high'
}

export interface CookieValidationResult {
  isValid: boolean
  value?: string
  error?: string
}

export class SecureCookieManager {
  private static readonly COOKIE_SECRET = process.env.COOKIE_SECRET || 'default-secret-change-in-production'
  private static readonly SESSION_COOKIE_NAME = 'firebaseSession'
  private static readonly CSRF_COOKIE_NAME = 'csrf-token'
  
  /**
   * Get secure cookie configuration based on environment
   */
  static getSecureConfig(isProduction: boolean = process.env.NODE_ENV === 'production'): Partial<SecureCookieOptions> {
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      path: '/',
      priority: 'high',
    }
  }

  /**
   * Create a secure session cookie
   */
  static createSessionCookie(
    response: NextResponse,
    sessionToken: string,
    maxAge: number = 60 * 60 * 24 * 14 // 14 days
  ): NextResponse {
    const config = this.getSecureConfig()
    
    // Sign the cookie value for integrity
    const signedValue = this.signCookieValue(sessionToken)
    
    response.cookies.set(this.SESSION_COOKIE_NAME, signedValue, {
      ...config,
      maxAge,
    })

    // Set additional security headers
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    
    return response
  }

  /**
   * Create a CSRF protection cookie
   */
  static createCSRFCookie(response: NextResponse): { response: NextResponse; csrfToken: string } {
    const config = this.getSecureConfig()
    const csrfToken = crypto.randomBytes(32).toString('hex')
    
    response.cookies.set(this.CSRF_COOKIE_NAME, csrfToken, {
      ...config,
      httpOnly: false, // CSRF token needs to be accessible to client-side JavaScript
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return { response, csrfToken }
  }

  /**
   * Clear session cookie securely
   */
  static clearSessionCookie(response: NextResponse): NextResponse {
    const config = this.getSecureConfig()
    
    response.cookies.set(this.SESSION_COOKIE_NAME, '', {
      ...config,
      maxAge: 0,
      expires: new Date(0),
    })

    return response
  }

  /**
   * Clear all authentication cookies
   */
  static clearAllAuthCookies(response: NextResponse): NextResponse {
    const config = this.getSecureConfig()
    
    const cookiesToClear = [
      this.SESSION_COOKIE_NAME,
      this.CSRF_COOKIE_NAME,
      'auth-token',
      'refresh-token',
    ]

    cookiesToClear.forEach(cookieName => {
      response.cookies.set(cookieName, '', {
        ...config,
        maxAge: 0,
        expires: new Date(0),
      })
    })

    return response
  }

  /**
   * Validate cookie integrity
   */
  static validateCookie(cookieValue: string | undefined): CookieValidationResult {
    if (!cookieValue) {
      return {
        isValid: false,
        error: 'Cookie value is missing',
      }
    }

    try {
      // Check if cookie is signed
      if (cookieValue.startsWith('s:')) {
        const unsignedValue = this.unsignCookieValue(cookieValue)
        if (!unsignedValue) {
          return {
            isValid: false,
            error: 'Cookie signature is invalid',
          }
        }
        
        return {
          isValid: true,
          value: unsignedValue,
        }
      }

      // For unsigned cookies, return as-is but mark as potentially insecure
      return {
        isValid: true,
        value: cookieValue,
      }
    } catch (error) {
      return {
        isValid: false,
        error: `Cookie validation failed: ${error instanceof Error ? error.message : String(error)}`,
      }
    }
  }

  /**
   * Sign cookie value for integrity protection
   */
  private static signCookieValue(value: string): string {
    const signature = crypto
      .createHmac('sha256', this.COOKIE_SECRET)
      .update(value)
      .digest('base64')
      .replace(/=+$/, '')

    return `s:${value}.${signature}`
  }

  /**
   * Unsign and validate cookie value
   */
  private static unsignCookieValue(signedValue: string): string | null {
    if (!signedValue.startsWith('s:')) {
      return null
    }

    const value = signedValue.slice(2)
    const lastDotIndex = value.lastIndexOf('.')
    
    if (lastDotIndex === -1) {
      return null
    }

    const originalValue = value.slice(0, lastDotIndex)
    const signature = value.slice(lastDotIndex + 1)

    const expectedSignature = crypto
      .createHmac('sha256', this.COOKIE_SECRET)
      .update(originalValue)
      .digest('base64')
      .replace(/=+$/, '')

    // Use timing-safe comparison
    if (this.timingSafeEqual(signature, expectedSignature)) {
      return originalValue
    }

    return null
  }

  /**
   * Timing-safe string comparison
   */
  private static timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false
    }

    let result = 0
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i)
    }

    return result === 0
  }

  /**
   * Check if cookie configuration is secure
   */
  static validateCookieConfig(options: SecureCookieOptions): { isSecure: boolean; warnings: string[] } {
    const warnings: string[] = []
    let isSecure = true

    // Check for production security requirements
    if (process.env.NODE_ENV === 'production') {
      if (!options.secure) {
        warnings.push('Cookie should have secure flag in production')
        isSecure = false
      }

      if (options.sameSite !== 'strict' && options.sameSite !== 'lax') {
        warnings.push('Cookie should have sameSite attribute in production')
        isSecure = false
      }

      if (!options.httpOnly && options.name.includes('session')) {
        warnings.push('Session cookies should be httpOnly')
        isSecure = false
      }
    }

    // Check for general security best practices
    if (!options.path) {
      warnings.push('Cookie should have explicit path')
    }

    if (options.maxAge && options.maxAge > 60 * 60 * 24 * 30) {
      warnings.push('Cookie maxAge is longer than 30 days, consider shorter duration')
    }

    return { isSecure, warnings }
  }

  /**
   * Get cookie security headers
   */
  static getSecurityHeaders(): Record<string, string> {
    return {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    }
  }

  /**
   * Apply security headers to response
   */
  static applySecurityHeaders(response: NextResponse): NextResponse {
    const headers = this.getSecurityHeaders()
    
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  }
}