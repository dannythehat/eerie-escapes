import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (in development only!)
  await prisma.pageView.deleteMany();
  await prisma.searchLog.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.newsletter.deleteMany();
  await prisma.savedHoliday.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.exclusion.deleteMany();
  await prisma.inclusion.deleteMany();
  await prisma.itinerary.deleteMany();
  await prisma.holiday.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Admin User
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@eerieescapes.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      displayName: 'Admin',
      role: 'ADMIN',
      emailVerified: new Date(),
      isActive: true,
    },
  });
  console.log('✅ Created admin user');

  // Create Test Users
  const userPassword = await bcrypt.hash('User123!', 12);
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        password: userPassword,
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        role: 'USER',
        emailVerified: new Date(),
        newsletter: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        password: userPassword,
        firstName: 'Jane',
        lastName: 'Smith',
        displayName: 'Jane Smith',
        role: 'USER',
        emailVerified: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike.horror@example.com',
        password: userPassword,
        firstName: 'Mike',
        lastName: 'Horror',
        displayName: 'Mike Horror',
        role: 'USER',
        emailVerified: new Date(),
        newsletter: true,
      },
    }),
  ]);
  console.log('✅ Created test users');

  // Create Partner User & Partner
  const partnerUser = await prisma.user.create({
    data: {
      email: 'partner@hauntedtours.com',
      password: userPassword,
      firstName: 'Sarah',
      lastName: 'Haunter',
      displayName: 'Sarah Haunter',
      role: 'PARTNER',
      emailVerified: new Date(),
    },
  });

  const partner = await prisma.partner.create({
    data: {
      userId: partnerUser.id,
      companyName: 'Haunted Tours International',
      description: 'Leading provider of authentic haunted experiences worldwide',
      businessEmail: 'info@hauntedtours.com',
      businessPhone: '+1-555-HAUNT',
      country: 'United States',
      city: 'Salem',
      address: '123 Witch Way',
      postalCode: '01970',
      status: 'APPROVED',
      verifiedAt: new Date(),
      commissionRate: 15.0,
    },
  });
  console.log('✅ Created partner');

  // Create Holidays
  const holidays = [
    {
      slug: 'salem-witch-trials-experience',
      title: 'Salem Witch Trials: Dark History Experience',
      subtitle: 'Walk in the footsteps of the accused',
      description: `Immerse yourself in one of America's darkest chapters with our comprehensive Salem Witch Trials experience. This 3-day journey takes you through the haunted streets of Salem, Massachusetts, where you'll explore authentic trial locations, visit the homes of the accused, and participate in historically accurate reenactments.

Our expert historians will guide you through the paranormal hotspots, sharing chilling tales of the 1692 witch hysteria that gripped this colonial town. You'll visit the Salem Witch Museum, explore the Old Burying Point Cemetery, and stand in the very courtroom where innocent lives were condemned.

This isn't just a tour—it's a time machine to 1692. Experience séances, participate in period-accurate witch trial reenactments, and spend a night in a reportedly haunted colonial inn. Perfect for history buffs and paranormal enthusiasts alike.`,
      shortDescription: 'Experience the dark history of the 1692 Salem Witch Trials with authentic locations, reenactments, and paranormal investigations.',
      theme: 'DARK_HISTORY',
      difficulty: 'MODERATE',
      status: 'PUBLISHED',
      country: 'United States',
      city: 'Salem',
      region: 'Massachusetts',
      latitude: 42.5195,
      longitude: -70.8967,
      basePrice: 899.99,
      currency: 'USD',
      installmentAvailable: true,
      durationDays: 3,
      durationNights: 2,
      minParticipants: 1,
      maxParticipants: 15,
      isYearRound: true,
      coverImage: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c',
      images: [
        'https://images.unsplash.com/photo-1509248961158-e54f6934749c',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
        'https://images.unsplash.com/photo-1571847490852-7b1f08b1e702',
      ],
      metaTitle: 'Salem Witch Trials Experience | Eerie Escapes',
      metaDescription: 'Explore the dark history of the 1692 Salem Witch Trials with authentic tours, reenactments, and paranormal investigations.',
      keywords: ['salem', 'witch trials', 'haunted', 'dark history', 'paranormal'],
      partnerId: partner.id,
      publishedAt: new Date(),
    },
    {
      slug: 'edinburgh-underground-vaults',
      title: 'Edinburgh Underground Vaults: Paranormal Investigation',
      subtitle: 'Explore Scotland\'s most haunted underground chambers',
      description: `Descend into the depths of Edinburgh's Old Town and explore the legendary Underground Vaults—a labyrinth of chambers sealed for centuries and rumored to be among the most haunted locations in the world.

Built in the 1780s beneath the South Bridge, these vaults were once home to taverns, cobblers, and the city's poorest residents. But darker activities also took place here—from illegal distilleries to body snatching operations that supplied Edinburgh's medical schools.

Your 2-night paranormal investigation includes exclusive after-hours access to the most active areas. Armed with EMF detectors, spirit boxes, and thermal cameras, you'll conduct your own investigations under the guidance of experienced paranormal researchers. Previous visitors have reported shadow figures, disembodied voices, and unexplained cold spots.

This experience is not for the faint of heart. The vaults are claustrophobic, pitch black, and genuinely unsettling. But for true paranormal enthusiasts, it's an unmissable opportunity to investigate one of the world's most documented haunted locations.`,
      shortDescription: 'Conduct paranormal investigations in Edinburgh\'s legendary Underground Vaults with professional equipment and expert guidance.',
      theme: 'PARANORMAL',
      difficulty: 'CHALLENGING',
      status: 'PUBLISHED',
      country: 'United Kingdom',
      city: 'Edinburgh',
      region: 'Scotland',
      latitude: 55.9533,
      longitude: -3.1883,
      basePrice: 749.99,
      currency: 'USD',
      discountPrice: 649.99,
      installmentAvailable: true,
      durationDays: 2,
      durationNights: 1,
      minParticipants: 4,
      maxParticipants: 12,
      isYearRound: false,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-10-31'),
      coverImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
      images: [
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
        'https://images.unsplash.com/photo-1486299267070-83823f5448dd',
      ],
      metaTitle: 'Edinburgh Underground Vaults Paranormal Investigation | Eerie Escapes',
      metaDescription: 'Investigate Scotland\'s most haunted underground chambers with professional paranormal equipment.',
      keywords: ['edinburgh', 'vaults', 'paranormal', 'investigation', 'haunted', 'scotland'],
      partnerId: partner.id,
      publishedAt: new Date(),
    },
    {
      slug: 'transylvania-dracula-castle-tour',
      title: 'Transylvania: In the Footsteps of Dracula',
      subtitle: 'Explore the real locations behind the vampire legend',
      description: `Journey to the heart of Transylvania and discover the truth behind the Dracula legend. This 5-day expedition takes you through the misty Carpathian Mountains to explore Bran Castle (Dracula's Castle), the medieval citadel of Sighișoara (Vlad the Impaler's birthplace), and the haunted forests that inspired Bram Stoker's masterpiece.

Your adventure includes overnight stays in authentic Transylvanian castles, where you'll dine on traditional Romanian cuisine and hear local vampire folklore from village elders. Visit the Snagov Monastery, rumored to be Vlad the Impaler's final resting place, and explore the Hoia Baciu Forest—known as the "Bermuda Triangle of Romania" for its paranormal activity.

This isn't a theme park experience—it's an authentic journey through one of Europe's most mysterious regions. You'll meet locals who still practice ancient traditions to ward off evil spirits, explore medieval torture chambers, and spend a night in a castle where Vlad Dracula himself once slept.

Perfect for vampire enthusiasts, history lovers, and anyone seeking an authentic Gothic experience in the land where the Dracula legend was born.`,
      shortDescription: 'Explore authentic Dracula locations in Transylvania including Bran Castle, medieval citadels, and haunted forests.',
      theme: 'DARK_HISTORY',
      difficulty: 'MODERATE',
      status: 'PUBLISHED',
      country: 'Romania',
      city: 'Brașov',
      region: 'Transylvania',
      latitude: 45.6427,
      longitude: 25.5887,
      basePrice: 1499.99,
      currency: 'USD',
      installmentAvailable: true,
      durationDays: 5,
      durationNights: 4,
      minParticipants: 2,
      maxParticipants: 20,
      isYearRound: true,
      coverImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      images: [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
        'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22',
      ],
      metaTitle: 'Transylvania Dracula Castle Tour | Eerie Escapes',
      metaDescription: 'Explore the real locations behind the Dracula legend in Transylvania, Romania.',
      keywords: ['transylvania', 'dracula', 'vampire', 'bran castle', 'romania', 'vlad'],
      partnerId: partner.id,
      publishedAt: new Date(),
    },
    {
      slug: 'paris-catacombs-midnight-tour',
      title: 'Paris Catacombs: Midnight in the Empire of Death',
      subtitle: 'Exclusive after-hours access to the world\'s largest ossuary',
      description: `Descend into the Empire of Death for an exclusive midnight tour of the Paris Catacombs—the world's largest underground ossuary containing the remains of over 6 million Parisians.

This isn't the standard tourist experience. Your exclusive after-hours access begins at midnight when the catacombs are closed to the public. Armed with only lanterns and headlamps, you'll navigate the labyrinthine tunnels 20 meters beneath the streets of Paris, surrounded by walls of carefully arranged skulls and bones.

Your expert guide will share the dark history of these tunnels—from their origins as limestone quarries to their transformation into a mass grave during the 18th century. You'll explore restricted sections not open to regular tours, including the infamous "beach" where illegal cataphile parties once took place.

The experience includes a traditional French dinner in a private underground chamber, surrounded by the bones of Parisian nobility. It's macabre, it's unforgettable, and it's absolutely not for the claustrophobic.

This 1-night experience is limited to just 8 participants for an intimate and genuinely eerie adventure beneath the City of Light.`,
      shortDescription: 'Exclusive midnight access to the Paris Catacombs with restricted areas and underground dining experience.',
      theme: 'MACABRE_FESTIVALS',
      difficulty: 'CHALLENGING',
      status: 'PUBLISHED',
      country: 'France',
      city: 'Paris',
      region: 'Île-de-France',
      latitude: 48.8566,
      longitude: 2.3522,
      basePrice: 599.99,
      currency: 'USD',
      installmentAvailable: false,
      durationDays: 1,
      durationNights: 0,
      minParticipants: 4,
      maxParticipants: 8,
      isYearRound: true,
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      images: [
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f',
      ],
      metaTitle: 'Paris Catacombs Midnight Tour | Eerie Escapes',
      metaDescription: 'Exclusive after-hours access to the Paris Catacombs with restricted areas and underground dining.',
      keywords: ['paris', 'catacombs', 'ossuary', 'bones', 'underground', 'france'],
      partnerId: partner.id,
      publishedAt: new Date(),
    },
    {
      slug: 'chernobyl-exclusion-zone',
      title: 'Chernobyl Exclusion Zone: Post-Apocalyptic Exploration',
      subtitle: 'Witness the aftermath of the world\'s worst nuclear disaster',
      description: `Step into a frozen moment in time and explore the Chernobyl Exclusion Zone—the site of the world's worst nuclear disaster and one of the most haunting places on Earth.

This 2-day expedition takes you deep into the 30-kilometer exclusion zone surrounding the Chernobyl Nuclear Power Plant. You'll explore the abandoned city of Pripyat, where 50,000 residents evacuated in a single day, leaving behind a perfectly preserved Soviet city frozen in 1986.

Walk through empty schools with textbooks still on desks, explore the famous Pripyat Amusement Park with its iconic Ferris wheel that never opened, and stand before the New Safe Confinement structure that now covers Reactor 4. Your expert guide—a former Chernobyl worker—will share firsthand accounts of the disaster and its aftermath.

This is not a typical tourist experience. You'll wear dosimeters to monitor radiation exposure, follow strict safety protocols, and witness nature's eerie reclamation of human civilization. The experience includes visits to the Red Forest, the Duga radar installation, and multiple abandoned villages.

This journey is for those seeking to understand one of humanity's greatest tragedies and witness the haunting beauty of a post-apocalyptic landscape.`,
      shortDescription: 'Explore the Chernobyl Exclusion Zone and abandoned city of Pripyat with expert guides and safety equipment.',
      theme: 'DARK_HISTORY',
      difficulty: 'EXTREME',
      status: 'PUBLISHED',
      country: 'Ukraine',
      city: 'Pripyat',
      region: 'Kyiv Oblast',
      latitude: 51.4045,
      longitude: 30.0542,
      basePrice: 1299.99,
      currency: 'USD',
      installmentAvailable: true,
      durationDays: 2,
      durationNights: 1,
      minParticipants: 6,
      maxParticipants: 15,
      isYearRound: false,
      startDate: new Date('2026-04-01'),
      endDate: new Date('2026-10-31'),
      coverImage: 'https://images.unsplash.com/photo-1590736969955-71cc94901144',
      images: [
        'https://images.unsplash.com/photo-1590736969955-71cc94901144',
        'https://images.unsplash.com/photo-1590736969955-71cc94901144',
      ],
      metaTitle: 'Chernobyl Exclusion Zone Tour | Eerie Escapes',
      metaDescription: 'Explore the Chernobyl Exclusion Zone and abandoned Pripyat with expert guides.',
      keywords: ['chernobyl', 'pripyat', 'nuclear', 'exclusion zone', 'ukraine', 'abandoned'],
      partnerId: partner.id,
      publishedAt: new Date(),
    },
  ];

  const createdHolidays = [];
  for (const holidayData of holidays) {
    const holiday = await prisma.holiday.create({
      data: holidayData,
    });
    createdHolidays.push(holiday);
    console.log(`✅ Created holiday: ${holiday.title}`);
  }

  // Add Itineraries for Salem Witch Trials
  await prisma.itinerary.createMany({
    data: [
      {
        holidayId: createdHolidays[0].id,
        day: 1,
        title: 'Arrival & Historical Overview',
        description: 'Check into your colonial-era inn and attend an evening lecture on the witch trials.',
        activities: ['Hotel check-in', 'Welcome dinner', 'Historical lecture', 'Evening ghost walk'],
        meals: ['Dinner'],
      },
      {
        holidayId: createdHolidays[0].id,
        day: 2,
        title: 'Trial Locations & Reenactment',
        description: 'Visit authentic trial locations and participate in a witch trial reenactment.',
        activities: ['Salem Witch Museum', 'Old Burying Point Cemetery', 'Trial reenactment', 'Séance experience'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
      },
      {
        holidayId: createdHolidays[0].id,
        day: 3,
        title: 'Paranormal Investigation & Departure',
        description: 'Morning paranormal investigation before departure.',
        activities: ['Paranormal investigation', 'Gift shop visit', 'Departure'],
        meals: ['Breakfast'],
      },
    ],
  });

  // Add Inclusions & Exclusions
  await prisma.inclusion.createMany({
    data: [
      { holidayId: createdHolidays[0].id, item: '2 nights accommodation in historic inn' },
      { holidayId: createdHolidays[0].id, item: 'All meals as specified in itinerary' },
      { holidayId: createdHolidays[0].id, item: 'Expert historian guide' },
      { holidayId: createdHolidays[0].id, item: 'Museum and attraction tickets' },
      { holidayId: createdHolidays[0].id, item: 'Paranormal investigation equipment' },
      { holidayId: createdHolidays[0].id, item: 'Welcome gift package' },
    ],
  });

  await prisma.exclusion.createMany({
    data: [
      { holidayId: createdHolidays[0].id, item: 'Flights to/from Salem' },
      { holidayId: createdHolidays[0].id, item: 'Travel insurance' },
      { holidayId: createdHolidays[0].id, item: 'Personal expenses' },
      { holidayId: createdHolidays[0].id, item: 'Alcoholic beverages' },
    ],
  });

  // Add Availability
  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    await prisma.availability.create({
      data: {
        holidayId: createdHolidays[0].id,
        date,
        spotsLeft: 15,
        isAvailable: true,
      },
    });
  }

  console.log('✅ Added itineraries, inclusions, exclusions, and availability');

  // Create Reviews
  await prisma.review.createMany({
    data: [
      {
        userId: users[0].id,
        holidayId: createdHolidays[0].id,
        rating: 5,
        title: 'Absolutely spine-chilling!',
        content: 'This was the most authentic historical experience I\'ve ever had. The reenactment was incredibly moving, and the paranormal investigation was genuinely scary. Highly recommend!',
        isVerified: true,
        helpfulCount: 24,
      },
      {
        userId: users[1].id,
        holidayId: createdHolidays[0].id,
        rating: 4,
        title: 'Great experience, very educational',
        content: 'Learned so much about the witch trials. The accommodations were charming and the guides were knowledgeable. Only wish it was longer!',
        isVerified: true,
        helpfulCount: 12,
      },
      {
        userId: users[2].id,
        holidayId: createdHolidays[1].id,
        rating: 5,
        title: 'Terrifying in the best way',
        content: 'The Edinburgh vaults are genuinely haunted. We captured EVPs and saw shadow figures. Not for the faint of heart but absolutely worth it for paranormal enthusiasts.',
        isVerified: true,
        helpfulCount: 31,
      },
    ],
  });

  // Update holiday ratings
  await prisma.holiday.update({
    where: { id: createdHolidays[0].id },
    data: { averageRating: 4.5, reviewCount: 2, viewCount: 342, bookingCount: 28 },
  });

  await prisma.holiday.update({
    where: { id: createdHolidays[1].id },
    data: { averageRating: 5.0, reviewCount: 1, viewCount: 189, bookingCount: 15 },
  });

  console.log('✅ Created reviews and updated ratings');

  // Create Sample Booking
  const booking = await prisma.booking.create({
    data: {
      bookingNumber: 'EE-2025-001',
      userId: users[0].id,
      holidayId: createdHolidays[0].id,
      startDate: new Date('2026-06-15'),
      endDate: new Date('2026-06-17'),
      participants: 2,
      totalPrice: 1799.98,
      currency: 'USD',
      bookingStatus: 'CONFIRMED',
      paymentStatus: 'PAID',
      contactName: 'John Doe',
      contactEmail: 'john.doe@example.com',
      contactPhone: '+1-555-1234',
      confirmedAt: new Date(),
    },
  });

  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amount: 1799.98,
      currency: 'USD',
      stripePaymentId: 'pi_test_123456789',
      paymentMethod: 'card',
      status: 'PAID',
      paidAt: new Date(),
    },
  });

  console.log('✅ Created sample booking and payment');

  // Create Saved Holidays
  await prisma.savedHoliday.createMany({
    data: [
      { userId: users[0].id, holidayId: createdHolidays[2].id },
      { userId: users[0].id, holidayId: createdHolidays[3].id },
      { userId: users[1].id, holidayId: createdHolidays[1].id },
    ],
  });

  console.log('✅ Created saved holidays');

  // Create Newsletter Subscriptions
  await prisma.newsletter.createMany({
    data: [
      { email: 'subscriber1@example.com' },
      { email: 'subscriber2@example.com' },
      { email: 'subscriber3@example.com' },
    ],
  });

  console.log('✅ Created newsletter subscriptions');

  // Create Contact Messages
  await prisma.contactMessage.createMany({
    data: [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        subject: 'Question about Salem tour',
        message: 'Is this tour suitable for teenagers? My daughter is 15 and loves horror.',
        isRead: false,
      },
      {
        name: 'Bob Williams',
        email: 'bob@example.com',
        subject: 'Partnership inquiry',
        message: 'I run a haunted castle in Ireland and would like to discuss partnership opportunities.',
        isRead: true,
      },
    ],
  });

  console.log('✅ Created contact messages');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Users: ${users.length + 2} (including admin and partner)`);
  console.log(`   - Partners: 1`);
  console.log(`   - Holidays: ${createdHolidays.length}`);
  console.log(`   - Reviews: 3`);
  console.log(`   - Bookings: 1`);
  console.log(`   - Saved Holidays: 3`);
  console.log(`   - Newsletter Subscribers: 3`);
  console.log(`   - Contact Messages: 2`);
  console.log('\n🔐 Test Credentials:');
  console.log('   Admin: admin@eerieescapes.com / Admin123!');
  console.log('   User: john.doe@example.com / User123!');
  console.log('   Partner: partner@hauntedtours.com / User123!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
