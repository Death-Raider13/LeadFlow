import { Query, QuerySnapshot, DocumentSnapshot } from 'firebase-admin/firestore';
import { metricsCollector } from '../monitoring/metrics';
import { logger } from '../monitoring/logger';

export interface PaginationOptions {
  limit?: number;
  page?: number;
  cursor?: string; // For cursor-based pagination
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface CursorPaginationOptions {
  limit?: number;
  startAfter?: string; // Document ID to start after
  endBefore?: string; // Document ID to end before
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page?: number;
    limit: number;
    total?: number;
    hasNext: boolean;
    hasPrevious?: boolean;
    nextCursor?: string;
    previousCursor?: string;
  };
}

export interface StreamOptions {
  batchSize?: number;
  maxConcurrency?: number;
  onBatch?: (batch: any[], batchNumber: number) => Promise<void>;
  onError?: (error: Error, batchNumber: number) => void;
}

/**
 * Enhanced pagination utilities for consistent pagination patterns
 */
export class PaginationManager {
  private static readonly DEFAULT_LIMIT = 50;
  private static readonly MAX_LIMIT = 1000;
  private static readonly DEFAULT_BATCH_SIZE = 100;

  /**
   * Apply offset-based pagination to a Firestore query
   */
  static async paginateQuery<T>(
    query: Query,
    options: PaginationOptions = {},
    converter: (doc: DocumentSnapshot) => T
  ): Promise<PaginatedResult<T>> {
    const startTime = Date.now();
    
    try {
      const limit = Math.min(options.limit || this.DEFAULT_LIMIT, this.MAX_LIMIT);
      const page = Math.max(options.page || 1, 1);
      const offset = (page - 1) * limit;

      // Apply sorting
      let paginatedQuery = query;
      if (options.sortField) {
        paginatedQuery = paginatedQuery.orderBy(
          options.sortField, 
          options.sortDirection || 'desc'
        );
      }

      // Apply pagination
      paginatedQuery = paginatedQuery.limit(limit).offset(offset);

      // Execute query
      const snapshot = await paginatedQuery.get();
      const data = snapshot.docs.map(converter);

      // Get total count (expensive operation, consider caching)
      const countSnapshot = await query.count().get();
      const total = countSnapshot.data().count;

      const result: PaginatedResult<T> = {
        data,
        pagination: {
          page,
          limit,
          total,
          hasNext: offset + data.length < total,
          hasPrevious: page > 1,
        },
      };

      // Record metrics
      metricsCollector.recordHistogram('pagination_query_duration', Date.now() - startTime);
      metricsCollector.incrementCounter('pagination_queries_total', {
        type: 'offset',
        page: page.toString(),
      });

      return result;
    } catch (error) {
      metricsCollector.incrementCounter('pagination_errors_total', { type: 'offset' });
      throw error;
    }
  }

  /**
   * Apply cursor-based pagination to a Firestore query (more efficient for large datasets)
   */
  static async paginateWithCursor<T>(
    query: Query,
    options: CursorPaginationOptions = {},
    converter: (doc: DocumentSnapshot) => T
  ): Promise<PaginatedResult<T>> {
    const startTime = Date.now();
    
    try {
      const limit = Math.min(options.limit || this.DEFAULT_LIMIT, this.MAX_LIMIT);
      
      // Apply sorting
      let paginatedQuery = query;
      if (options.sortField) {
        paginatedQuery = paginatedQuery.orderBy(
          options.sortField, 
          options.sortDirection || 'desc'
        );
      }

      // Apply cursor pagination
      if (options.startAfter) {
        // Get the document to start after
        const startDoc = await query.firestore.doc(options.startAfter).get();
        if (startDoc.exists) {
          paginatedQuery = paginatedQuery.startAfter(startDoc);
        }
      }

      if (options.endBefore) {
        // Get the document to end before
        const endDoc = await query.firestore.doc(options.endBefore).get();
        if (endDoc.exists) {
          paginatedQuery = paginatedQuery.endBefore(endDoc);
        }
      }

      // Apply limit (get one extra to check if there's a next page)
      paginatedQuery = paginatedQuery.limit(limit + 1);

      // Execute query
      const snapshot = await paginatedQuery.get();
      const docs = snapshot.docs;
      
      // Check if there's a next page
      const hasNext = docs.length > limit;
      if (hasNext) {
        docs.pop(); // Remove the extra document
      }

      const data = docs.map(converter);
      
      const result: PaginatedResult<T> = {
        data,
        pagination: {
          limit,
          hasNext,
          hasPrevious: !!options.startAfter,
          nextCursor: hasNext && docs.length > 0 ? docs[docs.length - 1].id : undefined,
          previousCursor: options.startAfter,
        },
      };

      // Record metrics
      metricsCollector.recordHistogram('pagination_query_duration', Date.now() - startTime);
      metricsCollector.incrementCounter('pagination_queries_total', {
        type: 'cursor',
      });

      return result;
    } catch (error) {
      metricsCollector.incrementCounter('pagination_errors_total', { type: 'cursor' });
      throw error;
    }
  }

  /**
   * Stream large datasets in batches for processing
   */
  static async streamQuery<T>(
    query: Query,
    converter: (doc: DocumentSnapshot) => T,
    processor: (batch: T[]) => Promise<void>,
    options: StreamOptions = {}
  ): Promise<void> {
    const batchSize = options.batchSize || this.DEFAULT_BATCH_SIZE;
    const maxConcurrency = options.maxConcurrency || 3;
    
    let batchNumber = 0;
    let lastDoc: DocumentSnapshot | null = null;
    let hasMore = true;
    
    const activeBatches = new Set<Promise<void>>();

    try {
      while (hasMore) {
        // Build query for this batch
        let batchQuery = query.limit(batchSize);
        if (lastDoc) {
          batchQuery = batchQuery.startAfter(lastDoc);
        }

        // Execute query
        const snapshot = await batchQuery.get();
        const docs = snapshot.docs;
        
        if (docs.length === 0) {
          hasMore = false;
          break;
        }

        // Convert documents
        const batch = docs.map(converter);
        batchNumber++;

        // Process batch (with concurrency control)
        const batchPromise = this.processBatch(
          batch,
          batchNumber,
          processor,
          options
        );

        activeBatches.add(batchPromise);

        // Wait for some batches to complete if we hit concurrency limit
        if (activeBatches.size >= maxConcurrency) {
          await Promise.race(activeBatches);
          // Clean up completed promises
          for (const promise of activeBatches) {
            if (await this.isPromiseResolved(promise)) {
              activeBatches.delete(promise);
            }
          }
        }

        // Update cursor for next batch
        lastDoc = docs[docs.length - 1];
        hasMore = docs.length === batchSize;

        // Record metrics
        metricsCollector.incrementCounter('stream_batches_processed_total');
        metricsCollector.recordHistogram('stream_batch_size', batch.length);
      }

      // Wait for all remaining batches to complete
      await Promise.all(activeBatches);

      logger.info(`Stream processing completed: ${batchNumber} batches processed`, {
        requestId: 'stream-processor',
        endpoint: 'database-stream',
        metadata: { totalBatches: batchNumber },
      });

    } catch (error) {
      metricsCollector.incrementCounter('stream_errors_total');
      logger.error('Stream processing failed', error as Error, {
        requestId: 'stream-processor',
        endpoint: 'database-stream',
        metadata: { batchNumber },
      });
      throw error;
    }
  }

  /**
   * Process a single batch with error handling
   */
  private static async processBatch<T>(
    batch: T[],
    batchNumber: number,
    processor: (batch: T[]) => Promise<void>,
    options: StreamOptions
  ): Promise<void> {
    try {
      // Call custom batch handler if provided
      if (options.onBatch) {
        await options.onBatch(batch, batchNumber);
      }

      // Process the batch
      await processor(batch);

      metricsCollector.incrementCounter('stream_batch_success_total');
    } catch (error) {
      metricsCollector.incrementCounter('stream_batch_errors_total');
      
      if (options.onError) {
        options.onError(error as Error, batchNumber);
      } else {
        logger.error(`Batch ${batchNumber} processing failed`, error as Error, {
          requestId: 'stream-processor',
          endpoint: 'database-stream',
          metadata: { batchNumber, batchSize: batch.length },
        });
        throw error;
      }
    }
  }

  /**
   * Check if a promise has resolved (helper for concurrency control)
   */
  private static async isPromiseResolved(promise: Promise<void>): Promise<boolean> {
    try {
      await Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 0))
      ]);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Create a paginated response with consistent format
   */
  static createPaginatedResponse<T>(
    data: T[],
    options: PaginationOptions,
    total?: number
  ): PaginatedResult<T> {
    const limit = Math.min(options.limit || this.DEFAULT_LIMIT, this.MAX_LIMIT);
    const page = Math.max(options.page || 1, 1);
    
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        hasNext: total ? (page * limit) < total : data.length === limit,
        hasPrevious: page > 1,
      },
    };
  }

  /**
   * Validate pagination parameters
   */
  static validatePaginationOptions(options: PaginationOptions): PaginationOptions {
    return {
      ...options,
      limit: Math.min(Math.max(options.limit || this.DEFAULT_LIMIT, 1), this.MAX_LIMIT),
      page: Math.max(options.page || 1, 1),
    };
  }
}

/**
 * Resource optimization utilities for concurrent requests
 */
export class ResourceOptimizer {
  private static activeQueries = new Map<string, Promise<any>>();
  private static queryCache = new Map<string, { result: any; timestamp: number; ttl: number }>();

  /**
   * Deduplicate identical queries to prevent resource waste
   */
  static async deduplicateQuery<T>(
    queryKey: string,
    queryFn: () => Promise<T>,
    ttl: number = 30000 // 30 seconds default
  ): Promise<T> {
    // Check cache first
    const cached = this.queryCache.get(queryKey);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      metricsCollector.incrementCounter('query_cache_hits_total');
      return cached.result;
    }

    // Check if query is already in progress
    if (this.activeQueries.has(queryKey)) {
      metricsCollector.incrementCounter('query_deduplication_hits_total');
      return await this.activeQueries.get(queryKey)!;
    }

    // Execute new query
    const queryPromise = queryFn();
    this.activeQueries.set(queryKey, queryPromise);

    try {
      const result = await queryPromise;
      
      // Cache result
      this.queryCache.set(queryKey, {
        result,
        timestamp: Date.now(),
        ttl,
      });

      metricsCollector.incrementCounter('query_executions_total');
      return result;
    } finally {
      this.activeQueries.delete(queryKey);
    }
  }

  /**
   * Generate query key for deduplication
   */
  static generateQueryKey(
    collection: string,
    filters: Record<string, any>,
    pagination: PaginationOptions
  ): string {
    const filterString = JSON.stringify(filters);
    const paginationString = JSON.stringify(pagination);
    return `${collection}:${filterString}:${paginationString}`;
  }

  /**
   * Clear query cache
   */
  static clearCache(): void {
    this.queryCache.clear();
    metricsCollector.incrementCounter('query_cache_clears_total');
  }

  /**
   * Clean expired cache entries
   */
  static cleanExpiredCache(): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.queryCache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.queryCache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      metricsCollector.recordHistogram('query_cache_cleanup_count', cleaned);
    }

    return cleaned;
  }
}

/**
 * Batch processing utilities for efficient bulk operations
 */
export class BatchProcessor {
  /**
   * Process items in batches with configurable concurrency
   */
  static async processBatches<T, R>(
    items: T[],
    processor: (batch: T[]) => Promise<R[]>,
    options: {
      batchSize?: number;
      maxConcurrency?: number;
      onProgress?: (processed: number, total: number) => void;
    } = {}
  ): Promise<R[]> {
    const batchSize = options.batchSize || 50;
    const maxConcurrency = options.maxConcurrency || 3;
    const results: R[] = [];
    
    // Split items into batches
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }

    // Process batches with concurrency control
    const activeBatches = new Set<Promise<R[]>>();
    let processedBatches = 0;

    for (const batch of batches) {
      const batchPromise = processor(batch).then(batchResults => {
        results.push(...batchResults);
        processedBatches++;
        
        if (options.onProgress) {
          options.onProgress(processedBatches * batchSize, items.length);
        }
        
        return batchResults;
      });

      activeBatches.add(batchPromise);

      // Wait for some batches to complete if we hit concurrency limit
      if (activeBatches.size >= maxConcurrency) {
        const completed = await Promise.race(activeBatches);
        activeBatches.delete(Promise.resolve(completed));
      }
    }

    // Wait for all remaining batches
    await Promise.all(activeBatches);

    metricsCollector.recordHistogram('batch_processing_total_items', items.length);
    metricsCollector.recordHistogram('batch_processing_batch_count', batches.length);

    return results;
  }
}