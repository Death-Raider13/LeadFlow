module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/monitoring/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CorrelationManager",
    ()=>CorrelationManager,
    "LogLevel",
    ()=>LogLevel,
    "logger",
    ()=>logger
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
var LogLevel = /*#__PURE__*/ function(LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
    LogLevel["AUDIT"] = "audit";
    return LogLevel;
}({});
class StructuredLogger {
    sensitiveFields = [
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
    sanitizeData(data) {
        if (typeof data !== 'object' || data === null) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((item)=>this.sanitizeData(item));
        }
        const sanitized = {};
        for (const [key, value] of Object.entries(data)){
            const lowerKey = key.toLowerCase();
            const isSensitive = this.sensitiveFields.some((field)=>lowerKey.includes(field));
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
    formatLogEntry(level, message, context, error) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            requestId: context?.requestId || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])(),
            ...context && {
                userId: context.userId,
                endpoint: context.endpoint,
                duration: context.duration,
                metadata: context.metadata ? this.sanitizeData(context.metadata) : undefined
            },
            ...error && {
                error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                }
            }
        };
        return JSON.stringify(this.sanitizeData(logEntry));
    }
    info(message, context) {
        const logEntry = this.formatLogEntry("info", message, context);
        console.log(logEntry);
    }
    warn(message, context) {
        const logEntry = this.formatLogEntry("warn", message, context);
        console.warn(logEntry);
    }
    error(message, error, context) {
        const logEntry = this.formatLogEntry("error", message, context, error);
        console.error(logEntry);
    }
    debug(message, context) {
        if ("TURBOPACK compile-time truthy", 1) {
            const logEntry = this.formatLogEntry("debug", message, context);
            console.debug(logEntry);
        }
    }
    audit(event) {
        const logEntry = {
            timestamp: event.timestamp.toISOString(),
            level: "audit",
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
const logger = new StructuredLogger();
class CorrelationManager {
    static correlationIds = new Map();
    static generateCorrelationId() {
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])();
    }
    static setCorrelationId(key, correlationId) {
        this.correlationIds.set(key, correlationId);
    }
    static getCorrelationId(key) {
        return this.correlationIds.get(key);
    }
    static clearCorrelationId(key) {
        this.correlationIds.delete(key);
    }
}
}),
"[project]/lib/monitoring/metrics.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PerformanceMonitor",
    ()=>PerformanceMonitor,
    "metricsCollector",
    ()=>metricsCollector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/logger.ts [app-route] (ecmascript)");
;
class InMemoryMetricsCollector {
    metrics = [];
    counters = new Map();
    gauges = new Map();
    histograms = new Map();
    incrementCounter(name, tags) {
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
    recordHistogram(name, value, tags) {
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
    recordGauge(name, value, tags) {
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
    startTimer(name) {
        const startTime = Date.now();
        return {
            end: ()=>{
                const duration = Date.now() - startTime;
                this.recordHistogram(name, duration, {
                    unit: 'milliseconds'
                });
                return duration;
            }
        };
    }
    getMetricKey(name, tags) {
        if (!tags) return name;
        const tagString = Object.entries(tags).sort(([a], [b])=>a.localeCompare(b)).map(([key, value])=>`${key}=${value}`).join(',');
        return `${name}{${tagString}}`;
    }
    recordMetric(metric) {
        this.metrics.push(metric);
        // Keep only last 1000 metrics to prevent memory issues
        if (this.metrics.length > 1000) {
            this.metrics = this.metrics.slice(-1000);
        }
        // Log metrics in development for debugging
        if ("TURBOPACK compile-time truthy", 1) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].debug(`Metric recorded: ${metric.name}=${metric.value}`, {
                requestId: 'metrics-system',
                endpoint: 'metrics',
                metadata: {
                    metricType: metric.type,
                    tags: metric.tags
                }
            });
        }
    }
    // Get metrics for health checks and monitoring
    getMetrics() {
        return [
            ...this.metrics
        ];
    }
    getCounters() {
        return new Map(this.counters);
    }
    getGauges() {
        return new Map(this.gauges);
    }
    getHistograms() {
        return new Map(this.histograms);
    }
    // Get summary statistics for histograms
    getHistogramStats(name, tags) {
        const key = this.getMetricKey(name, tags);
        const values = this.histograms.get(key);
        if (!values || values.length === 0) {
            return null;
        }
        const sorted = [
            ...values
        ].sort((a, b)=>a - b);
        const count = sorted.length;
        const min = sorted[0];
        const max = sorted[count - 1];
        const avg = sorted.reduce((sum, val)=>sum + val, 0) / count;
        const percentile = (p)=>{
            const index = Math.ceil(p / 100 * count) - 1;
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
const metricsCollector = new InMemoryMetricsCollector();
class PerformanceMonitor {
    static trackApiCall(endpoint, method) {
        const timer = metricsCollector.startTimer('api_request_duration');
        metricsCollector.incrementCounter('api_requests_total', {
            endpoint,
            method
        });
        return {
            end: (statusCode)=>{
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
    static trackDatabaseQuery(operation, table) {
        const timer = metricsCollector.startTimer('database_query_duration');
        metricsCollector.incrementCounter('database_queries_total', {
            operation,
            table: table || 'unknown'
        });
        return {
            end: (success)=>{
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
    static trackExternalApiCall(service, endpoint) {
        const timer = metricsCollector.startTimer('external_api_duration');
        metricsCollector.incrementCounter('external_api_calls_total', {
            service,
            endpoint
        });
        return {
            end: (success, statusCode)=>{
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
    static recordMemoryUsage() {
        if (typeof process !== 'undefined' && process.memoryUsage) {
            const memUsage = process.memoryUsage();
            metricsCollector.recordGauge('memory_usage_bytes', memUsage.heapUsed, {
                type: 'heap_used'
            });
            metricsCollector.recordGauge('memory_usage_bytes', memUsage.heapTotal, {
                type: 'heap_total'
            });
            metricsCollector.recordGauge('memory_usage_bytes', memUsage.rss, {
                type: 'rss'
            });
        }
    }
    static recordActiveConnections(count) {
        metricsCollector.recordGauge('active_connections', count);
    }
}
}),
"[project]/lib/monitoring/prometheus-metrics.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BusinessMetrics",
    ()=>BusinessMetrics,
    "PrometheusMetricsExporter",
    ()=>PrometheusMetricsExporter,
    "prometheusExporter",
    ()=>prometheusExporter
]);
/**
 * Enhanced Prometheus metrics collector for LeadFlow application
 * Provides comprehensive metrics in Prometheus format with proper labels and types
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/metrics.ts [app-route] (ecmascript)");
;
class PrometheusMetricsExporter {
    static instance;
    customMetrics = new Map();
    startTime = Date.now();
    static getInstance() {
        if (!PrometheusMetricsExporter.instance) {
            PrometheusMetricsExporter.instance = new PrometheusMetricsExporter();
        }
        return PrometheusMetricsExporter.instance;
    }
    /**
   * Register a custom metric
   */ registerMetric(metric) {
        const key = this.getMetricKey(metric.name, metric.labels);
        this.customMetrics.set(key, metric);
    }
    /**
   * Update system metrics
   */ updateSystemMetrics() {
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
            setImmediate(()=>{
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
   */ getApplicationMetrics() {
        const metrics = [];
        // HTTP request metrics
        const counters = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getCounters();
        for (const [key, value] of counters){
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
        const histograms = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getHistograms();
        for (const [key] of histograms){
            const stats = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getHistogramStats(key);
            if (stats) {
                const labels = this.parseLabelsFromKey(key);
                if (key.includes('api_request_duration')) {
                    metrics.push({
                        name: 'leadflow_http_request_duration_seconds',
                        type: 'histogram',
                        help: 'HTTP request duration in seconds',
                        labels: {
                            ...labels,
                            quantile: '0.5'
                        },
                        value: stats.p50 / 1000 // Convert ms to seconds
                    }, {
                        name: 'leadflow_http_request_duration_seconds',
                        type: 'histogram',
                        help: 'HTTP request duration in seconds',
                        labels: {
                            ...labels,
                            quantile: '0.95'
                        },
                        value: stats.p95 / 1000
                    }, {
                        name: 'leadflow_http_request_duration_seconds',
                        type: 'histogram',
                        help: 'HTTP request duration in seconds',
                        labels: {
                            ...labels,
                            quantile: '0.99'
                        },
                        value: stats.p99 / 1000
                    }, {
                        name: 'leadflow_http_request_duration_seconds_count',
                        type: 'counter',
                        help: 'Total number of HTTP request duration observations',
                        labels,
                        value: stats.count
                    }, {
                        name: 'leadflow_http_request_duration_seconds_sum',
                        type: 'counter',
                        help: 'Sum of HTTP request durations in seconds',
                        labels,
                        value: stats.avg * stats.count / 1000
                    });
                }
                if (key.includes('database_query_duration')) {
                    metrics.push({
                        name: 'leadflow_database_query_duration_seconds',
                        type: 'histogram',
                        help: 'Database query duration in seconds',
                        labels: {
                            ...labels,
                            quantile: '0.5'
                        },
                        value: stats.p50 / 1000
                    }, {
                        name: 'leadflow_database_query_duration_seconds',
                        type: 'histogram',
                        help: 'Database query duration in seconds',
                        labels: {
                            ...labels,
                            quantile: '0.95'
                        },
                        value: stats.p95 / 1000
                    }, {
                        name: 'leadflow_database_query_duration_seconds',
                        type: 'histogram',
                        help: 'Database query duration in seconds',
                        labels: {
                            ...labels,
                            quantile: '0.99'
                        },
                        value: stats.p99 / 1000
                    });
                }
            }
        }
        // Gauge metrics
        const gauges = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].getGauges();
        for (const [key, value] of gauges){
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
   */ exportMetrics() {
        // Update system metrics
        this.updateSystemMetrics();
        // Get all metrics
        const allMetrics = [
            ...Array.from(this.customMetrics.values()),
            ...this.getApplicationMetrics()
        ];
        // Group metrics by name for proper Prometheus format
        const metricGroups = new Map();
        for (const metric of allMetrics){
            const existing = metricGroups.get(metric.name) || [];
            existing.push(metric);
            metricGroups.set(metric.name, existing);
        }
        // Format as Prometheus text
        const lines = [];
        for (const [name, metrics] of metricGroups){
            // Add HELP and TYPE comments
            const firstMetric = metrics[0];
            lines.push(`# HELP ${name} ${firstMetric.help}`);
            lines.push(`# TYPE ${name} ${firstMetric.type}`);
            // Add metric lines
            for (const metric of metrics){
                const labelsStr = this.formatLabels(metric.labels);
                const timestamp = metric.timestamp ? ` ${metric.timestamp}` : '';
                lines.push(`${name}${labelsStr} ${metric.value}${timestamp}`);
            }
            lines.push(''); // Empty line between metric groups
        }
        return lines.join('\n');
    }
    getMetricKey(name, labels) {
        if (!labels || Object.keys(labels).length === 0) {
            return name;
        }
        const labelStr = Object.entries(labels).sort(([a], [b])=>a.localeCompare(b)).map(([key, value])=>`${key}="${value}"`).join(',');
        return `${name}{${labelStr}}`;
    }
    parseLabelsFromKey(key) {
        const match = key.match(/\{([^}]+)\}/);
        if (!match) return {};
        const labelStr = match[1];
        const labels = {};
        // Parse key=value pairs
        const pairs = labelStr.split(',');
        for (const pair of pairs){
            const [key, value] = pair.split('=');
            if (key && value) {
                labels[key.trim()] = value.trim();
            }
        }
        return labels;
    }
    formatLabels(labels) {
        if (!labels || Object.keys(labels).length === 0) {
            return '';
        }
        const labelPairs = Object.entries(labels).sort(([a], [b])=>a.localeCompare(b)).map(([key, value])=>`${key}="${value}"`).join(',');
        return `{${labelPairs}}`;
    }
}
class BusinessMetrics {
    static exporter = PrometheusMetricsExporter.getInstance();
    static recordUserRegistration(plan) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].incrementCounter('user_registrations_total', {
            plan
        });
        this.exporter.registerMetric({
            name: 'leadflow_user_registrations_total',
            type: 'counter',
            help: 'Total number of user registrations',
            labels: {
                plan
            },
            value: 1
        });
    }
    static recordLeadGeneration(source, success) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].incrementCounter('lead_generations_total', {
            source,
            success: success.toString()
        });
        this.exporter.registerMetric({
            name: 'leadflow_lead_generations_total',
            type: 'counter',
            help: 'Total number of lead generation attempts',
            labels: {
                source,
                success: success.toString()
            },
            value: 1
        });
    }
    static recordCampaignSent(type, success) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].incrementCounter('campaigns_sent_total', {
            type,
            success: success.toString()
        });
        this.exporter.registerMetric({
            name: 'leadflow_campaigns_sent_total',
            type: 'counter',
            help: 'Total number of campaigns sent',
            labels: {
                type,
                success: success.toString()
            },
            value: 1
        });
    }
    static recordSubscriptionEvent(event, plan) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].incrementCounter('subscription_events_total', {
            event,
            plan
        });
        this.exporter.registerMetric({
            name: 'leadflow_subscription_events_total',
            type: 'counter',
            help: 'Total number of subscription events',
            labels: {
                event,
                plan
            },
            value: 1
        });
    }
    static updateActiveUsers(count) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].recordGauge('active_users', count);
        this.exporter.registerMetric({
            name: 'leadflow_active_users',
            type: 'gauge',
            help: 'Number of currently active users',
            value: count
        });
    }
    static updateLeadCount(userId, count) {
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricsCollector"].recordGauge('user_lead_count', count, {
            user_id: userId
        });
        this.exporter.registerMetric({
            name: 'leadflow_user_leads_total',
            type: 'gauge',
            help: 'Total number of leads per user',
            labels: {
                user_id: userId
            },
            value: count
        });
    }
}
const prometheusExporter = PrometheusMetricsExporter.getInstance();
}),
"[project]/app/api/metrics/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$prometheus$2d$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/monitoring/prometheus-metrics.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        // Export metrics in Prometheus format
        const prometheusMetrics = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$monitoring$2f$prometheus$2d$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prometheusExporter"].exportMetrics();
        return new Response(prometheusMetrics, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    } catch (error) {
        console.error('Metrics endpoint error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to retrieve metrics'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__313a8e06._.js.map