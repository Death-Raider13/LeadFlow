import { NextRequest } from 'next/server';
import { openApiGenerator } from '@/lib/api/openapi-generator';
import { routeRegistry, documentRoute, CommonSchemas } from '@/lib/api/route-decorator';
import { ApiVersionManager } from '@/lib/api/versioning';
import { createApiHandler } from '@/lib/api/handler-wrapper';

/**
 * API Documentation Endpoint
 * Serves OpenAPI specification and Swagger UI
 */

// Register existing routes manually since we can't use decorators on existing code
function registerExistingRoutes() {
  // Health endpoint
  documentRoute('/api/health', 'GET')
    .summary('System Health Check')
    .description('Get comprehensive system health status including database, external services, and performance metrics')
    .tags('Health', 'Monitoring')
    .response({
      status: 200,
      description: 'System health information',
      schema: { $ref: 'HealthStatus' },
      example: {
        success: true,
        data: {
          status: 'healthy',
          checks: {
            database: { status: 'healthy', responseTime: 45 },
            services: { firebase: 'configured', encryption: 'configured' }
          },
          metrics: {
            uptime: 86400,
            memoryUsage: 0.65
          }
        },
        timestamp: '2024-01-02T10:00:00Z',
        correlationId: 'req_123456',
        version: '1.0.0'
      }
    })
    .response({
      status: 503,
      description: 'System is unhealthy',
      schema: { $ref: 'HealthStatus' }
    })
    .register();

  // Metrics endpoint
  documentRoute('/api/metrics', 'GET')
    .summary('System Metrics')
    .description('Get system performance metrics in JSON or Prometheus format')
    .tags('Metrics', 'Monitoring')
    .parameter({
      name: 'format',
      in: 'query',
      description: 'Response format',
      type: 'string',
      enum: ['json', 'prometheus'],
      example: 'json'
    })
    .response({
      status: 200,
      description: 'System metrics',
      contentType: 'application/json',
      example: {
        success: true,
        data: {
          counters: { 'api_requests_total': 1234 },
          gauges: { 'active_connections': 45 },
          histograms: { 'request_duration_ms': { avg: 120, p95: 250 } }
        },
        timestamp: '2024-01-02T10:00:00Z',
        correlationId: 'req_123457',
        version: '1.0.0'
      }
    })
    .register();

  // Alerts endpoint
  documentRoute('/api/alerts', 'GET')
    .summary('System Alerts')
    .description('Get system alerts and notifications')
    .tags('Monitoring', 'Admin')
    .parameter({
      name: 'active',
      in: 'query',
      description: 'Filter to active alerts only',
      type: 'boolean',
      example: true
    })
    .response({
      status: 200,
      description: 'System alerts',
      example: {
        success: true,
        data: {
          alerts: [],
          summary: { total: 0, active: 0, bySeverity: { critical: 0, high: 0, medium: 0, low: 0 } }
        },
        timestamp: '2024-01-02T10:00:00Z',
        correlationId: 'req_123458',
        version: '1.0.0'
      }
    })
    .register();

  // Rate limit usage endpoint
  documentRoute('/api/rate-limit/usage', 'GET')
    .summary('Rate Limit Usage')
    .description('Get current rate limit usage statistics')
    .tags('Rate Limiting', 'Monitoring')
    .parameter({
      name: 'x-user-id',
      in: 'header',
      description: 'User ID for user-specific limits',
      type: 'string'
    })
    .parameter({
      name: 'x-subscription-plan',
      in: 'header',
      description: 'User subscription plan',
      type: 'string',
      enum: ['free', 'pro', 'enterprise']
    })
    .response({
      status: 200,
      description: 'Rate limit usage information',
      example: {
        success: true,
        data: {
          global: { remaining: 950, resetTime: '2024-01-02T11:00:00Z' },
          ip: { remaining: 95, resetTime: '2024-01-02T10:05:00Z' },
          user: { remaining: 450, resetTime: '2024-01-02T11:00:00Z' }
        },
        timestamp: '2024-01-02T10:00:00Z',
        correlationId: 'req_123459',
        version: '1.0.0'
      }
    })
    .register();

  // Queue status endpoint
  documentRoute('/api/queue/status', 'GET')
    .summary('Queue Status')
    .description('Get task queue status and statistics')
    .tags('Queue', 'Monitoring')
    .parameter({
      name: 'x-user-id',
      in: 'header',
      description: 'User ID for user-specific operations',
      type: 'string'
    })
    .response({
      status: 200,
      description: 'Queue status information',
      example: {
        success: true,
        data: {
          queue: { pending: 5, processing: 2, completed: 1234, failed: 12 },
          throttles: { 'lead_generation': { remaining: 8, resetTime: '2024-01-02T10:05:00Z' } },
          userOperations: [],
          userActivity: [],
          blockedUsers: 0
        },
        timestamp: '2024-01-02T10:00:00Z',
        correlationId: 'req_123460',
        version: '1.0.0'
      }
    })
    .register();

  // Leads export endpoint
  documentRoute('/api/leads/export', 'GET')
    .summary('Export Leads')
    .description('Stream export of leads data in JSON or CSV format')
    .tags('Leads', 'Export')
    .parameter({
      name: 'userId',
      in: 'query',
      required: true,
      description: 'User ID to export leads for',
      type: 'string'
    })
    .parameter({
      name: 'format',
      in: 'query',
      description: 'Export format',
      type: 'string',
      enum: ['json', 'csv'],
      example: 'json'
    })
    .parameter({
      name: 'batchSize',
      in: 'query',
      description: 'Batch size for streaming',
      type: 'integer',
      example: 100
    })
    .response({
      status: 200,
      description: 'Streaming export data',
      contentType: 'application/json',
      headers: {
        'Content-Disposition': { description: 'Attachment filename', type: 'string' },
        'Transfer-Encoding': { description: 'Chunked transfer encoding', type: 'string' }
      }
    })
    .response({
      status: 400,
      description: 'Missing required parameters',
      schema: CommonSchemas.StandardResponse
    })
    .register();

  // Finalize all registered routes
  routeRegistry.finalizeRoutes();
}

async function docsHandler(request: NextRequest, context: any) {
  // Register existing routes
  registerExistingRoutes();

  const { searchParams } = request.nextUrl;
  const format = searchParams.get('format') || 'json';
  const version = searchParams.get('version');

  // Parse requested version
  let apiVersion = ApiVersionManager.getCurrentVersion();
  if (version) {
    try {
      apiVersion = ApiVersionManager.parseVersion(version);
    } catch (error) {
      throw new Error(`Invalid version format: ${version}`);
    }
  }

  // Generate OpenAPI specification
  const spec = openApiGenerator.generateSpec(apiVersion);

  // Return different formats based on request
  switch (format) {
    case 'yaml':
      // In a real implementation, you would convert to YAML
      // For now, we'll return JSON with a note
      return {
        ...spec,
        info: {
          ...spec.info,
          description: spec.info.description + ' (YAML format not yet implemented, returning JSON)'
        }
      };

    case 'swagger-ui':
      // Return HTML for Swagger UI
      return generateSwaggerUI(spec);

    case 'redoc':
      // Return HTML for ReDoc
      return generateReDocUI(spec);

    default:
      return spec;
  }
}

/**
 * Generate Swagger UI HTML
 */
function generateSwaggerUI(spec: any): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LeadFlow API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui.css" />
  <style>
    html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin:0; background: #fafafa; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: '/api/docs?format=json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        tryItOutEnabled: true,
        requestInterceptor: function(request) {
          // Add correlation ID to all requests
          request.headers['X-Correlation-ID'] = 'swagger-ui-' + Date.now();
          return request;
        }
      });
    };
  </script>
</body>
</html>`;
}

/**
 * Generate ReDoc UI HTML
 */
function generateReDocUI(spec: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>LeadFlow API Documentation</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; }
  </style>
</head>
<body>
  <redoc spec-url='/api/docs?format=json'></redoc>
  <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
</body>
</html>`;
}

// Handle different response types
async function docsResponseHandler(request: NextRequest, context: any) {
  const result = await docsHandler(request, context);
  
  const { searchParams } = request.nextUrl;
  const format = searchParams.get('format') || 'json';
  
  if (format === 'swagger-ui' || format === 'redoc') {
    // Return HTML response
    return new Response(result as string, {
      headers: {
        'Content-Type': 'text/html',
        'X-Correlation-ID': context.correlationId
      }
    });
  }
  
  // Return JSON response (handled by wrapper)
  return result;
}

export const GET = createApiHandler(docsResponseHandler, {
  rateLimit: false // Documentation should be freely accessible
});

// Also register the docs endpoint itself
documentRoute('/api/docs', 'GET')
  .summary('API Documentation')
  .description('Get OpenAPI specification and interactive documentation')
  .tags('Documentation')
  .parameter({
    name: 'format',
    in: 'query',
    description: 'Documentation format',
    type: 'string',
    enum: ['json', 'yaml', 'swagger-ui', 'redoc'],
    example: 'json'
  })
  .parameter({
    name: 'version',
    in: 'query',
    description: 'API version to document',
    type: 'string',
    example: '1.0.0'
  })
  .response({
    status: 200,
    description: 'OpenAPI specification or HTML documentation',
    contentType: 'application/json'
  })
  .register();