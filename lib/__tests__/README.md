# Testing Framework Documentation

## Overview

This directory contains the comprehensive testing infrastructure for the LeadFlow application, implementing both unit testing and property-based testing as specified in the codebase improvements design.

## Structure

```
lib/__tests__/
├── unit/           # Unit tests for specific components and functions
├── integration/    # Integration tests for API endpoints and workflows
├── properties/     # Property-based tests for correctness properties
└── README.md       # This documentation
```

## Testing Frameworks

### Jest
- **Purpose**: Unit testing and integration testing
- **Configuration**: `jest.config.js` in project root
- **Setup**: `jest.setup.js` for global test configuration

### fast-check
- **Purpose**: Property-based testing
- **Usage**: Validates correctness properties across randomized inputs
- **Minimum iterations**: 100 per property test

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test types
npm run test:unit
npm run test:integration
npm run test:properties

# Watch mode for development
npm run test:watch
```

## Coverage Requirements

- **Minimum threshold**: 80% for branches, functions, lines, and statements
- **Scope**: All business logic in `lib/` and API routes in `app/api/`
- **Exclusions**: Type definitions, node_modules, test files, coverage reports

## Test Organization Guidelines

### Unit Tests (`unit/`)
- Test individual functions, classes, and modules
- Focus on specific examples and edge cases
- Mock external dependencies
- Fast execution (< 100ms per test)

### Integration Tests (`integration/`)
- Test API endpoints end-to-end
- Test component interactions
- Use realistic test data
- May involve actual database operations

### Property-Based Tests (`properties/`)
- Validate universal correctness properties
- Use randomized inputs with fast-check
- Reference design document properties
- Tag format: `Feature: codebase-improvements, Property {number}: {property_text}`

## Writing Tests

### Unit Test Example
```typescript
import { functionToTest } from '../module';

describe('Module Name', () => {
  test('should handle valid input', () => {
    const result = functionToTest('valid-input');
    expect(result).toBe('expected-output');
  });
});
```

### Property-Based Test Example
```typescript
import * as fc from 'fast-check';
import { functionToTest } from '../module';

describe('Property Tests', () => {
  test('Property 1: Round-trip consistency', () => {
    // Feature: codebase-improvements, Property 1: Round-trip consistency
    fc.assert(
      fc.property(fc.string(), (input) => {
        const encoded = encode(input);
        const decoded = decode(encoded);
        return decoded === input;
      }),
      { numRuns: 100 }
    );
  });
});
```

## Mock Guidelines

- Use realistic mocks that behave like actual services
- Avoid over-mocking - test real functionality when possible
- Mock external APIs and services, not internal business logic
- Keep mocks simple and focused

## Best Practices

1. **Test Names**: Use descriptive names that explain what is being tested
2. **Arrange-Act-Assert**: Structure tests clearly
3. **Single Responsibility**: Each test should verify one behavior
4. **Deterministic**: Tests should produce consistent results
5. **Independent**: Tests should not depend on each other
6. **Fast**: Unit tests should run quickly

## Environment Variables

Test environment variables are configured in `jest.setup.js`:
- `NODE_ENV=test`
- `NEXTAUTH_SECRET=test-secret`
- `NEXTAUTH_URL=http://localhost:3000`

## Troubleshooting

### Common Issues

1. **Module resolution errors**: Check `moduleNameMapper` in `jest.config.js`
2. **Timeout errors**: Increase `testTimeout` for slow operations
3. **Coverage issues**: Verify `collectCoverageFrom` patterns
4. **Property test failures**: Check generators and property logic

### Debug Mode

```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- path/to/test.test.ts

# Debug with Node.js inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```