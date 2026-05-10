import { z } from 'zod'

// Base response validation schemas
export const baseApiResponseSchema = z.object({
  status: z.number().optional(),
  message: z.string().optional(),
  error: z.string().optional(),
})

// Geoapify API response schemas
export const geoapifyGeocodeResponseSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(z.object({
    type: z.literal('Feature'),
    geometry: z.object({
      type: z.literal('Point'),
      coordinates: z.array(z.number()).length(2),
    }),
    properties: z.object({
      formatted: z.string(),
      country: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
    }).passthrough(),
  })),
})

export const geoapifyPlacesResponseSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(z.object({
    type: z.literal('Feature'),
    properties: z.object({
      place_id: z.string(),
      name: z.string().optional(),
      formatted: z.string().optional(),
      categories: z.array(z.string()).optional(),
    }).passthrough(),
  })),
})

export const geoapifyPlaceDetailsResponseSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(z.object({
    type: z.literal('Feature'),
    properties: z.object({
      place_id: z.string(),
      name: z.string().optional(),
      datasource: z.object({
        raw: z.record(z.unknown()).optional(),
      }).optional(),
    }).passthrough(),
  })),
})

// RapidAPI response schemas
export const rapidApiBusinessResponseSchema = z.object({
  status: z.string().optional(),
  data: z.array(z.object({
    name: z.string().optional(),
    phone_number: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    address: z.string().optional(),
  })).optional(),
  error: z.string().optional(),
})

// ScraperBee response schema (HTML content)
export const scraperbeeResponseSchema = z.string()

// UltraMsg API response schemas
export const ultramsgResponseSchema = z.object({
  sent: z.boolean().optional(),
  message: z.string().optional(),
  id: z.string().optional(),
  error: z.string().optional(),
})

// Paystack API response schemas
export const paystackResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.record(z.unknown()).optional(),
})

// Stripe webhook response schema
export const stripeWebhookResponseSchema = z.object({
  id: z.string(),
  object: z.string(),
  type: z.string(),
  data: z.object({
    object: z.record(z.unknown()),
  }),
})

export interface ApiValidationResult<T> {
  success: boolean
  data?: T
  error?: string
  fallbackData?: T
}

export interface ApiCallOptions {
  timeout?: number
  retries?: number
  fallbackData?: any
  validateResponse?: boolean
}

export class ExternalApiValidator {
  private static readonly DEFAULT_TIMEOUT = 10000 // 10 seconds
  private static readonly DEFAULT_RETRIES = 3
  private static readonly RETRY_DELAY_BASE = 1000 // 1 second

  /**
   * Validate API response against schema
   */
  static validateResponse<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
    apiName: string
  ): ApiValidationResult<T> {
    try {
      const result = schema.safeParse(data)
      
      if (result.success) {
        return {
          success: true,
          data: result.data,
        }
      }
      
      const errorMessage = `${apiName} API response validation failed: ${result.error.message}`
      console.error(errorMessage, { data, errors: result.error.errors })
      
      return {
        success: false,
        error: errorMessage,
      }
    } catch (error) {
      const errorMessage = `${apiName} API response validation error: ${error instanceof Error ? error.message : String(error)}`
      console.error(errorMessage)
      
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  /**
   * Make validated API call with retry logic and fallback
   */
  static async makeValidatedApiCall<T>(
    url: string,
    options: RequestInit,
    schema: z.ZodSchema<T>,
    apiName: string,
    callOptions: ApiCallOptions = {}
  ): Promise<ApiValidationResult<T>> {
    const {
      timeout = this.DEFAULT_TIMEOUT,
      retries = this.DEFAULT_RETRIES,
      fallbackData,
      validateResponse = true,
    } = callOptions

    let lastError: Error | null = null

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Add timeout to fetch options
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`${apiName} API returned ${response.status}: ${response.statusText}`)
        }

        const contentType = response.headers.get('content-type')
        let data: unknown

        if (contentType?.includes('application/json')) {
          data = await response.json()
        } else {
          data = await response.text()
        }

        // Validate response if requested
        if (validateResponse) {
          const validation = this.validateResponse(schema, data, apiName)
          if (!validation.success && fallbackData) {
            console.warn(`${apiName} validation failed, using fallback data`)
            return {
              success: true,
              data: fallbackData,
              fallbackData,
            }
          }
          return validation
        }

        return {
          success: true,
          data: data as T,
        }

      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        console.warn(`${apiName} API call attempt ${attempt + 1} failed:`, lastError.message)

        // If this is the last attempt, don't wait
        if (attempt < retries) {
          const delay = this.RETRY_DELAY_BASE * Math.pow(2, attempt) // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }

    // All retries failed
    const errorMessage = `${apiName} API call failed after ${retries + 1} attempts: ${lastError?.message}`
    console.error(errorMessage)

    // Return fallback data if available
    if (fallbackData) {
      console.warn(`${apiName} API failed, using fallback data`)
      return {
        success: true,
        data: fallbackData,
        fallbackData,
      }
    }

    return {
      success: false,
      error: errorMessage,
    }
  }

  /**
   * Validate Geoapify geocoding response
   */
  static async validateGeoapifyGeocode(url: string, apiKey: string): Promise<ApiValidationResult<z.infer<typeof geoapifyGeocodeResponseSchema>>> {
    return this.makeValidatedApiCall(
      url,
      { method: 'GET' },
      geoapifyGeocodeResponseSchema,
      'Geoapify Geocode',
      {
        fallbackData: {
          type: 'FeatureCollection' as const,
          features: [],
        },
      }
    )
  }

  /**
   * Validate Geoapify places response
   */
  static async validateGeoapifyPlaces(url: string): Promise<ApiValidationResult<z.infer<typeof geoapifyPlacesResponseSchema>>> {
    return this.makeValidatedApiCall(
      url,
      { method: 'GET' },
      geoapifyPlacesResponseSchema,
      'Geoapify Places',
      {
        fallbackData: {
          type: 'FeatureCollection' as const,
          features: [],
        },
      }
    )
  }

  /**
   * Validate RapidAPI business data response
   */
  static async validateRapidApiBusiness(
    url: string,
    headers: Record<string, string>
  ): Promise<ApiValidationResult<z.infer<typeof rapidApiBusinessResponseSchema>>> {
    return this.makeValidatedApiCall(
      url,
      { method: 'GET', headers },
      rapidApiBusinessResponseSchema,
      'RapidAPI Business',
      {
        fallbackData: {
          status: 'error',
          data: [],
        },
      }
    )
  }

  /**
   * Validate ScraperBee response
   */
  static async validateScraperBee(url: string): Promise<ApiValidationResult<string>> {
    return this.makeValidatedApiCall(
      url,
      { method: 'GET' },
      scraperbeeResponseSchema,
      'ScraperBee',
      {
        fallbackData: '',
      }
    )
  }

  /**
   * Validate UltraMsg response
   */
  static async validateUltraMsg(
    url: string,
    body: any
  ): Promise<ApiValidationResult<z.infer<typeof ultramsgResponseSchema>>> {
    return this.makeValidatedApiCall(
      url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
      ultramsgResponseSchema,
      'UltraMsg',
      {
        fallbackData: {
          sent: false,
          message: 'Service unavailable',
        },
      }
    )
  }

  /**
   * Validate Paystack response
   */
  static async validatePaystack(
    url: string,
    options: RequestInit
  ): Promise<ApiValidationResult<z.infer<typeof paystackResponseSchema>>> {
    return this.makeValidatedApiCall(
      url,
      options,
      paystackResponseSchema,
      'Paystack',
      {
        fallbackData: {
          status: false,
          message: 'Service unavailable',
        },
      }
    )
  }

  /**
   * Check if API response indicates rate limiting
   */
  static isRateLimited(response: Response): boolean {
    return response.status === 429 || 
           response.status === 503 ||
           response.headers.get('x-ratelimit-remaining') === '0'
  }

  /**
   * Extract rate limit information from response headers
   */
  static extractRateLimitInfo(response: Response): {
    limit?: number
    remaining?: number
    resetTime?: Date
  } {
    const limit = response.headers.get('x-ratelimit-limit')
    const remaining = response.headers.get('x-ratelimit-remaining')
    const reset = response.headers.get('x-ratelimit-reset')

    return {
      limit: limit ? parseInt(limit, 10) : undefined,
      remaining: remaining ? parseInt(remaining, 10) : undefined,
      resetTime: reset ? new Date(parseInt(reset, 10) * 1000) : undefined,
    }
  }

  /**
   * Sanitize API response to remove sensitive data
   */
  static sanitizeApiResponse(data: any, sensitiveFields: string[] = ['key', 'token', 'secret', 'password']): any {
    if (typeof data !== 'object' || data === null) {
      return data
    }

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeApiResponse(item, sensitiveFields))
    }

    const sanitized: any = {}
    for (const [key, value] of Object.entries(data)) {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
        sanitized[key] = '[REDACTED]'
      } else {
        sanitized[key] = this.sanitizeApiResponse(value, sensitiveFields)
      }
    }

    return sanitized
  }
}