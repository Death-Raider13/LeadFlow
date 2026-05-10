import { logger } from './logger';

export interface Timer {
  end(): number;
}

export interface MetricsCollector {
  incrementCounter(name: string, tags?: Record<string, string>): void;
  recordHistogram(name: string, value: number, tags?: Record<string, string>): void;
  recordGauge(name: string, value: number, tags?: Record<string, string>): void;
  startTimer(name: string): Timer;
}

interface MetricEntry {
  name: string;
  type: 'counter' | 'histogram' | 'gauge';
  value: number;
  tags?: Record<string, string>;
  timestamp: Date;
}

class InMemoryMetricsCollector implements MetricsCollector {
  private metrics: MetricEntry[] = [];
  private counters = new Map<string, number>();
  private gauges = new Map<string, number>();
  private histograms = new Map<string, number[]>();

  incrementCounter(name: string, tags?: Record<string, string>): void {
    const key = this.getMetricKey(name, tags);
    const currentValue = this.counters.get(key) || 0;
    this.counters.set(key, currentValue + 1);

    this.recordMetric({
      name,
      type: 'counter',
      value: currentValue + 1,
      tags,
      timestamp: new Date()
    });
  }

  recordHistogram(name: string, value: number, tags?: Record<string, string>): void {
    const key = this.getMetricKey(name, tags);
    const values = this.histograms.get(key) || [];
    values.push(value);
    this.histograms.set(key, values);

    this.recordMetric({
      name,
      type: 'histogram',
      value,
      tags,
      timestamp: new Date()
    });
  }

  recordGauge(name: string, value: number, tags?: Record<string, string>): void {
    const key = this.getMetricKey(name, tags);
    this.gauges.set(key, value);

    this.recordMetric({
      name,
      type: 'gauge',
      value,
      tags,
      timestamp: new Date()
    });
  }

  startTimer(name: string): Timer {
    const startTime = Date.now();
    
    return {
      end: (): number => {
        const duration = Date.now() - startTime;
        this.recordHistogram(name, duration, { unit: 'milliseconds' });
        return duration;
      }
    };
  }

  private getMetricKey(name: string, tags?: Record<string, string>): string {
    if (!tags) return name;
    const tagString = Object.entries(tags)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join(',');
    return `${name}{${tagString}}`;
  }

  private recordMetric(metric: MetricEntry): void {
    this.metrics.push(metric);
    
    // Keep only last 1000 metrics to prevent memory issues
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Metrics are kept in memory for the health dashboard but not logged to console to prevent noise
  }

  // Get metrics for health checks and monitoring
  getMetrics(): MetricEntry[] {
    return [...this.metrics];
  }

  getCounters(): Map<string, number> {
    return new Map(this.counters);
  }

  getGauges(): Map<string, number> {
    return new Map(this.gauges);
  }

  getHistograms(): Map<string, number[]> {
    return new Map(this.histograms);
  }

  // Get summary statistics for histograms
  getHistogramStats(name: string, tags?: Record<string, string>): {
    count: number;
    min: number;
    max: number;
    avg: number;
    p50: number;
    p95: number;
    p99: number;
  } | null {
    const key = this.getMetricKey(name, tags);
    const values = this.histograms.get(key);
    
    if (!values || values.length === 0) {
      return null;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const count = sorted.length;
    const min = sorted[0];
    const max = sorted[count - 1];
    const avg = sorted.reduce((sum, val) => sum + val, 0) / count;
    
    const percentile = (p: number) => {
      const index = Math.ceil((p / 100) * count) - 1;
      return sorted[Math.max(0, index)];
    };

    return {
      count,
      min,
      max,
      avg,
      p50: percentile(50),
      p95: percentile(95),
      p99: percentile(99)
    };
  }
}

// Singleton metrics collector
export const metricsCollector = new InMemoryMetricsCollector();

// Performance monitoring utilities
export class PerformanceMonitor {
  static trackApiCall(endpoint: string, method: string) {
    const timer = metricsCollector.startTimer('api_request_duration');
    metricsCollector.incrementCounter('api_requests_total', {
      endpoint,
      method
    });

    return {
      end: (statusCode: number) => {
        const duration = timer.end();
        metricsCollector.incrementCounter('api_responses_total', {
          endpoint,
          method,
          status_code: statusCode.toString()
        });
        return duration;
      }
    };
  }

  static trackDatabaseQuery(operation: string, table?: string) {
    const timer = metricsCollector.startTimer('database_query_duration');
    metricsCollector.incrementCounter('database_queries_total', {
      operation,
      table: table || 'unknown'
    });

    return {
      end: (success: boolean) => {
        const duration = timer.end();
        metricsCollector.incrementCounter('database_query_results_total', {
          operation,
          table: table || 'unknown',
          success: success.toString()
        });
        return duration;
      }
    };
  }

  static trackExternalApiCall(service: string, endpoint: string) {
    const timer = metricsCollector.startTimer('external_api_duration');
    metricsCollector.incrementCounter('external_api_calls_total', {
      service,
      endpoint
    });

    return {
      end: (success: boolean, statusCode?: number) => {
        const duration = timer.end();
        metricsCollector.incrementCounter('external_api_results_total', {
          service,
          endpoint,
          success: success.toString(),
          status_code: statusCode?.toString() || 'unknown'
        });
        return duration;
      }
    };
  }

  static recordMemoryUsage(): void {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsage = process.memoryUsage();
      metricsCollector.recordGauge('memory_usage_bytes', memUsage.heapUsed, { type: 'heap_used' });
      metricsCollector.recordGauge('memory_usage_bytes', memUsage.heapTotal, { type: 'heap_total' });
      metricsCollector.recordGauge('memory_usage_bytes', memUsage.rss, { type: 'rss' });
    }
  }

  static recordActiveConnections(count: number): void {
    metricsCollector.recordGauge('active_connections', count);
  }
}