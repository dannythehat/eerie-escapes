import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Theme mapping from JSON to Prisma enum
const themeMapping: Record<string, string> = {
  'HISTORICAL_HORROR': 'DARK_HISTORY',
  'PARANORMAL': 'PARANORMAL',
  'VAMPIRE': 'DARK_HISTORY',
  'CULTURAL_HORROR': 'CULTURAL',
  'TRUE_CRIME': 'DARK_HISTORY',
  'UNDERGROUND': 'DARK_HISTORY',
  'FESTIVAL': 'FESTIVAL',
  'EXTREME': 'EXTREME',
};

// Difficulty mapping
const difficultyMapping: Record<string, string> = {
  'EASY': 'EASY',
  'MODERATE': 'MODERATE',
  'CHALLENGING': 'CHALLENGING',
};

async function importHolidays() {
  console.log('🎃 Starting holiday import for Day 18...\n');

  // Get partner ID (assuming first partner exists from seed)
  const partner = await prisma.partner.findFirst();
  if (!partner) {
    console.error('❌ No partner found. Please run seed.ts first.');
    return;
  }

  // Load all JSON files
  const jsonFiles = [
    'horror-holidays-day17.json',
    'horror-holidays-day17-part2.json',
    'horror-holidays-day17-part3.json',
  ];

  let totalImported = 0;
  let totalSkipped = 0;

  for (const jsonFile of jsonFiles) {
    const filePath = path.join(__dirname, jsonFile);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${jsonFile}`);
      continue;
    }

    console.log(`📄 Processing ${jsonFile}...`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    for (const holiday of data.holidays) {
      try {
        // Check if holiday already exists
        const existing = await prisma.holiday.findUnique({
          where: { slug: holiday.slug },
        });

        if (existing) {
          console.log(`  ⏭️  Skipped: ${holiday.name} (already exists)`);
          totalSkipped++;
          continue;
        }

        // Create the holiday
        const createdHoliday = await prisma.holiday.create({
          data: {
            slug: holiday.slug,
            title: holiday.name,
            subtitle: holiday.description,
            description: holiday.longDescription || holiday.description,
            shortDescription: holiday.description,
            theme: themeMapping[holiday.theme] || 'DARK_HISTORY',
            difficulty: difficultyMapping[holiday.difficulty] || 'MODERATE',
            status: 'PUBLISHED',
            country: holiday.country,
            city: holiday.location.split(',')[0].trim(),
            region: holiday.location.split(',')[1]?.trim() || '',
            latitude: 0, // Would need geocoding API
            longitude: 0,
            basePrice: holiday.price,
            currency: holiday.currency,
            installmentAvailable: true,
            durationDays: holiday.duration,
            durationNights: holiday.duration - 1,
            minParticipants: 1,
            maxParticipants: holiday.maxGroupSize,
            isYearRound: !holiday.bestTimeToVisit?.includes('October'),
            coverImage: holiday.images[0],
            images: holiday.images,
            metaTitle: `${holiday.name} | Eerie Escapes`,
            metaDescription: holiday.description,
            keywords: holiday.tags || [],
            partnerId: partner.id,
            publishedAt: new Date(),
          },
        });

        // Create inclusions
        if (holiday.inclusions) {
          for (const [index, inclusion] of holiday.inclusions.entries()) {
            await prisma.inclusion.create({
              data: {
                holidayId: createdHoliday.id,
                description: inclusion,
                order: index,
              },
            });
          }
        }

        // Create exclusions
        if (holiday.exclusions) {
          for (const [index, exclusion] of holiday.exclusions.entries()) {
            await prisma.exclusion.create({
              data: {
                holidayId: createdHoliday.id,
                description: exclusion,
                order: index,
              },
            });
          }
        }

        // Create itinerary
        if (holiday.itinerary) {
          for (const day of holiday.itinerary) {
            await prisma.itinerary.create({
              data: {
                holidayId: createdHoliday.id,
                day: day.day,
                title: day.title,
                description: day.description,
                activities: day.activities || [],
              },
            });
          }
        }

        console.log(`  ✅ Imported: ${holiday.name}`);
        totalImported++;
      } catch (error) {
        console.error(`  ❌ Error importing ${holiday.name}:`, error);
      }
    }
  }

  console.log(`\n🎉 Import complete!`);
  console.log(`   ✅ Imported: ${totalImported} holidays`);
  console.log(`   ⏭️  Skipped: ${totalSkipped} holidays (already exist)`);
}

importHolidays()
  .catch((e) => {
    console.error('❌ Import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
