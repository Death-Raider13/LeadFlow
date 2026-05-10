// Database performance monitoring
interface QueryMetrics {
  queryType: string
  collection: string
  duration: number
  timestamp: Date
  success: boolean
  error?: string
}

interface PerformanceStats {
  totalQueries: number
  averageResponseTime: number
  slowQueries: QueryMetrics[]
  errorRate: number
  queriesPerSecond: number
  lastReset: Date
}

class DatabasePerformanceMonitor {
  private metrics: QueryMetrics[] = []
  private slowQueryThreshold = 1000 // 1 second
  private maxMetricsHistory = 1000
  private startTime = new Date()

  // Record a query execution
  recordQuery(
    queryType: string,
    collection: string,
    duration: number,
    success: boolean,
    error?: string
  ): void {
    const metric: QueryMetrics = {
      queryType,
      collection,
      duration,
      timestamp: new Date(),
      success,
      error
    }

    this.metrics.push(metric)

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetricsHistory) {
      this.metrics = this.metrics.slice(-this.maxMetricsHistory)
    }
  }

  // Get performance statistics
  getStats(): PerformanceStats {
    const now = new Date()
    const timeWindow = 60000 // 1 minute
    const recentMetrics = this.metrics.filter(
      m => now.getTime() - m.timestamp.getTime() < timeWindow
    )

    const totalQueries = recentMetrics.length
    const successfulQueries = recentMetrics.filter(m => m.success)
    const failedQueries = recentMetrics.filter(m => !m.success)
    
    const averageResponseTime = totalQueries > 0
      ? recentMetrics.reduce((sum, m) => sum + m.duration, 0) / totalQueries
      : 0

    const slowQueries = recentMetrics.filter(m => m.duration > this.slowQueryThreshold)
    const errorRate = totalQueries > 0 ? failedQueries.length / totalQueries : 0
    const queriesPerSecond = totalQueries / (timeWindow / 1000)

    return {
      totalQueries,
      averageResponseTime,
      slowQueries,
      errorRate,
      queriesPerSecond,
      lastReset: this.startTime
    }
  }

  // Get slow queries
  getSlowQueries(limit = 10): QueryMetrics[] {
    return this.metrics
      .filter(m => m.duration > this.slowQueryThreshold)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit)
  }

  // Get queries by collection
  getQueriesByCollection(): Record<string, number> {
    const counts: Record<string, number> = {}
    
    for (const metric of this.metrics) {
      counts[metric.collection] = (counts[metric.collection] || 0) + 1
    }
    
    return counts
  }

  // Reset metrics
  reset(): void {
    this.metrics = []
    this.startTime = new Date()
  }

  // Set slow query threshold
  setSlowQueryThreshold(threshold: number): void {
    this.slowQueryThreshold = threshold
  }
}

// Export singleton instance
export const performanceMonitor = new DatabasePerformanceMonitor()
export default performanceMonitor