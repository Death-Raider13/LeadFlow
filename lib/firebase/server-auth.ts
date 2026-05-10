import { cookies, headers } from "next/headers"
import { enhancedAuth, validateSessionWithAudit } from "@/lib/auth/enhanced-auth"
import { SecureCookieManager } from "@/lib/security/cookie-config"

const SESSION_COOKIE_NAME = "firebaseSession"

export async function getServerUser() {
  const cookieStore = await cookies()
  const headersList = await headers()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!sessionCookie) {
    return null
  }

  try {
    // Validate cookie integrity first
    const cookieValidation = SecureCookieManager.validateCookie(sessionCookie)
    if (!cookieValidation.isValid) {
      console.warn("Invalid cookie detected:", cookieValidation.error)
      return null
    }

    const validatedCookieValue = cookieValidation.value || sessionCookie

    // Get client IP and user agent for audit logging
    const ipAddress = headersList.get("x-forwarded-for") || 
                     headersList.get("x-real-ip") || 
                     "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"
    
    // Use enhanced authentication with audit logging
    const authResult = await validateSessionWithAudit(
      validatedCookieValue,
      ipAddress,
      userAgent
    )
    
    return authResult.isValid ? authResult.user : null
    
  } catch (error) {
    console.error("Enhanced authentication error:", error)
    return null
  }
}

// Enhanced session management
export async function createEnhancedSession(
  idToken: string,
  ipAddress: string,
  userAgent: string
): Promise<{ sessionCookie: string; expiresAt: Date }> {
  try {
    // Create session cookie with enhanced tracking
    const tokenPair = await enhancedAuth.refreshToken(idToken)
    
    return {
      sessionCookie: tokenPair.accessToken,
      expiresAt: tokenPair.expiresAt
    }
    
  } catch (error) {
    throw new Error(`Failed to create enhanced session: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Revoke session with audit logging
export async function revokeEnhancedSession(sessionId: string): Promise<void> {
  try {
    await enhancedAuth.revokeSession(sessionId)
  } catch (error) {
    console.error("Failed to revoke session:", error)
    throw error
  }
}

export { SESSION_COOKIE_NAME }
