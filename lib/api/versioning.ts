import { NextRequest } from 'next/server';

/**
 * API Versioning and Backward Compatibility System
 * Handles version detection, compatibility checks, and migration support
 */

export interface ApiVersion {
  major: number;
  minor: number;
  patch: number;
}

export interface VersionCompatibility {
  supported: boolean;
  deprecated: boolean;
  sunsetDate?: Date;
  migrationGuide?: string;
  breakingChanges?: string[];
}

export class ApiVersionManager {
  private static readonly CURRENT_VERSION: ApiVersion = { major: 1, minor: 0, patch: 0 };
  private static readonly SUPPORTED_VERSIONS: ApiVersion[] = [
    { major: 1, minor: 0, patch: 0 }
  ];

  /**
   * Extract API version from request
   */
  static getRequestedVersion(request: NextRequest): ApiVersion {
    // Check Accept header first (preferred method)
    const acceptHeader = request.headers.get('Accept');
    if (acceptHeader) {
      const versionMatch = acceptHeader.match(/application\/vnd\.leadflow\.v(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
      if (versionMatch) {
        return {
          major: parseInt(versionMatch[1]) || 1,
          minor: parseInt(versionMatch[2]) || 0,
          patch: parseInt(versionMatch[3]) || 0
        };
      }
    }

    // Check X-API-Version header
    const versionHeader = request.headers.get('X-API-Version');
    if (versionHeader) {
      const parts = versionHeader.split('.').map(Number);
      return {
        major: parts[0] || 1,
        minor: parts[1] || 0,
        patch: parts[2] || 0
      };
    }

    // Check query parameter
    const versionParam = request.nextUrl.searchParams.get('version');
    if (versionParam) {
      const parts = versionParam.split('.').map(Number);
      return {
        major: parts[0] || 1,
        minor: parts[1] || 0,
        patch: parts[2] || 0
      };
    }

    // Default to current version
    return this.CURRENT_VERSION;
  }

  /**
   * Check if a version is supported
   */
  static checkCompatibility(version: ApiVersion): VersionCompatibility {
    const versionString = this.versionToString(version);
    const currentString = this.versionToString(this.CURRENT_VERSION);

    // Check if version is in supported list
    const isSupported = this.SUPPORTED_VERSIONS.some(v => 
      this.compareVersions(v, version) === 0
    );

    if (!isSupported) {
      return {
        supported: false,
        deprecated: true,
        breakingChanges: ['Version no longer supported']
      };
    }

    // Check for deprecation (versions older than current major version)
    const isDeprecated = version.major < this.CURRENT_VERSION.major;
    
    let sunsetDate: Date | undefined;
    let migrationGuide: string | undefined;

    if (isDeprecated) {
      // Set sunset date to 6 months from now for deprecated versions
      sunsetDate = new Date();
      sunsetDate.setMonth(sunsetDate.getMonth() + 6);
      migrationGuide = `/docs/migration/v${version.major}-to-v${this.CURRENT_VERSION.major}`;
    }

    return {
      supported: true,
      deprecated: isDeprecated,
      sunsetDate,
      migrationGuide
    };
  }

  /**
   * Get current API version
   */
  static getCurrentVersion(): ApiVersion {
    return { ...this.CURRENT_VERSION };
  }

  /**
   * Get all supported versions
   */
  static getSupportedVersions(): ApiVersion[] {
    return [...this.SUPPORTED_VERSIONS];
  }

  /**
   * Compare two versions
   * Returns: -1 if v1 < v2, 0 if equal, 1 if v1 > v2
   */
  static compareVersions(v1: ApiVersion, v2: ApiVersion): number {
    if (v1.major !== v2.major) {
      return v1.major - v2.major;
    }
    if (v1.minor !== v2.minor) {
      return v1.minor - v2.minor;
    }
    return v1.patch - v2.patch;
  }

  /**
   * Convert version object to string
   */
  static versionToString(version: ApiVersion): string {
    return `${version.major}.${version.minor}.${version.patch}`;
  }

  /**
   * Parse version string to object
   */
  static parseVersion(versionString: string): ApiVersion {
    const parts = versionString.split('.').map(Number);
    return {
      major: parts[0] || 1,
      minor: parts[1] || 0,
      patch: parts[2] || 0
    };
  }
}

/**
 * Response transformation for backward compatibility
 */
export class ResponseTransformer {
  /**
   * Transform response data based on requested API version
   */
  static transformForVersion<T>(data: T, requestedVersion: ApiVersion, currentVersion: ApiVersion): T {
    // If versions match, no transformation needed
    if (ApiVersionManager.compareVersions(requestedVersion, currentVersion) === 0) {
      return data;
    }

    // Apply version-specific transformations
    return this.applyVersionTransformations(data, requestedVersion, currentVersion);
  }

  /**
   * Apply specific transformations based on version differences
   */
  private static applyVersionTransformations<T>(
    data: T, 
    requestedVersion: ApiVersion, 
    currentVersion: ApiVersion
  ): T {
    let transformedData = { ...data } as any;

    // Example transformations for different versions
    // In a real implementation, you would have specific transformation rules

    // If requesting older version, apply backward compatibility transformations
    if (ApiVersionManager.compareVersions(requestedVersion, currentVersion) < 0) {
      transformedData = this.applyBackwardCompatibility(transformedData, requestedVersion);
    }

    return transformedData;
  }

  /**
   * Apply backward compatibility transformations
   */
  private static applyBackwardCompatibility(data: any, targetVersion: ApiVersion): any {
    // Example: Remove fields that didn't exist in older versions
    if (targetVersion.major === 1 && targetVersion.minor === 0) {
      // Remove fields introduced in v1.1+
      if (data && typeof data === 'object') {
        const { newFieldIntroducedInV11, ...compatibleData } = data;
        return compatibleData;
      }
    }

    return data;
  }
}

/**
 * Middleware function to handle API versioning
 */
export function withApiVersioning<T extends any[], R>(
  handler: (request: NextRequest, version: ApiVersion, ...args: T) => Promise<R>
) {
  return async (request: NextRequest, ...args: T): Promise<R> => {
    const requestedVersion = ApiVersionManager.getRequestedVersion(request);
    const compatibility = ApiVersionManager.checkCompatibility(requestedVersion);

    if (!compatibility.supported) {
      throw new Error(`API version ${ApiVersionManager.versionToString(requestedVersion)} is not supported`);
    }

    // Add version information to request headers for downstream processing
    const modifiedRequest = new NextRequest(request.url, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        'X-Requested-API-Version': ApiVersionManager.versionToString(requestedVersion),
        'X-API-Compatibility-Status': compatibility.deprecated ? 'deprecated' : 'current'
      },
      body: request.body
    });

    return handler(modifiedRequest, requestedVersion, ...args);
  };
}

/**
 * Utility to check if a feature is available in a specific version
 */
export class FeatureFlags {
  private static readonly FEATURE_VERSIONS: Record<string, ApiVersion> = {
    'pagination': { major: 1, minor: 0, patch: 0 },
    'streaming': { major: 1, minor: 1, patch: 0 },
    'bulk_operations': { major: 1, minor: 2, patch: 0 },
    'webhooks': { major: 2, minor: 0, patch: 0 }
  };

  /**
   * Check if a feature is available in the requested version
   */
  static isFeatureAvailable(feature: string, requestedVersion: ApiVersion): boolean {
    const featureVersion = this.FEATURE_VERSIONS[feature];
    if (!featureVersion) {
      return false; // Unknown features are not available
    }

    return ApiVersionManager.compareVersions(requestedVersion, featureVersion) >= 0;
  }

  /**
   * Get all available features for a version
   */
  static getAvailableFeatures(requestedVersion: ApiVersion): string[] {
    return Object.entries(this.FEATURE_VERSIONS)
      .filter(([_, version]) => ApiVersionManager.compareVersions(requestedVersion, version) >= 0)
      .map(([feature]) => feature);
  }
}