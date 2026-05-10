import { SuspiciousActivityPattern, ActivityTracker } from './types'

export class SuspiciousActivityDetector {
  private activityMap = new Map<string, ActivityTracker>()
  private patterns: SuspiciousActivityPattern[]

  constructor(patterns?: SuspiciousActivityPattern[]) {
    this.patterns = patterns || this.getDefaultPatterns()
  }

  /**
   * Check if an operation should be blocked due to suspicious activity
   */
  checkActivity(
    userId: string,
    operationType: string,
    metadata?: Record<string, any>
  ): { blocked: boolean; reason?: string; blockUntil?: Date } {
    const key = `${userId}:${operationType}`
    const now = new Date()
    
    // Get or create activity tracker
    const tracker = this.getOrCreateTracker(key, userId, operationType, now)

    // Check if currently blocked
    if (tracker.isBlocked && tracker.blockUntil && now < tracker.blockUntil) {
      return {
        blocked: true,
        reason: `Blocked due to suspicious activity: ${tracker.violations.join(', ')}`,
        blockUntil: tracker.blockUntil,
      }
    }

    // Reset block if expired
    if (tracker.isBlocked && tracker.blockUntil && now >= tracker.blockUntil) {
      tracker.isBlocked = false
      tracker.blockUntil = undefined
      tracker.violations = []
      tracker.count = 0
      tracker.windowStart = now
    }

    // Check patterns
    for (const pattern of this.patterns) {
      const violation = this.checkPattern(tracker, pattern, now, metadata)
      if (violation) {
        tracker.violations.push(violation.reason)
        tracker.isBlocked = true
        tracker.blockUntil = new Date(now.getTime() + pattern.blockDurationMs)

        console.warn(`Suspicious activity detected for ${userId}:${operationType}: ${violation.reason}`)

        return {
          blocked: true,
          reason: violation.reason,
          blockUntil: tracker.blockUntil,
        }
      }
    }

    return { blocked: false }
  }

  /**
   * Record an operation
   */
  recordActivity(
    userId: string,
    operationType: string,
    success: boolean,
    metadata?: Record<string, any>
  ): void {
    const key = `${userId}:${operationType}`
    const now = new Date()
    
    const tracker = this.getOrCreateTracker(key, userId, operationType, now)

    // Reset window if expired
    const oldestPattern = Math.max(...this.patterns.map(p => p.windowMs))
    if (now.getTime() - tracker.windowStart.getTime() > oldestPattern) {
      tracker.count = 0
      tracker.windowStart = now
    }

    tracker.count++
    tracker.lastActivity = now

    // Track failed operations separately
    if (!success) {
      const failedKey = `${key}:failed`
      const failedTracker = this.getOrCreateTracker(failedKey, userId, `${operationType}:failed`, now)
      failedTracker.count++
      failedTracker.lastActivity = now
    }
  }

  /**
   * Get activity statistics for a user
   */
  getUserActivity(userId: string): ActivityTracker[] {
    const userTrackers: ActivityTracker[] = []
    
    for (const [key, tracker] of this.activityMap.entries()) {
      if (tracker.userId === userId) {
        userTrackers.push({ ...tracker })
      }
    }

    return userTrackers
  }

  /**
   * Manually block a user
   */
  blockUser(
    userId: string,
    operationType: string,
    reason: string,
    durationMs: number
  ): void {
    const key = `${userId}:${operationType}`
    const now = new Date()
    
    const tracker = this.getOrCreateTracker(key, userId, operationType, now)
    tracker.isBlocked = true
    tracker.blockUntil = new Date(now.getTime() + durationMs)
    tracker.violations.push(reason)

    console.warn(`Manually blocked ${userId}:${operationType}: ${reason}`)
  }

  /**
   * Unblock a user
   */
  unblockUser(userId: string, operationType: string): void {
    const key = `${userId}:${operationType}`
    const tracker = this.activityMap.get(key)
    
    if (tracker) {
      tracker.isBlocked = false
      tracker.blockUntil = undefined
      tracker.violations = []
      console.log(`Unblocked ${userId}:${operationType}`)
    }
  }

  /**
   * Get all blocked users
   */
  getBlockedUsers(): ActivityTracker[] {
    const now = new Date()
    const blocked: ActivityTracker[] = []

    for (const tracker of this.activityMap.values()) {
      if (tracker.isBlocked && tracker.blockUntil && now < tracker.blockUntil) {
        blocked.push({ ...tracker })
      }
    }

    return blocked
  }

  /**
   * Check a specific pattern against activity
   */
  private checkPattern(
    tracker: ActivityTracker,
    pattern: SuspiciousActivityPattern,
    now: Date,
    metadata?: Record<string, any>
  ): { reason: string } | null {
    // Check if we're within the pattern window
    if (now.getTime() - tracker.windowStart.getTime() > pattern.windowMs) {
      return null
    }

    switch (pattern.type) {
      case 'high_frequency':
        if (tracker.count > pattern.threshold) {
          return {
            reason: `High frequency activity: ${tracker.count} operations in ${pattern.windowMs}ms (threshold: ${pattern.threshold})`,
          }
        }
        break

      case 'failed_operations':
        const failedKey = `${tracker.userId}:${tracker.operationType}:failed`
        const failedTracker = this.activityMap.get(failedKey)
        if (failedTracker && failedTracker.count > pattern.threshold) {
          return {
            reason: `Too many failed operations: ${failedTracker.count} failures in ${pattern.windowMs}ms (threshold: ${pattern.threshold})`,
          }
        }
        break

      case 'unusual_pattern':
        // Check for unusual patterns in metadata
        if (metadata && this.detectUnusualPattern(tracker, metadata)) {
          return {
            reason: 'Unusual activity pattern detected',
          }
        }
        break

      case 'resource_abuse':
        // Check for resource abuse patterns
        if (this.detectResourceAbuse(tracker, metadata)) {
          return {
            reason: 'Resource abuse detected',
          }
        }
        break
    }

    return null
  }

  /**
   * Detect unusual patterns in activity
   */
  private detectUnusualPattern(
    tracker: ActivityTracker,
    metadata: Record<string, any>
  ): boolean {
    // Example: Check for identical requests
    if (metadata.requestSignature) {
      // In a real implementation, you'd track request signatures
      // and detect if the same request is being made repeatedly
    }

    // Example: Check for rapid sequential operations
    const timeSinceLastActivity = Date.now() - tracker.lastActivity.getTime()
    if (timeSinceLastActivity < 100 && tracker.count > 5) {
      return true // Too fast, likely automated
    }

    return false
  }

  /**
   * Detect resource abuse
   */
  private detectResourceAbuse(
    tracker: ActivityTracker,
    metadata?: Record<string, any>
  ): boolean {
    // Example: Check for large payload sizes
    if (metadata?.payloadSize && metadata.payloadSize > 1000000) { // 1MB
      return true
    }

    // Example: Check for expensive operations
    if (metadata?.operationCost && metadata.operationCost > 100) {
      return true
    }

    return false
  }

  /**
   * Get or create activity tracker
   */
  private getOrCreateTracker(
    key: string,
    userId: string,
    operationType: string,
    now: Date
  ): ActivityTracker {
    let tracker = this.activityMap.get(key)
    
    if (!tracker) {
      tracker = {
        userId,
        operationType,
        count: 0,
        windowStart: now,
        lastActivity: now,
        isBlocked: false,
        violations: [],
      }
      this.activityMap.set(key, tracker)
    }

    return tracker
  }

  /**
   * Get default suspicious activity patterns
   */
  private getDefaultPatterns(): SuspiciousActivityPattern[] {
    return [
      {
        type: 'high_frequency',
        threshold: 100, // 100 operations per window
        windowMs: 60000, // 1 minute
        blockDurationMs: 300000, // 5 minutes
      },
      {
        type: 'failed_operations',
        threshold: 10, // 10 failed operations per window
        windowMs: 300000, // 5 minutes
        blockDurationMs: 600000, // 10 minutes
      },
      {
        type: 'unusual_pattern',
        threshold: 1, // Any unusual pattern
        windowMs: 60000, // 1 minute
        blockDurationMs: 180000, // 3 minutes
      },
      {
        type: 'resource_abuse',
        threshold: 1, // Any resource abuse
        windowMs: 60000, // 1 minute
        blockDurationMs: 900000, // 15 minutes
      },
    ]
  }

  /**
   * Cleanup old activity data
   */
  cleanup(): void {
    const now = new Date()
    const maxAge = Math.max(...this.patterns.map(p => p.windowMs)) * 2 // Keep data for 2x the longest window
    const expiredKeys: string[] = []

    for (const [key, tracker] of this.activityMap.entries()) {
      if (now.getTime() - tracker.lastActivity.getTime() > maxAge) {
        expiredKeys.push(key)
      }
    }

    expiredKeys.forEach(key => this.activityMap.delete(key))
  }
}

// Default suspicious activity detector
export const suspiciousActivityDetector = new SuspiciousActivityDetector()

// Cleanup old data every 10 minutes
setInterval(() => {
  suspiciousActivityDetector.cleanup()
}, 10 * 60 * 1000)