import { NextRequest, NextResponse } from 'next/server'
import { defaultTaskQueue } from './task-queue'
import { operationThrottles } from './throttle'
import { suspiciousActivityDetector } from './suspicious-activity'

interface OperationOptions {
  operationType: string
  requireAuth?: boolean
  throttleKey?: string
  priority?: number
  maxRetries?: number
  queueable?: boolean
  metadata?: Record<string, any>
}

type OperationHandler<T = any> = (
  payload: any,
  context: { userId?: string; request: NextRequest }
) => Promise<T>

export function withOperationControl<T>(
  handler: OperationHandler<T>,
  options: OperationOptions
) {
  return async function controlledOperation(
    request: NextRequest,
    context: { params?: any } = {}
  ): Promise<NextResponse> {
    try {
      // Extract user information
      const userId = request.headers.get('x-user-id') || undefined
      const subscriptionPlan = request.headers.get('x-subscription-plan') || 'free'
      
      if (options.requireAuth && !userId) {
        return NextResponse.json(
          { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
          { status: 401 }
        )
      }

      // Check for suspicious activity
      if (userId) {
        const activityCheck = suspiciousActivityDetector.checkActivity(
          userId,
          options.operationType,
          options.metadata
        )
        
        if (activityCheck.blocked) {
          return NextResponse.json(
            {
              error: {
                code: 'SUSPICIOUS_ACTIVITY',
                message: activityCheck.reason,
                blockUntil: activityCheck.blockUntil?.toISOString(),
              },
            },
            { status: 429 }
          )
        }
      }

      // Check throttling
      const throttleKey = options.throttleKey || options.operationType
      const throttle = (operationThrottles as any)[throttleKey]
      
      if (throttle) {
        const userThrottleKey = userId ? `${userId}:${throttleKey}` : `anonymous:${throttleKey}`
        const throttleResult = throttle.isAllowed(userThrottleKey)
        
        if (!throttleResult.allowed) {
          return NextResponse.json(
            {
              error: {
                code: 'THROTTLE_LIMIT_EXCEEDED',
                message: throttleResult.reason,
                retryAfter: throttleResult.retryAfter,
              },
            },
            { status: 429 }
          )
        }
        
        // Record the operation
        throttle.recordOperation(userThrottleKey)
      }

      // Parse request body
      let payload: any = {}
      if (request.method !== 'GET') {
        try {
          payload = await request.json()
        } catch (error) {
          // Body might be empty or not JSON
        }
      }

      let result: T
      let operationSuccess = true

      try {
        if (options.queueable && shouldQueue(subscriptionPlan, options.operationType)) {
          // Queue the operation for background processing
          const operationId = await defaultTaskQueue.enqueue(
            options.operationType,
            { ...payload, ...context },
            {
              priority: options.priority,
              userId,
              maxRetries: options.maxRetries,
            }
          )
          
          result = {
            operationId,
            status: 'queued',
            message: 'Operation queued for processing',
          } as T
        } else {
          // Execute immediately
          result = await handler(payload, { userId, request })
        }
      } catch (error) {
        operationSuccess = false
        console.error(`Operation ${options.operationType} failed:`, error)
        
        // Record failed operation for suspicious activity detection
        if (userId) {
          suspiciousActivityDetector.recordActivity(
            userId,
            options.operationType,
            false,
            {
              error: error instanceof Error ? error.message : String(error),
              ...options.metadata,
            }
          )
        }
        
        throw error
      }

      // Record successful operation
      if (userId && operationSuccess) {
        suspiciousActivityDetector.recordActivity(
          userId,
          options.operationType,
          true,
          options.metadata
        )
      }

      return NextResponse.json({
        success: true,
        data: result,
      })
    } catch (error) {
      console.error(`Controlled operation ${options.operationType} error:`, error)
      
      return NextResponse.json(
        {
          error: {
            code: 'OPERATION_ERROR',
            message: error instanceof Error ? error.message : 'Operation failed',
          },
        },
        { status: 500 }
      )
    }
  }
}

/**
 * Determine if an operation should be queued based on subscription plan and operation type
 */
function shouldQueue(subscriptionPlan: string, operationType: string): boolean {
  // Free users get more operations queued to manage resource usage
  if (subscriptionPlan === 'free') {
    return ['leadGeneration', 'leadImport', 'emailSend'].includes(operationType)
  }
  
  // Starter users get some operations queued
  if (subscriptionPlan === 'starter') {
    return ['leadImport', 'bulkEmailSend'].includes(operationType)
  }
  
  // Pro users get immediate execution for most operations
  if (subscriptionPlan === 'pro') {
    return ['bulkLeadImport', 'massEmailSend'].includes(operationType)
  }
  
  return false
}

/**
 * Register operation handlers with the task queue
 */
export function registerOperationHandlers() {
  // Lead generation handler
  defaultTaskQueue.registerHandler('leadGeneration', async (payload) => {
    // Implement lead generation logic
    console.log('Processing lead generation:', payload)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return {
      leads: [],
      count: 0,
      processedAt: new Date().toISOString(),
    }
  })

  // Lead import handler
  defaultTaskQueue.registerHandler('leadImport', async (payload) => {
    // Implement lead import logic
    console.log('Processing lead import:', payload)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 5000))
    
    return {
      imported: 0,
      failed: 0,
      processedAt: new Date().toISOString(),
    }
  })

  // Email send handler
  defaultTaskQueue.registerHandler('emailSend', async (payload) => {
    // Implement email sending logic
    console.log('Processing email send:', payload)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      sent: true,
      messageId: `msg_${Date.now()}`,
      processedAt: new Date().toISOString(),
    }
  })

  // SMS send handler
  defaultTaskQueue.registerHandler('smsSend', async (payload) => {
    // Implement SMS sending logic
    console.log('Processing SMS send:', payload)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return {
      sent: true,
      messageId: `sms_${Date.now()}`,
      processedAt: new Date().toISOString(),
    }
  })
}

// Register handlers on module load
registerOperationHandlers()