import { RouteDefinition, ParameterDefinition, RequestBodyDefinition, ResponseDefinition, SchemaDefinition, openApiGenerator } from './openapi-generator';
import { ApiVersion } from './versioning';

/**
 * Route Documentation Decorators
 * Provides decorators and utilities for automatically documenting API routes
 */

export interface ApiDocOptions {
  summary: string;
  description?: string;
  tags?: string[];
  deprecated?: boolean;
  version?: ApiVersion;
  security?: Array<{ [key: string]: string[] }>;
}

export interface ParameterOptions {
  name: string;
  in: 'query' | 'path' | 'header';
  required?: boolean;
  description?: string;
  type?: string;
  format?: string;
  example?: any;
  enum?: any[];
}

export interface RequestBodyOptions {
  description?: string;
  required?: boolean;
  contentType?: string;
  schema?: SchemaDefinition;
  example?: any;
}

export interface ResponseOptions {
  status: number;
  description: string;
  contentType?: string;
  schema?: SchemaDefinition;
  example?: any;
  headers?: { [key: string]: { description?: string; type?: string } };
}

/**
 * Route documentation registry
 */
class RouteDocumentationRegistry {
  private routes: Map<string, Partial<RouteDefinition>> = new Map();

  /**
   * Register route documentation
   */
  registerRoute(path: string, method: string, options: ApiDocOptions): void {
    const key = `${method.toUpperCase()} ${path}`;
    
    const route: Partial<RouteDefinition> = {
      path,
      method: method.toUpperCase() as any,
      summary: options.summary,
      description: options.description,
      tags: options.tags,
      deprecated: options.deprecated,
      version: options.version,
      security: options.security,
      parameters: [],
      responses: []
    };

    this.routes.set(key, route);
  }

  /**
   * Add parameter to route
   */
  addParameter(path: string, method: string, param: ParameterOptions): void {
    const key = `${method.toUpperCase()} ${path}`;
    const route = this.routes.get(key);
    
    if (route) {
      if (!route.parameters) route.parameters = [];
      
      route.parameters.push({
        name: param.name,
        in: param.in,
        required: param.required,
        description: param.description,
        schema: {
          type: param.type || 'string',
          format: param.format,
          enum: param.enum,
          example: param.example
        }
      });
    }
  }

  /**
   * Add request body to route
   */
  addRequestBody(path: string, method: string, body: RequestBodyOptions): void {
    const key = `${method.toUpperCase()} ${path}`;
    const route = this.routes.get(key);
    
    if (route) {
      route.requestBody = {
        description: body.description,
        required: body.required,
        content: {
          [body.contentType || 'application/json']: {
            schema: body.schema || { type: 'object' },
            example: body.example
          }
        }
      };
    }
  }

  /**
   * Add response to route
   */
  addResponse(path: string, method: string, response: ResponseOptions): void {
    const key = `${method.toUpperCase()} ${path}`;
    const route = this.routes.get(key);
    
    if (route) {
      if (!route.responses) route.responses = [];
      
      const responseObj: ResponseDefinition = {
        status: response.status,
        description: response.description
      };

      if (response.schema || response.example) {
        responseObj.content = {
          [response.contentType || 'application/json']: {
            schema: response.schema || { type: 'object' },
            example: response.example
          }
        };
      }

      if (response.headers) {
        responseObj.headers = {};
        for (const [name, header] of Object.entries(response.headers)) {
          responseObj.headers[name] = {
            description: header.description,
            schema: { type: header.type || 'string' }
          };
        }
      }

      route.responses.push(responseObj);
    }
  }

  /**
   * Finalize and register all routes with OpenAPI generator
   */
  finalizeRoutes(): void {
    for (const [key, route] of this.routes.entries()) {
      if (route.path && route.method && route.summary && route.responses) {
        openApiGenerator.registerRoute(route as RouteDefinition);
      }
    }
  }

  /**
   * Get all registered routes
   */
  getRoutes(): RouteDefinition[] {
    return Array.from(this.routes.values())
      .filter(route => route.path && route.method && route.summary && route.responses)
      .map(route => route as RouteDefinition);
  }
}

// Global registry instance
export const routeRegistry = new RouteDocumentationRegistry();

/**
 * Decorator for documenting API routes
 */
export function ApiDoc(options: ApiDocOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Extract path from the route file structure
    // This is a simplified approach - in a real implementation, you might use
    // more sophisticated path extraction from the file system or route metadata
    const path = extractPathFromContext();
    const method = propertyKey.toUpperCase();
    
    routeRegistry.registerRoute(path, method, options);
    
    return descriptor;
  };
}

/**
 * Decorator for documenting parameters
 */
export function ApiParam(options: ParameterOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const path = extractPathFromContext();
    const method = propertyKey.toUpperCase();
    
    routeRegistry.addParameter(path, method, options);
    
    return descriptor;
  };
}

/**
 * Decorator for documenting request body
 */
export function ApiBody(options: RequestBodyOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const path = extractPathFromContext();
    const method = propertyKey.toUpperCase();
    
    routeRegistry.addRequestBody(path, method, options);
    
    return descriptor;
  };
}

/**
 * Decorator for documenting responses
 */
export function ApiResponse(options: ResponseOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const path = extractPathFromContext();
    const method = propertyKey.toUpperCase();
    
    routeRegistry.addResponse(path, method, options);
    
    return descriptor;
  };
}

/**
 * Utility function to extract API path from current context
 * This is a simplified implementation - in practice, you might use
 * more sophisticated methods to determine the route path
 */
function extractPathFromContext(): string {
  // Get the current file path from the stack trace
  const stack = new Error().stack;
  if (!stack) return '/unknown';
  
  const lines = stack.split('\n');
  for (const line of lines) {
    if (line.includes('/app/api/')) {
      const match = line.match(/\/app\/api\/([^)]+)/);
      if (match) {
        let path = match[1];
        // Remove file extension and convert to API path
        path = path.replace(/\/route\.(ts|js).*$/, '');
        path = path.replace(/\[([^\]]+)\]/g, '{$1}'); // Convert [id] to {id}
        return `/api/${path}`;
      }
    }
  }
  
  return '/unknown';
}

/**
 * Manual route registration for cases where decorators can't be used
 */
export class RouteDocBuilder {
  private route: Partial<RouteDefinition>;

  constructor(path: string, method: string) {
    this.route = {
      path,
      method: method.toUpperCase() as any,
      parameters: [],
      responses: []
    };
  }

  summary(summary: string): RouteDocBuilder {
    this.route.summary = summary;
    return this;
  }

  description(description: string): RouteDocBuilder {
    this.route.description = description;
    return this;
  }

  tags(...tags: string[]): RouteDocBuilder {
    this.route.tags = tags;
    return this;
  }

  deprecated(deprecated: boolean = true): RouteDocBuilder {
    this.route.deprecated = deprecated;
    return this;
  }

  version(version: ApiVersion): RouteDocBuilder {
    this.route.version = version;
    return this;
  }

  parameter(param: ParameterOptions): RouteDocBuilder {
    if (!this.route.parameters) this.route.parameters = [];
    
    this.route.parameters.push({
      name: param.name,
      in: param.in,
      required: param.required,
      description: param.description,
      schema: {
        type: param.type || 'string',
        format: param.format,
        enum: param.enum,
        example: param.example
      }
    });
    
    return this;
  }

  requestBody(body: RequestBodyOptions): RouteDocBuilder {
    this.route.requestBody = {
      description: body.description,
      required: body.required,
      content: {
        [body.contentType || 'application/json']: {
          schema: body.schema || { type: 'object' },
          example: body.example
        }
      }
    };
    
    return this;
  }

  response(response: ResponseOptions): RouteDocBuilder {
    if (!this.route.responses) this.route.responses = [];
    
    const responseObj: ResponseDefinition = {
      status: response.status,
      description: response.description
    };

    if (response.schema || response.example) {
      responseObj.content = {
        [response.contentType || 'application/json']: {
          schema: response.schema || { type: 'object' },
          example: response.example
        }
      };
    }

    if (response.headers) {
      responseObj.headers = {};
      for (const [name, header] of Object.entries(response.headers)) {
        responseObj.headers[name] = {
          description: header.description,
          schema: { type: header.type || 'string' }
        };
      }
    }

    this.route.responses.push(responseObj);
    return this;
  }

  register(): void {
    if (this.route.path && this.route.method && this.route.summary && this.route.responses) {
      openApiGenerator.registerRoute(this.route as RouteDefinition);
    }
  }
}

/**
 * Helper function to create a route documentation builder
 */
export function documentRoute(path: string, method: string): RouteDocBuilder {
  return new RouteDocBuilder(path, method);
}

/**
 * Common schema definitions for reuse
 */
export const CommonSchemas = {
  PaginationParams: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 20, description: 'Items per page' }
    }
  } as SchemaDefinition,

  SortParams: {
    type: 'object',
    properties: {
      sortBy: { type: 'string', description: 'Field to sort by' },
      sortOrder: { type: 'string', enum: ['asc', 'desc'], default: 'asc', description: 'Sort order' }
    }
  } as SchemaDefinition,

  StandardResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      data: { description: 'Response data' },
      error: { $ref: 'ApiError' },
      meta: { $ref: 'ResponseMeta' },
      timestamp: { type: 'string', format: 'date-time' },
      correlationId: { type: 'string' },
      version: { type: 'string' }
    },
    required: ['success', 'timestamp', 'correlationId', 'version']
  } as SchemaDefinition
};