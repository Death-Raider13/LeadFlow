import { NextRequest, NextResponse } from 'next/server';
import { OpenAPIV3 } from 'openapi-types';
import { openApiGenerator } from './openapi-generator';
import { ApiVersionManager } from './versioning';
import { logger } from '@/lib/monitoring/logger';
import { ApiResponseFormatter, ApiErrorCode } from './response-formatter';

/**
 * API Validation Middleware
 * Validates requests and responses against OpenAPI specification
 */

export interface ValidationOptions {
  validateRequest?: boolean;
  validateResponse?: boolean;
  strictMode?: boolean; // Fail on validation errors vs. log warnings
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: 'request' | 'response';
  field?: string;
  message: string;
  value?: any;
  expected?: any;
}

export interface ValidationWarning {
  type: 'request' | 'response';
  field?: string;
  message: string;
  suggestion?: string;
}

export class ApiValidator {
  private spec: OpenAPIV3.Document;
  private schemas: Map<string, OpenAPIV3.SchemaObject> = new Map();

  constructor(spec?: OpenAPIV3.Document) {
    this.spec = spec || openApiGenerator.generateSpec();
    this.loadSchemas();
  }

  /**
   * Load and cache schemas for validation
   */
  private loadSchemas(): void {
    if (this.spec.components?.schemas) {
      for (const [name, schema] of Object.entries(this.spec.components.schemas)) {
        this.schemas.set(name, schema as OpenAPIV3.SchemaObject);
      }
    }
  }

  /**
   * Validate request against OpenAPI specification
   */
  validateRequest(request: NextRequest, path: string, method: string): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    try {
      // Find the operation in the spec
      const operation = this.findOperation(path, method);
      if (!operation) {
        warnings.push({
          type: 'request',
          message: `No OpenAPI specification found for ${method} ${path}`,
          suggestion: 'Add documentation for this endpoint'
        });
        return { valid: true, errors, warnings };
      }

      // Validate parameters
      if (operation.parameters) {
        for (const param of operation.parameters) {
          const paramObj = param as OpenAPIV3.ParameterObject;
          const validationResult = this.validateParameter(request, paramObj);
          errors.push(...validationResult.errors);
          warnings.push(...validationResult.warnings);
        }
      }

      // Validate request body
      if (operation.requestBody && request.method !== 'GET') {
        // Note: We can't easily validate request body here since it's a stream
        // This would typically be done in the handler after parsing
        warnings.push({
          type: 'request',
          message: 'Request body validation not implemented in middleware',
          suggestion: 'Validate request body in the handler after parsing'
        });
      }

      // Validate headers
      const contentType = request.headers.get('content-type');
      if (operation.requestBody && contentType) {
        const requestBodyObj = operation.requestBody as OpenAPIV3.RequestBodyObject;
        if (requestBodyObj.content && !requestBodyObj.content[contentType]) {
          errors.push({
            type: 'request',
            field: 'content-type',
            message: `Unsupported content type: ${contentType}`,
            value: contentType,
            expected: Object.keys(requestBodyObj.content)
          });
        }
      }

    } catch (error) {
      errors.push({
        type: 'request',
        message: `Validation error: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate response against OpenAPI specification
   */
  validateResponse(
    response: NextResponse, 
    path: string, 
    method: string, 
    statusCode: number
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    try {
      // Find the operation in the spec
      const operation = this.findOperation(path, method);
      if (!operation) {
        warnings.push({
          type: 'response',
          message: `No OpenAPI specification found for ${method} ${path}`,
          suggestion: 'Add documentation for this endpoint'
        });
        return { valid: true, errors, warnings };
      }

      // Find the response specification
      const responseSpec = operation.responses?.[statusCode.toString()] || 
                          operation.responses?.default;
      
      if (!responseSpec) {
        warnings.push({
          type: 'response',
          message: `No response specification found for status ${statusCode}`,
          suggestion: `Add response documentation for status ${statusCode}`
        });
        return { valid: true, errors, warnings };
      }

      // Validate response headers
      const responseObj = responseSpec as OpenAPIV3.ResponseObject;
      if (responseObj.headers) {
        for (const [headerName, headerSpec] of Object.entries(responseObj.headers)) {
          const headerValue = response.headers.get(headerName);
          const headerObj = headerSpec as OpenAPIV3.HeaderObject;
          
          if (headerObj.required && !headerValue) {
            errors.push({
              type: 'response',
              field: `headers.${headerName}`,
              message: `Required header missing: ${headerName}`,
              expected: 'present'
            });
          }
        }
      }

      // Validate content type
      const contentType = response.headers.get('content-type');
      if (responseObj.content && contentType) {
        const supportedTypes = Object.keys(responseObj.content);
        const isSupported = supportedTypes.some(type => 
          contentType.includes(type) || type.includes('*')
        );
        
        if (!isSupported) {
          errors.push({
            type: 'response',
            field: 'content-type',
            message: `Unsupported response content type: ${contentType}`,
            value: contentType,
            expected: supportedTypes
          });
        }
      }

    } catch (error) {
      errors.push({
        type: 'response',
        message: `Validation error: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate a single parameter
   */
  private validateParameter(request: NextRequest, param: OpenAPIV3.ParameterObject): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    let value: string | null = null;

    // Extract parameter value based on location
    switch (param.in) {
      case 'query':
        value = request.nextUrl.searchParams.get(param.name);
        break;
      case 'header':
        value = request.headers.get(param.name);
        break;
      case 'path':
        // Path parameters would need to be extracted from the route
        // This is complex and would require route matching
        warnings.push({
          type: 'request',
          field: `parameters.${param.name}`,
          message: 'Path parameter validation not implemented',
          suggestion: 'Implement path parameter extraction'
        });
        return { valid: true, errors, warnings };
    }

    // Check required parameters
    if (param.required && (value === null || value === '')) {
      errors.push({
        type: 'request',
        field: `parameters.${param.name}`,
        message: `Required parameter missing: ${param.name}`,
        expected: 'present'
      });
      return { valid: false, errors, warnings };
    }

    // Validate parameter schema if value exists
    if (value !== null && param.schema) {
      const schemaValidation = this.validateValueAgainstSchema(
        value, 
        param.schema as OpenAPIV3.SchemaObject,
        `parameters.${param.name}`
      );
      errors.push(...schemaValidation.errors);
      warnings.push(...schemaValidation.warnings);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate a value against a schema
   */
  private validateValueAgainstSchema(
    value: any, 
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject, 
    fieldPath: string
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    try {
      // Handle schema references
      if ('$ref' in schema) {
        const refName = schema.$ref.replace('#/components/schemas/', '');
        const referencedSchema = this.schemas.get(refName);
        if (referencedSchema) {
          return this.validateValueAgainstSchema(value, referencedSchema, fieldPath);
        } else {
          warnings.push({
            type: 'request',
            field: fieldPath,
            message: `Schema reference not found: ${schema.$ref}`,
            suggestion: 'Ensure all referenced schemas are defined'
          });
          return { valid: true, errors, warnings };
        }
      }

      const schemaObj = schema as OpenAPIV3.SchemaObject;

      // Type validation
      if (schemaObj.type) {
        const isValidType = this.validateType(value, schemaObj.type);
        if (!isValidType) {
          errors.push({
            type: 'request',
            field: fieldPath,
            message: `Invalid type for ${fieldPath}`,
            value: value,
            expected: schemaObj.type
          });
        }
      }

      // Enum validation
      if (schemaObj.enum && !schemaObj.enum.includes(value)) {
        errors.push({
          type: 'request',
          field: fieldPath,
          message: `Invalid enum value for ${fieldPath}`,
          value: value,
          expected: schemaObj.enum
        });
      }

      // Format validation (basic)
      if (schemaObj.format) {
        const isValidFormat = this.validateFormat(value, schemaObj.format);
        if (!isValidFormat) {
          warnings.push({
            type: 'request',
            field: fieldPath,
            message: `Invalid format for ${fieldPath}`,
            suggestion: `Expected format: ${schemaObj.format}`
          });
        }
      }

    } catch (error) {
      errors.push({
        type: 'request',
        field: fieldPath,
        message: `Schema validation error: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate type
   */
  private validateType(value: any, expectedType: string): boolean {
    switch (expectedType) {
      case 'string':
        return typeof value === 'string';
      case 'number':
      case 'integer':
        return !isNaN(Number(value));
      case 'boolean':
        return value === 'true' || value === 'false' || typeof value === 'boolean';
      case 'array':
        return Array.isArray(value);
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      default:
        return true; // Unknown types pass validation
    }
  }

  /**
   * Validate format (basic implementation)
   */
  private validateFormat(value: string, format: string): boolean {
    switch (format) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'date':
        return !isNaN(Date.parse(value)) && /^\d{4}-\d{2}-\d{2}$/.test(value);
      case 'date-time':
        return !isNaN(Date.parse(value));
      case 'uuid':
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
      default:
        return true; // Unknown formats pass validation
    }
  }

  /**
   * Find operation in OpenAPI spec
   */
  private findOperation(path: string, method: string): OpenAPIV3.OperationObject | null {
    // Normalize path for matching
    const normalizedPath = this.normalizePath(path);
    
    // Try exact match first
    const pathItem = this.spec.paths?.[normalizedPath];
    if (pathItem) {
      const operation = pathItem[method.toLowerCase() as keyof OpenAPIV3.PathItemObject];
      if (operation && typeof operation === 'object') {
        return operation as OpenAPIV3.OperationObject;
      }
    }

    // Try pattern matching for parameterized paths
    for (const [specPath, pathItem] of Object.entries(this.spec.paths || {})) {
      if (this.pathMatches(normalizedPath, specPath)) {
        const operation = pathItem?.[method.toLowerCase() as keyof OpenAPIV3.PathItemObject];
        if (operation && typeof operation === 'object') {
          return operation as OpenAPIV3.OperationObject;
        }
      }
    }

    return null;
  }

  /**
   * Normalize path for matching
   */
  private normalizePath(path: string): string {
    // Remove query parameters and fragments
    return path.split('?')[0].split('#')[0];
  }

  /**
   * Check if a path matches a pattern with parameters
   */
  private pathMatches(actualPath: string, specPath: string): boolean {
    // Convert OpenAPI path parameters {id} to regex pattern
    const pattern = specPath.replace(/\{[^}]+\}/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(actualPath);
  }
}

/**
 * Middleware function to validate API requests and responses
 */
export function withApiValidation(options: ValidationOptions = {}) {
  const validator = new ApiValidator();
  
  return function <T extends any[], R>(
    handler: (...args: T) => Promise<NextResponse | R>
  ) {
    return async (...args: T): Promise<NextResponse | R> => {
      const request = args[0] as NextRequest;
      const path = request.nextUrl.pathname;
      const method = request.method;

      // Validate request if enabled
      if (options.validateRequest !== false) {
        const requestValidation = validator.validateRequest(request, path, method);
        
        if (!requestValidation.valid && options.strictMode) {
          logger.error('API request validation failed', new Error('Validation failed'), {
            requestId: request.headers.get('X-Correlation-ID') || 'unknown',
            endpoint: path,
            userId: undefined,
            metadata: { method, errors: requestValidation.errors }
          });

          return ApiResponseFormatter.validationError(
            requestValidation.errors.map(error => ({
              field: error.field || 'unknown',
              message: error.message,
              code: 'VALIDATION_ERROR'
            }))
          ) as any;
        }

        // Log warnings
        if (requestValidation.warnings.length > 0) {
          logger.warn('API request validation warnings', {
            requestId: request.headers.get('X-Correlation-ID') || 'unknown',
            endpoint: path,
            userId: undefined,
            metadata: { method, warnings: requestValidation.warnings }
          });
        }
      }

      // Execute handler
      const result = await handler(...args);

      // Validate response if enabled and result is NextResponse
      if (options.validateResponse !== false && result instanceof NextResponse) {
        const responseValidation = validator.validateResponse(
          result, 
          path, 
          method, 
          result.status
        );

        if (!responseValidation.valid && options.strictMode) {
          logger.error('API response validation failed', new Error('Response validation failed'), {
            requestId: request.headers.get('X-Correlation-ID') || 'unknown',
            endpoint: path,
            userId: undefined,
            metadata: { method, errors: responseValidation.errors }
          });
        }

        // Log warnings
        if (responseValidation.warnings.length > 0) {
          logger.warn('API response validation warnings', {
            requestId: request.headers.get('X-Correlation-ID') || 'unknown',
            endpoint: path,
            userId: undefined,
            metadata: { method, warnings: responseValidation.warnings }
          });
        }
      }

      return result;
    };
  };
}

// Global validator instance
export const apiValidator = new ApiValidator();