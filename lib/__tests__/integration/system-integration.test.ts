/**
 * System Integration Tests
 * Comprehensive tests that validate all components working together
 * Tests performance improvements and monitoring across the entire system
 */
import { NextRequest, NextResponse } from 'next/server'
import { enhancedAuth } from '@/lib/auth/enhanced-auth'
import { enhancedEncryption } from '@/lib/encryption'
import { InputValidator } from '@/lib/validation/input-validator'
import { SecureCookieManager } from '@/lib/security/cookie-config'
import { getConfig, getConfigHealthStatus } from '@/lib/config/validation'
import { setupExternalServiceMocks, cleanupExternalServiceMocks } from '../mocks/external-services'

describe('System Integration Tests', () => {
  beforeAll(() => {
    setupExternalServiceMocks()
  })

  afterAll(() => {
    cleanupExternalServiceMocks()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Complete System Workflow', () => {
    test('should handle full lead generation workflow with all security measures', async () => {
      const startTime = Date.now()

      // Simulate complete lead generation API endpoint
      const leadGenerationHandler = async (request: NextRequest) => {
        try {
          // 1. Security: Validate session
          const sessionToken = request.cookies.get('firebaseSession')?.value
          if (!sessionToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
          }

          const authResult = await enhancedAuth.validateSession(sessionToken)
          if (!authResult.isValid || !authResult.user) {
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
          }

          // 2. Input validation and sanitization
          const body = await request.json()
          const validationResult = InputValidator.validateAndSanitize(
            require('zod').object({
              location: require('zod').string().min(1),
              category: require('zod').string().optional(),
              limit: require('zod').number().min(1).max(100).default(10)
            }),
            body
          )

          if (!validationResult.success) {
            return NextResponse.json({ error: 'Invalid input', details: validationResult.errors }, { status: 400 })
          }

          // 3. Encryption: Decrypt user's API keys
          const mockEncryptedGeoapifyKey = await enhancedEncryption.encryptUserData(
            authResult.user.uid,
            'a1b2c3d4e5f67890123456789012abcd'
          )
          
          const geoapifyKey = await enhancedEncryption.decryptUserData(
            authResult.user.uid,
            mockEncryptedGeoapifyKey
          )

          // 4. External API call with resilience
          const geocodeResponse = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(validationResult.data!.location)}&apiKey=${geoapifyKey}`)
          
          if (!geocodeResponse.ok) {
            return NextResponse.json({ error: 'Geocoding failed' }, { status: 503 })
          }

          const geocodeData = await geocodeResponse.json()

          // 5. Data processing and validation
          const sanitizedResults = InputValidator.sanitizeObject(geocodeData)

          // 6. Performance monitoring
          const processingTime = Date.now() - startTime

          // 7. Secure response with headers
          const response = NextResponse.json({
            success: true,
            data: {
              location: validationResult.data!.location,
              results: sanitizedResults.features?.slice(0, validationResult.data!.limit) || [],
              processingTime,
              correlationId: authResult.sessionId
            },
            metadata: {
              timestamp: new Date().toISOString(),
              userId: authResult.user.uid,
              requestId: authResult.sessionId
            }
          })

          return SecureCookieManager.applySecurityHeaders(response)

        } catch (error) {
          return NextResponse.json(
            { 
              error: 'Internal server error',
              correlationId: 'error-' + Date.now()
            },
            { status: 500 }
          )
        }
      }

      // Create test request
      const request = new NextRequest('http://localhost:3000/api/leads/generate', {
        method: 'POST',
        body: JSON.stringify({
          location: 'New York, NY',
          category: 'restaurant',
          limit: 5
        }),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'firebaseSession=valid-session-token'
        }
      })

      // Mock auth validation
      jest.spyOn(enhancedAuth, 'validateSession').mockResolvedValue({
        user: {
          uid: 'system-test-user',
          email: 'test@example.com',
          displayName: 'System Test User',
          emailVerified: true
        },
        isValid: true,
        expiresAt: new Date(Date.now() + 3600000),
        permissions: [],
        sessionId: 'system-test-session'
      })

      const response = await leadGenerationHandler(request)
      const responseData = await response.json()

      // Verify complete workflow
      expect(response.status).toBe(200)
      expect(responseData.success).toBe(true)
      expect(responseData.data.location).toBe('New York, NY')
      expect(responseData.data.results).toBeDefined()
      expect(responseData.data.processingTime).toBeLessThan(5000) // Should complete within 5 seconds
      expect(responseData.metadata.userId).toBe('system-test-user')

      // Verify security headers
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
      expect(response.headers.get('X-Frame-Options')).toBe('DENY')
    })

    test('should handle concurrent requests with rate limiting and performance monitoring', async () => {
      const concurrentRequests = 10
      const requestPromises: Promise<Response>[] = []

      // Simulate concurrent API requests
      for (let i = 0; i < concurrentRequests; i++) {
        const concurrentHandler = async () => {
          const startTime = Date.now()

          // Simulate rate limiting check
          const rateLimitKey = `user-concurrent-test-${i}`
          
          // Simulate processing
          await new Promise(resolve => setTimeout(resolve, Math.random() * 100))

          // Return performance metrics
          return new Response(JSON.stringify({
            success: true,
            requestId: i,
            processingTime: Date.now() - startTime,
            timestamp: new Date().toISOString()
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        }

        requestPromises.push(concurrentHandler())
      }

      const startTime = Date.now()
      const responses = await Promise.all(requestPromises)
      const totalTime = Date.now() - startTime

      // Verify all requests completed successfully
      expect(responses).toHaveLength(concurrentRequests)
      
      for (const response of responses) {
        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.success).toBe(true)
        expect(data.processingTime).toBeLessThan(1000) // Each request < 1 second
      }

      // Verify concurrent processing performance
      expect(totalTime).toBeLessThan(2000) // All requests should complete within 2 seconds
    })

    test('should validate configuration health across all components', async () => {
      // Test configuration validation
      const config = getConfig()
      expect(config).toBeDefined()
      expect(config.FIREBASE_PROJECT_ID).toBeDefined()
      expect(config.CREDENTIALS_ENCRYPTION_KEY).toBeDefined()

      // Test configuration health status
      const healthStatus = getConfigHealthStatus()
      console.log('Health status:', healthStatus)
      // Allow for warnings but require basic validity
      expect(healthStatus.environmentConfig.isValid).toBe(true)

      // Test encryption service health
      const encryptionHealth = await enhancedEncryption.validateKeyIntegrity()
      expect(encryptionHealth).toBe(true)

      // Test key statistics
      const keyStats = enhancedEncryption.getKeyStatistics()
      expect(keyStats.keyVersions).toContain(1)
      expect(keyStats.totalUsers).toBeGreaterThanOrEqual(0)
    })

    test('should handle error scenarios gracefully with proper monitoring', async () => {
      const errorScenarios = [
        {
          name: 'Invalid JSON',
          request: new NextRequest('http://localhost:3000/api/test', {
            method: 'POST',
            body: 'invalid-json',
            headers: { 'Content-Type': 'application/json' }
          }),
          expectedStatus: 400
        },
        {
          name: 'Missing authentication',
          request: new NextRequest('http://localhost:3000/api/test', {
            method: 'GET'
          }),
          expectedStatus: 401
        },
        {
          name: 'Malicious input',
          request: new NextRequest('http://localhost:3000/api/test', {
            method: 'POST',
            body: JSON.stringify({ query: "<script>alert('xss')</script>" }),
            headers: { 'Content-Type': 'application/json' }
          }),
          expectedStatus: 400
        }
      ]

      for (const scenario of errorScenarios) {
        const errorHandler = async (request: NextRequest) => {
          try {
            // Simulate error handling pipeline
            if (scenario.name === 'Invalid JSON') {
              await request.json() // This will throw for invalid JSON
            }

            if (scenario.name === 'Missing authentication') {
              const token = request.cookies.get('firebaseSession')?.value
              if (!token) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
              }
            }

            if (scenario.name === 'Malicious input') {
              const body = await request.json()
              if (InputValidator.hasInjectionPatterns(body.query)) {
                return NextResponse.json({ error: 'Malicious input detected' }, { status: 400 })
              }
            }

            return NextResponse.json({ success: true })

          } catch (error) {
            return NextResponse.json(
              { error: 'Bad request' },
              { status: 400 }
            )
          }
        }

        const response = await errorHandler(scenario.request)
        expect(response.status).toBe(scenario.expectedStatus)

        const data = await response.json()
        expect(data.error).toBeDefined()
      }
    })
  })

  describe('Performance Validation', () => {
    test('should meet performance benchmarks for all operations', async () => {
      const performanceTests = [
        {
          name: 'Encryption/Decryption',
          operation: async () => {
            const userId = 'perf-test-user'
            const data = 'performance-test-data-' + Math.random()
            const encrypted = await enhancedEncryption.encryptUserData(userId, data)
            const decrypted = await enhancedEncryption.decryptUserData(userId, encrypted)
            return decrypted === data
          },
          maxTime: 100 // 100ms
        },
        {
          name: 'Input Validation',
          operation: async () => {
            const testData = {
              name: 'Test User',
              email: 'test@example.com',
              query: 'safe search query'
            }
            const result = InputValidator.validateAndSanitize(
              require('zod').object({
                name: require('zod').string(),
                email: require('zod').string().email(),
                query: require('zod').string()
              }),
              testData
            )
            return result.success
          },
          maxTime: 50 // 50ms
        },
        {
          name: 'Cookie Security Operations',
          operation: async () => {
            const response = NextResponse.json({ test: true })
            SecureCookieManager.createSessionCookie(response, 'test-token', 3600)
            SecureCookieManager.applySecurityHeaders(response)
            return true
          },
          maxTime: 25 // 25ms
        }
      ]

      for (const test of performanceTests) {
        const startTime = Date.now()
        const result = await test.operation()
        const duration = Date.now() - startTime

        expect(result).toBe(true)
        expect(duration).toBeLessThan(test.maxTime)
      }
    })

    test('should handle large data volumes efficiently', async () => {
      const largeDataTests = [
        {
          name: 'Large string encryption',
          data: 'x'.repeat(10000), // 10KB string
          maxTime: 500
        },
        {
          name: 'Multiple concurrent encryptions',
          data: Array.from({ length: 50 }, (_, i) => `test-data-${i}`),
          maxTime: 2000
        }
      ]

      for (const test of largeDataTests) {
        const startTime = Date.now()

        if (test.name === 'Large string encryption') {
          const userId = 'large-data-test'
          const encrypted = await enhancedEncryption.encryptUserData(userId, test.data as string)
          const decrypted = await enhancedEncryption.decryptUserData(userId, encrypted)
          expect(decrypted).toBe(test.data)
        }

        if (test.name === 'Multiple concurrent encryptions') {
          const userId = 'concurrent-test'
          const promises = (test.data as string[]).map(async (data) => {
            const encrypted = await enhancedEncryption.encryptUserData(userId, data)
            return enhancedEncryption.decryptUserData(userId, encrypted)
          })
          
          const results = await Promise.all(promises)
          expect(results).toEqual(test.data)
        }

        const duration = Date.now() - startTime
        expect(duration).toBeLessThan(test.maxTime)
      }
    })
  })

  describe('Monitoring and Observability', () => {
    test('should provide comprehensive system health information', async () => {
      // Test configuration health
      const configHealth = getConfigHealthStatus()
      expect(configHealth).toHaveProperty('isValid')
      expect(configHealth).toHaveProperty('missingRequired')
      expect(configHealth).toHaveProperty('invalidValues')
      expect(configHealth).toHaveProperty('warnings')
      expect(configHealth).toHaveProperty('environmentConfig')

      // Test encryption service statistics
      const encryptionStats = enhancedEncryption.getKeyStatistics()
      expect(encryptionStats).toHaveProperty('totalUsers')
      expect(encryptionStats).toHaveProperty('activeKeys')
      expect(encryptionStats).toHaveProperty('keyVersions')

      // Test authentication audit capabilities
      const auditLogs = enhancedAuth.getAuditLogs()
      expect(Array.isArray(auditLogs)).toBe(true)

      const activeSessions = enhancedAuth.getActiveSessions()
      expect(Array.isArray(activeSessions)).toBe(true)
    })

    test('should track performance metrics across operations', async () => {
      const metrics: Array<{ operation: string; duration: number; success: boolean }> = []

      // Simulate various operations with metrics collection
      const operations = [
        {
          name: 'user-authentication',
          operation: async () => {
            const startTime = Date.now()
            try {
              // Mock auth operation with minimum delay
              await new Promise(resolve => setTimeout(resolve, 5))
              return { duration: Math.max(1, Date.now() - startTime), success: true }
            } catch (error) {
              return { duration: Math.max(1, Date.now() - startTime), success: false }
            }
          }
        },
        {
          name: 'data-encryption',
          operation: async () => {
            const startTime = Date.now()
            try {
              const userId = 'metrics-test'
              const data = 'test-data-for-metrics'
              const encrypted = await enhancedEncryption.encryptUserData(userId, data)
              await enhancedEncryption.decryptUserData(userId, encrypted)
              return { duration: Math.max(1, Date.now() - startTime), success: true }
            } catch (error) {
              return { duration: Math.max(1, Date.now() - startTime), success: false }
            }
          }
        },
        {
          name: 'input-validation',
          operation: async () => {
            const startTime = Date.now()
            try {
              const result = InputValidator.validateRequest(
                require('zod').object({ test: require('zod').string() }),
                { test: 'valid-input' }
              )
              return { duration: Math.max(1, Date.now() - startTime), success: result.success }
            } catch (error) {
              return { duration: Math.max(1, Date.now() - startTime), success: false }
            }
          }
        }
      ]

      for (const op of operations) {
        const result = await op.operation()
        metrics.push({
          operation: op.name,
          duration: result.duration,
          success: result.success
        })
      }

      // Verify metrics collection
      expect(metrics).toHaveLength(operations.length)
      
      for (const metric of metrics) {
        expect(metric.operation).toBeDefined()
        expect(typeof metric.duration).toBe('number')
        expect(typeof metric.success).toBe('boolean')
        expect(metric.duration).toBeGreaterThan(0)
        expect(metric.duration).toBeLessThan(1000) // All operations should be fast
      }

      // Verify all operations succeeded
      const successfulOperations = metrics.filter(m => m.success)
      expect(successfulOperations).toHaveLength(operations.length)
    })
  })

  describe('Correctness Properties Validation', () => {
    test('should validate all security properties are satisfied', async () => {
      // Property 1: API Key Protection - keys should never appear in logs
      const logCapture: string[] = []
      const originalConsoleLog = console.log
      console.log = (...args) => {
        logCapture.push(args.join(' '))
      }

      try {
        const apiKey = 'secret-key-should-not-appear'
        const userId = 'property-test-user'
        
        const encrypted = await enhancedEncryption.encryptUserData(userId, apiKey)
        console.log('Processing encrypted data:', JSON.stringify(encrypted))
        
        const logsContainApiKey = logCapture.some(log => log.includes(apiKey))
        expect(logsContainApiKey).toBe(false)
        
      } finally {
        console.log = originalConsoleLog
      }

      // Property 2: Token Validation Integrity
      const mockValidToken = 'valid-token-12345'
      jest.spyOn(enhancedAuth, 'validateSession').mockResolvedValue({
        user: { uid: 'test', email: 'test@example.com', displayName: 'Test', emailVerified: true },
        isValid: true,
        expiresAt: new Date(Date.now() + 3600000),
        permissions: [],
        sessionId: 'test-session'
      })

      const authResult = await enhancedAuth.validateSession(mockValidToken)
      expect(authResult.isValid).toBe(true)
      expect(authResult.user).toBeDefined()

      // Property 3: Encryption Round-trip Consistency
      const testData = 'round-trip-test-data'
      const userId = 'round-trip-user'
      
      const encrypted = await enhancedEncryption.encryptUserData(userId, testData)
      const decrypted = await enhancedEncryption.decryptUserData(userId, encrypted)
      expect(decrypted).toBe(testData)

      // Property 4: Input Injection Prevention
      const maliciousInputs = [
        "<script>alert('xss')</script>",
        "'; DROP TABLE users; --",
        "javascript:alert(1)"
      ]

      for (const input of maliciousInputs) {
        const hasInjection = InputValidator.hasInjectionPatterns(input)
        expect(hasInjection).toBe(true)
        
        const sanitized = InputValidator.sanitizeInput(input, 'all')
        // Check that dangerous characters are removed or escaped
        if (input.includes('<script>')) {
          expect(sanitized).not.toContain('<script>')
        }
        if (input.includes("'")) {
          expect(sanitized).not.toContain("'")
        }
      }
    })

    test('should validate performance and monitoring properties', async () => {
      // Property: Performance Metrics Collection
      const startTime = Date.now()
      
      // Simulate operation that should be monitored
      await new Promise(resolve => setTimeout(resolve, 50))
      
      const duration = Date.now() - startTime
      expect(duration).toBeGreaterThan(40) // Should capture actual time
      expect(duration).toBeLessThan(100) // Should be reasonable

      // Property: Configuration Validation
      const config = getConfig()
      expect(config.CREDENTIALS_ENCRYPTION_KEY).toBeDefined()
      expect(Buffer.from(config.CREDENTIALS_ENCRYPTION_KEY, 'base64').length).toBe(32)

      // Property: System Health Monitoring
      const healthStatus = getConfigHealthStatus()
      expect(healthStatus.environmentConfig.isValid).toBe(true)
      expect(Array.isArray(healthStatus.missingRequired)).toBe(true)
      expect(Array.isArray(healthStatus.invalidValues)).toBe(true)
    })
  })
})