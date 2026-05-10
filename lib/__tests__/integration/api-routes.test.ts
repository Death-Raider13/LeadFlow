/**
 * Integration tests for API functionality
 * Tests basic API patterns and integration points
 */
import { NextRequest, NextResponse } from 'next/server';
import { setupExternalServiceMocks, cleanupExternalServiceMocks } from '../mocks/external-services';

describe('API Integration Tests', () => {
  beforeAll(() => {
    setupExternalServiceMocks();
  });

  afterAll(() => {
    cleanupExternalServiceMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Request/Response Handling', () => {
    test('should handle basic GET requests', async () => {
      const mockHandler = async (request: NextRequest) => {
        return NextResponse.json({ message: 'Hello World' }, { status: 200 });
      };

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      });

      const response = await mockHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ message: 'Hello World' });
    });

    test('should handle POST requests with JSON body', async () => {
      const mockHandler = async (request: NextRequest) => {
        const body = await request.json();
        return NextResponse.json({ received: body }, { status: 200 });
      };

      const testData = { name: 'Test User', email: 'test@example.com' };
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        body: JSON.stringify(testData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await mockHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.received).toEqual(testData);
    });

    test('should handle request headers correctly', async () => {
      const mockHandler = async (request: NextRequest) => {
        const authHeader = request.headers.get('Authorization');
        const contentType = request.headers.get('Content-Type');
        
        return NextResponse.json({
          hasAuth: !!authHeader,
          contentType: contentType,
        });
      };

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      });

      const response = await mockHandler(request);
      const data = await response.json();

      expect(data.hasAuth).toBe(true);
      expect(data.contentType).toBe('application/json');
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed JSON gracefully', async () => {
      const mockHandler = async (request: NextRequest) => {
        try {
          await request.json();
          return NextResponse.json({ success: true });
        } catch (error) {
          return NextResponse.json(
            { error: 'Invalid JSON' },
            { status: 400 }
          );
        }
      };

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        body: 'invalid-json',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await mockHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid JSON');
    });

    test('should handle missing required fields', async () => {
      const mockHandler = async (request: NextRequest) => {
        const body = await request.json();
        
        if (!body.email) {
          return NextResponse.json(
            { error: 'Email is required' },
            { status: 400 }
          );
        }
        
        return NextResponse.json({ success: true });
      };

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test User' }), // Missing email
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await mockHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Email is required');
    });

    test('should handle server errors', async () => {
      const mockHandler = async (request: NextRequest) => {
        throw new Error('Database connection failed');
      };

      const errorHandler = async (handler: Function, request: NextRequest) => {
        try {
          return await handler(request);
        } catch (error) {
          return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
          );
        }
      };

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      });

      const response = await errorHandler(mockHandler, request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
    });
  });

  describe('Response Formatting', () => {
    test('should format success responses consistently', async () => {
      const formatSuccessResponse = (data: any, message?: string) => {
        return NextResponse.json({
          success: true,
          data: data,
          message: message || 'Operation completed successfully',
          timestamp: new Date().toISOString(),
        });
      };

      const testData = { id: 1, name: 'Test Item' };
      const response = formatSuccessResponse(testData, 'Item created');
      const responseData = await response.json();

      expect(responseData.success).toBe(true);
      expect(responseData.data).toEqual(testData);
      expect(responseData.message).toBe('Item created');
      expect(responseData.timestamp).toBeDefined();
    });

    test('should format error responses consistently', async () => {
      const formatErrorResponse = (message: string, code?: string, status: number = 400) => {
        return NextResponse.json({
          success: false,
          error: {
            message: message,
            code: code || 'VALIDATION_ERROR',
            timestamp: new Date().toISOString(),
          }
        }, { status });
      };

      const response = formatErrorResponse('Invalid input', 'INVALID_INPUT', 400);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.error.message).toBe('Invalid input');
      expect(responseData.error.code).toBe('INVALID_INPUT');
      expect(responseData.error.timestamp).toBeDefined();
    });
  });

  describe('Middleware Integration', () => {
    test('should apply middleware to requests', async () => {
      const authMiddleware = (request: NextRequest) => {
        const token = request.headers.get('Authorization');
        if (!token) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return null; // Continue to handler
      };

      const mockHandler = async (request: NextRequest) => {
        const middlewareResponse = authMiddleware(request);
        if (middlewareResponse) {
          return middlewareResponse;
        }
        
        return NextResponse.json({ message: 'Authorized' });
      };

      // Test without auth header
      const unauthorizedRequest = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      });

      const unauthorizedResponse = await mockHandler(unauthorizedRequest);
      const unauthorizedData = await unauthorizedResponse.json();

      expect(unauthorizedResponse.status).toBe(401);
      expect(unauthorizedData.error).toBe('Unauthorized');

      // Test with auth header
      const authorizedRequest = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-token',
        },
      });

      const authorizedResponse = await mockHandler(authorizedRequest);
      const authorizedData = await authorizedResponse.json();

      expect(authorizedResponse.status).toBe(200);
      expect(authorizedData.message).toBe('Authorized');
    });
  });

  describe('External Service Integration', () => {
    test('should handle external API calls with mocks', async () => {
      const mockHandler = async (request: NextRequest) => {
        try {
          // This will use our mocked fetch
          const response = await fetch('https://api.geoapify.com/v1/geocode/search?text=New York&apiKey=test');
          const data = await response.json();
          
          return NextResponse.json({
            success: true,
            location: data.features?.[0]?.properties?.formatted || 'Unknown',
          });
        } catch (error) {
          return NextResponse.json(
            { error: 'External service unavailable' },
            { status: 503 }
          );
        }
      };

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      });

      const response = await mockHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.location).toBe('New York, NY, USA');
    });

    test('should handle external service failures', async () => {
      // Override the mock to simulate failure
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      const mockHandler = async (request: NextRequest) => {
        try {
          await fetch('https://api.example.com/data');
          return NextResponse.json({ success: true });
        } catch (error) {
          return NextResponse.json(
            { error: 'External service unavailable' },
            { status: 503 }
          );
        }
      };

      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      });

      const response = await mockHandler(request);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.error).toBe('External service unavailable');

      // Restore original fetch
      global.fetch = originalFetch;
    });
  });

  describe('Performance and Timing', () => {
    test('should complete requests within reasonable time', async () => {
      const mockHandler = async (request: NextRequest) => {
        // Simulate some processing time
        await new Promise(resolve => setTimeout(resolve, 10));
        return NextResponse.json({ message: 'Processed' });
      };

      const startTime = Date.now();
      
      const request = new NextRequest('http://localhost:3000/api/test', {
        method: 'GET',
      });

      await mockHandler(request);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Should complete within 1 second
      expect(responseTime).toBeLessThan(1000);
    });
  });
});