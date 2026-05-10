import { logger, AuditEvent } from './logger';
import { metricsCollector } from './metrics';

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface Alert {
  id: string;
  name: string;
  severity: AlertSeverity;
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
  resolved?: boolean;
  resolvedAt?: Date;
}

export interface AlertRule {
  name: string;
  condition: (metrics: any) => boolean;
  severity: AlertSeverity;
  message: string;
  cooldownMinutes?: number;
}

class AlertingSystem {
  private alerts: Alert[] = [];
  private alertRules: AlertRule[] = [];
  private lastAlertTimes = new Map<string, Date>();

  constructor() {
    this.setupDefaultRules();
    this.startMonitoring();
  }

  private setupDefaultRules(): void {
    // High error rate alert
    this.addRule({
      name: 'high_error_rate',
      condition: () => {
        const errorCount = metricsCollector.getCounters().get('api_responses_total{status_code=500}') || 0;
        const totalCount = Array.from(metricsCollector.getCounters().entries())
          .filter(([key]) => key.startsWith('api_responses_total'))
          .reduce((sum, [, value]) => sum + value, 0);
        
        return totalCount > 10 && (errorCount / totalCount) > 0.1; // 10% error rate
      },
      severity: AlertSeverity.HIGH,
      message: 'High error rate detected (>10%)',
      cooldownMinutes: 5
    });

    // Slow response time alert
    this.addRule({
      name: 'slow_response_time',
      condition: () => {
        const stats = metricsCollector.getHistogramStats('api_request_duration');
        return stats !== null && stats.p95 > 5000; // 5 seconds
      },
      severity: AlertSeverity.MEDIUM,
      message: 'Slow API response times detected (P95 > 5s)',
      cooldownMinutes: 10
    });

    // High memory usage alert
    this.addRule({
      name: 'high_memory_usage',
      condition: () => {
        const heapUsed = metricsCollector.getGauges().get('memory_usage_bytes{type=heap_used}') || 0;
        const heapTotal = metricsCollector.getGauges().get('memory_usage_bytes{type=heap_total}') || 1;
        return (heapUsed / heapTotal) > 0.9; // 90% memory usage
      },
      severity: AlertSeverity.HIGH,
      message: 'High memory usage detected (>90%)',
      cooldownMinutes: 5
    });

    // Database connection issues
    this.addRule({
      name: 'database_errors',
      condition: () => {
        const failedQueries = metricsCollector.getCounters().get('database_query_results_total{success=false}') || 0;
        const totalQueries = Array.from(metricsCollector.getCounters().entries())
          .filter(([key]) => key.startsWith('database_query_results_total'))
          .reduce((sum, [, value]) => sum + value, 0);
        
        return totalQueries > 5 && (failedQueries / totalQueries) > 0.2; // 20% failure rate
      },
      severity: AlertSeverity.CRITICAL,
      message: 'High database error rate detected (>20%)',
      cooldownMinutes: 2
    });

    // External API failures
    this.addRule({
      name: 'external_api_failures',
      condition: () => {
        const failedCalls = metricsCollector.getCounters().get('external_api_results_total{success=false}') || 0;
        return failedCalls > 5; // More than 5 failures
      },
      severity: AlertSeverity.MEDIUM,
      message: 'Multiple external API failures detected',
      cooldownMinutes: 15
    });
  }

  addRule(rule: AlertRule): void {
    this.alertRules.push(rule);
  }

  removeRule(name: string): void {
    this.alertRules = this.alertRules.filter(rule => rule.name !== name);
  }

  private checkRules(): void {
    for (const rule of this.alertRules) {
      try {
        if (rule.condition(metricsCollector)) {
          this.triggerAlert(rule);
        }
      } catch (error) {
        logger.error(`Error checking alert rule ${rule.name}`, error instanceof Error ? error : new Error(String(error)), {
          requestId: 'alerting-system',
          endpoint: 'alert-check',
          metadata: { ruleName: rule.name }
        });
      }
    }
  }

  private triggerAlert(rule: AlertRule): void {
    const now = new Date();
    const lastAlertTime = this.lastAlertTimes.get(rule.name);
    
    // Check cooldown period
    if (lastAlertTime && rule.cooldownMinutes) {
      const cooldownMs = rule.cooldownMinutes * 60 * 1000;
      if (now.getTime() - lastAlertTime.getTime() < cooldownMs) {
        return; // Still in cooldown period
      }
    }

    const alert: Alert = {
      id: `${rule.name}-${now.getTime()}`,
      name: rule.name,
      severity: rule.severity,
      message: rule.message,
      timestamp: now,
      metadata: {
        ruleName: rule.name,
        metrics: this.getRelevantMetrics(rule.name)
      }
    };

    this.alerts.push(alert);
    this.lastAlertTimes.set(rule.name, now);

    // Log the alert
    logger.error(`ALERT: ${alert.message}`, undefined, {
      requestId: `alert-${alert.id}`,
      endpoint: 'alerting-system',
      metadata: {
        alertId: alert.id,
        severity: alert.severity,
        ruleName: rule.name
      }
    });

    // Create audit event for critical alerts
    if (alert.severity === AlertSeverity.CRITICAL || alert.severity === AlertSeverity.HIGH) {
      const auditEvent: AuditEvent = {
        type: 'system_alert',
        action: 'alert_triggered',
        resource: rule.name,
        metadata: {
          alertId: alert.id,
          severity: alert.severity,
          message: alert.message
        },
        timestamp: now,
        requestId: `alert-${alert.id}`
      };
      logger.audit(auditEvent);
    }

    // In a real implementation, this would send notifications
    this.sendNotification(alert);
  }

  private getRelevantMetrics(ruleName: string): Record<string, any> {
    const counters = Object.fromEntries(metricsCollector.getCounters());
    const gauges = Object.fromEntries(metricsCollector.getGauges());
    
    // Return relevant metrics based on rule name
    switch (ruleName) {
      case 'high_error_rate':
        return {
          counters: Object.fromEntries(
            Object.entries(counters).filter(([key]) => key.includes('api_responses_total'))
          )
        };
      case 'slow_response_time':
        return {
          responseTimeStats: metricsCollector.getHistogramStats('api_request_duration')
        };
      case 'high_memory_usage':
        return {
          gauges: Object.fromEntries(
            Object.entries(gauges).filter(([key]) => key.includes('memory_usage_bytes'))
          )
        };
      case 'database_errors':
        return {
          counters: Object.fromEntries(
            Object.entries(counters).filter(([key]) => key.includes('database_query_results_total'))
          )
        };
      case 'external_api_failures':
        return {
          counters: Object.fromEntries(
            Object.entries(counters).filter(([key]) => key.includes('external_api_results_total'))
          )
        };
      default:
        return { counters, gauges };
    }
  }

  private sendNotification(alert: Alert): void {
    // In a real implementation, this would integrate with:
    // - Email services (SendGrid, AWS SES)
    // - Slack/Teams webhooks
    // - PagerDuty/OpsGenie
    // - SMS services
    
    logger.info(`Alert notification would be sent: ${alert.message}`, {
      requestId: `alert-${alert.id}`,
      endpoint: 'notification-system',
      metadata: {
        alertId: alert.id,
        severity: alert.severity,
        notificationChannels: this.getNotificationChannels(alert.severity)
      }
    });
  }

  private getNotificationChannels(severity: AlertSeverity): string[] {
    switch (severity) {
      case AlertSeverity.CRITICAL:
        return ['email', 'sms', 'slack', 'pagerduty'];
      case AlertSeverity.HIGH:
        return ['email', 'slack'];
      case AlertSeverity.MEDIUM:
        return ['slack'];
      case AlertSeverity.LOW:
        return ['email'];
      default:
        return ['email'];
    }
  }

  resolveAlert(alertId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert && !alert.resolved) {
      alert.resolved = true;
      alert.resolvedAt = new Date();
      
      logger.info(`Alert resolved: ${alert.message}`, {
        requestId: `alert-${alert.id}`,
        endpoint: 'alerting-system',
        metadata: {
          alertId: alert.id,
          resolvedAt: alert.resolvedAt
        }
      });
      
      return true;
    }
    return false;
  }

  getActiveAlerts(): Alert[] {
    return this.alerts.filter(alert => !alert.resolved);
  }

  getAllAlerts(): Alert[] {
    return [...this.alerts];
  }

  private startMonitoring(): void {
    // Check rules every 30 seconds
    setInterval(() => {
      this.checkRules();
    }, 30000);

    // Clean up old resolved alerts every hour
    setInterval(() => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      this.alerts = this.alerts.filter(alert => 
        !alert.resolved || (alert.resolvedAt && alert.resolvedAt > oneHourAgo)
      );
    }, 60 * 60 * 1000);
  }
}

// Singleton alerting system
export const alertingSystem = new AlertingSystem();