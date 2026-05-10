import { firebaseAdminAuth } from "@/lib/firebase/admin"
import { getConfig } from "@/lib/config"
import crypto from "crypto"

// Enhanced authentication interfaces
export interface AuthResult {
  user: AuthUser | null
  isValid: boolean
  expiresAt: Date
  permissions: Permission[]
  sessionId: string
}

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  emailVerified: boolean
  customClaims?: Record<string, any>
}

export interface Permission {
  resource: string
  action: string
  granted: boolean
}

export interface LoginMetadata {
  ipAddress: string
  userAgent: string
  timestamp: Date
  sessionId: string
  loginMethod: "email" | "oauth" | "token"
}

export interface SessionAuditLog {
  sessionId: string
  userId: string
  action: "login" | "logout" | "refresh" | "revoke" | "access"
  metadata: LoginMetadata
  success: boolean
  errorMessage?: string
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
  expiresAt: Date
  sessionId: string
}

// Enhanced Authentication System
export class EnhancedAuthSystem {
  private static instance: EnhancedAuthSystem | null = null
  private auditLogs: SessionAuditLog[] = []
  private activeSessions = new Map<string, {
    userId: string
    createdAt: Date
    lastAccessed: Date
    metadata: LoginMetadata
  }>()
  
  static getInstance(): EnhancedAuthSystem {
    if (!EnhancedAuthSystem.instance) {
      EnhancedAuthSystem.instance = new EnhancedAuthSystem()
    }
    return EnhancedAuthSystem.instance
  }
  
  // Validate session with enhanced integrity checking
  async validateSession(token: string): Promise<AuthResult> {
    const sessionId = this.generateSessionId()
    
    try {
      // Verify token integrity and expiration
      const decodedToken = await firebaseAdminAuth.verifySessionCookie(token, true)
      
      // Check if token is expired
      const now = Date.now() / 1000
      if (decodedToken.exp <= now) {
        return {
          user: null,
          isValid: false,
          expiresAt: new Date(decodedToken.exp * 1000),
          permissions: [],
          sessionId
        }
      }
      
      // Get user permissions
      const permissions = await this.getUserPermissions(decodedToken.uid)
      
      // Update session tracking
      this.updateSessionAccess(sessionId, decodedToken.uid)
      
      return {
        user: {
          uid: decodedToken.uid,
          email: decodedToken.email || null,
          displayName: decodedToken.name || null,
          emailVerified: decodedToken.email_verified || false,
          customClaims: decodedToken
        },
        isValid: true,
        expiresAt: new Date(decodedToken.exp * 1000),
        permissions,
        sessionId
      }
      
    } catch (error) {
      // Log failed validation attempt
      this.logAuditEvent({
        sessionId,
        userId: "unknown",
        action: "access",
        metadata: {
          ipAddress: "unknown",
          userAgent: "unknown",
          timestamp: new Date(),
          sessionId,
          loginMethod: "token"
        },
        success: false,
        errorMessage: error instanceof Error ? error.message : String(error)
      })
      
      return {
        user: null,
        isValid: false,
        expiresAt: new Date(),
        permissions: [],
        sessionId
      }
    }
  }
  
  // Refresh token with validation
  async refreshToken(refreshToken: string): Promise<TokenPair> {
    const sessionId = this.generateSessionId()
    
    try {
      // Verify the refresh token
      const decodedToken = await firebaseAdminAuth.verifyIdToken(refreshToken)
      
      // Create new session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
      const sessionCookie = await firebaseAdminAuth.createSessionCookie(refreshToken, { expiresIn })
      
      const expiresAt = new Date(Date.now() + expiresIn)
      
      // Log successful refresh
      this.logAuditEvent({
        sessionId,
        userId: decodedToken.uid,
        action: "refresh",
        metadata: {
          ipAddress: "unknown", // Should be passed from request
          userAgent: "unknown", // Should be passed from request
          timestamp: new Date(),
          sessionId,
          loginMethod: "token"
        },
        success: true
      })
      
      return {
        accessToken: sessionCookie,
        refreshToken: refreshToken, // In production, generate new refresh token
        expiresAt,
        sessionId
      }
      
    } catch (error) {
      this.logAuditEvent({
        sessionId,
        userId: "unknown",
        action: "refresh",
        metadata: {
          ipAddress: "unknown",
          userAgent: "unknown",
          timestamp: new Date(),
          sessionId,
          loginMethod: "token"
        },
        success: false,
        errorMessage: error instanceof Error ? error.message : String(error)
      })
      
      throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  // Revoke session
  async revokeSession(sessionId: string): Promise<void> {
    try {
      const session = this.activeSessions.get(sessionId)
      
      if (session) {
        // Revoke all refresh tokens for the user
        await firebaseAdminAuth.revokeRefreshTokens(session.userId)
        
        // Remove from active sessions
        this.activeSessions.delete(sessionId)
        
        // Log revocation
        this.logAuditEvent({
          sessionId,
          userId: session.userId,
          action: "revoke",
          metadata: session.metadata,
          success: true
        })
      }
      
    } catch (error) {
      this.logAuditEvent({
        sessionId,
        userId: "unknown",
        action: "revoke",
        metadata: {
          ipAddress: "unknown",
          userAgent: "unknown",
          timestamp: new Date(),
          sessionId,
          loginMethod: "token"
        },
        success: false,
        errorMessage: error instanceof Error ? error.message : String(error)
      })
      
      throw error
    }
  }
  
  // Audit login with metadata
  async auditLogin(userId: string, metadata: LoginMetadata): Promise<void> {
    // Store session information
    this.activeSessions.set(metadata.sessionId, {
      userId,
      createdAt: metadata.timestamp,
      lastAccessed: metadata.timestamp,
      metadata
    })
    
    // Log login event
    this.logAuditEvent({
      sessionId: metadata.sessionId,
      userId,
      action: "login",
      metadata,
      success: true
    })
  }
  
  // Get user permissions (placeholder implementation)
  private async getUserPermissions(userId: string): Promise<Permission[]> {
    // In a real implementation, this would fetch from database
    // For now, return basic permissions
    return [
      { resource: "leads", action: "read", granted: true },
      { resource: "leads", action: "write", granted: true },
      { resource: "campaigns", action: "read", granted: true },
      { resource: "campaigns", action: "write", granted: true },
    ]
  }
  
  // Generate unique session ID
  private generateSessionId(): string {
    return crypto.randomBytes(32).toString("hex")
  }
  
  // Update session access time
  private updateSessionAccess(sessionId: string, userId: string): void {
    const session = this.activeSessions.get(sessionId)
    if (session) {
      session.lastAccessed = new Date()
    }
  }
  
  // Log audit events
  private logAuditEvent(event: SessionAuditLog): void {
    this.auditLogs.push(event)
    
    // In production, this should write to a persistent audit log
    console.log(`[AUTH AUDIT] ${event.action.toUpperCase()} - User: ${event.userId}, Session: ${event.sessionId}, Success: ${event.success}`)
    
    // Keep only last 1000 audit logs in memory
    if (this.auditLogs.length > 1000) {
      this.auditLogs = this.auditLogs.slice(-1000)
    }
  }
  
  // Get audit logs for a user
  getAuditLogs(userId?: string): SessionAuditLog[] {
    if (userId) {
      return this.auditLogs.filter(log => log.userId === userId)
    }
    return [...this.auditLogs]
  }
  
  // Get active sessions
  getActiveSessions(userId?: string): Array<{
    sessionId: string
    userId: string
    createdAt: Date
    lastAccessed: Date
    metadata: LoginMetadata
  }> {
    const sessions = Array.from(this.activeSessions.entries()).map(([sessionId, session]) => ({
      sessionId,
      ...session
    }))
    
    if (userId) {
      return sessions.filter(session => session.userId === userId)
    }
    
    return sessions
  }
  
  // Clean up expired sessions
  cleanupExpiredSessions(): void {
    const now = new Date()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    
    for (const [sessionId, session] of this.activeSessions.entries()) {
      if (now.getTime() - session.lastAccessed.getTime() > maxAge) {
        this.activeSessions.delete(sessionId)
        
        this.logAuditEvent({
          sessionId,
          userId: session.userId,
          action: "logout",
          metadata: session.metadata,
          success: true
        })
      }
    }
  }
}

// Export singleton instance
export const enhancedAuth = EnhancedAuthSystem.getInstance()

// Enhanced session validation middleware helper
export async function validateSessionWithAudit(
  token: string,
  ipAddress: string,
  userAgent: string
): Promise<AuthResult> {
  const result = await enhancedAuth.validateSession(token)
  
  if (result.isValid && result.user) {
    // Log successful access
    await enhancedAuth.auditLogin(result.user.uid, {
      ipAddress,
      userAgent,
      timestamp: new Date(),
      sessionId: result.sessionId,
      loginMethod: "token"
    })
  }
  
  return result
}