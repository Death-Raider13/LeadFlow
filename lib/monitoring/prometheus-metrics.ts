/**
 * Enhanced Prometheus metrics collector for LeadFlow application
 * Provides comprehensive metrics in Prometheus format with proper labels and types
 */

import { metricsCollector, PerformanceMonitor } from './metrics';

export interface PrometheusMetric {
  name: string;
  type: 'counter' | 'gauge' | 'histogram' | 'summary';
  help: string;
  labels?: Record<string, string>;
  value: number | string;
  timestamp?: number;
}

export class PrometheusMetricsExporter {
  private static instance: PrometheusMetricsExporter;
  private customMetrics: Map<string, PrometheusMetric> = new Map();
  private startTime: number = Date.now();

  static getInstance(): PrometheusMetricsExporter {
    if (!PrometheusMetricsExporter.instance) {
      PrometheusMetricsExporter.instance = new PrometheusMetricsExporter();
    }
    return PrometheusMetricsExporter.instance;
  }

  /**
   * Register a custom metric
   */
  registerMetric(metric: PrometheusMetric): void {
    const key = this.getMetricKey(metric.name, metric.labels);
    this.customMetrics.set(key, metric);
  }

  /**
   * Update system metrics
   */
  updateSystemMetrics(): void {
    // Memory metrics
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsage = process.memoryUsage();
      
      this.registerMetric({
        name: 'nodejs_memory_heap_used_bytes',
        type: 'gauge',
        help: 'Process heap memory used in bytes',
        value: memUsage.heapUsed
      });

      this.registerMetric({
        name: 'nodejs_memory_heap_total_bytes',
        type: 'gauge',
        help: 'Process heap memory total in bytes',
        value: memUsage.heapTotal
      });

      this.registerMetric({
        name: 'nodejs_memory_rss_bytes',
        type: 'gauge',
        help: 'Process resident set size in bytes',
        value: memUsage.rss
      });

      this.registerMetric({
        name: 'nodejs_memory_external_bytes',
        type: 'gauge',
        help: 'Process external memory in bytes',
        value: memUsage.external
      });
    }

    // Process uptime
    if (typeof process !== 'undefined' && process.uptime) {
      this.registerMetric({
        name: 'nodejs_process_uptime_seconds',
        type: 'gauge',
        help: 'Process uptime in seconds',
        value: process.uptime()
      });
    }

    // Application uptime
    this.registerMetric({
      name: 'leadflow_app_uptime_seconds',
      type: 'gauge',
      help: 'Application uptime in seconds',
      value: Math.floor((Date.now() - this.startTime) / 1000)
    });

    // Event loop lag (if available)
    if (typeof process !== 'undefined' && process.hrtime) {
      const start = process.hrtime.bigint();
      setImmediate(() => {
        const lag = Number(process.hrtime.bigint() - start) / 1e6; // Convert to milliseconds
        this.registerMetric({
          name: 'nodejs_eventloop_lag_milliseconds',
          type: 'gauge',
          help: 'Event loop lag in milliseconds',
          value: lag
        });
      });
    }
  }

  /**
   * Get application-specific metrics
   */
  getApplicationMetrics(): PrometheusMetric[] {
    const metrics: PrometheusMetric[] = [];
    
    // HTTP request metrics
    const counters = metricsCollector.getCounters();
    for (const [key, value] of counters) {
      if (key.includes('api_requests_total')) {
        const labels = this.parseLabelsFromKey(key);
        metrics.push({
          name: 'leadflow_http_requests_total',
          type: 'counter',
          help: 'Total number of HTTP requests',
          labels,
          value
        });
      }
      
      if (key.includes('api_responses_total')) {
        const labels = this.parseLabelsFromKey(key);
        metrics.push({
          name: 'leadflow_http_responses_total',
          type: 'counter',
          help: 'Total number of HTTP responses',
          labels,
          value
        });
      }

      if (key.includes('database_queries_total')) {
        const labels = this.parseLabelsFromKey(key);
        metrics.push({
          name: 'leadflow_database_queries_total',
          type: 'counter',
          help: 'Total number of database queries',
          labels,
          value
        });
      }

      if (key.includes('external_api_calls_total')) {
        const labels = this.parseLabelsFromKey(key);
        metrics.push({
          name: 'leadflow_external_api_calls_total',
          type: 'counter',
          help: 'Total number of external API calls',
          labels,
          value
        });
      }
    }

    // Histogram metrics (duration metrics)
    const histograms = metricsCollector.getHistograms();
    for (const [key] of histograms) {
      const stats = metricsCollector.getHistogramStats(key);
      if (stats) {
        const labels = this.parseLabelsFromKey(key);
        
        if (key.includes('api_request_duration')) {
          metrics.push(
            {
              name: 'leadflow_http_request_duration_seconds',
              type: 'histogram',
              help: 'HTTP request duration in seconds',
              labels: { ...labels, quantile: '0.5' },
              value: stats.p50 / 1000 // Convert ms to seconds
            },
            {
              name: 'leadflow_http_request_duration_seconds',
              type: 'histogram',
              help: 'HTTP request duration in seconds',
              labels: { ...labels, quantile: '0.95' },
              value: stats.p95 / 1000
            },
            {
              name: 'leadflow_http_request_duration_seconds',
              type: 'histogram',
              help: 'HTTP request duration in seconds',
              labels: { ...labels, quantile: '0.99' },
              value: stats.p99 / 1000
            },
            {
              name: 'leadflow_http_request_duration_seconds_count',
              type: 'counter',
              help: 'Total number of HTTP request duration observations',
              labels,
              value: stats.count
            },
            {
              name: 'leadflow_http_request_duration_seconds_sum',
              type: 'counter',
              help: 'Sum of HTTP request durations in seconds',
              labels,
              value: (stats.avg * stats.count) / 1000
            }
          );
        }

        if (key.includes('database_query_duration')) {
          metrics.push(
            {
              name: 'leadflow_database_query_duration_seconds',
              type: 'histogram',
              help: 'Database query duration in seconds',
              labels: { ...labels, quantile: '0.5' },
              value: stats.p50 / 1000
            },
            {
              name: 'leadflow_database_query_duration_seconds',
              type: 'histogram',
              help: 'Database query duration in seconds',
              labels: { ...labels, quantile: '0.95' },
              value: stats.p95 / 1000
            },
            {
              name: 'leadflow_database_query_duration_seconds',
              type: 'histogram',
              help: 'Database query duration in seconds',
              labels: { ...labels, quantile: '0.99' },
              value: stats.p99 / 1000
            }
          );
        }
      }
    }

    // Gauge metrics
    const gauges = metricsCollector.getGauges();
    for (const [key, value] of gauges) {
      if (key.includes('active_connections')) {
        metrics.push({
          name: 'leadflow_active_connections',
          type: 'gauge',
          help: 'Number of active connections',
          value
        });
      }
    }

    return metrics;
  }

  /**
   * Export all metrics in Prometheus format
   */
  exportMetrics(): string {
    // Update system metrics
    this.updateSystemMetrics();
    
    // Get all metrics
    const allMetrics = [
      ...Array.from(this.customMetrics.values()),
      ...this.getApplicationMetrics()
    ];

    // Group metrics by name for proper Prometheus format
    const metricGroups = new Map<string, PrometheusMetric[]>();
    
    for (const metric of allMetrics) {
      const existing = metricGroups.get(metric.name) || [];
      existing.push(metric);
      metricGroups.set(metric.name, existing);
    }

    // Format as Prometheus text
    const lines: string[] = [];
    
    for (const [name, metrics] of metricGroups) {
      // Add HELP and TYPE comments
      const firstMetric = metrics[0];
      lines.push(`# HELP ${name} ${firstMetric.help}`);
      lines.push(`# TYPE ${name} ${firstMetric.type}`);
      
      // Add metric lines
      for (const metric of metrics) {
        const labelsStr = this.formatLabels(metric.labels);
        const timestamp = metric.timestamp ? ` ${metric.timestamp}` : '';
        lines.push(`${name}${labelsStr} ${metric.value}${timestamp}`);
      }
      
      lines.push(''); // Empty line between metric groups
    }

    return lines.join('\n');
  }

  private getMetricKey(name: string, labels?: Record<string, string>): string {
    if (!labels || Object.keys(labels).length === 0) {
      return name;
    }
    
    const labelStr = Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}="${value}"`)
      .join(',');
    
    return `${name}{${labelStr}}`;
  }

  private parseLabelsFromKey(key: string): Record<string, string> {
    const match = key.match(/\{([^}]+)\}/);
    if (!match) return {};
    
    const labelStr = match[1];
    const labels: Record<string, string> = {};
    
    // Parse key=value pairs
    const pairs = labelStr.split(',');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (key && value) {
        labels[key.trim()] = value.trim();
      }
    }
    
    return labels;
  }

  private formatLabels(labels?: Record<string, string>): string {
    if (!labels || Object.keys(labels).length === 0) {
      return '';
    }
    
    const labelPairs = Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}="${value}"`)
      .join(',');
    
    return `{${labelPairs}}`;
  }
}

// Business logic metrics
export class BusinessMetrics {
  private static exporter = PrometheusMetricsExporter.getInstance();

  static recordUserRegistration(plan: string): void {
    metricsCollector.incrementCounter('user_registrations_total', { plan });
    
    this.exporter.registerMetric({
      name: 'leadflow_user_registrations_total',
      type: 'counter',
      help: 'Total number of user registrations',
      labels: { plan },
      value: 1
    });
  }

  static recordLeadGeneration(source: string, success: boolean): void {
    metricsCollector.incrementCounter('lead_generations_total', { 
      source, 
      success: success.toString() 
    });
    
    this.exporter.registerMetric({
      name: 'leadflow_lead_generations_total',
      type: 'counter',
      help: 'Total number of lead generation attempts',
      labels: { source, success: success.toString() },
      value: 1
    });
  }

  static recordCampaignSent(type: 'email' | 'sms', success: boolean): void {
    metricsCollector.incrementCounter('campaigns_sent_total', { 
      type, 
      success: success.toString() 
    });
    
    this.exporter.registerMetric({
      name: 'leadflow_campaigns_sent_total',
      type: 'counter',
      help: 'Total number of campaigns sent',
      labels: { type, success: success.toString() },
      value: 1
    });
  }

  static recordSubscriptionEvent(event: 'created' | 'cancelled' | 'upgraded', plan: string): void {
    metricsCollector.incrementCounter('subscription_events_total', { event, plan });
    
    this.exporter.registerMetric({
      name: 'leadflow_subscription_events_total',
      type: 'counter',
      help: 'Total number of subscription events',
      labels: { event, plan },
      value: 1
    });
  }

  static updateActiveUsers(count: number): void {
    metricsCollector.recordGauge('active_users', count);
    
    this.exporter.registerMetric({
      name: 'leadflow_active_users',
      type: 'gauge',
      help: 'Number of currently active users',
      value: count
    });
  }

  static updateLeadCount(userId: string, count: number): void {
    metricsCollector.recordGauge('user_lead_count', count, { user_id: userId });
    
    this.exporter.registerMetric({
      name: 'leadflow_user_leads_total',
      type: 'gauge',
      help: 'Total number of leads per user',
      labels: { user_id: userId },
      value: count
    });
  }
}

// Export singleton instance
export const prometheusExporter = PrometheusMetricsExporter.getInstance();