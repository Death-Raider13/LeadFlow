export interface QueuedOperation<T = any> {
  id: string
  type: string
  payload: T
  priority: number
  userId?: string
  createdAt: Date
  scheduledAt?: Date
  maxRetries: number
  retryCount: number
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  error?: string
  result?: any
}

export interface QueueOptions {
  maxConcurrency: number
  maxQueueSize: number
  defaultPriority: number
  retryDelay: number
  maxRetryDelay: number
  retryMultiplier: number
}

export interface ThrottleOptions {
  maxOperationsPerWindow: number
  windowSizeMs: number
  burstLimit?: number
}

export interface SuspiciousActivityPattern {
  type: 'high_frequency' | 'unusual_pattern' | 'resource_abuse' | 'failed_operations'
  threshold: number
  windowMs: number
  blockDurationMs: number
}

export interface ActivityTracker {
  userId: string
  operationType: string
  count: number
  windowStart: Date
  lastActivity: Date
  isBlocked: boolean
  blockUntil?: Date
  violations: string[]
}

export type OperationHandler<T = any, R = any> = (payload: T) => Promise<R>

export interface QueueStats {
  pending: number
  processing: number
  completed: number
  failed: number
  totalProcessed: number
  averageProcessingTime: number
  currentConcurrency: number
  maxConcurrency: number
}