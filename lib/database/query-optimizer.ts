import { Query, CollectionReference } from 'firebase-admin/firestore';
import { metricsCollector } from '../monitoring/metrics';
import { logger } from '../monitoring/logger';

export interface QueryOptimizationOptions {
  enableIndexHints?: boolean;
  enableQueryPlan?: boolean;
  enablePerformanceLogging?: boolean;
  slowQueryThreshold?: number; // milliseconds
}

export interface QueryPerformanceMetrics {
  queryId: string;
  collection: string;
  filters: Record<string, any>;
  executionTime: number;
  documentCount: number;
  indexesUsed?: string[];
  isOptimal: boolean;
  suggestions?: string[];
}

export interface IndexRecommendation {
  collection: string;
  fields: string[];
  type: 'single' | 'composite';
  reason: string;
  estimatedImprovement: number; // percentage
}

/**
 * Query performance optimizer for Firestore
 */
export class QueryOptimizer {
  private static readonly SLOW_QUERY_THRESHOLD = 1000; // 1 second
  private static readonly PERFORMANCE_CACHE = new Map<string, QueryPerformanceMetrics>();
  private static readonly INDEX_RECOMMENDATIONS = new Map<string, IndexRecommendation>();

  /**
   * Optimize and execute a Firestore query with performance monitoring
   */
  static async executeOptimizedQuery<T>(
    query: Query,
    converter: (doc: any) => T,
    options: QueryOptimizationOptions = {}
  ): Promise<{ data: T[]; metrics: QueryPerformanceMetrics }> {
    const queryId = this.generateQueryId(query);
    const startTime = Date.now();
    
    try {
      // Check if we have cached performance data for this query
      const cachedMetrics = this.PERFORMANCE_CACHE.get(queryId);
      if (cachedMetrics && options.enablePerformanceLogging) {
        logger.debug('Using cached query performance data', {
          requestId: 'query-optimizer',
          endpoint: 'database-query',
          metadata: { queryId, cachedExecutionTime: cachedMetrics.executionTime },
        });
      }

      // Execute the query
      const snapshot = await query.get();
      const executionTime = Date.now() - startTime;
      const documentCount = snapshot.docs.length;

      // Convert documents
      const data = snapshot.docs.map(converter);

      // Analyze query performance
      const metrics: QueryPerformanceMetrics = {
        queryId,
        collection: this.extractCollectionName(query),
        filters: this.extractFilters(query),
        executionTime,
        documentCount,
        isOptimal: this.isQueryOptimal(executionTime, documentCount),
        suggestions: this.generateOptimizationSuggestions(query, executionTime, documentCount),
      };

      // Cache performance metrics
      this.PERFORMANCE_CACHE.set(queryId, metrics);

      // Log slow queries
      const slowThreshold = options.slowQueryThreshold || this.SLOW_QUERY_THRESHOLD;
      if (executionTime > slowThreshold) {
        this.logSlowQuery(metrics);
      }

      // Record metrics
      metricsCollector.recordHistogram('database_query_duration', executionTime, {
        collection: metrics.collection,
        optimal: metrics.isOptimal.toString(),
      });
      metricsCollector.recordHistogram('database_query_document_count', documentCount);

      // Generate index recommendations if needed
      if (!metrics.isOptimal) {
        this.generateIndexRecommendation(metrics);
      }

      return { data, metrics };

    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      metricsCollector.incrementCounter('database_query_errors_total', {
        collection: this.extractCollectionName(query),
      });

      logger.error('Query execution failed', error as Error, {
        requestId: 'query-optimizer',
        endpoint: 'database-query',
        metadata: { queryId, executionTime },
      });

      throw error;
    }
  }

  /**
   * Analyze query patterns and suggest optimizations
   */
  static analyzeQueryPatterns(): {
    slowQueries: QueryPerformanceMetrics[];
    indexRecommendations: IndexRecommendation[];
    performanceSummary: {
      totalQueries: number;
      averageExecutionTime: number;
      slowQueryPercentage: number;
    };
  } {
    const allMetrics = Array.from(this.PERFORMANCE_CACHE.values());
    const slowQueries = allMetrics.filter(m => !m.isOptimal);
    const indexRecommendations = Array.from(this.INDEX_RECOMMENDATIONS.values());

    const totalQueries = allMetrics.length;
    const averageExecutionTime = totalQueries > 0 
      ? allMetrics.reduce((sum, m) => sum + m.executionTime, 0) / totalQueries 
      : 0;
    const slowQueryPercentage = totalQueries > 0 
      ? (slowQueries.length / totalQueries) * 100 
      : 0;

    return {
      slowQueries,
      indexRecommendations,
      performanceSummary: {
        totalQueries,
        averageExecutionTime,
        slowQueryPercentage,
      },
    };
  }

  /**
   * Get performance recommendations for a collection
   */
  static getCollectionRecommendations(collection: string): {
    queries: QueryPerformanceMetrics[];
    recommendations: IndexRecommendation[];
    averagePerformance: number;
  } {
    const collectionMetrics = Array.from(this.PERFORMANCE_CACHE.values())
      .filter(m => m.collection === collection);
    
    const collectionRecommendations = Array.from(this.INDEX_RECOMMENDATIONS.values())
      .filter(r => r.collection === collection);

    const averagePerformance = collectionMetrics.length > 0
      ? collectionMetrics.reduce((sum, m) => sum + m.executionTime, 0) / collectionMetrics.length
      : 0;

    return {
      queries: collectionMetrics,
      recommendations: collectionRecommendations,
      averagePerformance,
    };
  }

  /**
   * Clear performance cache
   */
  static clearCache(): void {
    this.PERFORMANCE_CACHE.clear();
    this.INDEX_RECOMMENDATIONS.clear();
    
    metricsCollector.incrementCounter('query_optimizer_cache_clears_total');
  }

  /**
   * Generate a unique ID for a query
   */
  private static generateQueryId(query: Query): string {
    // This is a simplified implementation
    // In a real system, you'd want to analyze the query structure more thoroughly
    const queryString = query.toString();
    let hash = 0;
    for (let i = 0; i < queryString.length; i++) {
      const char = queryString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Extract collection name from query
   */
  private static extractCollectionName(query: Query): string {
    // This is a simplified implementation
    // Firestore doesn't expose query internals easily
    const queryString = query.toString();
    const match = queryString.match(/collection\(([^)]+)\)/);
    return match ? match[1].replace(/['"]/g, '') : 'unknown';
  }

  /**
   * Extract filters from query (simplified)
   */
  private static extractFilters(query: Query): Record<string, any> {
    // This is a simplified implementation
    // In practice, you'd need to track filters when building queries
    return {};
  }

  /**
   * Determine if a query is optimal
   */
  private static isQueryOptimal(executionTime: number, documentCount: number): boolean {
    // Simple heuristics for query optimization
    if (executionTime > this.SLOW_QUERY_THRESHOLD) return false;
    if (documentCount > 1000 && executionTime > 500) return false;
    if (documentCount > 100 && executionTime > 200) return false;
    return true;
  }

  /**
   * Generate optimization suggestions
   */
  private static generateOptimizationSuggestions(
    query: Query,
    executionTime: number,
    documentCount: number
  ): string[] {
    const suggestions: string[] = [];

    if (executionTime > this.SLOW_QUERY_THRESHOLD) {
      suggestions.push('Consider adding composite indexes for this query pattern');
    }

    if (documentCount > 1000) {
      suggestions.push('Consider adding pagination to limit result set size');
      suggestions.push('Consider using cursor-based pagination for better performance');
    }

    if (executionTime > 500 && documentCount < 100) {
      suggestions.push('Query may be missing optimal indexes');
      suggestions.push('Consider reviewing query structure and field ordering');
    }

    return suggestions;
  }

  /**
   * Log slow query for analysis
   */
  private static logSlowQuery(metrics: QueryPerformanceMetrics): void {
    logger.warn('Slow query detected', {
      requestId: 'query-optimizer',
      endpoint: 'database-query',
      metadata: {
        queryId: metrics.queryId,
        collection: metrics.collection,
        executionTime: metrics.executionTime,
        documentCount: metrics.documentCount,
        suggestions: metrics.suggestions,
      },
    });

    metricsCollector.incrementCounter('slow_queries_total', {
      collection: metrics.collection,
    });
  }

  /**
   * Generate index recommendation
   */
  private static generateIndexRecommendation(metrics: QueryPerformanceMetrics): void {
    const recommendationKey = `${metrics.collection}_${metrics.queryId}`;
    
    if (!this.INDEX_RECOMMENDATIONS.has(recommendationKey)) {
      // Analyze filters to suggest composite indexes
      const filterFields = Object.keys(metrics.filters);
      
      if (filterFields.length > 1) {
        const recommendation: IndexRecommendation = {
          collection: metrics.collection,
          fields: filterFields,
          type: 'composite',
          reason: `Query uses multiple filters: ${filterFields.join(', ')}`,
          estimatedImprovement: this.estimateIndexImprovement(metrics.executionTime),
        };

        this.INDEX_RECOMMENDATIONS.set(recommendationKey, recommendation);
        
        logger.info('Index recommendation generated', {
          requestId: 'query-optimizer',
          endpoint: 'database-index',
          metadata: recommendation,
        });
      }
    }
  }

  /**
   * Estimate performance improvement from adding an index
   */
  private static estimateIndexImprovement(currentExecutionTime: number): number {
    // Simple heuristic: assume 50-80% improvement for slow queries
    if (currentExecutionTime > 2000) return 70;
    if (currentExecutionTime > 1000) return 50;
    if (currentExecutionTime > 500) return 30;
    return 20;
  }
}

/**
 * Query builder with optimization hints
 */
export class OptimizedQueryBuilder {
  private query: Query;
  private collection: string;
  private appliedFilters: Record<string, any> = {};

  constructor(collection: CollectionReference, collectionName: string) {
    this.query = collection;
    this.collection = collectionName;
  }

  /**
   * Add where clause with optimization tracking
   */
  where(field: string, operator: any, value: any): OptimizedQueryBuilder {
    this.query = this.query.where(field, operator, value);
    this.appliedFilters[field] = { operator, value };
    return this;
  }

  /**
   * Add order by with optimization hints
   */
  orderBy(field: string, direction: 'asc' | 'desc' = 'asc'): OptimizedQueryBuilder {
    this.query = this.query.orderBy(field, direction);
    return this;
  }

  /**
   * Add limit with performance considerations
   */
  limit(limit: number): OptimizedQueryBuilder {
    // Warn about large limits
    if (limit > 1000) {
      logger.warn('Large query limit detected', {
        requestId: 'query-builder',
        endpoint: 'database-query',
        metadata: { collection: this.collection, limit },
      });
    }

    this.query = this.query.limit(limit);
    return this;
  }

  /**
   * Execute query with optimization
   */
  async execute<T>(
    converter: (doc: any) => T,
    options?: QueryOptimizationOptions
  ): Promise<{ data: T[]; metrics: QueryPerformanceMetrics }> {
    return QueryOptimizer.executeOptimizedQuery(this.query, converter, options);
  }

  /**
   * Get the underlying query
   */
  getQuery(): Query {
    return this.query;
  }

  /**
   * Get applied filters for analysis
   */
  getFilters(): Record<string, any> {
    return { ...this.appliedFilters };
  }
}

/**
 * Performance monitoring middleware for database operations
 */
export class DatabasePerformanceMonitor {
  private static readonly OPERATION_METRICS = new Map<string, {
    count: number;
    totalTime: number;
    averageTime: number;
    slowOperations: number;
  }>();

  /**
   * Track database operation performance
   */
  static trackOperation<T>(
    operation: string,
    collection: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now();
    const operationKey = `${operation}_${collection}`;

    return fn().then(
      (result) => {
        const executionTime = Date.now() - startTime;
        this.recordOperationMetrics(operationKey, executionTime, true);
        return result;
      },
      (error) => {
        const executionTime = Date.now() - startTime;
        this.recordOperationMetrics(operationKey, executionTime, false);
        throw error;
      }
    );
  }

  /**
   * Record operation metrics
   */
  private static recordOperationMetrics(
    operationKey: string,
    executionTime: number,
    success: boolean
  ): void {
    const existing = this.OPERATION_METRICS.get(operationKey) || {
      count: 0,
      totalTime: 0,
      averageTime: 0,
      slowOperations: 0,
    };

    existing.count++;
    existing.totalTime += executionTime;
    existing.averageTime = existing.totalTime / existing.count;
    
    if (executionTime > QueryOptimizer['SLOW_QUERY_THRESHOLD']) {
      existing.slowOperations++;
    }

    this.OPERATION_METRICS.set(operationKey, existing);

    // Record metrics
    metricsCollector.recordHistogram('database_operation_duration', executionTime, {
      operation: operationKey,
      success: success.toString(),
    });
  }

  /**
   * Get performance summary
   */
  static getPerformanceSummary(): Record<string, any> {
    const summary: Record<string, any> = {};
    
    for (const [operation, metrics] of this.OPERATION_METRICS.entries()) {
      summary[operation] = {
        ...metrics,
        slowOperationPercentage: (metrics.slowOperations / metrics.count) * 100,
      };
    }

    return summary;
  }

  /**
   * Clear performance metrics
   */
  static clearMetrics(): void {
    this.OPERATION_METRICS.clear();
  }
}