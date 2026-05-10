import { QueuedOperation, QueueOptions, OperationHandler, QueueStats } from './types'
import { v4 as uuidv4 } from 'uuid'

export class TaskQueue {
  private queue: QueuedOperation[] = []
  private processing = new Map<string, QueuedOperation>()
  private handlers = new Map<string, OperationHandler>()
  private stats: QueueStats = {
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
    totalProcessed: 0,
    averageProcessingTime: 0,
    currentConcurrency: 0,
    maxConcurrency: 0,
  }
  private processingTimes: number[] = []
  private isRunning = false

  constructor(private options: QueueOptions) {
    this.stats.maxConcurrency = options.maxConcurrency
  }

  /**
   * Register a handler for a specific operation type
   */
  registerHandler<T, R>(operationType: string, handler: OperationHandler<T, R>): void {
    this.handlers.set(operationType, handler)
  }

  /**
   * Add an operation to the queue
   */
  async enqueue<T>(
    operationType: string,
    payload: T,
    options: {
      priority?: number
      userId?: string
      scheduledAt?: Date
      maxRetries?: number
    } = {}
  ): Promise<string> {
    // Check queue size limit
    if (this.queue.length >= this.options.maxQueueSize) {
      throw new Error('Queue is full')
    }

    // Check if handler exists
    if (!this.handlers.has(operationType)) {
      throw new Error(`No handler registered for operation type: ${operationType}`)
    }

    const operation: QueuedOperation<T> = {
      id: uuidv4(),
      type: operationType,
      payload,
      priority: options.priority ?? this.options.defaultPriority,
      userId: options.userId,
      createdAt: new Date(),
      scheduledAt: options.scheduledAt,
      maxRetries: options.maxRetries ?? 3,
      retryCount: 0,
      status: 'pending',
    }

    // Insert operation in priority order
    this.insertByPriority(operation)
    this.stats.pending++

    // Start processing if not already running
    if (!this.isRunning) {
      this.startProcessing()
    }

    return operation.id
  }

  /**
   * Get operation status
   */
  getOperation(operationId: string): QueuedOperation | null {
    // Check processing operations
    const processing = this.processing.get(operationId)
    if (processing) {
      return processing
    }

    // Check queued operations
    return this.queue.find(op => op.id === operationId) || null
  }

  /**
   * Cancel an operation
   */
  cancelOperation(operationId: string): boolean {
    // Remove from queue if pending
    const queueIndex = this.queue.findIndex(op => op.id === operationId)
    if (queueIndex !== -1) {
      const operation = this.queue[queueIndex]
      operation.status = 'cancelled'
      this.queue.splice(queueIndex, 1)
      this.stats.pending--
      return true
    }

    // Mark as cancelled if processing (handler should check status)
    const processing = this.processing.get(operationId)
    if (processing) {
      processing.status = 'cancelled'
      return true
    }

    return false
  }

  /**
   * Get queue statistics
   */
  getStats(): QueueStats {
    return { ...this.stats }
  }

  /**
   * Get operations by user
   */
  getUserOperations(userId: string): QueuedOperation[] {
    const userOps = this.queue.filter(op => op.userId === userId)
    const processingOps = Array.from(this.processing.values()).filter(op => op.userId === userId)
    return [...userOps, ...processingOps]
  }

  /**
   * Clear completed and failed operations
   */
  cleanup(): void {
    // In a real implementation, you'd move these to a separate storage
    // For now, we'll just log the cleanup
    console.log('Queue cleanup completed')
  }

  /**
   * Insert operation by priority (higher priority first)
   */
  private insertByPriority(operation: QueuedOperation): void {
    let insertIndex = this.queue.length

    for (let i = 0; i < this.queue.length; i++) {
      if (operation.priority > this.queue[i].priority) {
        insertIndex = i
        break
      }
    }

    this.queue.splice(insertIndex, 0, operation)
  }

  /**
   * Start processing operations
   */
  private async startProcessing(): Promise<void> {
    if (this.isRunning) {
      return
    }

    this.isRunning = true

    while (this.queue.length > 0 || this.processing.size > 0) {
      // Process operations up to concurrency limit
      while (
        this.processing.size < this.options.maxConcurrency &&
        this.queue.length > 0
      ) {
        const operation = this.getNextOperation()
        if (operation) {
          this.processOperation(operation)
        } else {
          break
        }
      }

      // Wait a bit before checking again
      await this.sleep(100)
    }

    this.isRunning = false
  }

  /**
   * Get the next operation to process
   */
  private getNextOperation(): QueuedOperation | null {
    const now = new Date()

    for (let i = 0; i < this.queue.length; i++) {
      const operation = this.queue[i]

      // Check if operation is scheduled for the future
      if (operation.scheduledAt && operation.scheduledAt > now) {
        continue
      }

      // Remove from queue and return
      this.queue.splice(i, 1)
      this.stats.pending--
      return operation
    }

    return null
  }

  /**
   * Process a single operation
   */
  private async processOperation(operation: QueuedOperation): Promise<void> {
    const startTime = Date.now()

    try {
      // Move to processing
      this.processing.set(operation.id, operation)
      operation.status = 'processing'
      this.stats.processing++
      this.stats.currentConcurrency = this.processing.size

      // Check if operation was cancelled
      if (operation.status === 'cancelled') {
        this.processing.delete(operation.id)
        this.stats.processing--
        this.stats.currentConcurrency = this.processing.size
        return
      }

      // Get handler
      const handler = this.handlers.get(operation.type)
      if (!handler) {
        throw new Error(`No handler for operation type: ${operation.type}`)
      }

      // Execute operation
      const result = await handler(operation.payload)
      
      // Check if operation was cancelled during execution
      if (operation.status === 'cancelled') {
        this.processing.delete(operation.id)
        this.stats.processing--
        this.stats.currentConcurrency = this.processing.size
        return
      }

      // Mark as completed
      operation.status = 'completed'
      operation.result = result
      this.stats.completed++
      this.stats.totalProcessed++

      console.log(`Operation ${operation.id} completed successfully`)
    } catch (error) {
      console.error(`Operation ${operation.id} failed:`, error)

      operation.error = error instanceof Error ? error.message : String(error)
      operation.retryCount++

      // Check if we should retry
      if (operation.retryCount < operation.maxRetries) {
        // Schedule retry with exponential backoff
        const delay = this.calculateRetryDelay(operation.retryCount)
        operation.scheduledAt = new Date(Date.now() + delay)
        operation.status = 'pending'

        // Add back to queue
        this.insertByPriority(operation)
        this.stats.pending++

        console.log(`Operation ${operation.id} scheduled for retry in ${delay}ms`)
      } else {
        // Max retries exceeded
        operation.status = 'failed'
        this.stats.failed++
        this.stats.totalProcessed++

        console.error(`Operation ${operation.id} failed permanently after ${operation.retryCount} retries`)
      }
    } finally {
      // Remove from processing
      this.processing.delete(operation.id)
      this.stats.processing--
      this.stats.currentConcurrency = this.processing.size

      // Update processing time stats
      const processingTime = Date.now() - startTime
      this.processingTimes.push(processingTime)
      
      // Keep only last 100 processing times for average calculation
      if (this.processingTimes.length > 100) {
        this.processingTimes.shift()
      }
      
      this.stats.averageProcessingTime = 
        this.processingTimes.reduce((sum, time) => sum + time, 0) / this.processingTimes.length
    }
  }

  /**
   * Calculate retry delay with exponential backoff
   */
  private calculateRetryDelay(retryCount: number): number {
    const baseDelay = this.options.retryDelay
    const maxDelay = this.options.maxRetryDelay
    const multiplier = this.options.retryMultiplier

    const delay = Math.min(baseDelay * Math.pow(multiplier, retryCount - 1), maxDelay)
    
    // Add jitter (±25%)
    const jitter = delay * 0.25 * (Math.random() - 0.5) * 2
    
    return Math.max(0, delay + jitter)
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Default queue instance
export const defaultTaskQueue = new TaskQueue({
  maxConcurrency: 5,
  maxQueueSize: 1000,
  defaultPriority: 0,
  retryDelay: 1000,
  maxRetryDelay: 30000,
  retryMultiplier: 2,
})