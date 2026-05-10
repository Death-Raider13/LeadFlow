import { z } from 'zod'
import { sanitizePatterns } from './schemas'

export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: ValidationError[]
}

export interface ValidationError {
  field: string
  message: string
  code: string
}

export type SanitizationType = 'xss' | 'sql' | 'html' | 'special' | 'all'

export class InputValidator {
  /**
   * Validate request data against a Zod schema
   */
  static validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> {
    try {
      const result = schema.safeParse(data)
      
      if (result.success) {
        return {
          success: true,
          data: result.data,
        }
      }
      
      const errors: ValidationError[] = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
      }))
      
      return {
        success: false,
        errors,
      }
    } catch (error) {
      return {
        success: false,
        errors: [{
          field: 'root',
          message: 'Invalid input format',
          code: 'invalid_type',
        }],
      }
    }
  }

  /**
   * Sanitize input to prevent XSS and injection attacks
   */
  static sanitizeInput(input: string, type: SanitizationType = 'all'): string {
    if (typeof input !== 'string') {
      return ''
    }

    let sanitized = input

    switch (type) {
      case 'xss':
        sanitized = sanitized.replace(sanitizePatterns.xss, '')
        break
      case 'sql':
        sanitized = sanitized.replace(sanitizePatterns.sqlInjection, '')
        break
      case 'html':
        sanitized = sanitized.replace(sanitizePatterns.htmlTags, '')
        break
      case 'special':
        sanitized = sanitized.replace(sanitizePatterns.specialChars, (match) => {
          const escapeMap: Record<string, string> = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '&': '&amp;',
          }
          return escapeMap[match] || match
        })
        break
      case 'all':
        // Apply all sanitization patterns
        sanitized = sanitized.replace(sanitizePatterns.xss, '')
        sanitized = sanitized.replace(sanitizePatterns.sqlInjection, '')
        sanitized = sanitized.replace(sanitizePatterns.specialChars, (match) => {
          const escapeMap: Record<string, string> = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '&': '&amp;',
          }
          return escapeMap[match] || match
        })
        break
    }

    return sanitized.trim()
  }

  /**
   * Validate API key format and service
   */
  static validateApiKey(key: string, service: string): boolean {
    if (!key || typeof key !== 'string') {
      return false
    }

    // Basic format validation based on service
    switch (service) {
      case 'geoapify':
        return /^[a-f0-9]{32}$/.test(key)
      case 'rapidapi':
        return /^[a-zA-Z0-9]{50,}$/.test(key)
      case 'scraperbee':
        return /^[a-zA-Z0-9-]{20,}$/.test(key)
      case 'ultramsg':
        return /^[a-zA-Z0-9]{10,}$/.test(key)
      default:
        return key.length >= 10 && key.length <= 500
    }
  }

  /**
   * Sanitize object recursively
   */
  static sanitizeObject(obj: any, type: SanitizationType = 'all'): any {
    if (obj === null || obj === undefined) {
      return obj
    }

    if (typeof obj === 'string') {
      return this.sanitizeInput(obj, type)
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizeObject(item, type))
    }

    if (typeof obj === 'object') {
      const sanitized: any = {}
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = this.sanitizeObject(value, type)
      }
      return sanitized
    }

    return obj
  }

  /**
   * Validate and sanitize request body
   */
  static validateAndSanitize<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
    sanitizationType: SanitizationType = 'all'
  ): ValidationResult<T> {
    // First sanitize the data
    const sanitizedData = this.sanitizeObject(data, sanitizationType)
    
    // Then validate
    return this.validateRequest(schema, sanitizedData)
  }

  /**
   * Check for common injection patterns
   */
  static hasInjectionPatterns(input: string): boolean {
    if (typeof input !== 'string') {
      return false
    }

    const injectionPatterns = [
      // SQL injection patterns
      /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b)/gi,
      /(\b(or|and)\s+\d+\s*=\s*\d+)/gi,
      /(\||`|\$\(|\$\{)/g,
      
      // XSS patterns
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      
      // Command injection patterns
      /(\||`|\$\(|\$\{)/g,
      
      // Path traversal patterns
      /\.\.[\/\\]/g,
    ]

    return injectionPatterns.some((pattern) => pattern.test(input))
  }

  /**
   * Validate file upload
   */
  static validateFileUpload(file: {
    name: string
    type: string
    size: number
  }): ValidationResult<{ filename: string; contentType: string; size: number }> {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'text/csv',
      'application/json',
      'text/plain',
    ]

    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        errors: [{
          field: 'type',
          message: 'File type not allowed',
          code: 'invalid_file_type',
        }],
      }
    }

    if (file.size > maxSize) {
      return {
        success: false,
        errors: [{
          field: 'size',
          message: 'File size exceeds limit',
          code: 'file_too_large',
        }],
      }
    }

    // Sanitize filename
    const sanitizedFilename = this.sanitizeInput(file.name, 'special')
      .replace(/[^a-zA-Z0-9.-]/g, '_')

    return {
      success: true,
      data: {
        filename: sanitizedFilename,
        contentType: file.type,
        size: file.size,
      },
    }
  }

  /**
   * Validate request headers for security
   */
  static validateHeaders(headers: Record<string, string>): ValidationResult<Record<string, string>> {
    const sanitizedHeaders: Record<string, string> = {}
    const errors: ValidationError[] = []

    for (const [key, value] of Object.entries(headers)) {
      if (typeof value !== 'string') {
        continue
      }

      // Check for injection patterns in headers
      if (this.hasInjectionPatterns(value)) {
        errors.push({
          field: key,
          message: 'Invalid header value',
          code: 'invalid_header',
        })
        continue
      }

      sanitizedHeaders[key] = this.sanitizeInput(value, 'special')
    }

    return {
      success: errors.length === 0,
      data: sanitizedHeaders,
      errors: errors.length > 0 ? errors : undefined,
    }
  }
}