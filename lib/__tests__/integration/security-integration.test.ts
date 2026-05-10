/**
 * Security Integration Tests
 * Tests that all security improvements work together end-to-end
 * Validates Requirements 1.1 - API Key Protection across the entire system
 */
import { NextRequest, NextResponse } from 'next/server'
import { enhancedAuth } from '@/lib/auth/enhanced-auth'
import { enhancedEncryption } from '@/lib/encryption'
import { InputValidator } from '@/lib/validation/input-validator'
import { SecureCookieManager } from '@/lib/security/cookie-config'
import { setupExternalServiceMocks, cleanupExternalServiceMocks } from '../mocks/external-services'

describe('Security Integration Tests', () => {
  beforeAll(() => {
    setupExternalServiceMocks()
  })

  afterAll(() => {
    cleanupExternalServiceMocks()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
    // Ensure the enhanced auth singleton is properly initialized
    // This helps avoid issues with Jest mocking interfering with singleton state
  })

  describe('End-to-End Security Workflow', () => {
    test('should protect API keys throughout the entire request lifecycle', async () => {
      // Simulate a complete request that involves API key handling
      const mockApiHandler = async (request: NextRequest) => {
        try {
          // 1. Validate session
          const sessionToken = request.cookies.get('firebaseSession')?.value
          if (!sessionToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
          }

          const authResult = await enhancedAuth.validateSession(sessionToken)
          if (!authResult.isValid || !authResult.user) {
            return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
          }

          // 2. Validate input
          const body = await request.json()
          const validationResult = InputValidator.validateRequest(
            require('zod').object({
              service: require('zod').string(),
              query: require('zod').string()
            }),
            body
          )

          if (!validationResult.success) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
          }

          // 3. Decrypt user's API key (simulating retrieval from encrypted storage)
          const mockEncryptedApiKey = await enhancedEncryption.encryptUserData(
            authResult.user.uid,
            'a1b2c3d4e5f67890123456789012abcd' // Valid geoapify format (32 hex chars)
          )
          
          const decryptedApiKey = await enhancedEncryption.decryptUserData(
            authResult.user.uid,
            mockEncryptedApiKey
          )

          // 4. Validate API key format
          const isValidKey = InputValidator.validateApiKey(decryptedApiKey, validationResult.data!.service)
          if (!isValidKey) {
            console.log('API key validation failed:', { key: decryptedApiKey, service: validationResult.data!.service })
            return NextResponse.json({ error: 'Invalid API key' }, { status: 400 })
          }

          // 5. Use API key in external request (mocked)
          const externalResponse = await fetch(`https://api.geoapify.com/v1/geocode/search?text=test&apiKey=${decryptedApiKey}`, {
            headers: {
              'Authorization': `Bearer ${decryptedApiKey}`
            }
          })

          // 6. Validate external response
          if (!externalResponse.ok) {
            return NextResponse.json({ error: 'External service error' }, { status: 503 })
          }

          const externalData = await externalResponse.json()

          // 7. Sanitize response data
          const sanitizedData = InputValidator.sanitizeObject(externalData)

          // 8. Return secure response
          const response = NextResponse.json({
            success: true,
            data: sanitizedData,
            correlationId: authResult.sessionId
          })

          // 9. Apply security headers
          return SecureCookieManager.applySecurityHeaders(response)

        } catch (error) {
          console.log('Handler error:', error)
          return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
          )
        }
      }

      // Create a request with session cookie
      const sessionToken = 'mock-session-token'
      const request = new NextRequest('http://localhost:3000/api/secure-endpoint', {
        method: 'POST',
        body: JSON.stringify({
          service: 'geoapify',
          query: 'New York'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `firebaseSession=${sessionToken}`
        }
      })

      // Mock successful auth validation
      jest.spyOn(enhancedAuth, 'validateSession').mockResolvedValue({
        user: {
          uid: 'test-user-123',
          email: 'test@example.com',
          displayName: 'Test User',
          emailVerified: true
        },
        isValid: true,
        expiresAt: new Date(Date.now() + 3600000),
        permissions: [],
        sessionId: 'test-session-123'
      })

      const response = await mockApiHandler(request)
      const responseData = await response.json()

      // Verify the entire security workflow succeeded
      expect(response.status).toBe(200)
      expect(responseData.success).toBe(true)
      expect(responseData.correlationId).toBe('test-session-123')
      
      // Verify security headers are applied
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
      expect(response.headers.get('X-Frame-Options')).toBe('DENY')
      expect(response.headers.get('X-XSS-Protection')).toBe('1; mode=block')
    })

    test('should reject requests with injection attempts at any stage', async () => {
      const maliciousHandler = async (request: NextRequest) => {
        try {
          const body = await request.json()
          
          // Input validation should catch injection attempts
          const validationResult = InputValidator.validateAndSanitize(
            require('zod').object({
              query: require('zod').string()
            }),
            body
          )

          if (!validationResult.success) {
            return NextResponse.json({ error: 'Invalid input detected' }, { status: 400 })
          }

          // Check for injection patterns
          if (InputValidator.hasInjectionPatterns(body.query)) {
            return NextResponse.json({ error: 'Malicious input detected' }, { status: 400 })
          }

          return NextResponse.json({ success: true })
        } catch (error) {
          return NextResponse.json({ error: 'Request processing failed' }, { status: 500 })
        }
      }

      // Test various injection attempts
      const injectionAttempts = [
        "'; DROP TABLE users; --",
        "<script>alert('xss')</script>",
        "UNION SELECT * FROM passwords",
        "javascript:alert('xss')",
        "../../../etc/passwd"
      ]

      for (const maliciousInput of injectionAttempts) {
        const request = new NextRequest('http://localhost:3000/api/test', {
          method: 'POST',
          body: JSON.stringify({ query: maliciousInput }),
          headers: { 'Content-Type': 'application/json' }
        })

        const response = await maliciousHandler(request)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toMatch(/Invalid input|Malicious input/)
      }
    })

    test('should maintain encryption isolation between users', async () => {
      const user1Id = 'user-1'
      const user2Id = 'user-2'
      const sensitiveData = 'user-specific-api-key-12345'

      // Encrypt data for user 1
      const user1Encrypted = await enhancedEncryption.encryptUserData(user1Id, sensitiveData)
      
      // Encrypt same data for user 2
      const user2Encrypted = await enhancedEncryption.encryptUserData(user2Id, sensitiveData)

      // Verify encrypted data is different (different user keys)
      expect(user1Encrypted.ciphertext).not.toBe(user2Encrypted.ciphertext)
      expect(user1Encrypted.userId).toBe(user1Id)
      expect(user2Encrypted.userId).toBe(user2Id)

      // Verify user 1 can decrypt their own data
      const user1Decrypted = await enhancedEncryption.decryptUserData(user1Id, user1Encrypted)
      expect(user1Decrypted).toBe(sensitiveData)

      // Verify user 2 can decrypt their own data
      const user2Decrypted = await enhancedEncryption.decryptUserData(user2Id, user2Encrypted)
      expect(user2Decrypted).toBe(sensitiveData)

      // Verify user 1 cannot decrypt user 2's data
      await expect(
        enhancedEncryption.decryptUserData(user1Id, user2Encrypted)
      ).rejects.toThrow()

      // Verify user 2 cannot decrypt user 1's data
      await expect(
        enhancedEncryption.decryptUserData(user2Id, user1Encrypted)
      ).rejects.toThrow()
    })

    test('should validate cookie security throughout request lifecycle', async () => {
      const secureHandler = async (request: NextRequest) => {
        // Validate session cookie
        const sessionCookie = request.cookies.get('firebaseSession')?.value
        const cookieValidation = SecureCookieManager.validateCookie(sessionCookie)

        if (!cookieValidation.isValid) {
          return NextResponse.json({ error: 'Invalid session cookie' }, { status: 401 })
        }

        // Create secure response with new cookie
        const response = NextResponse.json({ success: true })
        
        // Set secure session cookie
        SecureCookieManager.createSessionCookie(response, 'new-session-token', 3600)
        
        // Apply security headers
        return SecureCookieManager.applySecurityHeaders(response)
      }

      // Test with valid signed cookie
      const validCookie = 's:valid-session-token.signature'
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'Cookie': `firebaseSession=${validCookie}`
        }
      })

      // Mock cookie validation to return valid
      jest.spyOn(SecureCookieManager, 'validateCookie').mockReturnValue({
        isValid: true,
        value: 'valid-session-token'
      })

      const response = await secureHandler(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)

      // Verify security headers
      expect(response.headers.get('Strict-Transport-Security')).toBeTruthy()
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
      expect(response.headers.get('X-Frame-Options')).toBe('DENY')
    })

    test('should handle authentication audit trail', async () => {
      const auditHandler = async (request: NextRequest) => {
        const sessionToken = request.cookies.get('firebaseSession')?.value
        
        if (!sessionToken) {
          return NextResponse.json({ error: 'No session' }, { status: 401 })
        }

        // Validate session with audit
        const authResult = await enhancedAuth.validateSession(sessionToken)
        
        if (authResult.isValid && authResult.user) {
          // Log successful access
          await enhancedAuth.auditLogin(authResult.user.uid, {
            ipAddress: request.ip || '127.0.0.1',
            userAgent: request.headers.get('User-Agent') || 'unknown',
            timestamp: new Date(),
            sessionId: authResult.sessionId,
            loginMethod: 'token'
          })

          return NextResponse.json({
            success: true,
            sessionId: authResult.sessionId,
            auditLogged: true
          })
        }

        return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
      }

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'Cookie': 'firebaseSession=valid-token',
          'User-Agent': 'Test Browser 1.0'
        }
      })

      // Mock successful auth
      jest.spyOn(enhancedAuth, 'validateSession').mockResolvedValue({
        user: {
          uid: 'test-user-456',
          email: 'test@example.com',
          displayName: 'Test User',
          emailVerified: true
        },
        isValid: true,
        expiresAt: new Date(Date.now() + 3600000),
        permissions: [],
        sessionId: 'audit-session-123'
      })

      const auditSpy = jest.spyOn(enhancedAuth, 'auditLogin').mockResolvedValue()

      const response = await auditHandler(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.auditLogged).toBe(true)
      expect(auditSpy).toHaveBeenCalledWith('test-user-456', expect.objectContaining({
        userAgent: 'Test Browser 1.0',
        loginMethod: 'token'
      }))
    })
  })

  describe('Security Property Validation', () => {
    test('should validate key integrity across all encryption operations', async () => {
      // Test encryption service integrity
      const integrityValid = await enhancedEncryption.validateKeyIntegrity()
      expect(integrityValid).toBe(true)

      // Test multiple encryption/decryption cycles
      const testData = 'sensitive-test-data-12345'
      const userId = 'integrity-test-user'

      for (let i = 0; i < 10; i++) {
        const encrypted = await enhancedEncryption.encryptUserData(userId, testData)
        const decrypted = await enhancedEncryption.decryptUserData(userId, encrypted)
        expect(decrypted).toBe(testData)
      }
    })

    test('should prevent API key exposure in logs and responses', async () => {
      const logCapture: string[] = []
      const originalConsoleLog = console.log
      console.log = (...args) => {
        logCapture.push(args.join(' '))
      }

      try {
        const apiKey = 'secret-api-key-should-not-appear'
        const userId = 'log-test-user'

        // Encrypt API key
        const encrypted = await enhancedEncryption.encryptUserData(userId, apiKey)
        
        // Simulate logging encrypted data (should be safe)
        console.log('Encrypted data stored:', JSON.stringify(encrypted))

        // Verify API key doesn't appear in logs
        const logsContainApiKey = logCapture.some(log => log.includes(apiKey))
        expect(logsContainApiKey).toBe(false)

        // Verify encrypted data is logged (safe to log)
        const logsContainEncrypted = logCapture.some(log => log.includes(encrypted.ciphertext))
        expect(logsContainEncrypted).toBe(true)

      } finally {
        console.log = originalConsoleLog
      }
    })

    test('should validate input sanitization prevents all injection types', async () => {
      const injectionTests = [
        { input: "<script>alert('xss')</script>", type: 'xss' as const },
        { input: "'; DROP TABLE users; --", type: 'sql' as const },
        { input: "javascript:alert(1)", type: 'all' as const }, // Use 'all' to catch javascript:
        { input: "onload=alert(1)", type: 'xss' as const },
        { input: "UNION SELECT password FROM users", type: 'sql' as const }
      ]

      for (const test of injectionTests) {
        const sanitized = InputValidator.sanitizeInput(test.input, test.type)
        
        // Verify dangerous patterns are removed/escaped based on type
        if (test.type === 'xss') {
          expect(sanitized).not.toContain('<script>')
        }
        
        if (test.type === 'all') {
          // 'all' type should remove javascript: patterns
          expect(sanitized).not.toContain('javascript:')
        }
        
        if (test.type === 'sql') {
          // SQL injection patterns should have dangerous characters removed
          expect(sanitized).not.toContain("'")
          expect(sanitized).not.toContain(';')
          expect(sanitized).not.toContain('--')
        }
        
        // Verify injection detection works
        const hasInjection = InputValidator.hasInjectionPatterns(test.input)
        expect(hasInjection).toBe(true)
      }
    })

    test('should maintain session security across multiple requests', async () => {
      const userId = 'session-test-user'
      const sessionId = 'test-session-789'

      // Simulate login - this should create an active session
      await enhancedAuth.auditLogin(userId, {
        ipAddress: '192.168.1.1',
        userAgent: 'Test Browser',
        timestamp: new Date(),
        sessionId,
        loginMethod: 'email'
      })

      // Verify session is tracked
      const activeSessions = enhancedAuth.getActiveSessions(userId)
      expect(activeSessions).toHaveLength(1)
      expect(activeSessions[0].sessionId).toBe(sessionId)

      // Simulate session revocation
      await enhancedAuth.revokeSession(sessionId)

      // Verify session is removed
      const activeSessionsAfterRevoke = enhancedAuth.getActiveSessions(userId)
      expect(activeSessionsAfterRevoke).toHaveLength(0)

      // Verify audit trail
      const auditLogs = enhancedAuth.getAuditLogs(userId)
      expect(auditLogs.length).toBeGreaterThan(0)
      expect(auditLogs.some(log => log.action === 'login')).toBe(true)
      expect(auditLogs.some(log => log.action === 'revoke')).toBe(true)
    })
  })

  describe('Performance Under Security Constraints', () => {
    test('should maintain performance with security validations', async () => {
      const performanceHandler = async (request: NextRequest) => {
        const startTime = Date.now()

        // Simulate full security pipeline
        const body = await request.json()
        
        // 1. Input validation
        const validationResult = InputValidator.validateAndSanitize(
          require('zod').object({
            data: require('zod').string()
          }),
          body
        )

        if (!validationResult.success) {
          return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
        }

        // 2. Encryption/decryption
        const userId = 'perf-test-user'
        const encrypted = await enhancedEncryption.encryptUserData(userId, validationResult.data!.data)
        const decrypted = await enhancedEncryption.decryptUserData(userId, encrypted)

        // 3. Security headers
        const response = NextResponse.json({
          success: true,
          processingTime: Date.now() - startTime,
          dataLength: decrypted.length
        })

        return SecureCookieManager.applySecurityHeaders(response)
      }

      const request = new NextRequest('http://localhost:3000/api/perf-test', {
        method: 'POST',
        body: JSON.stringify({
          data: 'test-data-for-performance-validation'
        }),
        headers: { 'Content-Type': 'application/json' }
      })

      const startTime = Date.now()
      const response = await performanceHandler(request)
      const endTime = Date.now()
      const totalTime = endTime - startTime

      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      
      // Security operations should complete within reasonable time (< 1 second)
      expect(totalTime).toBeLessThan(1000)
      expect(data.processingTime).toBeLessThan(500)
    })
  })
})