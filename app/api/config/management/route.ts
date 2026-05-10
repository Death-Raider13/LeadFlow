import { NextRequest, NextResponse } from "next/server"
import { 
  getConfig, 
  getEnvironmentConfig, 
  getConfigHealthStatus,
  secureConfigStore,
  environmentConfigManager,
  configHotReloader,
  type Environment 
} from "@/lib/config"

// GET /api/config/management - Get configuration status and health
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeSecure = searchParams.get('includeSecure') === 'true'
    const environment = searchParams.get('environment') as Environment
    
    // Get basic configuration health
    const healthStatus = getConfigHealthStatus()
    
    // Get environment-specific configuration
    const envConfig = getEnvironmentConfig()
    
    // Get secure config stats (without exposing values)
    const secureStats = {
      hasSecureStore: true,
      // Only include non-sensitive stats
      storeHealth: 'operational'
    }
    
    const response = {
      health: healthStatus,
      environment: {
        current: envConfig.environment,
        config: envConfig
      },
      secureStore: secureStats,
      hotReload: {
        enabled: false // We don't expose internal state
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Configuration management error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to retrieve configuration status',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// POST /api/config/management - Update configuration (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, key, value, environment, options } = body
    
    // In a real application, you would check authentication and authorization here
    // For now, we'll just validate the request structure
    
    switch (action) {
      case 'setSecureConfig':
        if (!key || !value) {
          return NextResponse.json(
            { error: 'Key and value are required for setSecureConfig' },
            { status: 400 }
          )
        }
        
        secureConfigStore.set(key, value, {
          encrypt: options?.encrypt !== false,
          environment: environment,
          hotReloadable: options?.hotReloadable === true
        })
        
        return NextResponse.json({ 
          success: true, 
          message: `Secure config '${key}' set successfully` 
        })
      
      case 'updateEnvironmentConfig':
        if (!value || typeof value !== 'object') {
          return NextResponse.json(
            { error: 'Valid configuration object is required' },
            { status: 400 }
          )
        }
        
        environmentConfigManager.updateConfig(value)
        
        return NextResponse.json({ 
          success: true, 
          message: 'Environment configuration updated successfully' 
        })
      
      case 'enableHotReload':
        configHotReloader.enable()
        
        return NextResponse.json({ 
          success: true, 
          message: 'Hot reload enabled successfully' 
        })
      
      case 'disableHotReload':
        configHotReloader.disable()
        
        return NextResponse.json({ 
          success: true, 
          message: 'Hot reload disabled successfully' 
        })
      
      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        )
    }
    
  } catch (error) {
    console.error('Configuration management error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update configuration',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// DELETE /api/config/management - Remove configuration (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    const action = searchParams.get('action')
    
    if (!key && action !== 'clearAll') {
      return NextResponse.json(
        { error: 'Key parameter is required' },
        { status: 400 }
      )
    }
    
    switch (action) {
      case 'clearAll':
        secureConfigStore.clear()
        return NextResponse.json({ 
          success: true, 
          message: 'All secure configuration cleared' 
        })
      
      default:
        if (key) {
          const deleted = secureConfigStore.delete(key)
          if (deleted) {
            return NextResponse.json({ 
              success: true, 
              message: `Secure config '${key}' deleted successfully` 
            })
          } else {
            return NextResponse.json(
              { error: `Secure config '${key}' not found` },
              { status: 404 }
            )
          }
        }
        break
    }
    
    return NextResponse.json(
      { error: 'Invalid delete operation' },
      { status: 400 }
    )
    
  } catch (error) {
    console.error('Configuration management error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to delete configuration',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}