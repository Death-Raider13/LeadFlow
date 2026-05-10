import { NextRequest, NextResponse } from 'next/server'
import { QueryOptimizer, DatabasePerformanceMonitor } from '@/lib/database/query-optimizer'
import { logger } from '@/lib/monitoring/logger'
import { metricsCollector } from '@/lib/monitoring/metrics'

/**
 * GET /api/database/performance
 * Get database query performance analytics
 */
export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const includeRecommendations = searchParams.get('recommendations') === 'true'
    
    logger.info('Database performance analytics requested', {
      requestId,
      endpoint: '/api/database/performance',
      metadata: { collection, includeRecommendations },
    })

    let response: any = {}

    if (collection) {
      // Get performance data for specific collection
      const collectionData = QueryOptimizer.getCollectionRecommendations(collection)
      response = {
        collection,
        ...collectionData,
      }
    } else {
      // Get overall performance analysis
      const queryAnalysis = QueryOptimizer.analyzeQueryPatterns()
      const operationSummary = DatabasePerformanceMonitor.getPerformanceSummary()
      
      response = {
        queryAnalysis,
        operationSummary,
        timestamp: new Date().toISOString(),
      }
    }

    if (includeRecommendations) {
      const analysis = QueryOptimizer.analyzeQueryPatterns()
      response.recommendations = analysis.indexRecommendations
    }

    metricsCollector.incrementCounter('performance_analytics_requests_total')

    return NextResponse.json({
      success: true,
      data: response,
    })

  } catch (error) {
    logger.error('Failed to get database performance analytics', error as Error, {
      requestId,
      endpoint: '/api/database/performance',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve performance analytics',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/database/performance/optimize
 * Trigger query optimization analysis
 */
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    const body = await request.json()
    const { action, collection } = body

    logger.info('Database optimization action requested', {
      requestId,
      endpoint: '/api/database/performance/optimize',
      metadata: { action, collection },
    })

    let result: any = {}

    switch (action) {
      case 'analyze':
        result = QueryOptimizer.analyzeQueryPatterns()
        break

      case 'clear_cache':
        QueryOptimizer.clearCache()
        DatabasePerformanceMonitor.clearMetrics()
        result = { message: 'Performance cache cleared' }
        break

      case 'generate_indexes':
        const analysis = QueryOptimizer.analyzeQueryPatterns()
        const indexCommands = analysis.indexRecommendations.map(rec => ({
          collection: rec.collection,
          fields: rec.fields,
          command: `db.${rec.collection}.createIndex({ ${rec.fields.map(f => `"${f}": 1`).join(', ')} })`,
          estimatedImprovement: rec.estimatedImprovement,
          reason: rec.reason,
        }))
        
        result = {
          message: 'Index recommendations generated',
          indexCommands,
          totalRecommendations: indexCommands.length,
        }
        break

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }

    metricsCollector.incrementCounter('performance_optimization_actions_total', {
      action,
    })

    return NextResponse.json({
      success: true,
      action,
      result,
    })

  } catch (error) {
    logger.error('Database optimization action failed', error as Error, {
      requestId,
      endpoint: '/api/database/performance/optimize',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Optimization action failed',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/database/performance/slow-queries
 * Get slow query analysis
 */
export async function PUT(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    const { searchParams } = new URL(request.url)
    const threshold = parseInt(searchParams.get('threshold') || '1000')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    logger.info('Slow query analysis requested', {
      requestId,
      endpoint: '/api/database/performance/slow-queries',
      metadata: { threshold, limit },
    })

    const analysis = QueryOptimizer.analyzeQueryPatterns()
    const slowQueries = analysis.slowQueries
      .filter(q => q.executionTime > threshold)
      .sort((a, b) => b.executionTime - a.executionTime)
      .slice(0, limit)

    const summary = {
      totalSlowQueries: slowQueries.length,
      averageExecutionTime: slowQueries.length > 0 
        ? slowQueries.reduce((sum, q) => sum + q.executionTime, 0) / slowQueries.length 
        : 0,
      worstQuery: slowQueries[0] || null,
      collectionsAffected: [...new Set(slowQueries.map(q => q.collection))],
    }

    metricsCollector.incrementCounter('slow_query_analysis_requests_total')

    return NextResponse.json({
      success: true,
      data: {
        slowQueries,
        summary,
        threshold,
        timestamp: new Date().toISOString(),
      },
    })

  } catch (error) {
    logger.error('Slow query analysis failed', error as Error, {
      requestId,
      endpoint: '/api/database/performance/slow-queries',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Slow query analysis failed',
      },
      { status: 500 }
    )
  }
}