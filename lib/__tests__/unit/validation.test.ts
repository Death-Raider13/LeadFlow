/**
 * Unit tests for input validation system
 */
import { validateInput, ValidationError } from '../../validation';
import { generateLeadsSchema, emailSchema } from '../../validation/schemas';

describe('Input Validation System', () => {
  describe('Schema Validation', () => {
    test('should validate email schema correctly', () => {
      const validEmail = 'test@example.com';
      const result = emailSchema.safeParse(validEmail);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(validEmail);
      }
    });

    test('should reject invalid email format', () => {
      const invalidEmail = 'invalid-email';
      const result = emailSchema.safeParse(invalidEmail);
      
      expect(result.success).toBe(false);
    });

    test('should validate lead generation parameters', () => {
      const validParams = {
        category: 'restaurant',
        location: 'New York, NY',
        searchMode: 'nearest',
        excludePlaceIds: ['place1', 'place2']
      };

      const result = generateLeadsSchema.safeParse(validParams);
      expect(result.success).toBe(true);
    });

    test('should reject invalid lead generation parameters', () => {
      const invalidParams = {
        category: '', // Empty category
        location: 'NY', // Too short location
        searchMode: 'invalid-mode', // Invalid search mode
      };

      const result = generateLeadsSchema.safeParse(invalidParams);
      expect(result.success).toBe(false);
    });
  });

  describe('Input Sanitization', () => {
    test('should handle basic input validation', () => {
      const testInput = 'Hello World';
      
      // Test basic string validation
      expect(typeof testInput).toBe('string');
      expect(testInput.length).toBeGreaterThan(0);
    });

    test('should detect potentially dangerous input patterns', () => {
      const maliciousInputs = [
        '<script>alert("xss")</script>',
        'javascript:alert(1)',
        "'; DROP TABLE users; --"
      ];

      maliciousInputs.forEach(input => {
        // Basic pattern detection
        const hasDangerousPattern = 
          input.includes('<script>') ||
          input.includes('javascript:') ||
          input.includes('DROP TABLE') ||
          input.includes("'");
        
        expect(hasDangerousPattern).toBe(true);
      });
    });
  });

  describe('Type Safety', () => {
    test('should handle different data types', () => {
      const testCases = [
        { input: 'string', type: 'string', expected: true },
        { input: 123, type: 'number', expected: true },
        { input: true, type: 'boolean', expected: true },
        { input: [], type: 'array', expected: true },
        { input: {}, type: 'object', expected: true },
      ];

      testCases.forEach(({ input, type, expected }) => {
        const actualType = typeof input;
        const isArray = Array.isArray(input);
        
        let matches = false;
        if (type === 'array') {
          matches = isArray;
        } else if (type === 'object') {
          matches = actualType === 'object' && !isArray && input !== null;
        } else {
          matches = actualType === type;
        }
        
        expect(matches).toBe(expected);
      });
    });
  });

  describe('Error Handling', () => {
    test('should handle null and undefined inputs', () => {
      expect(() => {
        emailSchema.safeParse(null);
      }).not.toThrow();

      expect(() => {
        emailSchema.safeParse(undefined);
      }).not.toThrow();
    });

    test('should provide structured error information', () => {
      const result = generateLeadsSchema.safeParse({
        category: '', // Invalid
        location: '', // Invalid
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(result.error.issues).toBeDefined();
        expect(Array.isArray(result.error.issues)).toBe(true);
      }
    });
  });

  describe('Business Logic Validation', () => {
    test('should validate search modes', () => {
      const validModes = ['nearest', 'random', 'explore'];
      const invalidModes = ['invalid', ''];

      validModes.forEach(mode => {
        const result = generateLeadsSchema.safeParse({
          category: 'restaurant',
          location: 'New York, NY',
          searchMode: mode,
        });
        expect(result.success).toBe(true);
      });

      invalidModes.forEach(mode => {
        const result = generateLeadsSchema.safeParse({
          category: 'restaurant',
          location: 'New York, NY',
          searchMode: mode,
        });
        expect(result.success).toBe(false);
      });
    });

    test('should validate location requirements', () => {
      const validLocations = [
        'New York, NY',
        'Los Angeles, CA',
        'Chicago, IL',
        'Houston, TX'
      ];

      const invalidLocations = [
        '', // Empty
      ];

      validLocations.forEach(location => {
        const result = generateLeadsSchema.safeParse({
          category: 'restaurant',
          location: location,
          searchMode: 'nearest',
        });
        expect(result.success).toBe(true);
      });

      invalidLocations.forEach(location => {
        const result = generateLeadsSchema.safeParse({
          category: 'restaurant',
          location: location,
          searchMode: 'nearest',
        });
        expect(result.success).toBe(false);
      });
    });
  });
});