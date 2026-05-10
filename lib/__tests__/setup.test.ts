/**
 * Basic setup test to verify Jest and fast-check are working correctly
 */
import * as fc from 'fast-check';

describe('Testing Framework Setup', () => {
  test('Jest is working correctly', () => {
    expect(1 + 1).toBe(2);
  });

  test('fast-check is working correctly', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return n + 0 === n;
      })
    );
  });

  test('TypeScript compilation is working', () => {
    const testObject: { name: string; value: number } = {
      name: 'test',
      value: 42,
    };
    
    expect(testObject.name).toBe('test');
    expect(testObject.value).toBe(42);
  });

  test('Environment variables are set correctly', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.NEXTAUTH_SECRET).toBe('test-secret');
  });
});