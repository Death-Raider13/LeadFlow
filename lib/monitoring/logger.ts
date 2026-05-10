import { randomUUID } from 'crypto';

export interface LogContext {
  userId?: string;
  requestId: string;
  endpoint: string;
  duration?: number;
  metadata?: Record<string, any>;
}

export interface AuditEvent {
  type: string;
  userId?: string;
  action: string;
  resource?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
  requestId: string;
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  AUDIT = 'audit'
}

export interface Logger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: Error, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
  audit(event: AuditEvent): void;
}

class StructuredLogger implements Logger {
  private sensitiveFields = [
    'password',
    'token',
    'apiKey',
    'secret',
    'authorization',
    'cookie',
    'session',
    'key',
    'credential',
    'auth'
  ];

  private sanitizeData(data: any): any {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item));
    }

    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = this.sensitiveFields.some(field => 
        lowerKey.includes(field)
      );

      if (isSensitive) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object') {
        sanitized[key] = this.sanitizeData(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  private formatLogEntry(level: LogLevel, message: string, context?: LogContext, error?: Error): string {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      requestId: context?.requestId || randomUUID(),
      ...(context && {
        userId: context.userId,
        endpoint: context.endpoint,
        duration: context.duration,
        metadata: context.metadata ? this.sanitizeData(context.metadata) : undefined
      }),
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      })
    };

    return JSON.stringify(this.sanitizeData(logEntry));
  }

  info(message: string, context?: LogContext): void {
    const logEntry = this.formatLogEntry(LogLevel.INFO, message, context);
    console.log(logEntry);
  }

  warn(message: string, context?: LogContext): void {
    const logEntry = this.formatLogEntry(LogLevel.WARN, message, context);
    console.warn(logEntry);
  }

  error(message: string, error?: Error, context?: LogContext): void {
    const logEntry = this.formatLogEntry(LogLevel.ERROR, message, context, error);
    console.error(logEntry);
  }

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === 'development') {
      const logEntry = this.formatLogEntry(LogLevel.DEBUG, message, context);
      console.debug(logEntry);
    }
  }

  audit(event: AuditEvent): void {
    const logEntry = {
      timestamp: event.timestamp.toISOString(),
      level: LogLevel.AUDIT,
      type: event.type,
      action: event.action,
      userId: event.userId,
      resource: event.resource,
      requestId: event.requestId,
      metadata: event.metadata ? this.sanitizeData(event.metadata) : undefined
    };

    console.log(JSON.stringify(logEntry));
  }
}

// Singleton logger instance
export const logger = new StructuredLogger();

// Correlation ID management
export class CorrelationManager {
  private static correlationIds = new Map<string, string>();

  static generateCorrelationId(): string {
    return randomUUID();
  }

  static setCorrelationId(key: string, correlationId: string): void {
    this.correlationIds.set(key, correlationId);
  }

  static getCorrelationId(key: string): string | undefined {
    return this.correlationIds.get(key);
  }

  static clearCorrelationId(key: string): void {
    this.correlationIds.delete(key);
  }
}