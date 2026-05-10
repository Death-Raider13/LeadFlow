import { Readable, Transform, Writable } from 'stream';
import { pipeline } from 'stream/promises';
import { Query, DocumentSnapshot } from 'firebase-admin/firestore';
import { metricsCollector } from '../monitoring/metrics';
import { logger } from '../monitoring/logger';

export interface StreamingOptions {
  batchSize?: number;
  highWaterMark?: number;
  objectMode?: boolean;
  maxConcurrency?: number;
}

export interface DataStreamOptions extends StreamingOptions {
  query: Query;
  converter: (doc: DocumentSnapshot) => any;
  filter?: (item: any) => boolean;
}

export interface ProcessingStats {
  totalProcessed: number;
  totalErrors: number;
  startTime: number;
  endTime?: number;
  throughput?: number; // items per second
}

/**
 * Streaming data reader for large Firestore queries
 */
export class FirestoreDataStream extends Readable {
  private query: Query;
  private converter: (doc: DocumentSnapshot) => any;
  private filter?: (item: any) => boolean;
  private batchSize: number;
  private lastDoc: DocumentSnapshot | null = null;
  private hasMore = true;
  private stats: ProcessingStats;

  constructor(options: DataStreamOptions) {
    super({
      objectMode: true,
      highWaterMark: options.highWaterMark || 16,
    });

    this.query = options.query;
    this.converter = options.converter;
    this.filter = options.filter;
    this.batchSize = options.batchSize || 100;
    this.stats = {
      totalProcessed: 0,
      totalErrors: 0,
      startTime: Date.now(),
    };
  }

  async _read(): Promise<void> {
    if (!this.hasMore) {
      this.push(null); // End of stream
      return;
    }

    try {
      // Build query for next batch
      let batchQuery = this.query.limit(this.batchSize);
      if (this.lastDoc) {
        batchQuery = batchQuery.startAfter(this.lastDoc);
      }

      // Execute query
      const snapshot = await batchQuery.get();
      const docs = snapshot.docs;

      if (docs.length === 0) {
        this.hasMore = false;
        this.push(null); // End of stream
        return;
      }

      // Process and push documents
      for (const doc of docs) {
        try {
          const item = this.converter(doc);
          
          // Apply filter if provided
          if (!this.filter || this.filter(item)) {
            this.push(item);
            this.stats.totalProcessed++;
          }
        } catch (error) {
          this.stats.totalErrors++;
          this.emit('error', error);
          return;
        }
      }

      // Update cursor
      this.lastDoc = docs[docs.length - 1];
      this.hasMore = docs.length === this.batchSize;

      // Record metrics
      metricsCollector.incrementCounter('stream_batches_read_total');
      metricsCollector.recordHistogram('stream_batch_size', docs.length);

    } catch (error) {
      this.stats.totalErrors++;
      metricsCollector.incrementCounter('stream_read_errors_total');
      this.emit('error', error);
    }
  }

  getStats(): ProcessingStats {
    const now = Date.now();
    const duration = now - this.stats.startTime;
    
    return {
      ...this.stats,
      endTime: this.hasMore ? undefined : now,
      throughput: duration > 0 ? (this.stats.totalProcessed / duration) * 1000 : 0,
    };
  }
}

/**
 * Transform stream for processing data in batches
 */
export class BatchTransformStream extends Transform {
  private batch: any[] = [];
  private batchSize: number;
  private processor: (batch: any[]) => Promise<any[]>;
  private stats: ProcessingStats;

  constructor(
    processor: (batch: any[]) => Promise<any[]>,
    options: StreamingOptions = {}
  ) {
    super({
      objectMode: true,
      highWaterMark: options.highWaterMark || 16,
    });

    this.batchSize = options.batchSize || 50;
    this.processor = processor;
    this.stats = {
      totalProcessed: 0,
      totalErrors: 0,
      startTime: Date.now(),
    };
  }

  async _transform(chunk: any, encoding: string, callback: Function): Promise<void> {
    try {
      this.batch.push(chunk);

      // Process batch when it reaches the target size
      if (this.batch.length >= this.batchSize) {
        await this.processBatch();
      }

      callback();
    } catch (error) {
      this.stats.totalErrors++;
      callback(error);
    }
  }

  async _flush(callback: Function): Promise<void> {
    try {
      // Process remaining items in batch
      if (this.batch.length > 0) {
        await this.processBatch();
      }

      this.stats.endTime = Date.now();
      callback();
    } catch (error) {
      this.stats.totalErrors++;
      callback(error);
    }
  }

  private async processBatch(): Promise<void> {
    if (this.batch.length === 0) return;

    try {
      const results = await this.processor([...this.batch]);
      
      // Push results to next stream
      for (const result of results) {
        this.push(result);
      }

      this.stats.totalProcessed += this.batch.length;
      this.batch = [];

      metricsCollector.incrementCounter('stream_batches_processed_total');
      metricsCollector.recordHistogram('stream_processing_batch_size', results.length);

    } catch (error) {
      this.stats.totalErrors += this.batch.length;
      metricsCollector.incrementCounter('stream_processing_errors_total');
      throw error;
    }
  }

  getStats(): ProcessingStats {
    const now = Date.now();
    const duration = now - this.stats.startTime;
    
    return {
      ...this.stats,
      endTime: this.stats.endTime,
      throughput: duration > 0 ? (this.stats.totalProcessed / duration) * 1000 : 0,
    };
  }
}

/**
 * Writable stream for collecting results
 */
export class ResultCollectorStream extends Writable {
  private results: any[] = [];
  private stats: ProcessingStats;
  private maxResults?: number;

  constructor(options: StreamingOptions & { maxResults?: number } = {}) {
    super({
      objectMode: true,
      highWaterMark: options.highWaterMark || 16,
    });

    this.maxResults = options.maxResults;
    this.stats = {
      totalProcessed: 0,
      totalErrors: 0,
      startTime: Date.now(),
    };
  }

  _write(chunk: any, encoding: string, callback: Function): void {
    try {
      // Check if we've reached the maximum results limit
      if (this.maxResults && this.results.length >= this.maxResults) {
        callback(new Error(`Maximum results limit reached: ${this.maxResults}`));
        return;
      }

      this.results.push(chunk);
      this.stats.totalProcessed++;
      
      metricsCollector.incrementCounter('stream_results_collected_total');
      callback();
    } catch (error) {
      this.stats.totalErrors++;
      callback(error);
    }
  }

  _final(callback: Function): void {
    this.stats.endTime = Date.now();
    callback();
  }

  getResults(): any[] {
    return [...this.results];
  }

  getStats(): ProcessingStats {
    const now = Date.now();
    const duration = now - this.stats.startTime;
    
    return {
      ...this.stats,
      endTime: this.stats.endTime,
      throughput: duration > 0 ? (this.stats.totalProcessed / duration) * 1000 : 0,
    };
  }

  clear(): void {
    this.results = [];
    this.stats = {
      totalProcessed: 0,
      totalErrors: 0,
      startTime: Date.now(),
    };
  }
}

/**
 * High-level streaming utilities
 */
export class StreamingProcessor {
  /**
   * Process large dataset with streaming pipeline
   */
  static async processLargeDataset<T, R>(
    query: Query,
    converter: (doc: DocumentSnapshot) => T,
    processor: (batch: T[]) => Promise<R[]>,
    options: StreamingOptions & {
      filter?: (item: T) => boolean;
      maxResults?: number;
      onProgress?: (stats: ProcessingStats) => void;
    } = {}
  ): Promise<{ results: R[]; stats: ProcessingStats }> {
    const dataStream = new FirestoreDataStream({
      query,
      converter,
      filter: options.filter,
      batchSize: options.batchSize || 100,
    });

    const transformStream = new BatchTransformStream(processor, {
      batchSize: options.batchSize || 50,
    });

    const resultStream = new ResultCollectorStream({
      maxResults: options.maxResults,
    });

    // Set up progress monitoring
    let progressInterval: NodeJS.Timeout | undefined;
    if (options.onProgress) {
      progressInterval = setInterval(() => {
        const stats = dataStream.getStats();
        options.onProgress!(stats);
      }, 1000); // Report progress every second
    }

    try {
      // Run the streaming pipeline
      await pipeline(dataStream, transformStream, resultStream);

      // Get final stats
      const dataStats = dataStream.getStats();
      const transformStats = transformStream.getStats();
      const resultStats = resultStream.getStats();

      const combinedStats: ProcessingStats = {
        totalProcessed: resultStats.totalProcessed,
        totalErrors: dataStats.totalErrors + transformStats.totalErrors + resultStats.totalErrors,
        startTime: dataStats.startTime,
        endTime: resultStats.endTime,
        throughput: resultStats.throughput,
      };

      logger.info('Streaming processing completed', {
        requestId: 'streaming-processor',
        endpoint: 'database-stream',
        metadata: combinedStats,
      });

      return {
        results: resultStream.getResults(),
        stats: combinedStats,
      };

    } catch (error) {
      metricsCollector.incrementCounter('streaming_pipeline_errors_total');
      logger.error('Streaming processing failed', error as Error, {
        requestId: 'streaming-processor',
        endpoint: 'database-stream',
      });
      throw error;

    } finally {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    }
  }

  /**
   * Stream data to a custom processor function
   */
  static async streamToProcessor<T>(
    query: Query,
    converter: (doc: DocumentSnapshot) => T,
    processor: (item: T) => Promise<void>,
    options: StreamingOptions & {
      filter?: (item: T) => boolean;
      onProgress?: (processed: number) => void;
    } = {}
  ): Promise<ProcessingStats> {
    const dataStream = new FirestoreDataStream({
      query,
      converter,
      filter: options.filter,
      batchSize: options.batchSize || 100,
    });

    let processed = 0;
    const stats: ProcessingStats = {
      totalProcessed: 0,
      totalErrors: 0,
      startTime: Date.now(),
    };

    return new Promise((resolve, reject) => {
      dataStream.on('data', async (item: T) => {
        try {
          await processor(item);
          processed++;
          stats.totalProcessed++;

          if (options.onProgress) {
            options.onProgress(processed);
          }

          metricsCollector.incrementCounter('stream_items_processed_total');
        } catch (error) {
          stats.totalErrors++;
          metricsCollector.incrementCounter('stream_item_errors_total');
          dataStream.emit('error', error);
        }
      });

      dataStream.on('end', () => {
        stats.endTime = Date.now();
        const duration = stats.endTime - stats.startTime;
        stats.throughput = duration > 0 ? (stats.totalProcessed / duration) * 1000 : 0;

        logger.info('Stream processing completed', {
          requestId: 'streaming-processor',
          endpoint: 'database-stream',
          metadata: stats,
        });

        resolve(stats);
      });

      dataStream.on('error', (error) => {
        stats.endTime = Date.now();
        logger.error('Stream processing failed', error, {
          requestId: 'streaming-processor',
          endpoint: 'database-stream',
          metadata: stats,
        });
        reject(error);
      });
    });
  }

  /**
   * Export large dataset to JSON stream
   */
  static async exportToJsonStream<T>(
    query: Query,
    converter: (doc: DocumentSnapshot) => T,
    outputStream: Writable,
    options: StreamingOptions & {
      filter?: (item: T) => boolean;
      pretty?: boolean;
    } = {}
  ): Promise<ProcessingStats> {
    const dataStream = new FirestoreDataStream({
      query,
      converter,
      filter: options.filter,
      batchSize: options.batchSize || 100,
    });

    const stats: ProcessingStats = {
      totalProcessed: 0,
      totalErrors: 0,
      startTime: Date.now(),
    };

    let isFirst = true;

    return new Promise((resolve, reject) => {
      // Start JSON array
      outputStream.write('[');

      dataStream.on('data', (item: T) => {
        try {
          if (!isFirst) {
            outputStream.write(',');
          }
          
          if (options.pretty) {
            outputStream.write('\n  ');
          }
          
          outputStream.write(JSON.stringify(item));
          isFirst = false;
          stats.totalProcessed++;

          metricsCollector.incrementCounter('export_items_written_total');
        } catch (error) {
          stats.totalErrors++;
          dataStream.emit('error', error);
        }
      });

      dataStream.on('end', () => {
        // Close JSON array
        if (options.pretty) {
          outputStream.write('\n');
        }
        outputStream.write(']');
        outputStream.end();

        stats.endTime = Date.now();
        const duration = stats.endTime - stats.startTime;
        stats.throughput = duration > 0 ? (stats.totalProcessed / duration) * 1000 : 0;

        logger.info('Export completed', {
          requestId: 'streaming-exporter',
          endpoint: 'database-export',
          metadata: stats,
        });

        resolve(stats);
      });

      dataStream.on('error', (error) => {
        stats.endTime = Date.now();
        logger.error('Export failed', error, {
          requestId: 'streaming-exporter',
          endpoint: 'database-export',
          metadata: stats,
        });
        reject(error);
      });
    });
  }
}