import { NextResponse } from 'next/server';
import { CorrelationManager } from '@/lib/monitoring/logger';

/**
 * Standard API Response Format
 * Implements consistent response structure across all endpoints
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
  timestamp: string;
  correlationId: string;
  version: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string; // For validation errors
}

export interface ResponseMeta {
  pagination?: PaginationMeta;
  performance?: PerformanceMeta;
  warnings?: string[];
  deprecation?: DeprecationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PerformanceMeta {
  executionTime: number; // milliseconds
  queryCount?: number;
  cacheHit?: boolean;
}

export interface DeprecationMeta {
  deprecated: boolean;
  deprecatedSince?: string;
  sunsetDate?: string;
  migrationGuide?: string;
}

export enum ApiErrorCode {
  // Client Errors (4xx)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',
  
  // Server Errors (5xx)
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR'
}

export class ApiResponseFormatter {
  private static readonly API_VERSION = '1.0';

  /**
   * Create a successful response
   */
  static success<T>(
    data: T,
    meta?: ResponseMeta,
    statusCode: number = 200,
    correlationId?: string
  ): NextResponse<ApiResponse<T>> {
    const response: ApiResponse<T> = {
      success: true,
      data,
      meta,
      timestamp: new Date().toISOString(),
      correlationId: correlationId || CorrelationManager.generateCorrelationId(),
      version: this.API_VERSION
    };

    return NextResponse.json(response, {
      status: statusCode,
      headers: {
        'X-Correlation-ID': response.correlationId,
        'X-API-Version': this.API_VERSION
      }
    });
  }

  /**
   * Create an error response
   */
  static error(
    code: ApiErrorCode,
    message: string,
    statusCode: number,
    details?: Record<string, any>,
    field?: string,
    correlationId?: string
  ): NextResponse<ApiResponse<null>> {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code,
        message,
        details: process.env.NODE_ENV === 'development' ? details : undefined,
        field
      },
      timestamp: new Date().toISOString(),
      correlationId: correlationId || CorrelationManager.generateCorrelationId(),
      version: this.API_VERSION
    };

    return NextResponse.json(response, {
      status: statusCode,
      headers: {
        'X-Correlation-ID': response.correlationId,
        'X-API-Version': this.API_VERSION
      }
    });
  }

  /**
   * Create a paginated response
   */
  static paginated<T>(
    data: T[],
    pagination: PaginationMeta,
    performance?: PerformanceMeta,
    correlationId?: string
  ): NextResponse<ApiResponse<T[]>> {
    return this.success(
      data,
      {
        pagination,
        performance
      },
      200,
      correlationId
    );
  }

  /**
   * Create a response with warnings
   */
  static successWithWarnings<T>(
    data: T,
    warnings: string[],
    meta?: Omit<ResponseMeta, 'warnings'>,
    correlationId?: string
  ): NextResponse<ApiResponse<T>> {
    return this.success(
      data,
      {
        ...meta,
        warnings
      },
      200,
      correlationId
    );
  }

  /**
   * Create a deprecated endpoint response
   */
  static deprecated<T>(
    data: T,
    deprecation: DeprecationMeta,
    meta?: Omit<ResponseMeta, 'deprecation'>,
    correlationId?: string
  ): NextResponse<ApiResponse<T>> {
    const response = this.success(
      data,
      {
        ...meta,
        deprecation
      },
      200,
      correlationId
    );

    // Add deprecation headers
    const headers = new Headers(response.headers);
    headers.set('Deprecation', 'true');
    if (deprecation.sunsetDate) {
      headers.set('Sunset', deprecation.sunsetDate);
    }

    return new NextResponse(response.body, {
      status: response.status,
      headers
    });
  }

  /**
   * Handle validation errors with field-specific details
   */
  static validationError(
    errors: Array<{ field: string; message: string; code?: string }>,
    correlationId?: string
  ): NextResponse<ApiResponse<null>> {
    const details = errors.reduce((acc, error) => {
      acc[error.field] = {
        message: error.message,
        code: error.code || 'INVALID_VALUE'
      };
      return acc;
    }, {} as Record<string, any>);

    return this.error(
      ApiErrorCode.VALIDATION_ERROR,
      'Validation failed',
      400,
      { fields: details },
      undefined,
      correlationId
    );
  }

  /**
   * Common error responses
   */
  static notFound(resource: string = 'Resource', correlationId?: string): NextResponse<ApiResponse<null>> {
    return this.error(
      ApiErrorCode.NOT_FOUND,
      `${resource} not found`,
      404,
      undefined,
      undefined,
      correlationId
    );
  }

  static unauthorized(message: string = 'Authentication required', correlationId?: string): NextResponse<ApiResponse<null>> {
    return this.error(
      ApiErrorCode.AUTHENTICATION_ERROR,
      message,
      401,
      undefined,
      undefined,
      correlationId
    );
  }

  static forbidden(message: string = 'Access denied', correlationId?: string): NextResponse<ApiResponse<null>> {
    return this.error(
      ApiErrorCode.AUTHORIZATION_ERROR,
      message,
      403,
      undefined,
      undefined,
      correlationId
    );
  }

  static rateLimitExceeded(retryAfter?: number, correlationId?: string): NextResponse<ApiResponse<null>> {
    const response = this.error(
      ApiErrorCode.RATE_LIMIT_EXCEEDED,
      'Rate limit exceeded',
      429,
      retryAfter ? { retryAfter } : undefined,
      undefined,
      correlationId
    );

    if (retryAfter) {
      const headers = new Headers(response.headers);
      headers.set('Retry-After', retryAfter.toString());
      return new NextResponse(response.body, {
        status: response.status,
        headers
      });
    }

    return response;
  }

  static internalServerError(message: string = 'Internal server error', correlationId?: string): NextResponse<ApiResponse<null>> {
    return this.error(
      ApiErrorCode.INTERNAL_SERVER_ERROR,
      message,
      500,
      undefined,
      undefined,
      correlationId
    );
  }

  static serviceUnavailable(message: string = 'Service temporarily unavailable', correlationId?: string): NextResponse<ApiResponse<null>> {
    return this.error(
      ApiErrorCode.SERVICE_UNAVAILABLE,
      message,
      503,
      undefined,
      undefined,
      correlationId
    );
  }
}

/**
 * Utility function to extract correlation ID from request headers
 */
export function getCorrelationId(request: Request): string {
  return request.headers.get('X-Correlation-ID') || CorrelationManager.generateCorrelationId();
}

/**
 * Performance tracking utility for API responses
 */
export class PerformanceTracker {
  private startTime: number;
  private queryCount: number = 0;
  private cacheHit: boolean = false;

  constructor() {
    this.startTime = Date.now();
  }

  incrementQueryCount(): void {
    this.queryCount++;
  }

  setCacheHit(hit: boolean): void {
    this.cacheHit = hit;
  }

  getMetrics(): PerformanceMeta {
    return {
      executionTime: Date.now() - this.startTime,
      queryCount: this.queryCount > 0 ? this.queryCount : undefined,
      cacheHit: this.cacheHit
    };
  }
}