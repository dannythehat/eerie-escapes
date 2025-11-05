# Database Quick Reference

Quick reference guide for common database operations and queries.

---

## Connection

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});
```

---

## Common Queries

### Users

```typescript
// Create user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    password: hashedPassword,
    firstName: 'John',
    lastName: 'Doe',
    role: 'USER',
  },
});

// Find user by email
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
});

// Update user
await prisma.user.update({
  where: { id: userId },
  data: { newsletter: true },
});

// Get user with bookings
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    bookings: {
      include: { holiday: true },
    },
  },
});
```

---

### Holidays

```typescript
// Get published holidays with filters
const holidays = await prisma.holiday.findMany({
  where: {
    status: 'PUBLISHED',
    theme: 'HAUNTED_TOURS',
    country: 'United States',
    basePrice: { lte: 1000 },
  },
  include: {
    partner: true,
    reviews: {
      take: 5,
      orderBy: { createdAt: 'desc' },
    },
  },
  orderBy: { averageRating: 'desc' },
  take: 10,
});

// Get holiday with full details
const holiday = await prisma.holiday.findUnique({
  where: { slug: 'salem-witch-trials-experience' },
  include: {
    itinerary: { orderBy: { day: 'asc' } },
    inclusions: true,
    exclusions: true,
    availability: {
      where: {
        date: { gte: new Date() },
        isAvailable: true,
      },
      take: 30,
    },
    reviews: {
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    },
    partner: true,
  },
});

// Search holidays
const results = await prisma.holiday.findMany({
  where: {
    OR: [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } },
      { city: { contains: searchTerm, mode: 'insensitive' } },
    ],
    status: 'PUBLISHED',
  },
});

// Increment view count
await prisma.holiday.update({
  where: { id: holidayId },
  data: { viewCount: { increment: 1 } },
});
```

---

### Bookings

```typescript
// Create booking with payment
const booking = await prisma.booking.create({
  data: {
    bookingNumber: generateBookingNumber(),
    userId: userId,
    holidayId: holidayId,
    startDate: new Date('2026-06-15'),
    endDate: new Date('2026-06-17'),
    participants: 2,
    totalPrice: 1799.98,
    bookingStatus: 'PENDING',
    paymentStatus: 'PENDING',
    contactName: 'John Doe',
    contactEmail: 'john@example.com',
    contactPhone: '+1-555-1234',
    payments: {
      create: {
        amount: 1799.98,
        currency: 'USD',
        status: 'PENDING',
      },
    },
  },
  include: { payments: true },
});

// Get user bookings
const bookings = await prisma.booking.findMany({
  where: { userId: userId },
  include: {
    holiday: true,
    payments: true,
  },
  orderBy: { createdAt: 'desc' },
});

// Update booking status
await prisma.booking.update({
  where: { id: bookingId },
  data: {
    bookingStatus: 'CONFIRMED',
    paymentStatus: 'PAID',
    confirmedAt: new Date(),
  },
});
```

---

### Reviews

```typescript
// Create review
const review = await prisma.review.create({
  data: {
    userId: userId,
    holidayId: holidayId,
    rating: 5,
    title: 'Amazing experience!',
    content: 'This was the best horror tour ever...',
    isVerified: true,
  },
});

// Update holiday rating (after review)
const avgRating = await prisma.review.aggregate({
  where: { holidayId: holidayId },
  _avg: { rating: true },
  _count: true,
});

await prisma.holiday.update({
  where: { id: holidayId },
  data: {
    averageRating: avgRating._avg.rating || 0,
    reviewCount: avgRating._count,
  },
});

// Get holiday reviews
const reviews = await prisma.review.findMany({
  where: { holidayId: holidayId },
  include: { user: true },
  orderBy: { createdAt: 'desc' },
});
```

---

### Partners

```typescript
// Create partner
const partner = await prisma.partner.create({
  data: {
    userId: userId,
    companyName: 'Haunted Tours Inc',
    businessEmail: 'info@hauntedtours.com',
    businessPhone: '+1-555-HAUNT',
    country: 'United States',
    city: 'Salem',
    address: '123 Witch Way',
    postalCode: '01970',
    status: 'PENDING',
  },
});

// Get partner with holidays
const partner = await prisma.partner.findUnique({
  where: { userId: userId },
  include: {
    holidays: {
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    },
  },
});

// Approve partner
await prisma.partner.update({
  where: { id: partnerId },
  data: {
    status: 'APPROVED',
    verifiedAt: new Date(),
  },
});
```

---

## Transactions

```typescript
// Create booking with payment (atomic)
const result = await prisma.$transaction(async (tx) => {
  // Create booking
  const booking = await tx.booking.create({
    data: { /* booking data */ },
  });

  // Create payment
  const payment = await tx.payment.create({
    data: {
      bookingId: booking.id,
      amount: booking.totalPrice,
      status: 'PAID',
    },
  });

  // Update availability
  await tx.availability.update({
    where: { id: availabilityId },
    data: { spotsLeft: { decrement: booking.participants } },
  });

  // Update holiday stats
  await tx.holiday.update({
    where: { id: booking.holidayId },
    data: { bookingCount: { increment: 1 } },
  });

  return { booking, payment };
});
```

---

## Aggregations

```typescript
// Get booking statistics
const stats = await prisma.booking.aggregate({
  where: { bookingStatus: 'CONFIRMED' },
  _sum: { totalPrice: true, participants: true },
  _avg: { totalPrice: true },
  _count: true,
});

// Group by theme
const themeStats = await prisma.holiday.groupBy({
  by: ['theme'],
  where: { status: 'PUBLISHED' },
  _count: true,
  _avg: { basePrice: true, averageRating: true },
});

// Get top holidays
const topHolidays = await prisma.holiday.findMany({
  where: { status: 'PUBLISHED' },
  orderBy: [
    { averageRating: 'desc' },
    { reviewCount: 'desc' },
  ],
  take: 10,
});
```

---

## Raw SQL (when needed)

```typescript
// Complex query
const results = await prisma.$queryRaw`
  SELECT h.*, COUNT(b.id) as booking_count
  FROM holidays h
  LEFT JOIN bookings b ON h.id = b."holidayId"
  WHERE h.status = 'PUBLISHED'
  GROUP BY h.id
  ORDER BY booking_count DESC
  LIMIT 10
`;

// Execute raw SQL
await prisma.$executeRaw`
  UPDATE holidays
  SET "viewCount" = "viewCount" + 1
  WHERE id = ${holidayId}
`;
```

---

## Pagination

```typescript
// Cursor-based pagination
const pageSize = 10;

const holidays = await prisma.holiday.findMany({
  take: pageSize,
  skip: 1, // Skip cursor
  cursor: { id: lastHolidayId },
  orderBy: { createdAt: 'desc' },
});

// Offset-based pagination
const page = 2;
const holidays = await prisma.holiday.findMany({
  take: pageSize,
  skip: (page - 1) * pageSize,
  orderBy: { createdAt: 'desc' },
});

// Get total count
const total = await prisma.holiday.count({
  where: { status: 'PUBLISHED' },
});
```

---

## Useful Filters

```typescript
// Date range
const bookings = await prisma.booking.findMany({
  where: {
    startDate: {
      gte: new Date('2026-01-01'),
      lte: new Date('2026-12-31'),
    },
  },
});

// Price range
const holidays = await prisma.holiday.findMany({
  where: {
    basePrice: {
      gte: 500,
      lte: 1500,
    },
  },
});

// Multiple conditions
const holidays = await prisma.holiday.findMany({
  where: {
    AND: [
      { status: 'PUBLISHED' },
      { theme: { in: ['HAUNTED_TOURS', 'PARANORMAL'] } },
      { basePrice: { lte: 1000 } },
    ],
  },
});

// OR conditions
const holidays = await prisma.holiday.findMany({
  where: {
    OR: [
      { country: 'United States' },
      { country: 'United Kingdom' },
    ],
  },
});
```

---

## Performance Tips

```typescript
// Select specific fields
const holidays = await prisma.holiday.findMany({
  select: {
    id: true,
    title: true,
    basePrice: true,
    coverImage: true,
  },
});

// Use indexes
// Already defined in schema for:
// - email, role (User)
// - slug, theme, country+city, status (Holiday)
// - bookingNumber, userId, holidayId (Booking)

// Batch operations
await prisma.holiday.updateMany({
  where: { status: 'DRAFT' },
  data: { status: 'ARCHIVED' },
});

// Disconnect to free resources
await prisma.$disconnect();
```

---

## Environment Variables

```env
# .env file
DATABASE_URL="postgresql://user:password@localhost:5432/eerie_escapes"
DATABASE_POOL_SIZE=10
NODE_ENV=development
```

---

## Common Errors

### Unique Constraint Violation
```typescript
try {
  await prisma.user.create({ data: { email: 'existing@example.com' } });
} catch (error) {
  if (error.code === 'P2002') {
    console.log('Email already exists');
  }
}
```

### Record Not Found
```typescript
const user = await prisma.user.findUniqueOrThrow({
  where: { id: userId },
}); // Throws if not found
```

---

**Last Updated**: November 5, 2025
