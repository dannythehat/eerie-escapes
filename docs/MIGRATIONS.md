# Database Migration Guide

## Prerequisites

- PostgreSQL 15+ installed and running
- Node.js 20+ installed
- Prisma CLI installed (`npm install -g prisma`)

---

## Initial Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eerie_escapes?schema=public"

# Optional: Connection pooling
DATABASE_POOL_SIZE=10
DATABASE_TIMEOUT=30000

# Optional: Shadow database for migrations (recommended for production)
SHADOW_DATABASE_URL="postgresql://username:password@localhost:5432/eerie_escapes_shadow?schema=public"
```

**Production Example (Railway/Heroku):**
```env
DATABASE_URL="postgresql://user:pass@host.railway.app:5432/railway"
```

---

## Running Migrations

### Development Environment

#### Create Initial Migration
```bash
npx prisma migrate dev --name init
```

This will:
1. Create the migration files
2. Apply the migration to your database
3. Generate Prisma Client
4. Run seed script (if configured)

#### Create Subsequent Migrations
```bash
npx prisma migrate dev --name add_new_feature
```

#### Reset Database (⚠️ Deletes all data)
```bash
npx prisma migrate reset
```

This will:
1. Drop the database
2. Create a new database
3. Apply all migrations
4. Run seed script

---

### Production Environment

#### Apply Pending Migrations
```bash
npx prisma migrate deploy
```

**Important**: Never use `migrate dev` in production!

#### Check Migration Status
```bash
npx prisma migrate status
```

---

## Seeding the Database

### Run Seed Script
```bash
npx prisma db seed
```

### Configure package.json
Add to `backend/package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "prisma db seed",
    "db:reset": "prisma migrate reset",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  }
}
```

---

## Prisma Studio (Database GUI)

Launch Prisma Studio to view and edit data:

```bash
npx prisma studio
```

Access at: http://localhost:5555

---

## Common Migration Scenarios

### 1. Add New Field to Existing Model

**Edit `schema.prisma`:**
```prisma
model Holiday {
  // ... existing fields
  featured Boolean @default(false)  // New field
}
```

**Create and apply migration:**
```bash
npx prisma migrate dev --name add_featured_field
```

---

### 2. Add New Model

**Edit `schema.prisma`:**
```prisma
model Coupon {
  id        String   @id @default(uuid())
  code      String   @unique
  discount  Decimal  @db.Decimal(5, 2)
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  @@map("coupons")
}
```

**Create and apply migration:**
```bash
npx prisma migrate dev --name add_coupon_model
```

---

### 3. Modify Existing Field (Requires Data Migration)

**Example: Change field type**

1. **Create migration:**
```bash
npx prisma migrate dev --name change_price_precision --create-only
```

2. **Edit generated migration file** to handle data:
```sql
-- AlterTable
ALTER TABLE "holidays" ALTER COLUMN "basePrice" TYPE DECIMAL(12,2);

-- Migrate existing data if needed
UPDATE "holidays" SET "basePrice" = "basePrice" * 100 WHERE "basePrice" < 100;
```

3. **Apply migration:**
```bash
npx prisma migrate dev
```

---

### 4. Add Relation Between Models

**Edit `schema.prisma`:**
```prisma
model Holiday {
  // ... existing fields
  categoryId String?
  category   Category? @relation(fields: [categoryId], references: [id])
}

model Category {
  id       String    @id @default(uuid())
  name     String
  holidays Holiday[]
  
  @@map("categories")
}
```

**Create and apply migration:**
```bash
npx prisma migrate dev --name add_category_relation
```

---

## Troubleshooting

### Migration Failed

**Check migration status:**
```bash
npx prisma migrate status
```

**Mark migration as applied (if manually fixed):**
```bash
npx prisma migrate resolve --applied <migration_name>
```

**Mark migration as rolled back:**
```bash
npx prisma migrate resolve --rolled-back <migration_name>
```

---

### Database Out of Sync

**Push schema without creating migration (dev only):**
```bash
npx prisma db push
```

**Warning**: This skips migration history!

---

### Connection Issues

**Test database connection:**
```bash
npx prisma db pull
```

**Common issues:**
- Wrong credentials in `DATABASE_URL`
- PostgreSQL not running
- Firewall blocking connection
- SSL required (add `?sslmode=require` to connection string)

---

### Prisma Client Not Generated

**Regenerate Prisma Client:**
```bash
npx prisma generate
```

---

## Migration Best Practices

### 1. Always Review Generated Migrations
```bash
# Create migration without applying
npx prisma migrate dev --create-only --name my_migration

# Review the SQL in prisma/migrations/
# Then apply:
npx prisma migrate dev
```

### 2. Test Migrations on Staging First
```bash
# On staging environment
DATABASE_URL="staging_url" npx prisma migrate deploy
```

### 3. Backup Before Major Migrations
```bash
# PostgreSQL backup
pg_dump -U username -d eerie_escapes > backup_$(date +%Y%m%d).sql

# Restore if needed
psql -U username -d eerie_escapes < backup_20251105.sql
```

### 4. Use Transactions for Data Migrations
```sql
BEGIN;
  -- Your migration SQL
  UPDATE users SET role = 'USER' WHERE role IS NULL;
COMMIT;
```

### 5. Never Edit Applied Migrations
Once a migration is applied, never edit it. Create a new migration instead.

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Database Migration

on:
  push:
    branches: [main]

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: cd backend && npm ci
      
      - name: Run migrations
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: cd backend && npx prisma migrate deploy
```

---

## Rollback Strategy

Prisma doesn't support automatic rollbacks. Manual process:

### 1. Identify Last Good Migration
```bash
npx prisma migrate status
```

### 2. Create Rollback Migration
```bash
npx prisma migrate dev --name rollback_feature_x --create-only
```

### 3. Write Reverse SQL
Edit the migration file with SQL to undo changes:
```sql
-- Reverse of: ALTER TABLE "holidays" ADD COLUMN "featured" BOOLEAN DEFAULT false;
ALTER TABLE "holidays" DROP COLUMN "featured";
```

### 4. Apply Rollback
```bash
npx prisma migrate dev
```

---

## Performance Optimization

### Add Indexes
```prisma
model Holiday {
  // ... fields
  
  @@index([theme, country])  // Composite index
  @@index([createdAt(sort: Desc)])  // Sorted index
}
```

### Analyze Query Performance
```sql
EXPLAIN ANALYZE SELECT * FROM holidays WHERE theme = 'HAUNTED_TOURS';
```

---

## Monitoring

### Check Database Size
```sql
SELECT pg_size_pretty(pg_database_size('eerie_escapes'));
```

### Check Table Sizes
```sql
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Active Connections
```sql
SELECT count(*) FROM pg_stat_activity WHERE datname = 'eerie_escapes';
```

---

## Resources

- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

---

**Last Updated**: November 5, 2025
