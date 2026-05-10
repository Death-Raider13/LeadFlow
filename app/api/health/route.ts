import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Simple health check
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime(),
      checks: {
        server: 'healthy',
        environment: process.env.NODE_ENV || 'development',
        firebase: process.env.FIREBASE_PROJECT_ID ? "configured" : "missing",
        encryption: process.env.CREDENTIALS_ENCRYPTION_KEY ? "configured" : "missing",
        geoapify: process.env.GEOAPIFY_API_KEY ? "configured" : "missing",
      }
    }
    
    return NextResponse.json(healthData, { status: 200 })
    
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}