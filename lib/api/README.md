# API Design Consistency and Documentation System

This directory contains a comprehensive API design system that provides consistent response formats, error handling, versioning, and automatic documentation generation for the LeadFlow application.

## Features

### 1. Standardized Response Format (`response-formatter.ts`)

All API responses follow a consistent structure:

```typescript
{
  success: boolean,
  data?: any,
  error?: {
    code: string,
    message: string,
    details?: object,
    field?: string
  },
  meta?: {
    pagination?: object,
    performance?: object,
    warnings?: string[],
    deprecation?: object
  },
  timestamp: string,
  correlationId: string,
  version: string
}
```

### 2. API Versioning (`versioning.ts`)

Supports multiple API versions with backward compatibility:

- Version detection from headers, Accept header, or query parameters
- Automatic response transformation for older versions
- Deprecation warnings and sunset dates
- Feature flags based on version

### 3. Unified Handler Wrapper (`handler-wrapper.ts`)

Provides consistent middleware integration:

```typescript
import { createApiHandler } from '@/lib/api/handler-wrapper';

export const GET = createApiHandler(async (request, context) => {
  // Your handler logic here
  return { message: 'Hello World' };
}, {
  requireAuth: true,
  rateLimit: true,
  validateInput: true
});
```

### 4. Automatic Documentation (`openapi-generator.ts`, `route-decorator.ts`)

Generates OpenAPI specifications automatically:

```typescript
import { documentRoute } from '@/lib/api/route-decorator';

// Register route documentation
documentRoute('/api/users', 'GET')
  .summary('Get Users')
  .description('Retrieve a list of users with pagination')
  .tags('Users')
  .parameter({
    name: 'page',
    in: 'query',
    type: 'integer',
    description: 'Page number'
  })
  .response({
    status: 200,
    description: 'List of users',
    schema: { $ref: 'User' }
  })
  .register();
```

### 5. Request/Response Validation (`validation-middleware.ts`)

Validates API requests and responses against OpenAPI specifications:

```typescript
import { withApiValidation } from '@/lib/api/validation-middleware';

export const POST = withApiValidation({
  validateRequest: true,
  validateResponse: true,
  strictMode: false // Log warnings instead of failing
})(yourHandler);
```

## Usage Examples

### Basic API Handler

```typescript
import { createApiHandler } from '@/lib/api/handler-wrapper';

async function getUsersHandler(request: NextRequest, context: ApiContext) {
  const { page, limit } = extractPaginationParams(request);
  
  // Your business logic here
  const users = await getUsersFromDatabase(page, limit);
  
  return users;
}

export const GET = createApiHandler(getUsersHandler, {
  rateLimit: true,
  requireAuth: true
});
```

### Paginated Response

```typescript
import { createPaginatedHandler } from '@/lib/api/handler-wrapper';

async function paginatedUsersHandler(request: NextRequest, context: ApiContext) {
  const { page, limit } = extractPaginationParams(request);
  
  const result = await getUsersPaginated(page, limit);
  
  return {
    data: result.users,
    total: result.total,
    page,
    limit
  };
}

export const GET = createPaginatedHandler(paginatedUsersHandler);
```

### Streaming Response

```typescript
import { createStreamingHandler } from '@/lib/api/handler-wrapper';

async function streamDataHandler(request: NextRequest, context: ApiContext): Promise<ReadableStream> {
  return new ReadableStream({
    start(controller) {
      // Stream data logic
    }
  });
}

export const GET = createStreamingHandler(streamDataHandler);
```

### Health Check Endpoint

```typescript
import { createHealthCheckHandler } from '@/lib/api/handler-wrapper';

async function healthHandler(request: NextRequest, context: ApiContext) {
  const checks = await performHealthChecks();
  
  return {
    status: 'healthy' as const,
    checks,
    metrics: await getSystemMetrics()
  };
}

export const GET = createHealthCheckHandler(healthHandler);
```

## API Documentation

### Accessing Documentation

- **JSON Spec**: `GET /api/docs?format=json`
- **Swagger UI**: `GET /api/docs?format=swagger-ui`
- **ReDoc**: `GET /api/docs?format=redoc`
- **Specific Version**: `GET /api/docs?version=1.0.0`

### Interactive Documentation

Visit `/api/docs?format=swagger-ui` to access the interactive Swagger UI where you can:

- Browse all available endpoints
- Test API calls directly from the browser
- View request/response schemas
- See example payloads

## Error Handling

The system provides standardized error responses:

```typescript
// Validation Error
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Validation failed",
    details: {
      fields: {
        email: { message: "Invalid email format", code: "INVALID_FORMAT" }
      }
    }
  },
  timestamp: "2024-01-02T10:00:00Z",
  correlationId: "req_123456",
  version: "1.0.0"
}

// Rate Limit Error
{
  success: false,
  error: {
    code: "RATE_LIMIT_EXCEEDED",
    message: "Rate limit exceeded",
    details: { retryAfter: 60 }
  },
  timestamp: "2024-01-02T10:00:00Z",
  correlationId: "req_123457",
  version: "1.0.0"
}
```

## API Versioning

### Version Detection

The system detects API versions from:

1. **Accept Header** (preferred): `Accept: application/vnd.leadflow.v1+json`
2. **Custom Header**: `X-API-Version: 1.0.0`
3. **Query Parameter**: `?version=1.0.0`
4. **Default**: Current version if none specified

### Backward Compatibility

- Automatic response transformation for older versions
- Deprecation warnings in response headers
- Sunset dates for deprecated versions
- Migration guides for breaking changes

### Feature Flags

```typescript
import { FeatureFlags } from '@/lib/api/versioning';

if (FeatureFlags.isFeatureAvailable('streaming', requestedVersion)) {
  // Use streaming feature
} else {
  // Fallback to pagination
}
```

## Best Practices

### 1. Always Use Handler Wrappers

```typescript
// ✅ Good
export const GET = createApiHandler(handler, options);

// ❌ Avoid
export async function GET(request: NextRequest) {
  // Manual response formatting
}
```

### 2. Document All Routes

```typescript
// Register documentation for each endpoint
documentRoute('/api/users/{id}', 'GET')
  .summary('Get User by ID')
  .parameter({ name: 'id', in: 'path', required: true, type: 'string' })
  .response({ status: 200, description: 'User details' })
  .response({ status: 404, description: 'User not found' })
  .register();
```

### 3. Use Consistent Error Codes

```typescript
import { ApiErrorCode } from '@/lib/api/response-formatter';

// Use predefined error codes
throw new AppError(ApiErrorCode.NOT_FOUND, 'User not found', 404);
```

### 4. Include Performance Metrics

```typescript
async function handler(request: NextRequest, context: ApiContext) {
  context.performance.incrementQueryCount();
  
  const result = await database.query();
  
  return result;
}
```

### 5. Handle Deprecation Gracefully

```typescript
export const GET = createApiHandler(handler, {
  deprecation: {
    deprecated: true,
    sunsetDate: '2024-12-31',
    migrationGuide: '/docs/migration/v1-to-v2'
  }
});
```

## Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL`: Base URL for API documentation
- `NODE_ENV`: Controls error detail exposure

### Rate Limiting

Configure rate limits per endpoint and user plan in `lib/rate-limiting/config.ts`.

### Validation

Enable/disable validation per endpoint:

```typescript
export const POST = createApiHandler(handler, {
  validateInput: true,  // Validate request body
  validateResponse: false  // Skip response validation
});
```

## Migration Guide

### From Old Format to New Format

1. **Replace manual response formatting**:
   ```typescript
   // Old
   return NextResponse.json({ success: true, data: result });
   
   // New
   return result; // Handler wrapper formats automatically
   ```

2. **Use error throwing instead of manual error responses**:
   ```typescript
   // Old
   return NextResponse.json({ error: 'Not found' }, { status: 404 });
   
   // New
   throw new AppError(ApiErrorCode.NOT_FOUND, 'Resource not found', 404);
   ```

3. **Add route documentation**:
   ```typescript
   // Add after implementing the handler
   documentRoute('/api/your-endpoint', 'GET')
     .summary('Your endpoint description')
     .register();
   ```

This system ensures consistent, well-documented, and maintainable APIs across the entire application.