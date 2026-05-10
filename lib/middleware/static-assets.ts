import { NextRequest, NextResponse } from 'next/server'
import { metricsCollector } from '../monitoring/metrics'

export interface StaticAssetOptions {
  enableCompression?: boolean
  enableCaching?: boolean
  enableSecurityHeaders?: boolean
  maxAge?: number
  staleWhileRevalidate?: number
}

/**
 * Static asset optimization middleware
 */
export class StaticAssetOptimizer {
  private static readonly DEFAULT_OPTIONS: Required<StaticAssetOptions> = {
    enableCompression: true,
    enableCaching: true,
    enableSecurityHeaders: true,
    maxAge: 31536000, // 1 year
    staleWhileRevalidate: 86400, // 1 day
  }

  /**
   * Optimize static asset serving
   */
  static optimize(
    request: NextRequest,
    response: NextResponse,
    options: StaticAssetOptions = {}
  ): NextResponse {
    const opts = { ...this.DEFAULT_OPTIONS, ...options }
    const url = new URL(request.url)
    const pathname = url.pathname

    // Check if this is a static asset
    if (!this.isStaticAsset(pathname)) {
      return response
    }

    const assetType = this.getAssetType(pathname)
    const optimizedResponse = new NextResponse(response.body, response)

    // Apply caching headers
    if (opts.enableCaching) {
      this.applyCachingHeaders(optimizedResponse, assetType, opts)
    }

    // Apply security headers
    if (opts.enableSecurityHeaders) {
      this.applySecurityHeaders(optimizedResponse, assetType)
    }

    // Apply compression hints
    if (opts.enableCompression) {
      this.applyCompressionHeaders(optimizedResponse, assetType)
    }

    // Record metrics
    metricsCollector.incrementCounter('static_asset_requests_total', {
      type: assetType,
      cached: this.isCacheableAsset(assetType).toString(),
    })

    return optimizedResponse
  }

  /**
   * Check if the path is a static asset
   */
  private static isStaticAsset(pathname: string): boolean {
    const staticExtensions = [
      '.ico', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif',
      '.woff', '.woff2', '.ttf', '.eot', '.otf',
      '.css', '.js', '.map',
      '.pdf', '.zip', '.tar', '.gz'
    ]

    return staticExtensions.some(ext => pathname.toLowerCase().endsWith(ext))
  }

  /**
   * Get asset type from pathname
   */
  private static getAssetType(pathname: string): string {
    const extension = pathname.toLowerCase().split('.').pop() || ''
    
    const typeMap: Record<string, string> = {
      // Images
      'ico': 'image',
      'png': 'image',
      'jpg': 'image',
      'jpeg': 'image',
      'gif': 'image',
      'webp': 'image',
      'svg': 'image',
      'avif': 'image',
      
      // Fonts
      'woff': 'font',
      'woff2': 'font',
      'ttf': 'font',
      'eot': 'font',
      'otf': 'font',
      
      // Scripts and styles
      'css': 'stylesheet',
      'js': 'script',
      'map': 'sourcemap',
      
      // Documents
      'pdf': 'document',
      'zip': 'archive',
      'tar': 'archive',
      'gz': 'archive',
    }

    return typeMap[extension] || 'unknown'
  }

  /**
   * Apply caching headers based on asset type
   */
  private static applyCachingHeaders(
    response: NextResponse,
    assetType: string,
    options: Required<StaticAssetOptions>
  ): void {
    const cacheConfig = this.getCacheConfig(assetType, options)
    
    response.headers.set('Cache-Control', cacheConfig.cacheControl)
    
    if (cacheConfig.etag) {
      response.headers.set('ETag', cacheConfig.etag)
    }
    
    if (cacheConfig.lastModified) {
      response.headers.set('Last-Modified', cacheConfig.lastModified)
    }

    // Add Vary header for content negotiation
    response.headers.set('Vary', 'Accept-Encoding, Accept')
  }

  /**
   * Get cache configuration for asset type
   */
  private static getCacheConfig(
    assetType: string,
    options: Required<StaticAssetOptions>
  ): {
    cacheControl: string
    etag?: string
    lastModified?: string
  } {
    const { maxAge, staleWhileRevalidate } = options

    switch (assetType) {
      case 'image':
      case 'font':
        // Long-term caching for immutable assets
        return {
          cacheControl: `public, max-age=${maxAge}, immutable`,
        }

      case 'stylesheet':
      case 'script':
        // Long-term caching with revalidation
        return {
          cacheControl: `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
        }

      case 'document':
        // Medium-term caching for documents
        return {
          cacheControl: `public, max-age=${Math.floor(maxAge / 12)}, stale-while-revalidate=${Math.floor(staleWhileRevalidate / 2)}`, // 1 month
        }

      case 'sourcemap':
        // Short-term caching for development assets
        return {
          cacheControl: 'public, max-age=3600', // 1 hour
        }

      default:
        // Default caching
        return {
          cacheControl: `public, max-age=${Math.floor(maxAge / 4)}`, // 3 months
        }
    }
  }

  /**
   * Apply security headers for static assets
   */
  private static applySecurityHeaders(response: NextResponse, assetType: string): void {
    // Content type protection
    response.headers.set('X-Content-Type-Options', 'nosniff')

    // Frame protection for documents
    if (assetType === 'document') {
      response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    }

    // CSP for scripts and styles
    if (assetType === 'script' || assetType === 'stylesheet') {
      response.headers.set('X-XSS-Protection', '1; mode=block')
    }

    // Referrer policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  }

  /**
   * Apply compression headers
   */
  private static applyCompressionHeaders(response: NextResponse, assetType: string): void {
    // Indicate that compression is beneficial for these types
    const compressibleTypes = ['stylesheet', 'script', 'image', 'document']
    
    if (compressibleTypes.includes(assetType)) {
      response.headers.set('Accept-Encoding', 'gzip, deflate, br')
    }
  }

  /**
   * Check if asset type is cacheable
   */
  private static isCacheableAsset(assetType: string): boolean {
    const cacheableTypes = ['image', 'font', 'stylesheet', 'script', 'document']
    return cacheableTypes.includes(assetType)
  }

  /**
   * Generate ETag for asset
   */
  static generateETag(content: string | Buffer): string {
    const crypto = require('crypto')
    const hash = crypto.createHash('md5').update(content).digest('hex')
    return `"${hash}"`
  }

  /**
   * Check if request has valid cache
   */
  static hasValidCache(request: NextRequest, etag: string): boolean {
    const ifNoneMatch = request.headers.get('if-none-match')
    return ifNoneMatch === etag
  }

  /**
   * Create 304 Not Modified response
   */
  static createNotModifiedResponse(): NextResponse {
    const response = new NextResponse(null, { status: 304 })
    response.headers.set('Cache-Control', 'public, max-age=31536000')
    return response
  }
}

/**
 * Asset preloading utilities
 */
export class AssetPreloader {
  /**
   * Generate preload headers for critical assets
   */
  static generatePreloadHeaders(criticalAssets: {
    href: string
    as: 'script' | 'style' | 'font' | 'image'
    type?: string
    crossorigin?: boolean
  }[]): string[] {
    return criticalAssets.map(asset => {
      let header = `<${asset.href}>; rel=preload; as=${asset.as}`
      
      if (asset.type) {
        header += `; type=${asset.type}`
      }
      
      if (asset.crossorigin) {
        header += '; crossorigin'
      }
      
      return header
    })
  }

  /**
   * Generate DNS prefetch headers
   */
  static generateDnsPrefetchHeaders(domains: string[]): string[] {
    return domains.map(domain => `<${domain}>; rel=dns-prefetch`)
  }

  /**
   * Generate preconnect headers
   */
  static generatePreconnectHeaders(origins: {
    href: string
    crossorigin?: boolean
  }[]): string[] {
    return origins.map(origin => {
      let header = `<${origin.href}>; rel=preconnect`
      if (origin.crossorigin) {
        header += '; crossorigin'
      }
      return header
    })
  }
}

/**
 * Performance monitoring for static assets
 */
export class AssetPerformanceMonitor {
  private static readonly PERFORMANCE_DATA = new Map<string, {
    requests: number
    cacheHits: number
    totalSize: number
    averageResponseTime: number
  }>()

  /**
   * Track asset request performance
   */
  static trackAssetRequest(
    assetPath: string,
    size: number,
    responseTime: number,
    cacheHit: boolean
  ): void {
    const existing = this.PERFORMANCE_DATA.get(assetPath) || {
      requests: 0,
      cacheHits: 0,
      totalSize: 0,
      averageResponseTime: 0,
    }

    existing.requests++
    existing.totalSize += size
    existing.averageResponseTime = (existing.averageResponseTime * (existing.requests - 1) + responseTime) / existing.requests
    
    if (cacheHit) {
      existing.cacheHits++
    }

    this.PERFORMANCE_DATA.set(assetPath, existing)

    // Record metrics
    metricsCollector.recordHistogram('asset_response_time', responseTime, {
      asset_type: StaticAssetOptimizer['getAssetType'](assetPath),
      cache_hit: cacheHit.toString(),
    })
    
    metricsCollector.recordHistogram('asset_size_bytes', size, {
      asset_type: StaticAssetOptimizer['getAssetType'](assetPath),
    })
  }

  /**
   * Get performance summary
   */
  static getPerformanceSummary(): {
    totalAssets: number
    totalRequests: number
    cacheHitRate: number
    averageSize: number
    averageResponseTime: number
    topAssets: Array<{ path: string; requests: number; cacheHitRate: number }>
  } {
    const assets = Array.from(this.PERFORMANCE_DATA.entries())
    
    const totalRequests = assets.reduce((sum, [, data]) => sum + data.requests, 0)
    const totalCacheHits = assets.reduce((sum, [, data]) => sum + data.cacheHits, 0)
    const totalSize = assets.reduce((sum, [, data]) => sum + data.totalSize, 0)
    const totalResponseTime = assets.reduce((sum, [, data]) => sum + (data.averageResponseTime * data.requests), 0)

    const topAssets = assets
      .map(([path, data]) => ({
        path,
        requests: data.requests,
        cacheHitRate: data.requests > 0 ? (data.cacheHits / data.requests) * 100 : 0,
      }))
      .sort((a, b) => b.requests - a.requests)
      .slice(0, 10)

    return {
      totalAssets: assets.length,
      totalRequests,
      cacheHitRate: totalRequests > 0 ? (totalCacheHits / totalRequests) * 100 : 0,
      averageSize: assets.length > 0 ? totalSize / assets.length : 0,
      averageResponseTime: totalRequests > 0 ? totalResponseTime / totalRequests : 0,
      topAssets,
    }
  }

  /**
   * Clear performance data
   */
  static clearData(): void {
    this.PERFORMANCE_DATA.clear()
  }
}