import { NextRequest, NextResponse } from 'next/server'
import { serviceCacheManager } from '@/lib/external-api/cache-manager'
import { logger } from '@/lib/monitoring/logger'
import { metricsCollector } from '@/lib/monitoring/metrics'

/**
 * GET /api/external-services/cache
 * Get cache statistics for all services
 */
export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    logger.info('Cache statistics requested', {
      requestId,
      endpoint: '/api/external-services/cache',
    })

    const stats = serviceCacheManager.getAllStats()
    
    // Record metrics access
    metricsCollector.incrementCounter('cache_stats_requests_total')
    
    return NextResponse.json({
      success: true,
      data: {
        services: stats,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    logger.error('Failed to get cache statistics', error as Error, {
      requestId,
      endpoint: '/api/external-services/cache',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve cache statistics',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/external-services/cache
 * Clear cache for specific service or all services
 */
export async function DELETE(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get('service')
    
    logger.info('Cache clear requested', {
      requestId,
      endpoint: '/api/external-services/cache',
      metadata: { service: service || 'all' },
    })

    if (service) {
      // Clear specific service cache
      serviceCacheManager.clearServiceCache(service)
      metricsCollector.incrementCounter('cache_clear_requests_total', { service })
      
      return NextResponse.json({
        success: true,
        message: `Cache cleared for service: ${service}`,
      })
    } else {
      // Clear all service caches
      const stats = serviceCacheManager.getAllStats()
      const services = Object.keys(stats)
      
      for (const serviceName of services) {
        serviceCacheManager.clearServiceCache(serviceName)
      }
      
      metricsCollector.incrementCounter('cache_clear_requests_total', { service: 'all' })
      
      return NextResponse.json({
        success: true,
        message: `Cache cleared for all services: ${services.join(', ')}`,
        clearedServices: services,
      })
    }
  } catch (error) {
    logger.error('Failed to clear cache', error as Error, {
      requestId,
      endpoint: '/api/external-services/cache',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to clear cache',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/external-services/cache/cleanup
 * Manually trigger cache cleanup for expired entries
 */
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    logger.info('Manual cache cleanup requested', {
      requestId,
      endpoint: '/api/external-services/cache/cleanup',
    })

    const cleanupResults = serviceCacheManager.cleanupAll()
    const totalCleaned = Object.values(cleanupResults).reduce((sum, count) => sum + count, 0)
    
    metricsCollector.incrementCounter('cache_cleanup_requests_total')
    metricsCollector.recordHistogram('cache_cleanup_entries_removed', totalCleaned)
    
    return NextResponse.json({
      success: true,
      message: `Cleanup completed. Removed ${totalCleaned} expired entries.`,
      results: cleanupResults,
    })
  } catch (error) {
    logger.error('Failed to cleanup cache', error as Error, {
      requestId,
      endpoint: '/api/external-services/cache/cleanup',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to cleanup cache',
      },
      { status: 500 }
    )
  }
}