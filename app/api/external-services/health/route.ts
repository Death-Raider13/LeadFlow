import { NextRequest, NextResponse } from 'next/server'
import { circuitBreakerManager } from '@/lib/external-api/circuit-breaker'
import { externalApiClients } from '@/lib/external-api/resilient-client'

export async function GET(request: NextRequest) {
  try {
    // Get all circuit breaker stats
    const circuitBreakerStats = circuitBreakerManager.getAllStats()
    
    // Get individual client stats
    const clientStats = {
      geoapify: externalApiClients.geoapify.getStats(),
      rapidApi: externalApiClients.rapidApi.getStats(),
      scraperBee: externalApiClients.scraperBee.getStats(),
    }
    
    // Get unavailable services
    const unavailableServices = circuitBreakerManager.getUnavailableServices()
    
    // Calculate overall health
    const totalServices = Object.keys(circuitBreakerStats).length
    const availableServices = totalServices - unavailableServices.length
    const healthPercentage = totalServices > 0 ? (availableServices / totalServices) * 100 : 100
    
    const overallHealth = {
      status: healthPercentage === 100 ? 'healthy' : healthPercentage >= 50 ? 'degraded' : 'unhealthy',
      availableServices,
      totalServices,
      healthPercentage,
      unavailableServices,
    }
    
    return NextResponse.json({
      success: true,
      data: {
        overallHealth,
        circuitBreakers: circuitBreakerStats,
        clients: clientStats,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('External services health check error:', error)
    
    return NextResponse.json(
      {
        error: {
          code: 'HEALTH_CHECK_ERROR',
          message: 'Failed to retrieve external services health',
        },
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, service } = body
    
    if (action === 'reset') {
      if (service) {
        // Reset specific service
        const client = (externalApiClients as any)[service]
        if (client) {
          client.reset()
          return NextResponse.json({
            success: true,
            message: `Reset circuit breaker for ${service}`,
          })
        } else {
          return NextResponse.json(
            {
              error: {
                code: 'SERVICE_NOT_FOUND',
                message: `Service ${service} not found`,
              },
            },
            { status: 404 }
          )
        }
      } else {
        // Reset all services
        circuitBreakerManager.resetAll()
        Object.values(externalApiClients).forEach(client => client.clearCache())
        
        return NextResponse.json({
          success: true,
          message: 'Reset all circuit breakers and cleared caches',
        })
      }
    }
    
    return NextResponse.json(
      {
        error: {
          code: 'INVALID_ACTION',
          message: 'Invalid action. Supported actions: reset',
        },
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('External services management error:', error)
    
    return NextResponse.json(
      {
        error: {
          code: 'MANAGEMENT_ERROR',
          message: 'Failed to manage external services',
        },
      },
      { status: 500 }
    )
  }
}