import { metricsCollector, PerformanceMonitor } from '../monitoring/metrics';
import { logger } from '../monitoring/logger';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
  tags?: string[];
}

export interface CacheOptions {
  defaultTtl?: number; // Default TTL in milliseconds
  maxSize?: number; // Maximum number of entries
  cleanupInterval?: number; // Cleanup interval in milliseconds
  enableMetrics?: boolean;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  hitRate: number;
  evictions: number;
  totalMemoryUsage: number;
}

export class ExternalApiCacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private options: Required<CacheOptions>;
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
  };
  private cleanupTimer?: NodeJS.Timeout;

  constructor(options: CacheOptions = {}) {
    this.options = {
      defaultTtl: 300000, // 5 minutes
      maxSize: 1000,
      cleanupInterval: 60000, // 1 minute
      enableMetrics: true,
      ...options,
    };

    // Start cleanup timer
    this.startCleanupTimer();

    // Record initial metrics
    if (this.options.enableMetrics) {
      this.recordMetrics();
    }
  }

  /**
   * Get cached data
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      this.recordCacheMetric('miss', key);
      return null;
    }

    // Check if entry has expired
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.misses++;
      this.recordCacheMetric('miss', key, 'expired');
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    this.stats.hits++;
    this.recordCacheMetric('hit', key);

    return entry.data as T;
  }

  /**
   * Set cached data
   */
  set<T>(key: string, data: T, ttl?: number, tags?: string[]): void {
    const now = Date.now();
    const entryTtl = ttl || this.options.defaultTtl;

    // Check if we need to evict entries
    if (this.cache.size >= this.options.maxSize && !this.cache.has(key)) {
      this.evictLeastRecentlyUsed();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      ttl: entryTtl,
      accessCount: 0,
      lastAccessed: now,
      tags,
    };

    this.cache.set(key, entry);
    this.recordCacheMetric('set', key);

    logger.debug(`Cache entry set: ${key}`, {
      requestId: 'cache-manager',
      endpoint: 'cache',
      metadata: {
        ttl: entryTtl,
        tags,
        cacheSize: this.cache.size,
      },
    });
  }

  /**
   * Delete cached data
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.recordCacheMetric('delete', key);
    }
    return deleted;
  }

  /**
   * Clear all cached data
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    this.recordCacheMetric('clear', 'all', undefined, size);
    
    logger.info('Cache cleared', {
      requestId: 'cache-manager',
      endpoint: 'cache',
      metadata: { entriesCleared: size },
    });
  }

  /**
   * Invalidate cache entries by tags
   */
  invalidateByTags(tags: string[]): number {
    let invalidated = 0;
    const tagSet = new Set(tags);

    for (const [key, entry] of this.cache.entries()) {
      if (entry.tags && entry.tags.some(tag => tagSet.has(tag))) {
        this.cache.delete(key);
        invalidated++;
      }
    }

    if (invalidated > 0) {
      this.recordCacheMetric('invalidate', 'tags', undefined, invalidated);
      logger.info(`Cache invalidated by tags: ${tags.join(', ')}`, {
        requestId: 'cache-manager',
        endpoint: 'cache',
        metadata: { tags, entriesInvalidated: invalidated },
      });
    }

    return invalidated;
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? this.stats.hits / totalRequests : 0;

    return {
      size: this.cache.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
      hitRate,
      evictions: this.stats.evictions,
      totalMemoryUsage: this.estimateMemoryUsage(),
    };
  }

  /**
   * Get cache keys matching a pattern
   */
  getKeys(pattern?: RegExp): string[] {
    const keys = Array.from(this.cache.keys());
    return pattern ? keys.filter(key => pattern.test(key)) : keys;
  }

  /**
   * Check if cache has a key
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    return entry ? !this.isExpired(entry) : false;
  }

  /**
   * Get cache entry info without accessing the data
   */
  getEntryInfo(key: string): Omit<CacheEntry<any>, 'data'> | null {
    const entry = this.cache.get(key);
    if (!entry || this.isExpired(entry)) {
      return null;
    }

    return {
      timestamp: entry.timestamp,
      ttl: entry.ttl,
      accessCount: entry.accessCount,
      lastAccessed: entry.lastAccessed,
      tags: entry.tags,
    };
  }

  /**
   * Cleanup expired entries
   */
  cleanup(): number {
    let cleaned = 0;
    const now = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.recordCacheMetric('cleanup', 'expired', undefined, cleaned);
      logger.debug(`Cache cleanup completed: ${cleaned} entries removed`, {
        requestId: 'cache-manager',
        endpoint: 'cache',
        metadata: { entriesRemoved: cleaned, remainingEntries: this.cache.size },
      });
    }

    return cleaned;
  }

  /**
   * Destroy the cache manager
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }
    this.clear();
  }

  /**
   * Check if an entry has expired
   */
  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  /**
   * Evict least recently used entry
   */
  private evictLeastRecentlyUsed(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.stats.evictions++;
      this.recordCacheMetric('evict', oldestKey);
    }
  }

  /**
   * Start cleanup timer
   */
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
      if (this.options.enableMetrics) {
        this.recordMetrics();
      }
    }, this.options.cleanupInterval);
  }

  /**
   * Record cache metrics
   */
  private recordCacheMetric(
    operation: string,
    key: string,
    reason?: string,
    count?: number
  ): void {
    if (!this.options.enableMetrics) return;

    metricsCollector.incrementCounter('cache_operations_total', {
      operation,
      reason: reason || 'normal',
    });

    if (count !== undefined) {
      metricsCollector.recordHistogram('cache_operation_count', count, {
        operation,
      });
    }
  }

  /**
   * Record general cache metrics
   */
  private recordMetrics(): void {
    if (!this.options.enableMetrics) return;

    const stats = this.getStats();
    
    metricsCollector.recordGauge('cache_size', stats.size);
    metricsCollector.recordGauge('cache_hit_rate', stats.hitRate);
    metricsCollector.recordGauge('cache_memory_usage_bytes', stats.totalMemoryUsage);
    metricsCollector.recordGauge('cache_hits_total', stats.hits);
    metricsCollector.recordGauge('cache_misses_total', stats.misses);
    metricsCollector.recordGauge('cache_evictions_total', stats.evictions);
  }

  /**
   * Estimate memory usage (rough calculation)
   */
  private estimateMemoryUsage(): number {
    let totalSize = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      // Rough estimation: key size + JSON string size of data + metadata
      totalSize += key.length * 2; // UTF-16 characters
      totalSize += JSON.stringify(entry.data).length * 2;
      totalSize += 200; // Estimated overhead for entry metadata
    }
    
    return totalSize;
  }
}

/**
 * Service-specific cache managers
 */
export class ServiceCacheManager {
  private cacheManagers = new Map<string, ExternalApiCacheManager>();

  /**
   * Get or create cache manager for a service
   */
  getServiceCache(serviceName: string, options?: CacheOptions): ExternalApiCacheManager {
    if (!this.cacheManagers.has(serviceName)) {
      const serviceOptions = {
        ...options,
        // Service-specific defaults
        defaultTtl: this.getServiceDefaultTtl(serviceName),
      };
      
      this.cacheManagers.set(serviceName, new ExternalApiCacheManager(serviceOptions));
    }

    return this.cacheManagers.get(serviceName)!;
  }

  /**
   * Clear cache for a specific service
   */
  clearServiceCache(serviceName: string): void {
    const cache = this.cacheManagers.get(serviceName);
    if (cache) {
      cache.clear();
    }
  }

  /**
   * Get stats for all services
   */
  getAllStats(): Record<string, CacheStats> {
    const stats: Record<string, CacheStats> = {};
    
    for (const [serviceName, cache] of this.cacheManagers.entries()) {
      stats[serviceName] = cache.getStats();
    }
    
    return stats;
  }

  /**
   * Cleanup all service caches
   */
  cleanupAll(): Record<string, number> {
    const results: Record<string, number> = {};
    
    for (const [serviceName, cache] of this.cacheManagers.entries()) {
      results[serviceName] = cache.cleanup();
    }
    
    return results;
  }

  /**
   * Destroy all cache managers
   */
  destroy(): void {
    for (const cache of this.cacheManagers.values()) {
      cache.destroy();
    }
    this.cacheManagers.clear();
  }

  /**
   * Get service-specific default TTL
   */
  private getServiceDefaultTtl(serviceName: string): number {
    const serviceTtls: Record<string, number> = {
      geoapify: 600000, // 10 minutes - location data changes infrequently
      rapidapi: 300000, // 5 minutes - general API data
      scraperbee: 180000, // 3 minutes - web scraping data can change more frequently
      default: 300000, // 5 minutes default
    };

    return serviceTtls[serviceName] || serviceTtls.default;
  }
}

// Global service cache manager instance
export const serviceCacheManager = new ServiceCacheManager();

/**
 * Cache key generation utilities
 */
export class CacheKeyGenerator {
  /**
   * Generate cache key for API requests
   */
  static forApiRequest(
    service: string,
    endpoint: string,
    params?: Record<string, any>,
    method: string = 'GET'
  ): string {
    const paramString = params ? JSON.stringify(params) : '';
    const hash = this.simpleHash(`${method}:${endpoint}:${paramString}`);
    return `${service}:${hash}`;
  }

  /**
   * Generate cache key for user-specific data
   */
  static forUserData(
    service: string,
    userId: string,
    dataType: string,
    params?: Record<string, any>
  ): string {
    const paramString = params ? JSON.stringify(params) : '';
    const hash = this.simpleHash(`${dataType}:${paramString}`);
    return `${service}:user:${userId}:${hash}`;
  }

  /**
   * Generate cache key for search results
   */
  static forSearchResults(
    service: string,
    query: string,
    filters?: Record<string, any>
  ): string {
    const filterString = filters ? JSON.stringify(filters) : '';
    const hash = this.simpleHash(`${query}:${filterString}`);
    return `${service}:search:${hash}`;
  }

  /**
   * Simple hash function for cache keys
   */
  private static simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }
}