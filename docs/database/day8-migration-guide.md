# Day 8 Database Migration Guide

## Overview
This migration adds the SearchAnalytics model and optimizes database indexes for better search and filter performance.

## Changes

### New Model: SearchAnalytics
Tracks all search queries for analytics and insights.

**Fields:**
- `id`: UUID primary key
- `userId`: Optional user ID (for authenticated searches)
- `searchTerm`: The search query string
- `filters`: JSON string of applied filters
- `resultsCount`: Number of results returned
- `createdAt`: Timestamp

**Indexes:**
- `searchTerm`: For fast term lookups
- `createdAt`: For time-based analytics

### Updated Model: Holiday
Added performance indexes for common query patterns.

**New Indexes:**
- `basePrice`: Price filtering and sorting
- `averageRating`: Rating filtering and sorting
- `bookingCount`: Popularity sorting
- `durationDays`: Duration filtering and sorting

### Updated Model: Partner
Added missing fields for controller compatibility.

**New Fields:**
- `verified`: Boolean flag for verification status
- `rating`: Float for partner rating

## Migration Steps

### 1. Generate Migration

```bash
cd backend
npx prisma migrate dev --name add_search_analytics_and_indexes
```

### 2. Review Migration SQL

The migration will create:
- New `search_analytics` table
- New indexes on `holidays` table
- New columns on `partners` table

### 3. Apply Migration

```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Verify Migration

```bash
# Check migration status
npx prisma migrate status

# Verify tables exist
npx prisma studio
```

## SQL Migration (Manual)

If you need to apply the migration manually:

```sql
-- Create SearchAnalytics table
CREATE TABLE "search_analytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "searchTerm" TEXT NOT NULL,
    "filters" TEXT,
    "resultsCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_analytics_pkey" PRIMARY KEY ("id")
);

-- Create indexes for SearchAnalytics
CREATE INDEX "search_analytics_searchTerm_idx" ON "search_analytics"("searchTerm");
CREATE INDEX "search_analytics_createdAt_idx" ON "search_analytics"("createdAt");

-- Add indexes to holidays table
CREATE INDEX "holidays_basePrice_idx" ON "holidays"("basePrice");
CREATE INDEX "holidays_averageRating_idx" ON "holidays"("averageRating");
CREATE INDEX "holidays_bookingCount_idx" ON "holidays"("bookingCount");
CREATE INDEX "holidays_durationDays_idx" ON "holidays"("durationDays");

-- Add columns to partners table
ALTER TABLE "partners" ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "partners" ADD COLUMN "rating" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- Update existing partners
UPDATE "partners" SET "verified" = true WHERE "status" = 'APPROVED';
```

## Rollback

If you need to rollback the migration:

```bash
# Rollback last migration
npx prisma migrate resolve --rolled-back <migration_name>
```

Manual rollback SQL:

```sql
-- Drop SearchAnalytics table
DROP TABLE IF EXISTS "search_analytics";

-- Drop new indexes from holidays
DROP INDEX IF EXISTS "holidays_basePrice_idx";
DROP INDEX IF EXISTS "holidays_averageRating_idx";
DROP INDEX IF EXISTS "holidays_bookingCount_idx";
DROP INDEX IF EXISTS "holidays_durationDays_idx";

-- Remove columns from partners
ALTER TABLE "partners" DROP COLUMN IF EXISTS "verified";
ALTER TABLE "partners" DROP COLUMN IF EXISTS "rating";
```

## Testing

### 1. Test SearchAnalytics Creation

```typescript
// Test search analytics tracking
const analytics = await prisma.searchAnalytics.create({
  data: {
    searchTerm: 'haunted tours',
    filters: JSON.stringify({ country: 'USA' }),
    resultsCount: 15,
    userId: 'user-id-here',
  },
});

console.log('Analytics created:', analytics);
```

### 2. Test Index Performance

```typescript
// Test price range query (should use basePrice index)
const holidays = await prisma.holiday.findMany({
  where: {
    basePrice: {
      gte: 500,
      lte: 2000,
    },
  },
  orderBy: {
    basePrice: 'asc',
  },
});

console.log('Found holidays:', holidays.length);
```

### 3. Test Popular Searches

```typescript
// Test groupBy query for popular searches
const popular = await prisma.searchAnalytics.groupBy({
  by: ['searchTerm'],
  _count: {
    searchTerm: true,
  },
  orderBy: {
    _count: {
      searchTerm: 'desc',
    },
  },
  take: 10,
});

console.log('Popular searches:', popular);
```

## Performance Impact

### Expected Improvements

**Before Indexes:**
- Price range query: ~500ms
- Rating sort: ~400ms
- Duration filter: ~350ms

**After Indexes:**
- Price range query: ~50ms (10x faster)
- Rating sort: ~40ms (10x faster)
- Duration filter: ~35ms (10x faster)

### Index Size

Approximate additional storage per index:
- `basePrice`: ~2-5 MB per 10,000 records
- `averageRating`: ~2-5 MB per 10,000 records
- `bookingCount`: ~2-5 MB per 10,000 records
- `durationDays`: ~2-5 MB per 10,000 records

Total: ~8-20 MB per 10,000 records

## Monitoring

### Check Index Usage

```sql
-- PostgreSQL: Check index usage
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE tablename = 'holidays'
ORDER BY idx_scan DESC;
```

### Analyze Query Performance

```sql
-- Explain query plan
EXPLAIN ANALYZE
SELECT * FROM holidays
WHERE "basePrice" >= 500 AND "basePrice" <= 2000
ORDER BY "basePrice" ASC
LIMIT 10;
```

## Troubleshooting

### Issue: Migration Fails

**Solution:**
1. Check database connection
2. Verify user has CREATE TABLE permissions
3. Check for conflicting table names
4. Review migration logs

### Issue: Indexes Not Used

**Solution:**
1. Run `ANALYZE holidays;` to update statistics
2. Check query plan with EXPLAIN
3. Ensure WHERE clauses match index columns
4. Consider index selectivity

### Issue: Slow Queries After Migration

**Solution:**
1. Rebuild indexes: `REINDEX TABLE holidays;`
2. Update table statistics: `ANALYZE holidays;`
3. Check for table bloat
4. Consider VACUUM FULL

## Best Practices

1. **Always backup** before running migrations
2. **Test in development** before production
3. **Monitor performance** after deployment
4. **Keep migrations small** and focused
5. **Document changes** thoroughly
6. **Use transactions** for complex migrations
7. **Plan rollback strategy** before deploying

## Next Steps

After successful migration:

1. ✅ Update application code to use new features
2. ✅ Test all search and filter endpoints
3. ✅ Monitor query performance
4. ✅ Set up analytics dashboard
5. ✅ Configure caching for popular queries
6. ✅ Document API changes for frontend team

## Support

If you encounter issues:
1. Check Prisma documentation: https://www.prisma.io/docs
2. Review migration logs
3. Test queries in Prisma Studio
4. Contact database administrator
