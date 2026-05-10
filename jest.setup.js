// Jest setup file for global test configuration

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.NEXTAUTH_URL = 'http://localhost:3000';

// Firebase configuration
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test-project.firebaseapp.com';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
process.env.NEXT_PUBLIC_FIREBASE_APP_ID = 'test-app-id';
process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'test-project.appspot.com';
process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '123456789';
process.env.FIREBASE_PROJECT_ID = 'test-project';
process.env.FIREBASE_CLIENT_EMAIL = 'test@test-project.iam.gserviceaccount.com';
process.env.FIREBASE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKB\nxCOGWxwhchr+2plLdVBFDnJfyJVtaaLs4fcLNidFYjHHGHPym8Xg\n-----END PRIVATE KEY-----';

// Supabase configuration
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

// Other required environment variables
process.env.PAYSTACK_SECRET_KEY = 'sk_test_1234567890abcdef';
process.env.GEOAPIFY_API_KEY = 'test-geoapify-key';
// Generate a proper 32-byte base64 encoded key for testing
const crypto = require('crypto');
process.env.CREDENTIALS_ENCRYPTION_KEY = crypto.randomBytes(32).toString('base64');
process.env.RAPIDAPI_LOCAL_BUSINESS_KEY = 'test-rapidapi-key';
process.env.SCRAPERBEE_API_KEY = 'test-scraperbee-key';

// Mock Next.js modules that aren't available in test environment
jest.mock('next/headers', () => ({
  headers: jest.fn(() => new Map()),
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => '/'),
}));

// Mock Firebase Admin SDK
jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  cert: jest.fn(),
}));

jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn(() => ({
    verifyIdToken: jest.fn().mockResolvedValue({ uid: 'test-user' }),
    createSessionCookie: jest.fn().mockResolvedValue('test-session-cookie'),
    verifySessionCookie: jest.fn().mockResolvedValue({ uid: 'test-user', exp: Math.floor(Date.now() / 1000) + 3600 }),
    revokeRefreshTokens: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock('firebase-admin/firestore', () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn().mockResolvedValue({ exists: true, data: () => ({}) }),
        set: jest.fn().mockResolvedValue(undefined),
      })),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValue({ docs: [] }),
    })),
  })),
}));

// Increase timeout for property-based tests
jest.setTimeout(30000);

// Global test utilities
global.testUtils = {
  // Helper for creating mock requests
  createMockRequest: (options = {}) => ({
    method: 'GET',
    url: 'http://localhost:3000/api/test',
    headers: new Headers(),
    ...options,
  }),
  
  // Helper for creating mock responses
  createMockResponse: () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis(),
  }),
};