import { NextRequest } from 'next/server'
import { database } from '@/lib/database'
import { StreamingProcessor } from '@/lib/database/streaming'
import { logger } from '@/lib/monitoring/logger'
import { metricsCollector } from '@/lib/monitoring/metrics'
import { createStreamingHandler, createApiHandler, extractPaginationParams, extractFilterParams } from '@/lib/api/handler-wrapper'
import { ApiResponseFormatter } from '@/lib/api/response-formatter'

/**
 * GET /api/leads/export
 * Stream export of leads data for large datasets
 */
async function streamExportHandler(request: NextRequest, context: any): Promise<ReadableStream> {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const format = searchParams.get('format') || 'json'
  const batchSize = parseInt(searchParams.get('batchSize') || '100')
  
  if (!userId) {
    throw new Error('userId parameter is required')
  }

  logger.info('Lead export requested', {
    requestId: context.correlationId,
    endpoint: '/api/leads/export',
    metadata: { userId, format, batchSize },
  })

  // Create streaming response
  return new ReadableStream({
    async start(controller) {
      try {
        // Build query
        const query = database['db']
          .collection('leads')
          .where('user_id', '==', userId)
          .orderBy('created_at', 'desc')

        let isFirst = true
        let totalExported = 0

        // Start JSON array
        if (format === 'json') {
          controller.enqueue(new TextEncoder().encode('['))
        }

        // Stream process the data
        await StreamingProcessor.streamToProcessor(
          query,
          (doc) => {
            const data = doc.data()
            return {
              id: doc.id,
              ...data,
              created_at: data?.created_at?.toDate?.()?.toISOString() || data?.created_at,
              updated_at: data?.updated_at?.toDate?.()?.toISOString() || data?.updated_at,
            }
          },
          async (lead) => {
            let output = ''
            
            if (format === 'json') {
              if (!isFirst) {
                output += ','
              }
              output += '\n  ' + JSON.stringify(lead)
              isFirst = false
            } else if (format === 'csv') {
              if (isFirst) {
                // CSV header
                output += 'id,name,email,phone,source,status,tags,created_at\n'
                isFirst = false
              }
              output += `"${lead.id}","${(lead as any).name || ''}","${(lead as any).email || ''}","${(lead as any).phone || ''}","${(lead as any).source || ''}","${(lead as any).status || ''}","${((lead as any).tags || []).join(';')}","${lead.created_at}"\n`
            }
            
            controller.enqueue(new TextEncoder().encode(output))
            totalExported++
          },
          {
            batchSize,
            onProgress: (processed) => {
              metricsCollector.recordGauge('export_progress', processed)
            }
          }
        )

        // Close JSON array
        if (format === 'json') {
          controller.enqueue(new TextEncoder().encode('\n]'))
        }

        logger.info('Lead export completed', {
          requestId: context.correlationId,
          endpoint: '/api/leads/export',
          metadata: { userId, totalExported },
        })

        metricsCollector.incrementCounter('lead_exports_completed_total')
        metricsCollector.recordHistogram('lead_export_count', totalExported)

      } catch (error) {
        logger.error('Lead export failed', error as Error, {
          requestId: context.correlationId,
          endpoint: '/api/leads/export',
          metadata: { userId },
        })

        metricsCollector.incrementCounter('lead_export_errors_total')
        controller.error(error)
      } finally {
        controller.close()
      }
    }
  })
}

/**
 * POST /api/leads/export/batch
 * Process leads in batches for bulk operations
 */
async function batchProcessHandler(request: NextRequest, context: any) {
  const body = await request.json()
  const { userId, operation, batchSize = 50, filters = {} } = body

  if (!userId || !operation) {
    throw new Error('userId and operation are required')
  }

  logger.info('Batch lead processing requested', {
    requestId: context.correlationId,
    endpoint: '/api/leads/export/batch',
    metadata: { userId, operation, batchSize },
  })

  let totalProcessed = 0
  let totalErrors = 0

  // Define the processor based on operation
  const processor = async (leads: any[]) => {
    switch (operation) {
      case 'validate':
        // Validate lead data
        return leads.map(lead => ({
          id: lead.id,
          valid: !!(lead.name && (lead.email || lead.phone)),
          issues: [
            !lead.name && 'Missing name',
            !lead.email && !lead.phone && 'Missing contact info'
          ].filter(Boolean)
        }))

      case 'enrich':
        // Simulate data enrichment
        return leads.map(lead => ({
          ...lead,
          enriched_at: new Date().toISOString(),
          score: Math.floor(Math.random() * 100)
        }))

      case 'export_summary':
        // Create summary data
        return leads.map(lead => ({
          id: lead.id,
          name: lead.name,
          status: lead.status,
          created_at: lead.created_at
        }))

      default:
        throw new Error(`Unknown operation: ${operation}`)
    }
  }

  // Stream process the leads
  const result = await database.streamLeadsByUser(
    userId,
    async (leadBatch) => {
      const processed = await processor(leadBatch)
      totalProcessed += processed.length
    },
    { batchSize, filters }
  )

  totalErrors = result.totalErrors

  metricsCollector.incrementCounter('batch_processing_completed_total')
  metricsCollector.recordHistogram('batch_processing_items', totalProcessed)

  return {
    message: `Batch processing completed: ${operation}`,
    stats: {
      totalProcessed,
      totalErrors,
      operation,
    },
  }
}

export const GET = createStreamingHandler(streamExportHandler, {
  rateLimit: true,
  requireAuth: true
})

export const POST = createApiHandler(batchProcessHandler, {
  rateLimit: true,
  requireAuth: true,
  validateInput: true
})