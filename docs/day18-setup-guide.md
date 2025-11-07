# Day 18 Setup Guide

## 🎯 Objective
Enter all 20 curated holidays from Day 17 into the database and verify everything works correctly.

## 📋 Prerequisites
- Backend environment set up
- Database connection configured
- Day 17 JSON files present in `backend/prisma/`

## 🚀 Step-by-Step Instructions

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Generate Prisma Client
```bash
npm run db:generate
```

### Step 4: Run Database Migrations
```bash
npm run db:migrate
```

### Step 5: Seed Initial Data (Admin, Users, Partner)
```bash
npm run db:seed
```

### Step 6: Import All 20 Holidays
```bash
npm run db:import
```

Expected output:
```
🎃 Starting holiday import for Day 18...

📄 Processing horror-holidays-day17.json...
  ✅ Imported: Salem Witch Trials Experience
  ✅ Imported: Edinburgh Ghost Tour & Underground Vaults
  ✅ Imported: Dracula's Castle Halloween
  ✅ Imported: Day of the Dead Festival

📄 Processing horror-holidays-day17-part2.json...
  ✅ Imported: Jack the Ripper Walking Tour
  ✅ Imported: Paris Catacombs Night Tour
  ...

📄 Processing horror-holidays-day17-part3.json...
  ✅ Imported: Waverly Hills Sanatorium
  ✅ Imported: Eastern State Penitentiary
  ...

🎉 Import complete!
   ✅ Imported: 20 holidays
   ⏭️  Skipped: 0 holidays (already exist)
```

### Step 7: Verify Import in Prisma Studio
```bash
npm run db:studio
```

This opens a browser interface where you can:
- View all 20 holidays
- Check inclusions, exclusions, and itineraries
- Verify images and data

### Step 8: Start Backend Server
```bash
npm run dev
```

### Step 9: Test API Endpoints

#### Get All Holidays
```bash
curl http://localhost:5000/api/holidays
```

#### Get Single Holiday
```bash
curl http://localhost:5000/api/holidays/salem-witch-trials-experience
```

#### Search Holidays
```bash
curl "http://localhost:5000/api/holidays?search=salem"
```

#### Filter by Theme
```bash
curl "http://localhost:5000/api/holidays?theme=DARK_HISTORY"
```

### Step 10: Start Frontend and Test UI
```bash
cd ../frontend
npm run dev
```

Visit: http://localhost:3000

## 🧪 Testing Checklist

Use the comprehensive testing checklist:
```bash
cat docs/day18-testing-checklist.md
```

## 🐛 Troubleshooting

### Import Script Fails
**Error**: `Cannot find module '@prisma/client'`
**Solution**: Run `npm run db:generate`

### Database Connection Error
**Error**: `Can't reach database server`
**Solution**: Check `.env` file has correct `DATABASE_URL`

### Holidays Already Exist
**Error**: `Unique constraint failed on the fields: (slug)`
**Solution**: Holidays already imported. To re-import, run:
```bash
npm run db:reset
npm run db:seed
npm run db:import
```

### Missing JSON Files
**Error**: `File not found: horror-holidays-day17.json`
**Solution**: Ensure you're in the `backend` directory and JSON files exist in `prisma/`

## 📊 Verification Queries

### Count Total Holidays
```sql
SELECT COUNT(*) as total FROM Holiday;
-- Expected: 20
```

### Check All Have Images
```sql
SELECT title FROM Holiday WHERE coverImage IS NULL OR coverImage = '';
-- Expected: 0 rows
```

### Verify Inclusions
```sql
SELECT h.title, COUNT(i.id) as inclusions 
FROM Holiday h 
LEFT JOIN Inclusion i ON h.id = i.holidayId 
GROUP BY h.id 
HAVING inclusions = 0;
-- Expected: 0 rows (all should have inclusions)
```

### Verify Itineraries
```sql
SELECT h.title, COUNT(it.id) as days 
FROM Holiday h 
LEFT JOIN Itinerary it ON h.id = it.holidayId 
GROUP BY h.id 
HAVING days = 0;
-- Expected: 0 rows (all should have itineraries)
```

## ✅ Success Criteria

- [ ] All 20 holidays imported without errors
- [ ] Each holiday has inclusions, exclusions, and itinerary
- [ ] All images load correctly
- [ ] API endpoints return correct data
- [ ] Frontend displays all holidays
- [ ] Search and filter work correctly
- [ ] No console errors

## 📝 Next Steps

After completing Day 18:
1. Mark tasks as complete in README
2. Commit all changes
3. Move to Day 19: SEO & Performance Optimization

## 🆘 Need Help?

If you encounter issues:
1. Check the error message carefully
2. Verify database connection
3. Ensure all dependencies installed
4. Check Prisma schema matches JSON structure
5. Review import script logs

## 📚 Related Files

- Import Script: `backend/prisma/import-holidays.ts`
- JSON Data: `backend/prisma/horror-holidays-day17*.json`
- Testing Checklist: `docs/day18-testing-checklist.md`
- Database Schema: `backend/prisma/schema.prisma`
