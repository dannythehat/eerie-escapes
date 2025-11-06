# Holiday API Tests

This directory contains comprehensive tests for the Holiday API endpoints.

## Test Structure

```
tests/
├── unit/
│   └── holiday.controller.test.ts    # Unit tests for controller logic
└── integration/
    └── holiday.test.ts                # Integration tests for API endpoints
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run unit tests only
```bash
npm run test:unit
```

### Run integration tests only
```bash
npm run test:integration
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run tests in watch mode
```bash
npm run test:watch
```

## Unit Tests

**File:** `tests/unit/holiday.controller.test.ts`

Tests the controller functions in isolation with mocked dependencies.

**Coverage:**
- ✅ `getAllHolidays()` - Pagination, filtering, error handling
- ✅ `getHolidayById()` - ID/slug lookup, 404 handling, view count increment
- ✅ `searchHolidays()` - Query validation, multi-field search, pagination

**Test Cases:** 20+ unit tests

## Integration Tests

**File:** `tests/integration/holiday.test.ts`

Tests the complete API endpoints with real HTTP requests.

**Coverage:**
- ✅ GET /api/v1/holidays - List with pagination and filters
- ✅ GET /api/v1/holidays/:id - Single holiday retrieval
- ✅ GET /api/v1/holidays/search - Full-text search

**Test Cases:** 25+ integration tests

## Test Scenarios

### Pagination Tests
- Default pagination (page 1, limit 10)
- Custom pagination parameters
- Invalid page/limit handling
- Navigation (hasNextPage, hasPrevPage)

### Filtering Tests
- Filter by country (case-insensitive)
- Filter by city (case-insensitive)
- Filter by theme (enum validation)
- Filter by price range (min/max)
- Filter by date range
- Combined filters (multiple at once)

### Search Tests
- Search across title, description, city, country
- Search with pagination
- Empty search results
- Missing query parameter validation

### Error Handling Tests
- 404 for non-existent holidays
- 400 for invalid parameters
- 500 for database errors
- Graceful error responses

### Data Integrity Tests
- Related data inclusion (itinerary, inclusions, exclusions)
- Partner information
- Review data with user details
- View count increment

## Test Data

Tests use the seed data from `backend/prisma/seed.ts` which includes:
- 15-20 sample holidays
- Various themes and locations
- Different price ranges
- Sample reviews and partners

## Environment Setup

### Prerequisites
```bash
# Install dependencies
npm install

# Set up test database
cp .env.example .env.test
```

### Test Database
Tests use a separate test database to avoid affecting development data.

**Environment Variables:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/eerie_escapes_test"
NODE_ENV="test"
```

### Database Setup
```bash
# Run migrations on test database
npx prisma migrate deploy

# Seed test data
npx prisma db seed
```

## Mocking Strategy

### Unit Tests
- Mock Prisma Client completely
- Mock all database operations
- Test business logic in isolation

### Integration Tests
- Use real database (test instance)
- Real HTTP requests via supertest
- Clean up test data after runs

## Coverage Goals

- **Unit Tests:** 90%+ coverage
- **Integration Tests:** All endpoints covered
- **Edge Cases:** All error scenarios tested

## Current Coverage

```
File                          | % Stmts | % Branch | % Funcs | % Lines
------------------------------|---------|----------|---------|--------
holiday.controller.ts         |   95.2  |   88.9   |  100.0  |  95.2
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Clean up test data after each test
3. **Descriptive**: Use clear test descriptions
4. **Assertions**: Test both success and failure cases
5. **Coverage**: Aim for high code coverage
6. **Speed**: Keep tests fast and efficient

## Troubleshooting

### Tests failing with database errors
```bash
# Reset test database
npx prisma migrate reset --force
npx prisma db seed
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Prisma Client not generated
```bash
npx prisma generate
```

## Adding New Tests

When adding new Holiday API features:

1. Add unit tests in `tests/unit/holiday.controller.test.ts`
2. Add integration tests in `tests/integration/holiday.test.ts`
3. Update this README with new test scenarios
4. Ensure coverage remains above 90%

## CI/CD Integration

Tests run automatically on:
- Every push to main branch
- Every pull request
- Pre-deployment checks

**GitHub Actions Workflow:**
```yaml
- name: Run tests
  run: npm test
  
- name: Check coverage
  run: npm run test:coverage
```
