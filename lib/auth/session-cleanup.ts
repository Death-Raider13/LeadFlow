import { enhancedAuth } from "./enhanced-auth"

// Session cleanup service
export class SessionCleanupService {
  private static instance: SessionCleanupService | null = null
  private cleanupInterval: NodeJS.Timeout | null = null
  private isRunning = false
  
  static getInstance(): SessionCleanupService {
    if (!SessionCleanupService.instance) {
      SessionCleanupService.instance = new SessionCleanupService()
    }
    return SessionCleanupService.instance
  }
  
  // Start automatic session cleanup
  startCleanup(intervalMinutes = 60): void {
    if (this.isRunning) {
      console.warn("Session cleanup is already running")
      return
    }
    
    this.isRunning = true
    const intervalMs = intervalMinutes * 60 * 1000
    
    console.log(`Starting session cleanup service (interval: ${intervalMinutes} minutes)`)
    
    // Run cleanup immediately
    this.performCleanup()
    
    // Schedule periodic cleanup
    this.cleanupInterval = setInterval(() => {
      this.performCleanup()
    }, intervalMs)
  }
  
  // Stop automatic session cleanup
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.isRunning = false
    console.log("Session cleanup service stopped")
  }
  
  // Perform manual cleanup
  performCleanup(): void {
    try {
      const beforeCount = enhancedAuth.getActiveSessions().length
      enhancedAuth.cleanupExpiredSessions()
      const afterCount = enhancedAuth.getActiveSessions().length
      const cleanedCount = beforeCount - afterCount
      
      if (cleanedCount > 0) {
        console.log(`Session cleanup: removed ${cleanedCount} expired sessions`)
      }
      
    } catch (error) {
      console.error("Session cleanup error:", error)
    }
  }
  
  // Get cleanup status
  getStatus(): {
    isRunning: boolean
    activeSessions: number
    totalAuditLogs: number
  } {
    return {
      isRunning: this.isRunning,
      activeSessions: enhancedAuth.getActiveSessions().length,
      totalAuditLogs: enhancedAuth.getAuditLogs().length
    }
  }
}

// Export singleton instance
export const sessionCleanup = SessionCleanupService.getInstance()

// Auto-start cleanup in production
if (process.env.NODE_ENV === "production") {
  sessionCleanup.startCleanup(30) // Every 30 minutes in production
}