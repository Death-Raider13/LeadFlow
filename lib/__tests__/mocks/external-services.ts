/**
 * Realistic test doubles for external services
 * These mocks behave like the actual services to provide realistic testing
 */

// Mock Geoapify API responses
export const mockGeoapifyResponses = {
  geocode: {
    success: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            place_id: "test-place-id-123",
            formatted: "New York, NY, USA",
            country: "United States",
            state: "New York",
            city: "New York"
          },
          geometry: {
            type: "Point",
            coordinates: [-74.006, 40.7128]
          }
        }
      ]
    },
    notFound: {
      type: "FeatureCollection",
      features: []
    }
  },
  places: {
    success: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            place_id: "restaurant-123",
            name: "Test Restaurant",
            categories: ["catering.restaurant"],
            formatted: "123 Main St, New York, NY 10001",
            datasource: {
              raw: {
                phone: "+1-555-123-4567",
                email: "info@testrestaurant.com",
                website: "https://testrestaurant.com"
              }
            }
          },
          geometry: {
            type: "Point",
            coordinates: [-74.006, 40.7128]
          }
        }
      ]
    },
    empty: {
      type: "FeatureCollection",
      features: []
    }
  },
  placeDetails: {
    success: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            place_id: "restaurant-123",
            name: "Test Restaurant",
            datasource: {
              raw: {
                phone: "+1-555-123-4567",
                email: "info@testrestaurant.com",
                website: "https://testrestaurant.com",
                opening_hours: "Mon-Sun 9:00-22:00"
              }
            }
          }
        }
      ]
    }
  }
};

// Mock RapidAPI responses
export const mockRapidApiResponses = {
  business: {
    success: {
      status: "OK",
      data: [
        {
          business_id: "rapid-123",
          name: "Test Restaurant",
          phone_number: "+1-555-987-6543",
          email: "contact@testrestaurant.com",
          website: "https://testrestaurant.com",
          address: "123 Main St, New York, NY 10001",
          rating: 4.5,
          reviews_count: 150
        }
      ]
    },
    empty: {
      status: "OK",
      data: []
    }
  }
};

// Mock ScraperBee responses
export const mockScraperBeeResponses = {
  success: `
    <html>
      <body>
        <div class="contact">
          <p>Email: scraped@testrestaurant.com</p>
          <p>Phone: +1-555-111-2222</p>
          <a href="https://facebook.com/testrestaurant">Facebook</a>
          <a href="https://instagram.com/testrestaurant">Instagram</a>
        </div>
      </body>
    </html>
  `,
  noContact: `
    <html>
      <body>
        <h1>Welcome to Test Restaurant</h1>
        <p>Great food and service!</p>
      </body>
    </html>
  `
};

// Mock Firebase Admin responses
export const mockFirebaseResponses = {
  user: {
    uid: "test-user-123",
    email: "test@example.com",
    displayName: "Test User"
  },
  profile: {
    user_id: "test-user-123",
    subscription_plan: "pro",
    created_at: new Date(),
    updated_at: new Date()
  },
  leads: [
    {
      id: "lead-123",
      user_id: "test-user-123",
      name: "Test Lead",
      email: "lead@example.com",
      phone: "+1-555-000-1111",
      source: "geoapify",
      status: "new",
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
};

/**
 * Mock fetch function that returns realistic responses based on URL patterns
 */
export function createMockFetch() {
  return jest.fn().mockImplementation(async (url: string, options?: RequestInit) => {
    const urlStr = typeof url === 'string' ? url : url.toString();
    
    // Geoapify geocoding API
    if (urlStr.includes('api.geoapify.com/v1/geocode/search')) {
      const searchParams = new URL(urlStr).searchParams;
      const text = searchParams.get('text');
      
      if (text?.toLowerCase().includes('invalid') || text?.toLowerCase().includes('notfound')) {
        return createMockResponse(mockGeoapifyResponses.geocode.notFound);
      }
      return createMockResponse(mockGeoapifyResponses.geocode.success);
    }
    
    // Geoapify places API
    if (urlStr.includes('api.geoapify.com/v2/places')) {
      return createMockResponse(mockGeoapifyResponses.places.success);
    }
    
    // Geoapify place details API
    if (urlStr.includes('api.geoapify.com/v2/place-details')) {
      return createMockResponse(mockGeoapifyResponses.placeDetails.success);
    }
    
    // RapidAPI business data
    if (urlStr.includes('local-business-data.p.rapidapi.com')) {
      return createMockResponse(mockRapidApiResponses.business.success);
    }
    
    // ScraperBee API
    if (urlStr.includes('app.scrapingbee.com')) {
      return createMockResponse(mockScraperBeeResponses.success, { 'content-type': 'text/html' });
    }
    
    // Default fallback
    throw new Error(`Unmocked fetch call to: ${urlStr}`);
  });
}

function createMockResponse(data: any, headers: Record<string, string> = {}) {
  const isText = typeof data === 'string';
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers({
      'content-type': isText ? 'text/html' : 'application/json',
      ...headers
    }),
    json: isText ? undefined : () => Promise.resolve(data),
    text: () => Promise.resolve(isText ? data : JSON.stringify(data)),
  } as Response);
}

/**
 * Mock Firebase Admin SDK
 */
export const mockFirebaseAdmin = {
  auth: () => ({
    verifyIdToken: jest.fn().mockResolvedValue(mockFirebaseResponses.user),
    createSessionCookie: jest.fn().mockResolvedValue('mock-session-cookie'),
    verifySessionCookie: jest.fn().mockResolvedValue(mockFirebaseResponses.user),
  }),
  firestore: () => ({
    collection: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValue({
        docs: [
          {
            id: 'profile-123',
            data: () => mockFirebaseResponses.profile,
          }
        ],
        length: 1
      }),
      doc: jest.fn().mockReturnValue({
        set: jest.fn().mockResolvedValue(undefined),
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => mockFirebaseResponses.profile,
        }),
      }),
    }),
    batch: jest.fn().mockReturnValue({
      set: jest.fn(),
      commit: jest.fn().mockResolvedValue(undefined),
    }),
  }),
};

/**
 * Environment variable mocks for testing
 */
export const mockEnvironmentVariables = {
  GEOAPIFY_API_KEY: 'test-geoapify-key',
  RAPIDAPI_LOCAL_BUSINESS_KEY: 'test-rapidapi-key',
  SCRAPERBEE_API_KEY: 'test-scraperbee-key',
  FIREBASE_PROJECT_ID: 'test-project',
  CREDENTIALS_ENCRYPTION_KEY: 'test-encryption-key-32-characters-long',
  NEXTAUTH_SECRET: 'test-nextauth-secret',
  NEXTAUTH_URL: 'http://localhost:3000',
};

/**
 * Setup function to apply all mocks
 */
export function setupExternalServiceMocks() {
  // Mock global fetch
  global.fetch = createMockFetch();
  
  // Mock environment variables
  Object.entries(mockEnvironmentVariables).forEach(([key, value]) => {
    process.env[key] = value;
  });
  
  // Mock Firebase Admin
  jest.doMock('firebase-admin/auth', () => mockFirebaseAdmin.auth);
  jest.doMock('firebase-admin/firestore', () => mockFirebaseAdmin.firestore);
  
  return {
    fetch: global.fetch,
    firebase: mockFirebaseAdmin,
  };
}

/**
 * Cleanup function to restore original implementations
 */
export function cleanupExternalServiceMocks() {
  jest.restoreAllMocks();
  
  // Clear environment variables
  Object.keys(mockEnvironmentVariables).forEach(key => {
    delete process.env[key];
  });
}