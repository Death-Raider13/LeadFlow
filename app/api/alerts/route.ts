import { NextRequest, NextResponse } from 'next/server';
import { alertingSystem } from '@/lib/monitoring/alerting';
import { withRequestTracking } from '@/lib/monitoring/correlation-middleware';

async function alertsHandler(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = request.nextUrl;
    const activeOnly = searchParams.get('active') === 'true';
    
    const alerts = activeOnly 
      ? alertingSystem.getActiveAlerts()
      : alertingSystem.getAllAlerts();

    // Sort alerts by timestamp (newest first)
    alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return NextResponse.json({
      alerts,
      summary: {
        total: alerts.length,
        active: alertingSystem.getActiveAlerts().length,
        bySeverity: {
          critical: alerts.filter(a => a.severity === 'critical').length,
          high: alerts.filter(a => a.severity === 'high').length,
          medium: alerts.filter(a => a.severity === 'medium').length,
          low: alerts.filter(a => a.severity === 'low').length
        }
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to retrieve alerts',
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function resolveAlertHandler(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { alertId } = body;
    
    if (!alertId) {
      return NextResponse.json(
        { error: 'Alert ID is required' },
        { status: 400 }
      );
    }
    
    const resolved = alertingSystem.resolveAlert(alertId);
    
    if (!resolved) {
      return NextResponse.json(
        { error: 'Alert not found or already resolved' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Alert resolved successfully',
      alertId,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to resolve alert',
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export const GET = withRequestTracking(alertsHandler, '/api/alerts');
export const POST = withRequestTracking(resolveAlertHandler, '/api/alerts');