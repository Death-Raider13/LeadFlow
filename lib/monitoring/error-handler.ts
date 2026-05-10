import { NextRequest, NextResponse } from 'next/server';
import { logger, LogContext, AuditEvent } from './logger';
import { CorrelationManager } from './logger';

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    correlationId: string;
    timestamp: string;
  };
}

export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR'
}

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class CentralizedErrorHandler {
  static handleError(
    error: Error | AppError,
    request?: NextRequest,
    context?: Partial<LogContext>
  ): NextResponse<ErrorResponse> {
    const correlationId = context?.requestId || CorrelationManager.generateCorrelationId();
    const timestamp = new Date().toISOString();

    // Determine error details
    let errorCode: ErrorCode;
    let statusCode: number;
    let userMessage: string;
    let details: Record<string, any> | undefined;

    if (error instanceof AppError) {
      errorCode = error.code;
      statusCode = error.statusCode;
      userMessage = error.message;
      details = error.details;
    } else {
      // Handle unknown errors
      errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
      statusCode = 500;
      userMessage = 'An unexpected error occurred';
      details = undefined;
    }

    // Create log context
    const logContext: LogContext = {
      requestId: correlationId,
      endpoint: request?.nextUrl?.pathname || 'unknown',
      userId: context?.userId,
      metadata: {
        method: request?.method,
        userAgent: request?.headers.get('user-agent'),
        ip: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip'),
        ...details
      }
    };

    // Log the error
    logger.error(`${errorCode}: ${error.message}`, error, logContext);

    // Create audit event for security-related errors
    if (this.isSecurityError(errorCode)) {
      const auditEvent: AuditEvent = {
        type: 'security_error',
        action: errorCode,
        userId: context?.userId,
        resource: request?.nextUrl?.pathname,
        metadata: {
          ip: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip'),
          userAgent: request?.headers.get('user-agent')
        },
        timestamp: new Date(),
        requestId: correlationId
      };
      logger.audit(auditEvent);
    }

    // Create error response
    const errorResponse: ErrorResponse = {
      error: {
        code: errorCode,
        message: userMessage,
        details: process.env.NODE_ENV === 'development' ? details : undefined,
        correlationId,
        timestamp
      }
    };

    return NextResponse.json(errorResponse, { 
      status: statusCode,
      headers: {
        'X-Correlation-ID': correlationId
      }
    });
  }

  static handleAsyncError(
    error: Error | AppError,
    context?: Partial<LogContext>
  ): void {
    const correlationId = context?.requestId || CorrelationManager.generateCorrelationId();

    const logContext: LogContext = {
      requestId: correlationId,
      endpoint: context?.endpoint || 'async-operation',
      userId: context?.userId,
      metadata: context?.metadata
    };

    logger.error(`Async error: ${error.message}`, error, logContext);

    // For critical errors, we might want to send alerts
    if (this.isCriticalError(error)) {
      this.sendCriticalErrorAlert(error, logContext);
    }
  }

  private static isSecurityError(errorCode: ErrorCode): boolean {
    return [
      ErrorCode.AUTHENTICATION_ERROR,
      ErrorCode.AUTHORIZATION_ERROR,
      ErrorCode.RATE_LIMIT_EXCEEDED
    ].includes(errorCode);
  }

  private static isCriticalError(error: Error | AppError): boolean {
    if (error instanceof AppError) {
      return [
        ErrorCode.DATABASE_ERROR,
        ErrorCode.CONFIGURATION_ERROR
      ].includes(error.code);
    }
    return true; // Unknown errors are considered critical
  }

  private static sendCriticalErrorAlert(error: Error, context: LogContext): void {
    // In a real implementation, this would send alerts to monitoring systems
    // For now, we'll just log it as a critical alert
    logger.error('CRITICAL ERROR ALERT', error, {
      ...context,
      metadata: {
        ...context.metadata,
        alertType: 'critical',
        requiresImmedateAttention: true
      }
    });
  }
}

// Utility function to wrap async operations with error handling
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: Partial<LogContext>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      CentralizedErrorHandler.handleAsyncError(
        error instanceof Error ? error : new Error(String(error)),
        context
      );
      throw error;
    }
  };
}