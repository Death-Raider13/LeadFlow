import { NextRequest, NextResponse } from 'next/server';
import { ApiResponseFormatter, ApiErrorCode, getCorrelationId, PerformanceTracker } from './response-formatter';
import { ApiVersionManager, withApiVersioning, ResponseTransformer, VersionCompatibility } from './versioning';
import { CentralizedErrorHandler, AppError } from '@/lib/monitoring/error-handler';
import { withRequestTracking } from '@/lib/monitoring/correlation-middleware';
import { logger } from '@/lib/monitoring/logger';
import { inputValidator } from '@/lib/validation/input-validator';
import { rateLimiter } from '@/lib/rate-limiting/rate-limiter';
import { getRateLimitsForUser } from '@/lib/rate-limiting/config';

/**
 * Comprehensive API Handler Wrapper
 * Provides consistent error handling, response formatting, versioning, and middleware integration
 */

export interface ApiHandlerOptions {
  requireAuth?: boolean;
  rateLimit?: boolean;
  validateInput?: boolean;
  schema?: any; // Zod schema for input validation
  deprecation?: {
    deprecated: boolean;
    sunsetDate?: string;
    migrationGuide?: string;
  };
}

export interface ApiContext {
  correlationId: string;
  requestedVersion: ApiVersion;
  compatibility: VersionCompatibility;
  performance: PerformanceTracker;
  userId?: string;
  userPlan?: string;
}

export type ApiHandler<T = any> = (
  request: NextRequest,
  context: ApiContext
) => Promise<NextResponse | T>;

/**
 * Main API wrapper function that provides consistent handling across all endpoints
 */
export function createApiHandler(
  handler: ApiHandler,
  options: ApiHandlerOptions = {}
): (request: NextRequest) => Promise<NextResponse> {
  
  return withRequestTracking(async (request: NextRequest) => {
    const correlationId = getCorrelationId(request);
    const performance = new PerformanceTracker();
    
    try {
      // Get API version information
      const requestedVersion = ApiVersionManager.getRequestedVersion(request);
      const compatibility = ApiVersionManager.checkCompatibility(requestedVersion);
      
      // Check if version is supported
      if (!compatibility.supported) {
        return ApiResponseFormatter.error(
          ApiErrorCode.UNSUPPORTED_MEDIA_TYPE,
          `API version ${ApiVersionManager.versionToString(requestedVersion)} is not supported`,
          400,
          { 
            supportedVersions: ApiVersionManager.getSupportedVersions().map(v => 
              ApiVersionManager.versionToString(v)
            )
          },
          undefined,
          correlationId
        );
      }

      // Extract user information (this would typically come from authentication middleware)
      const userId = request.headers.get('x-user-id');
      const userPlan = request.headers.get('x-subscription-plan') || 'free';

      // Rate limiting check
      if (options.rateLimit && userId) {
        performance.incrementQueryCount();
        const rateLimits = getRateLimitsForUser(userPlan);
        const rateLimitResult = await rateLimiter.checkLimit(userId, rateLimits);
        
        if (!rateLimitResult.allowed) {
          return ApiResponseFormatter.rateLimitExceeded(
            rateLimitResult.retryAfter,
            correlationId
          );
        }
      }

      // Input validation
      if (options.validateInput && options.schema) {
        try {
          const body = await request.json();
          const validationResult = inputValidator.validateRequest(options.schema, body);
          
          if (!validationResult.success) {
            const errors = validationResult.errors?.map(error => ({
              field: error.path?.join('.') || 'unknown',
              message: error.message,
              code: error.code
            })) || [];
            
            return ApiResponseFormatter.validationError(errors, correlationId);
          }
        } catch (error) {
          return ApiResponseFormatter.error(
            ApiErrorCode.VALIDATION_ERROR,
            'Invalid JSON in request body',
            400,
            undefined,
            undefined,
            correlationId
          );
        }
      }

      // Create API context
      const context: ApiContext = {
        correlationId,
        requestedVersion,
        compatibility,
        performance,
        userId: userId || undefined,
        userPlan
      };

      // Execute the handler
      const result = await handler(request, context);

      // If handler returns NextResponse directly, return it
      if (result instanceof NextResponse) {
        return result;
      }

      // Transform response data for version compatibility
      const transformedData = ResponseTransformer.transformForVersion(
        result,
        requestedVersion,
        ApiVersionManager.getCurrentVersion()
      );

      // Create response with performance metrics
      const meta = {
        performance: performance.getMetrics(),
        ...(compatibility.deprecated && {
          deprecation: {
            deprecated: true,
            deprecatedSince: compatibility.sunsetDate ? 
              new Date(compatibility.sunsetDate.getTime() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString() : 
              undefined,
            sunsetDate: compatibility.sunsetDate?.toISOString(),
            migrationGuide: compatibility.migrationGuide
          }
        }),
        ...(options.deprecation && {
          deprecation: {
            deprecated: options.deprecation.deprecated,
            sunsetDate: options.deprecation.sunsetDate,
            migrationGuide: options.deprecation.migrationGuide
          }
        })
      };

      // Return formatted response
      if (compatibility.deprecated || options.deprecation?.deprecated) {
        return ApiResponseFormatter.deprecated(
          transformedData,
          meta.deprecation!,
          { performance: meta.performance },
          correlationId
        );
      }

      return ApiResponseFormatter.success(
        transformedData,
        meta,
        200,
        correlationId
      );

    } catch (error) {
      // Handle different types of errors
      if (error instanceof AppError) {
        return ApiResponseFormatter.error(
          error.code as ApiErrorCode,
          error.message,
          error.statusCode,
          error.details,
          undefined,
          correlationId
        );
      }

      // Log unexpected errors
      logger.error('Unexpected API error', error as Error, {
        requestId: correlationId,
        endpoint: request.nextUrl.pathname,
        method: request.method,
        metadata: {
          userAgent: request.headers.get('user-agent'),
          ip: request.headers.get('x-forwarded-for')
        }
      });

      return ApiResponseFormatter.internalServerError(
        'An unexpected error occurred',
        correlationId
      );
    }
  }, request.nextUrl.pathname);
}

/**
 * Specialized handlers for common patterns
 */

/**
 * Handler for paginated endpoints
 */
export function createPaginatedHandler<T>(
  handler: (request: NextRequest, context: ApiContext) => Promise<{
    data: T[];
    total: number;
    page: number;
    limit: number;
  }>,
  options: ApiHandlerOptions = {}
): (request: NextRequest) => Promise<NextResponse> {
  
  return createApiHandler(async (request, context) => {
    const result = await handler(request, context);
    
    const totalPages = Math.ceil(result.total / result.limit);
    const hasNext = result.page < totalPages;
    const hasPrevious = result.page > 1;

    return ApiResponseFormatter.paginated(
      result.data,
      {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages,
        hasNext,
        hasPrevious
      },
      context.performance.getMetrics(),
      context.correlationId
    );
  }, options);
}

/**
 * Handler for streaming endpoints
 */
export function createStreamingHandler(
  handler: (request: NextRequest, context: ApiContext) => Promise<ReadableStream>,
  options: ApiHandlerOptions = {}
): (request: NextRequest) => Promise<NextResponse> {
  
  return createApiHandler(async (request, context) => {
    const stream = await handler(request, context);
    
    // For streaming responses, we return the stream directly
    // The response formatting is handled within the stream
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
        'X-Correlation-ID': context.correlationId,
        'X-API-Version': ApiVersionManager.versionToString(context.requestedVersion)
      }
    });
  }, options);
}

/**
 * Handler for health check endpoints
 */
export function createHealthCheckHandler(
  handler: (request: NextRequest, context: ApiContext) => Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    checks: Record<string, any>;
    metrics?: Record<string, any>;
  }>,
  options: ApiHandlerOptions = {}
): (request: NextRequest) => Promise<NextResponse> {
  
  return createApiHandler(async (request, context) => {
    const result = await handler(request, context);
    
    const statusCode = result.status === 'healthy' ? 200 : 
                      result.status === 'degraded' ? 200 : 503;
    
    return ApiResponseFormatter.success(
      result,
      { performance: context.performance.getMetrics() },
      statusCode,
      context.correlationId
    );
  }, options);
}

/**
 * Utility functions for common operations
 */

export function extractPaginationParams(request: NextRequest): { page: number; limit: number } {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
  
  return { page, limit };
}

export function extractSortParams(request: NextRequest): { sortBy?: string; sortOrder: 'asc' | 'desc' } {
  const { searchParams } = request.nextUrl;
  const sortBy = searchParams.get('sortBy') || undefined;
  const sortOrder = (searchParams.get('sortOrder') === 'desc') ? 'desc' : 'asc';
  
  return { sortBy, sortOrder };
}

export function extractFilterParams(request: NextRequest): Record<string, string> {
  const { searchParams } = request.nextUrl;
  const filters: Record<string, string> = {};
  
  for (const [key, value] of searchParams.entries()) {
    if (!['page', 'limit', 'sortBy', 'sortOrder'].includes(key)) {
      filters[key] = value;
    }
  }
  
  return filters;
}