import { metricsCollector } from './metrics';
import { alertingSystem } from './alerting';
import { logger } from './logger';

export enum HealthStatus {
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  UNHEALTHY = 'unhealthy'
}

export interface HealthCheckResult {
  name: string;
  status: HealthStatus;
  message?: string;
  duration: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface SystemHealth {
  status: HealthStatus;
  timestamp: Date;
  version: string;
  uptime: number;
  checks: HealthCheckResult[];
  metrics: {
    requests: {
      total: number;
      errors: number;
      errorRate: number;
    };
    performance: {
      avgResponseTime: number;
      p95ResponseTime: number;
    };
    resources: {
      memoryUsage: number;
      activeConnections: number;
    };
  };
  alerts: {
    active: number;
    critical: number;
    high: number;
  };
}

export type HealthCheck = () => Promise<HealthCheckResult>;

class HealthCheckManager {
  private checks = new Map<string, HealthCheck>();
  private startTime = Date.now();

  constructor() {
    this.registerDefaultChecks();
  }

  private registerDefaultChecks(): void {
    // Database connectivity check
    this.register('database', async () => {
      const start = Date.now();
      try {
        // In a real implementation, this would test actual database connectivity
        // For now, we'll check if we have recent database metrics
        const recentQueries = metricsCollector.getCounters().get('database_queries_total') || 0;
        const failedQueries = metricsCollector.getCounters().get('database_query_results_total{success=false}') || 0;
        
        const errorRate = recentQueries > 0 ? failedQueries / recentQueries : 0;
        
        if (errorRate > 0.5) {
          return {
            name: 'database',
            status: HealthStatus.UNHEALTHY,
            message: `High database error rate: ${(errorRate * 100).toFixed(1)}%`,
            duration: Date.now() - start,
            timestamp: new Date(),
            metadata: { errorRate, totalQueries: recentQueries, failedQueries }
          };
        } else if (errorRate > 0.1) {
          return {
            name: 'database',
            status: HealthStatus.DEGRADED,
            message: `Elevated database error rate: ${(errorRate * 100).toFixed(1)}%`,
            duration: Date.now() - start,
            timestamp: new Date(),
            metadata: { errorRate, totalQueries: recentQueries, failedQueries }
          };
        }

        return {
          name: 'database',
          status: HealthStatus.HEALTHY,
          message: 'Database connectivity is normal',
          duration: Date.now() - start,
          timestamp: new Date(),
          metadata: { errorRate, totalQueries: recentQueries }
        };
      } catch (error) {
        return {
          name: 'database',
          status: HealthStatus.UNHEALTHY,
          message: `Database check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          duration: Date.now() - start,
          timestamp: new Date()
        };
      }
    });

    // External APIs health check
    this.register('external_apis', async () => {
      const start = Date.now();
      try {
        const totalCalls = Array.from(metricsCollector.getCounters().entries())
          .filter(([key]) => key.startsWith('external_api_calls_total'))
          .reduce((sum, [, value]) => sum + value, 0);
        
        const failedCalls = metricsCollector.getCounters().get('external_api_results_total{success=false}') || 0;
        
        const errorRate = totalCalls > 0 ? failedCalls / totalCalls : 0;
        
        if (errorRate > 0.3) {
          return {
            name: 'external_apis',
            status: HealthStatus.UNHEALTHY,
            message: `High external API error rate: ${(errorRate * 100).toFixed(1)}%`,
            duration: Date.now() - start,
            timestamp: new Date(),
            metadata: { errorRate, totalCalls, failedCalls }
          };
        } else if (errorRate > 0.1) {
          return {
            name: 'external_apis',
            status: HealthStatus.DEGRADED,
            message: `Elevated external API error rate: ${(errorRate * 100).toFixed(1)}%`,
            duration: Date.now() - start,
            timestamp: new Date(),
            metadata: { errorRate, totalCalls, failedCalls }
          };
        }

        return {
          name: 'external_apis',
          status: HealthStatus.HEALTHY,
          message: 'External APIs are responding normally',
          duration: Date.now() - start,
          timestamp: new Date(),
          metadata: { errorRate, totalCalls }
        };
      } catch (error) {
        return {
          name: 'external_apis',
          status: HealthStatus.UNHEALTHY,
          message: `External API check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          duration: Date.now() - start,
          timestamp: new Date()
        };
      }
    });

    // Memory usage check
    this.register('memory', async () => {
      const start = Date.now();
      try {
        const heapUsed = metricsCollector.getGauges().get('memory_usage_bytes{type=heap_used}') || 0;
        const heapTotal = metricsCollector.getGauges().get('memory_usage_bytes{type=heap_total}') || 1;
        const memoryUsage = heapUsed / heapTotal;

        if (memoryUsage > 0.9) {
          return {
            name: 'memory',
            status: HealthStatus.UNHEALTHY,
            message: `Critical memory usage: ${(memoryUsage * 100).toFixed(1)}%`,
            duration: Date.now() - start,
            timestamp: new Date(),
            metadata: { memoryUsage, heapUsed, heapTotal }
          };
        } else if (memoryUsage > 0.8) {
          return {
            name: 'memory',
            status: HealthStatus.DEGRADED,
            message: `High memory usage: ${(memoryUsage * 100).toFixed(1)}%`,
            duration: Date.now() - start,
            timestamp: new Date(),
            metadata: { memoryUsage, heapUsed, heapTotal }
          };
        }

        return {
          name: 'memory',
          status: HealthStatus.HEALTHY,
          message: `Memory usage is normal: ${(memoryUsage * 100).toFixed(1)}%`,
          duration: Date.now() - start,
          timestamp: new Date(),
          metadata: { memoryUsage, heapUsed, heapTotal }
        };
      } catch (error) {
        return {
          name: 'memory',
          status: HealthStatus.UNHEALTHY,
          message: `Memory check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          duration: Date.now() - start,
          timestamp: new Date()
        };
      }
    });

    // Response time check
    this.register('response_time', async () => {
      const start = Date.now();
      try {
        const stats = metricsCollector.getHistogramStats('api_request_duration');
        
        if (!stats || stats.count === 0) {
          return {
            name: 'response_time',
            status: HealthStatus.HEALTHY,
            message: 'No recent API requests to analyze',
            duration: Date.now() - start,
            timestamp: new Date()
          };
        }

        if (stats.p95 > 10000) { // 10 seconds
          return {
            name: 'response_time',
            status: HealthStatus.UNHEALTHY,
            message: `Very slow response times: P95 = ${stats.p95}ms`,
            duration: Date.now() - start,
            timestamp: new Date(),
            metadata: stats
          };
        } else if (stats.p95 > 5000) { // 5 seconds
          return {
            name: 'response_time',
            status: HealthStatus.DEGRADED,
            message: `Slow response times: P95 = ${stats.p95}ms`,
            duration: Date.now() - start,
            timestamp: new Date(),
            metadata: stats
          };
        }

        return {
          name: 'response_time',
          status: HealthStatus.HEALTHY,
          message: `Response times are normal: P95 = ${stats.p95}ms`,
          duration: Date.now() - start,
          timestamp: new Date(),
          metadata: stats
        };
      } catch (error) {
        return {
          name: 'response_time',
          status: HealthStatus.UNHEALTHY,
          message: `Response time check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          duration: Date.now() - start,
          timestamp: new Date()
        };
      }
    });
  }

  register(name: string, check: HealthCheck): void {
    this.checks.set(name, check);
  }

  unregister(name: string): void {
    this.checks.delete(name);
  }

  async runCheck(name: string): Promise<HealthCheckResult | null> {
    const check = this.checks.get(name);
    if (!check) {
      return null;
    }

    try {
      return await check();
    } catch (error) {
      return {
        name,
        status: HealthStatus.UNHEALTHY,
        message: `Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration: 0,
        timestamp: new Date()
      };
    }
  }

  async runAllChecks(): Promise<HealthCheckResult[]> {
    const results: HealthCheckResult[] = [];
    
    for (const [name] of this.checks) {
      const result = await this.runCheck(name);
      if (result) {
        results.push(result);
      }
    }

    return results;
  }

  async getSystemHealth(): Promise<SystemHealth> {
    const checks = await this.runAllChecks();
    
    // Determine overall system status
    const hasUnhealthy = checks.some(check => check.status === HealthStatus.UNHEALTHY);
    const hasDegraded = checks.some(check => check.status === HealthStatus.DEGRADED);
    
    let overallStatus: HealthStatus;
    if (hasUnhealthy) {
      overallStatus = HealthStatus.UNHEALTHY;
    } else if (hasDegraded) {
      overallStatus = HealthStatus.DEGRADED;
    } else {
      overallStatus = HealthStatus.HEALTHY;
    }

    // Calculate metrics
    const counters = metricsCollector.getCounters();
    const totalRequests = Array.from(counters.entries())
      .filter(([key]) => key.startsWith('api_responses_total'))
      .reduce((sum, [, value]) => sum + value, 0);
    
    const errorRequests = Array.from(counters.entries())
      .filter(([key]) => key.includes('status_code=5'))
      .reduce((sum, [, value]) => sum + value, 0);
    
    const errorRate = totalRequests > 0 ? errorRequests / totalRequests : 0;
    
    const responseStats = metricsCollector.getHistogramStats('api_request_duration');
    
    const heapUsed = metricsCollector.getGauges().get('memory_usage_bytes{type=heap_used}') || 0;
    const heapTotal = metricsCollector.getGauges().get('memory_usage_bytes{type=heap_total}') || 1;
    const memoryUsage = heapUsed / heapTotal;
    
    const activeConnections = metricsCollector.getGauges().get('active_connections') || 0;
    
    // Get alert counts
    const activeAlerts = alertingSystem.getActiveAlerts();
    const criticalAlerts = activeAlerts.filter(alert => alert.severity === 'critical').length;
    const highAlerts = activeAlerts.filter(alert => alert.severity === 'high').length;

    return {
      status: overallStatus,
      timestamp: new Date(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: Date.now() - this.startTime,
      checks,
      metrics: {
        requests: {
          total: totalRequests,
          errors: errorRequests,
          errorRate
        },
        performance: {
          avgResponseTime: responseStats?.avg || 0,
          p95ResponseTime: responseStats?.p95 || 0
        },
        resources: {
          memoryUsage,
          activeConnections
        }
      },
      alerts: {
        active: activeAlerts.length,
        critical: criticalAlerts,
        high: highAlerts
      }
    };
  }
}

// Singleton health check manager
export const healthCheckManager = new HealthCheckManager();