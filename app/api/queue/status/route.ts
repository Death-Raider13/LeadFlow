import { NextRequest, NextResponse } from 'next/server'
import { defaultTaskQueue } from '@/lib/queuing/task-queue'
import { operationThrottles } from '@/lib/queuing/throttle'
import { suspiciousActivityDetector } from '@/lib/queuing/suspicious-activity'

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    
    // Get queue statistics
    const queueStats = defaultTaskQueue.getStats()
    
    // Get throttle statistics
    const throttleStats = Object.entries(operationThrottles).reduce((acc, [name, throttle]) => {
      const key = userId ? `${userId}:${name}` : `global:${name}`
      acc[name] = throttle.getUsage(key)
      return acc
    }, {} as Record<string, any>)
    
    // Get user operations if userId provided
    const userOperations = userId ? defaultTaskQueue.getUserOperations(userId) : []
    
    // Get user activity if userId provided
    const userActivity = userId ? suspiciousActivityDetector.getUserActivity(userId) : []
    
    // Get blocked users (admin only - in real app, check permissions)
    const blockedUsers = suspiciousActivityDetector.getBlockedUsers()
    
    return NextResponse.json({
      success: true,
      data: {
        queue: queueStats,
        throttles: throttleStats,
        userOperations,
        userActivity,
        blockedUsers: blockedUsers.length, // Don't expose full list for privacy
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Queue status error:', error)
    
    return NextResponse.json(
      {
        error: {
          code: 'QUEUE_STATUS_ERROR',
          message: 'Failed to retrieve queue status',
        },
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, operationId, userId, operationType } = body
    
    switch (action) {
      case 'cancel':
        if (!operationId) {
          return NextResponse.json(
            { error: { code: 'MISSING_OPERATION_ID', message: 'Operation ID is required' } },
            { status: 400 }
          )
        }
        
        const cancelled = defaultTaskQueue.cancelOperation(operationId)
        return NextResponse.json({
          success: cancelled,
          message: cancelled ? 'Operation cancelled' : 'Operation not found or cannot be cancelled',
        })
      
      case 'block_user':
        if (!userId || !operationType) {
          return NextResponse.json(
            { error: { code: 'MISSING_PARAMETERS', message: 'User ID and operation type are required' } },
            { status: 400 }
          )
        }
        
        const reason = body.reason || 'Manually blocked'
        const duration = body.duration || 300000 // 5 minutes default
        
        suspiciousActivityDetector.blockUser(userId, operationType, reason, duration)
        return NextResponse.json({
          success: true,
          message: `User ${userId} blocked for ${operationType}`,
        })
      
      case 'unblock_user':
        if (!userId || !operationType) {
          return NextResponse.json(
            { error: { code: 'MISSING_PARAMETERS', message: 'User ID and operation type are required' } },
            { status: 400 }
          )
        }
        
        suspiciousActivityDetector.unblockUser(userId, operationType)
        return NextResponse.json({
          success: true,
          message: `User ${userId} unblocked for ${operationType}`,
        })
      
      case 'cleanup':
        defaultTaskQueue.cleanup()
        Object.values(operationThrottles).forEach(throttle => throttle.cleanup())
        suspiciousActivityDetector.cleanup()
        
        return NextResponse.json({
          success: true,
          message: 'Cleanup completed',
        })
      
      default:
        return NextResponse.json(
          { error: { code: 'INVALID_ACTION', message: 'Invalid action' } },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Queue management error:', error)
    
    return NextResponse.json(
      {
        error: {
          code: 'QUEUE_MANAGEMENT_ERROR',
          message: 'Failed to manage queue',
        },
      },
      { status: 500 }
    )
  }
}