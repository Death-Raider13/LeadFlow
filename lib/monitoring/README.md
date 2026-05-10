# Monitoring and Observability Infrastructure

This module provides comprehensive monitoring, logging, metrics collection, and alerting capabilities for the LeadFlow application.

## Components

### 1. Structured Logging (`logger.ts`)

Provides centralized, structured logging with automatic sanitization of sensitive data.

```typescript
import { logger } from '@/lib/monitoring';

// Basic logging
logger.info('User logged in successfully', {
  requestId: 'req-123',
  endpoint: '/api/auth/login',
  userId: 'user-456',
  metadata: { loginMethod: 'email' }
});

// Error logging
logger.error('Database connection failed', error, {
  requestId: 'req-123',
  endpoint: '/api/users',
  metadata: { operation: 'create_user' }
});

// Audit logging
logger.audit({
  type: 'user_action',
  action: 'password_change',
  userId: 'user-456',
  resource: '/api/auth/password',
  metadata: { ip: '192.168.1.1' },
  timestamp: new Date(),
  requestId: 'req-123'
});
```

### 2. Error Handling (`error-handler.ts`)

Centralized error handling with automatic correlation ID tracking and structured error responses.

```typescript
import { CentralizedErrorHandler, AppError, ErrorCode } from '@/lib/monitoring';

// In API routes
export async function POST(request: NextRequest) {
  try {
    // Your API logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return CentralizedErrorHandler.handleError(error, request);
  }
}

// Custom application errors
throw new AppError(
  ErrorCode.VALIDATION_ERROR,
  'Invalid email format',
  400,
  { field: 'email', value: 'invalid-email' }
);
```

### 3. Metrics Collection (`metrics.ts`)

Performance monitoring and metrics collection with automatic tracking.

```typescript
import { metricsCollector, PerformanceMonitor } from '@/lib/monitoring';

// Track API calls automatically
const apiTimer = PerformanceMonitor.trackApiCall('/api/users', 'POST');
// ... API logic ...
apiTimer.end(200); // Pass status code

// Track database operations
const dbTimer = PerformanceMonitor.trackDatabaseQuery('INSERT', 'users');
// ... database operation ...
dbTimer.end(true); // Pass success/failure

// Custom metrics
metricsCollector.incrementCounter('custom_events', { type: 'user_signup' });
metricsCollector.recordGauge('active_users', 150);
metricsCollector.recordHistogram('processing_time', 250);
```

### 4. Request Tracking (`correlation-middleware.ts`)

Automatic correlation ID tracking for all requests.

```typescript
import { withRequestTracking } from '@/lib/monitoring';

async function myApiHandler(request: NextRequest) {
  // Your API logic here
  return NextResponse.json({ data: 'response' });
}

// Wrap your handler to get automatic tracking
export const GET = withRequestTracking(myApiHandler, '/api/my-endpoint');
```

### 5. Alerting System (`alerting.ts`)

Automatic alerting based on configurable rules.

```typescript
import { alertingSystem, AlertSeverity } from '@/lib/monitoring';

// Add custom alert rule
alertingSystem.addRule({
  name: 'high_user_errors',
  condition: () => {
    // Your condition logic
    return errorRate > 0.05; // 5% error rate
  },
  severity: AlertSeverity.HIGH,
  message: 'High user error rate detected',
  cooldownMinutes: 10
});

// Resolve alerts
alertingSystem.resolveAlert('alert-id-123');
```

### 6. Health Checks (`health-checks.ts`)

Comprehensive health monitoring with custom checks.

```typescript
import { healthCheckManager } from '@/lib/monitoring';

// Add custom health check
healthCheckManager.register('my_service', async () => {
  try {
    // Check your service health
    const isHealthy = await checkMyService();
    
    return {
      name: 'my_service',
      status: isHealthy ? HealthStatus.HEALTHY : HealthStatus.UNHEALTHY,
      message: isHealthy ? 'Service is running' : 'Service is down',
      duration: 100,
      timestamp: new Date()
    };
  } catch (error) {
    return {
      name: 'my_service',
      status: HealthStatus.UNHEALTHY,
      message: `Health check failed: ${error.message}`,
      duration: 100,
      timestamp: new Date()
    };
  }
});
```

## API Endpoints

### Health Check: `GET /api/health`

Returns comprehensive system health information including:
- Overall system status
- Individual component health checks
- Performance metrics
- Active alerts
- Configuration status

### Metrics: `GET /api/metrics`

Returns application metrics in JSON format, or Prometheus format with `?format=prometheus`.

### Alerts: `GET /api/alerts`

Returns current alerts. Use `?active=true` to get only active alerts.

### Resolve Alert: `POST /api/alerts`

Resolve an alert by sending `{ "alertId": "alert-id" }`.

## Features

### Automatic Data Sanitization

All logs automatically sanitize sensitive information:
- Passwords, tokens, API keys
- Authorization headers
- Session cookies
- Any field containing sensitive keywords

### Correlation ID Tracking

Every request gets a unique correlation ID that's:
- Automatically generated or extracted from headers
- Included in all logs and error responses
- Propagated through the entire request lifecycle

### Performance Monitoring

Automatic tracking of:
- API response times (P50, P95, P99)
- Database query performance
- External API call latency
- Memory usage and resource utilization

### Intelligent Alerting

Built-in alert rules for:
- High error rates (>10%)
- Slow response times (P95 > 5s)
- High memory usage (>90%)
- Database connection issues
- External API failures

### Health Monitoring

Comprehensive health checks for:
- Database connectivity
- External API availability
- Memory usage
- Response time performance
- System resource utilization

## Configuration

The monitoring system works out of the box with no configuration required. However, you can customize:

- Alert thresholds and rules
- Health check intervals
- Metrics retention periods
- Log levels and output formats

## Integration with Existing Code

The monitoring system is designed to integrate seamlessly with existing code:

1. **Wrap API handlers** with `withRequestTracking` for automatic monitoring
2. **Use `CentralizedErrorHandler`** in catch blocks for consistent error handling
3. **Add custom metrics** using `metricsCollector` for business-specific tracking
4. **Register health checks** for custom services and dependencies

## Production Considerations

In production, consider:

1. **External log aggregation** (ELK stack, Splunk, etc.)
2. **Metrics storage** (Prometheus, InfluxDB, etc.)
3. **Alert notifications** (PagerDuty, Slack, email)
4. **Performance impact** of metrics collection
5. **Data retention policies** for logs and metrics