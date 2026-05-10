import { NextResponse } from 'next/server';
import { prometheusExporter } from '@/lib/monitoring/prometheus-metrics';

export async function GET() {
  try {
    // Export metrics in Prometheus format
    const prometheusMetrics = prometheusExporter.exportMetrics();
    
    return new Response(prometheusMetrics, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Metrics endpoint error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve metrics' },
      { status: 500 }
    );
  }
}