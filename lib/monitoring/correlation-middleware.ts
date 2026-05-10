import { NextRequest, NextResponse } from 'next/server';
import { CorrelationManager } from './logger';

export function withCorrelationId(request: NextRequest): string {
  // Check if correlation ID already exists in headers
  let correlationId = request.headers.get('x-correlation-id');
  
  if (!correlationId) {
    correlationId = CorrelationManager.generateCorrelationId();
  }

  // Store correlation ID for this request
  const requestKey = `${request.method}-${request.nextUrl.pathname}-${Date.now()}`;
  CorrelationManager.setCorrelationId(requestKey, correlationId);

  return correlationId;
}

export function addCorrelationHeaders(response: NextResponse, correlationId: string): NextResponse {
  response.headers.set('X-Correlation-ID', correlationId);
  return response;
}

// Middleware wrapper for API routes
export function withRequestTracking<T extends any[], R>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  endpoint?: string
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const startTime = Date.now();
    const correlationId = withCorrelationId(request);

    try {
      const response = await handler(request, ...args);
      const duration = Date.now() - startTime;

      // Add correlation ID to response
      addCorrelationHeaders(response, correlationId);

      // Log successful request
      const { logger } = await import('./logger');
      logger.info('Request completed successfully', {
        requestId: correlationId,
        endpoint: endpoint || request.nextUrl.pathname,
        duration,
        metadata: {
          method: request.method,
          statusCode: response.status,
          userAgent: request.headers.get('user-agent'),
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
        }
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Import error handler dynamically to avoid circular dependencies
      const { CentralizedErrorHandler } = await import('./error-handler');
      
      return CentralizedErrorHandler.handleError(
        error instanceof Error ? error : new Error(String(error)),
        request,
        {
          requestId: correlationId,
          endpoint: endpoint || request.nextUrl.pathname,
          duration
        }
      );
    }
  };
}