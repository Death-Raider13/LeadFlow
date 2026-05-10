import { NextRequest, NextResponse } from "next/server"
import { enhancedAuth } from "@/lib/auth/enhanced-auth"
import { getServerUser } from "@/lib/firebase/server-auth"

// Get session information
export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Get user's active sessions
    const activeSessions = enhancedAuth.getActiveSessions(user.uid)
    
    // Get recent audit logs for the user
    const auditLogs = enhancedAuth.getAuditLogs(user.uid).slice(-10) // Last 10 events
    
    return NextResponse.json({
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email
      },
      activeSessions: activeSessions.map(session => ({
        sessionId: session.sessionId,
        createdAt: session.createdAt,
        lastAccessed: session.lastAccessed,
        ipAddress: session.metadata.ipAddress,
        userAgent: session.metadata.userAgent
      })),
      recentActivity: auditLogs.map(log => ({
        action: log.action,
        timestamp: log.metadata.timestamp,
        success: log.success,
        ipAddress: log.metadata.ipAddress
      }))
    })
    
  } catch (error) {
    console.error("Session management error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Revoke a specific session
export async function DELETE(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { sessionId } = await request.json()
    
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      )
    }
    
    // Verify the session belongs to the user
    const userSessions = enhancedAuth.getActiveSessions(user.uid)
    const sessionExists = userSessions.some(s => s.sessionId === sessionId)
    
    if (!sessionExists) {
      return NextResponse.json(
        { error: "Session not found or unauthorized" },
        { status: 404 }
      )
    }
    
    // Revoke the session
    await enhancedAuth.revokeSession(sessionId)
    
    return NextResponse.json({
      success: true,
      message: "Session revoked successfully"
    })
    
  } catch (error) {
    console.error("Session revocation error:", error)
    return NextResponse.json(
      { error: "Failed to revoke session" },
      { status: 500 }
    )
  }
}

// Refresh current session
export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { refreshToken } = await request.json()
    
    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 400 }
      )
    }
    
    // Get client information for audit logging
    const ipAddress = request.headers.get("x-forwarded-for") || 
                     request.headers.get("x-real-ip") || 
                     request.ip || 
                     "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    
    // Refresh the token
    const tokenPair = await enhancedAuth.refreshToken(refreshToken)
    
    // Set new session cookie
    const response = NextResponse.json({
      success: true,
      expiresAt: tokenPair.expiresAt,
      sessionId: tokenPair.sessionId
    })
    
    response.cookies.set("firebaseSession", tokenPair.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: tokenPair.expiresAt
    })
    
    return response
    
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    )
  }
}