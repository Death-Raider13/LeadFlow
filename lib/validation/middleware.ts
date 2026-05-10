import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { InputValidator, ValidationResult, SanitizationType } from './input-validator'

export interface ValidationMiddlewareOptions {
  bodySchema?: z.ZodSchema<any>
  querySchema?: z.ZodSchema<any>
  sanitizationType?: SanitizationType
  validateHeaders?: boolean
}

export interface ValidatedRequest extends NextRequest {
  validatedBody?: any
  validatedQuery?: any
  validatedHeaders?: Record<string, string>
}

/**
 * Create validation middleware for API routes
 */
export function createValidationMiddleware(options: ValidationMiddlewareOptions = {}) {
  return async function validationMiddleware(
    request: NextRequest,
    handler: (req: ValidatedRequest) => Promise<NextResponse>
  ): Promise<NextResponse> {
    const {
      bodySchema,
      querySchema,
      sanitizationType = 'all',
      validateHeaders = true,
    } = options

    const validatedRequest = request as ValidatedRequest
    const errors: Array<{ field: string; message: string; code: string }> = []

    try {
      // Validate and sanitize request body
      if (bodySchema && (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH')) {
        try {
          const body = await request.json()
          const bodyResult = InputValidator.validateAndSanitize(bodySchema, body, sanitizationType)
          
          if (!bodyResult.success) {
            errors.push(...(bodyResult.errors || []))
          } else {
            validatedRequest.validatedBody = bodyResult.data
          }
        } catch (error) {
          errors.push({
            field: 'body',
            message: 'Invalid JSON format',
            code: 'invalid_json',
          })
        }
      }

      // Validate and sanitize query parameters
      if (querySchema) {
        const searchParams = request.nextUrl.searchParams
        const query: Record<string, any> = {}
        
        for (const [key, value] of searchParams.entries()) {
          query[key] = value
        }

        const queryResult = InputValidator.validateAndSanitize(querySchema, query, sanitizationType)
        
        if (!queryResult.success) {
          errors.push(...(queryResult.errors || []))
        } else {
          validatedRequest.validatedQuery = queryResult.data
        }
      }

      // Validate headers
      if (validateHeaders) {
        const headers: Record<string, string> = {}
        request.headers.forEach((value, key) => {
          headers[key] = value
        })

        const headersResult = InputValidator.validateHeaders(headers)
        
        if (!headersResult.success) {
          errors.push(...(headersResult.errors || []))
        } else {
          validatedRequest.validatedHeaders = headersResult.data
        }
      }

      // Return validation errors if any
      if (errors.length > 0) {
        return NextResponse.json(
          {
            error: 'Validation failed',
            details: errors,
            timestamp: new Date().toISOString(),
          },
          { status: 400 }
        )
      }

      // Call the actual handler with validated request
      return await handler(validatedRequest)
    } catch (error) {
      console.error('Validation middleware error:', error)
      return NextResponse.json(
        {
          error: 'Internal validation error',
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      )
    }
  }
}

/**
 * Wrapper function to apply validation to API route handlers
 */
export function withValidation(
  handler: (req: ValidatedRequest) => Promise<NextResponse>,
  options: ValidationMiddlewareOptions = {}
) {
  const middleware = createValidationMiddleware(options)
  
  return async function validatedHandler(request: NextRequest): Promise<NextResponse> {
    return await middleware(request, handler)
  }
}

/**
 * Helper to extract validated data from request
 */
export function getValidatedData(request: ValidatedRequest) {
  return {
    body: request.validatedBody,
    query: request.validatedQuery,
    headers: request.validatedHeaders,
  }
}

/**
 * Create standardized error response
 */
export function createValidationErrorResponse(
  message: string,
  errors?: Array<{ field: string; message: string; code: string }>,
  status: number = 400
): NextResponse {
  return NextResponse.json(
    {
      error: message,
      details: errors,
      timestamp: new Date().toISOString(),
    },
    { status }
  )
}

/**
 * Runtime type validation helper
 */
export function validateRuntimeType<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  errorMessage: string = 'Type validation failed'
): T {
  const result = schema.safeParse(data)
  
  if (!result.success) {
    throw new Error(`${errorMessage}: ${result.error.message}`)
  }
  
  return result.data
}