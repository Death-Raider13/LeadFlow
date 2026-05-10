import { OpenAPIV3 } from 'openapi-types';
import { ApiVersion, ApiVersionManager } from './versioning';
import { ApiErrorCode } from './response-formatter';

/**
 * OpenAPI Specification Generator
 * Automatically generates OpenAPI documentation from code annotations and route definitions
 */

export interface RouteDefinition {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  summary: string;
  description?: string;
  tags?: string[];
  parameters?: ParameterDefinition[];
  requestBody?: RequestBodyDefinition;
  responses: ResponseDefinition[];
  security?: SecurityRequirement[];
  deprecated?: boolean;
  version?: ApiVersion;
}

export interface ParameterDefinition {
  name: string;
  in: 'query' | 'path' | 'header';
  required?: boolean;
  description?: string;
  schema: SchemaDefinition;
  example?: any;
}

export interface RequestBodyDefinition {
  description?: string;
  required?: boolean;
  content: {
    [mediaType: string]: {
      schema: SchemaDefinition;
      example?: any;
    };
  };
}

export interface ResponseDefinition {
  status: number;
  description: string;
  content?: {
    [mediaType: string]: {
      schema: SchemaDefinition;
      example?: any;
    };
  };
  headers?: {
    [headerName: string]: {
      description?: string;
      schema: SchemaDefinition;
    };
  };
}

export interface SchemaDefinition {
  type?: string;
  format?: string;
  properties?: { [key: string]: SchemaDefinition };
  items?: SchemaDefinition;
  required?: string[];
  enum?: any[];
  example?: any;
  description?: string;
  $ref?: string;
  minimum?: number;
  maximum?: number;
  default?: any;
}

export interface SecurityRequirement {
  [securityScheme: string]: string[];
}

export class OpenApiGenerator {
  private routes: RouteDefinition[] = [];
  private schemas: { [key: string]: SchemaDefinition } = {};

  constructor() {
    this.initializeCommonSchemas();
  }

  /**
   * Register a route for documentation generation
   */
  registerRoute(route: RouteDefinition): void {
    this.routes.push(route);
  }

  /**
   * Register a reusable schema component
   */
  registerSchema(name: string, schema: SchemaDefinition): void {
    this.schemas[name] = schema;
  }

  /**
   * Generate complete OpenAPI specification
   */
  generateSpec(version: ApiVersion = ApiVersionManager.getCurrentVersion()): OpenAPIV3.Document {
    const versionString = ApiVersionManager.versionToString(version);
    
    const spec: OpenAPIV3.Document = {
      openapi: '3.0.3',
      info: {
        title: 'LeadFlow API',
        description: 'Comprehensive API for lead management and CRM operations',
        version: versionString,
        contact: {
          name: 'LeadFlow Support',
          email: 'support@leadflow.com'
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT'
        }
      },
      servers: [
        {
          url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
          description: 'Production server'
        },
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ],
      paths: this.generatePaths(version),
      components: {
        schemas: {
          ...this.schemas,
          ...this.generateStandardSchemas()
        } as { [key: string]: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject },
        securitySchemes: this.generateSecuritySchemes(),
        parameters: this.generateCommonParameters(),
        responses: this.generateCommonResponses()
      },
      security: [
        { ApiKeyAuth: [] },
        { BearerAuth: [] }
      ],
      tags: this.generateTags()
    };

    return spec;
  }

  /**
   * Generate paths object from registered routes
   */
  private generatePaths(version: ApiVersion): OpenAPIV3.PathsObject {
    const paths: OpenAPIV3.PathsObject = {};

    // Filter routes by version compatibility
    const compatibleRoutes = this.routes.filter(route => {
      if (!route.version) return true;
      return ApiVersionManager.compareVersions(route.version, version) <= 0;
    });

    for (const route of compatibleRoutes) {
      if (!paths[route.path]) {
        paths[route.path] = {};
      }

      const operation: OpenAPIV3.OperationObject = {
        summary: route.summary,
        description: route.description,
        tags: route.tags,
        parameters: route.parameters?.map(p => this.convertParameter(p)),
        requestBody: route.requestBody ? this.convertRequestBody(route.requestBody) : undefined,
        responses: this.convertResponses(route.responses),
        security: route.security,
        deprecated: route.deprecated
      };

      (paths[route.path] as any)[route.method.toLowerCase()] = operation;
    }

    return paths;
  }

  /**
   * Convert parameter definition to OpenAPI format
   */
  private convertParameter(param: ParameterDefinition): OpenAPIV3.ParameterObject {
    return {
      name: param.name,
      in: param.in,
      required: param.required,
      description: param.description,
      schema: this.convertSchema(param.schema),
      example: param.example
    };
  }

  /**
   * Convert request body definition to OpenAPI format
   */
  private convertRequestBody(requestBody: RequestBodyDefinition): OpenAPIV3.RequestBodyObject {
    const content: { [mediaType: string]: OpenAPIV3.MediaTypeObject } = {};
    
    for (const [mediaType, mediaTypeObj] of Object.entries(requestBody.content)) {
      content[mediaType] = {
        schema: this.convertSchema(mediaTypeObj.schema),
        example: mediaTypeObj.example
      };
    }

    return {
      description: requestBody.description,
      required: requestBody.required,
      content
    };
  }

  /**
   * Convert response definitions to OpenAPI format
   */
  private convertResponses(responses: ResponseDefinition[]): OpenAPIV3.ResponsesObject {
    const result: OpenAPIV3.ResponsesObject = {};

    for (const response of responses) {
      const content: { [mediaType: string]: OpenAPIV3.MediaTypeObject } = {};
      
      if (response.content) {
        for (const [mediaType, mediaTypeObj] of Object.entries(response.content)) {
          content[mediaType] = {
            schema: this.convertSchema(mediaTypeObj.schema),
            example: mediaTypeObj.example
          };
        }
      }

      const headers: { [headerName: string]: OpenAPIV3.HeaderObject } = {};
      if (response.headers) {
        for (const [headerName, headerObj] of Object.entries(response.headers)) {
          headers[headerName] = {
            description: headerObj.description,
            schema: this.convertSchema(headerObj.schema)
          };
        }
      }

      result[response.status.toString()] = {
        description: response.description,
        content: Object.keys(content).length > 0 ? content : undefined,
        headers: Object.keys(headers).length > 0 ? headers : undefined
      };
    }

    return result;
  }

  /**
   * Convert schema definition to OpenAPI format
   */
  private convertSchema(schema: SchemaDefinition): OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject {
    if (schema.$ref) {
      return { $ref: `#/components/schemas/${schema.$ref}` };
    }

    const result: OpenAPIV3.SchemaObject = {};

    if (schema.type) result.type = schema.type as any;
    if (schema.format) result.format = schema.format;
    if (schema.description) result.description = schema.description;
    if (schema.example !== undefined) result.example = schema.example;
    if (schema.enum) result.enum = schema.enum;
    if (schema.required) result.required = schema.required;
    if (schema.minimum !== undefined) (result as any).minimum = schema.minimum;
    if (schema.maximum !== undefined) (result as any).maximum = schema.maximum;
    if (schema.default !== undefined) result.default = schema.default;

    if (schema.properties) {
      result.properties = {};
      for (const [key, prop] of Object.entries(schema.properties)) {
        result.properties[key] = this.convertSchema(prop);
      }
    }

    if (schema.items && schema.type === 'array') {
      (result as any).items = this.convertSchema(schema.items);
    }

    return result;
  }

  /**
   * Initialize common schemas used across the API
   */
  private initializeCommonSchemas(): void {
    // Standard API Response schema
    this.registerSchema('ApiResponse', {
      type: 'object',
      properties: {
        success: { type: 'boolean', description: 'Indicates if the request was successful' },
        data: { description: 'Response data (varies by endpoint)' },
        error: { $ref: 'ApiError' },
        meta: { $ref: 'ResponseMeta' },
        timestamp: { type: 'string', format: 'date-time', description: 'Response timestamp' },
        correlationId: { type: 'string', description: 'Request correlation ID for tracking' },
        version: { type: 'string', description: 'API version used' }
      },
      required: ['success', 'timestamp', 'correlationId', 'version']
    });

    // API Error schema
    this.registerSchema('ApiError', {
      type: 'object',
      properties: {
        code: { 
          type: 'string', 
          enum: Object.values(ApiErrorCode),
          description: 'Error code identifying the type of error'
        },
        message: { type: 'string', description: 'Human-readable error message' },
        details: { type: 'object', description: 'Additional error details' },
        field: { type: 'string', description: 'Field name for validation errors' }
      },
      required: ['code', 'message']
    });

    // Response metadata schema
    this.registerSchema('ResponseMeta', {
      type: 'object',
      properties: {
        pagination: { $ref: 'PaginationMeta' },
        performance: { $ref: 'PerformanceMeta' },
        warnings: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Non-critical warnings'
        },
        deprecation: { $ref: 'DeprecationMeta' }
      }
    });

    // Pagination metadata schema
    this.registerSchema('PaginationMeta', {
      type: 'object',
      properties: {
        page: { type: 'integer', minimum: 1, description: 'Current page number' },
        limit: { type: 'integer', minimum: 1, maximum: 100, description: 'Items per page' },
        total: { type: 'integer', minimum: 0, description: 'Total number of items' },
        totalPages: { type: 'integer', minimum: 0, description: 'Total number of pages' },
        hasNext: { type: 'boolean', description: 'Whether there are more pages' },
        hasPrevious: { type: 'boolean', description: 'Whether there are previous pages' }
      },
      required: ['page', 'limit', 'total', 'totalPages', 'hasNext', 'hasPrevious']
    });

    // Performance metadata schema
    this.registerSchema('PerformanceMeta', {
      type: 'object',
      properties: {
        executionTime: { type: 'number', description: 'Execution time in milliseconds' },
        queryCount: { type: 'integer', description: 'Number of database queries executed' },
        cacheHit: { type: 'boolean', description: 'Whether the response was served from cache' }
      },
      required: ['executionTime']
    });

    // Deprecation metadata schema
    this.registerSchema('DeprecationMeta', {
      type: 'object',
      properties: {
        deprecated: { type: 'boolean', description: 'Whether the endpoint is deprecated' },
        deprecatedSince: { type: 'string', format: 'date', description: 'Date when deprecation started' },
        sunsetDate: { type: 'string', format: 'date', description: 'Date when endpoint will be removed' },
        migrationGuide: { type: 'string', description: 'URL to migration guide' }
      },
      required: ['deprecated']
    });
  }

  /**
   * Generate standard response schemas
   */
  private generateStandardSchemas(): { [key: string]: OpenAPIV3.SchemaObject } {
    return {
      // Health check response
      HealthStatus: {
        type: 'object',
        properties: {
          status: { 
            type: 'string', 
            enum: ['healthy', 'degraded', 'unhealthy'],
            description: 'Overall system health status'
          },
          checks: { 
            type: 'object',
            description: 'Individual health check results'
          },
          metrics: { 
            type: 'object',
            description: 'System performance metrics'
          }
        },
        required: ['status', 'checks']
      },

      // Lead model
      Lead: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Unique lead identifier' },
          name: { type: 'string', description: 'Lead name' },
          email: { type: 'string', format: 'email', description: 'Lead email address' },
          phone: { type: 'string', description: 'Lead phone number' },
          source: { 
            type: 'array', 
            items: { type: 'string' },
            description: 'Lead sources'
          },
          status: { 
            type: 'string',
            enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
            description: 'Lead status'
          },
          tags: { 
            type: 'array', 
            items: { type: 'string' },
            description: 'Lead tags'
          },
          createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' }
        },
        required: ['id', 'name', 'status', 'createdAt', 'updatedAt']
      }
    };
  }

  /**
   * Generate security schemes
   */
  private generateSecuritySchemes(): { [key: string]: OpenAPIV3.SecuritySchemeObject } {
    return {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API key for authentication'
      },
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token for authentication'
      }
    };
  }

  /**
   * Generate common parameters
   */
  private generateCommonParameters(): { [key: string]: OpenAPIV3.ParameterObject } {
    return {
      PageParam: {
        name: 'page',
        in: 'query',
        description: 'Page number for pagination',
        schema: { type: 'integer', minimum: 1, default: 1 }
      },
      LimitParam: {
        name: 'limit',
        in: 'query',
        description: 'Number of items per page',
        schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
      },
      SortByParam: {
        name: 'sortBy',
        in: 'query',
        description: 'Field to sort by',
        schema: { type: 'string' }
      },
      SortOrderParam: {
        name: 'sortOrder',
        in: 'query',
        description: 'Sort order',
        schema: { type: 'string', enum: ['asc', 'desc'], default: 'asc' }
      }
    };
  }

  /**
   * Generate common responses
   */
  private generateCommonResponses(): { [key: string]: OpenAPIV3.ResponseObject } {
    return {
      BadRequest: {
        description: 'Bad request - validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        }
      },
      Unauthorized: {
        description: 'Unauthorized - authentication required',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        }
      },
      Forbidden: {
        description: 'Forbidden - insufficient permissions',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        }
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        }
      },
      RateLimitExceeded: {
        description: 'Rate limit exceeded',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        },
        headers: {
          'Retry-After': {
            description: 'Seconds to wait before retrying',
            schema: { type: 'integer' }
          }
        }
      },
      InternalServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        }
      }
    };
  }

  /**
   * Generate API tags
   */
  private generateTags(): OpenAPIV3.TagObject[] {
    return [
      {
        name: 'Health',
        description: 'System health and monitoring endpoints'
      },
      {
        name: 'Leads',
        description: 'Lead management operations'
      },
      {
        name: 'Authentication',
        description: 'Authentication and authorization'
      },
      {
        name: 'Metrics',
        description: 'Performance and usage metrics'
      },
      {
        name: 'Admin',
        description: 'Administrative operations'
      }
    ];
  }
}

// Global instance for route registration
export const openApiGenerator = new OpenApiGenerator();