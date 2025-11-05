# Entity Relationship Diagram

## Visual Database Schema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EERIE ESCAPES DATABASE                             │
│                         Entity Relationship Diagram                          │
└─────────────────────────────────────────────────────────────────────────────┘


┌──────────────────────┐
│       USER           │
├──────────────────────┤
│ PK id (UUID)         │
│ UK email             │
│    password          │
│    firstName         │
│    lastName          │
│    displayName       │
│    avatar            │
│    phone             │
│    dateOfBirth       │
│    role (Enum)       │◄─────────┐
│    authProvider      │          │
│    newsletter        │          │
│    notifications     │          │
│    currency          │          │
│    language          │          │
│    createdAt         │          │
│    updatedAt         │          │
│    lastLoginAt       │          │
│    isActive          │          │
└──────────────────────┘          │
         │                        │
         │ 1                      │ 1
         │                        │
         │ *                      │
         ▼                        │
┌──────────────────────┐          │
│      SESSION         │          │
├──────────────────────┤          │
│ PK id (UUID)         │          │
│ FK userId            │──────────┘
│ UK token             │
│    expiresAt         │
│    createdAt         │
└──────────────────────┘


         USER
         │ 1
         │
         │ *
         ▼
┌──────────────────────┐
│      BOOKING         │
├──────────────────────┤
│ PK id (UUID)         │
│ UK bookingNumber     │
│ FK userId            │──────────┐
│ FK holidayId         │          │
│    startDate         │          │
│    endDate           │          │
│    participants      │          │
│    totalPrice        │          │
│    currency          │          │
│    bookingStatus     │          │
│    paymentStatus     │          │
│    contactName       │          │
│    contactEmail      │          │
│    contactPhone      │          │
│    specialRequests   │          │
│    dietaryNeeds      │          │
│    createdAt         │          │
│    updatedAt         │          │
│    confirmedAt       │          │
│    cancelledAt       │          │
└──────────────────────┘          │
         │ 1                      │
         │                        │
         │ *                      │
         ▼                        │
┌──────────────────────┐          │
│      PAYMENT         │          │
├──────────────────────┤          │
│ PK id (UUID)         │          │
│ FK bookingId         │──────────┘
│ UK stripePaymentId   │
│    amount            │
│    currency          │
│    paymentMethod     │
│    status            │
│    isInstallment     │
│    installmentNumber │
│    totalInstallments │
│    createdAt         │
│    paidAt            │
└──────────────────────┘


         USER
         │ 1
         │
         │ *
         ▼
┌──────────────────────┐
│       REVIEW         │
├──────────────────────┤
│ PK id (UUID)         │
│ FK userId            │
│ FK holidayId         │──────────┐
│ UK userId+holidayId  │          │
│    rating (1-5)      │          │
│    title             │          │
│    content           │          │
│    isVerified        │          │
│    helpfulCount      │          │
│    createdAt         │          │
│    updatedAt         │          │
└──────────────────────┘          │
                                  │
                                  │
         USER                     │
         │ 1                      │
         │                        │
         │ *                      │
         ▼                        │
┌──────────────────────┐          │
│   SAVED_HOLIDAY      │          │
├──────────────────────┤          │
│ PK id (UUID)         │          │
│ FK userId            │          │
│ FK holidayId         │──────────┤
│ UK userId+holidayId  │          │
│    createdAt         │          │
└──────────────────────┘          │
                                  │
                                  │
         USER                     │
         │ 1                      │
         │                        │
         │ 1                      │
         ▼                        │
┌──────────────────────┐          │
│      PARTNER         │          │
├──────────────────────┤          │
│ PK id (UUID)         │          │
│ FK userId (UK)       │          │
│    companyName       │          │
│    companyLogo       │          │
│    description       │          │
│    website           │          │
│    businessEmail     │          │
│    businessPhone     │          │
│    country           │          │
│    city              │          │
│    address           │          │
│    postalCode        │          │
│    status (Enum)     │          │
│    verifiedAt        │          │
│    commissionRate    │          │
│    createdAt         │          │
│    updatedAt         │          │
└──────────────────────┘          │
         │ 1                      │
         │                        │
         │ *                      │
         ▼                        │
┌──────────────────────┐          │
│      HOLIDAY         │◄─────────┘
├──────────────────────┤
│ PK id (UUID)         │
│ UK slug              │
│ FK partnerId         │
│    title             │
│    subtitle          │
│    description       │
│    shortDescription  │
│    theme (Enum)      │
│    difficulty (Enum) │
│    status (Enum)     │
│    country           │
│    city              │
│    region            │
│    address           │
│    latitude          │
│    longitude         │
│    basePrice         │
│    currency          │
│    discountPrice     │
│    installmentAvail  │
│    durationDays      │
│    durationNights    │
│    minParticipants   │
│    maxParticipants   │
│    startDate         │
│    endDate           │
│    isYearRound       │
│    coverImage        │
│    images[]          │
│    videoUrl          │
│    metaTitle         │
│    metaDescription   │
│    keywords[]        │
│    viewCount         │
│    bookingCount      │
│    averageRating     │
│    reviewCount       │
│    createdAt         │
│    updatedAt         │
│    publishedAt       │
└──────────────────────┘
         │ 1
         │
         ├──────────────┐
         │              │
         │ *            │ *
         ▼              ▼
┌──────────────────┐  ┌──────────────────┐
│   ITINERARY      │  │   INCLUSION      │
├──────────────────┤  ├──────────────────┤
│ PK id (UUID)     │  │ PK id (UUID)     │
│ FK holidayId     │  │ FK holidayId     │
│    day           │  │    item          │
│    title         │  │    description   │
│    description   │  └──────────────────┘
│    activities[]  │
│    meals[]       │
└──────────────────┘
         │
         │
         │ *            │ *
         ▼              ▼
┌──────────────────┐  ┌──────────────────┐
│   EXCLUSION      │  │  AVAILABILITY    │
├──────────────────┤  ├──────────────────┤
│ PK id (UUID)     │  │ PK id (UUID)     │
│ FK holidayId     │  │ FK holidayId     │
│    item          │  │ UK holidayId+date│
│    description   │  │    date          │
└──────────────────┘  │    spotsLeft     │
                      │    isAvailable   │
                      └──────────────────┘


┌──────────────────────────────────────────────────────────────┐
│                    SUPPORTING ENTITIES                        │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐
│    NEWSLETTER        │  │  CONTACT_MESSAGE     │
├──────────────────────┤  ├──────────────────────┤
│ PK id (UUID)         │  │ PK id (UUID)         │
│ UK email             │  │    name              │
│    isActive          │  │    email             │
│    createdAt         │  │    subject           │
└──────────────────────┘  │    message           │
                          │    isRead            │
                          │    createdAt         │
                          └──────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐
│    SEARCH_LOG        │  │     PAGE_VIEW        │
├──────────────────────┤  ├──────────────────────┤
│ PK id (UUID)         │  │ PK id (UUID)         │
│    userId (optional) │  │    userId (optional) │
│    query             │  │    holidayId (opt)   │
│    filters (JSON)    │  │    page              │
│    resultsCount      │  │    referrer          │
│    createdAt         │  │    userAgent         │
└──────────────────────┘  │    ipAddress         │
                          │    createdAt         │
                          └──────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│                         LEGEND                                │
├──────────────────────────────────────────────────────────────┤
│  PK  = Primary Key                                            │
│  FK  = Foreign Key                                            │
│  UK  = Unique Key                                             │
│  1   = One (cardinality)                                      │
│  *   = Many (cardinality)                                     │
│  ──► = One-to-Many relationship                               │
│  ◄── = Many-to-One relationship                               │
└──────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│                    RELATIONSHIP SUMMARY                       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ONE-TO-ONE:                                                  │
│    User ↔ Partner                                             │
│                                                               │
│  ONE-TO-MANY:                                                 │
│    User → Sessions                                            │
│    User → Bookings                                            │
│    User → Reviews                                             │
│    User → SavedHolidays                                       │
│    Partner → Holidays                                         │
│    Holiday → Itineraries                                      │
│    Holiday → Inclusions                                       │
│    Holiday → Exclusions                                       │
│    Holiday → Availability                                     │
│    Holiday → Bookings                                         │
│    Holiday → Reviews                                          │
│    Booking → Payments                                         │
│                                                               │
│  MANY-TO-MANY (via junction):                                 │
│    User ↔ Holiday (via SavedHoliday)                          │
│                                                               │
└──────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│                      ENUM TYPES                               │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  UserRole:                                                    │
│    • USER                                                     │
│    • PARTNER                                                  │
│    • ADMIN                                                    │
│                                                               │
│  AuthProvider:                                                │
│    • EMAIL                                                    │
│    • GOOGLE                                                   │
│    • FACEBOOK                                                 │
│                                                               │
│  HolidayTheme:                                                │
│    • HAUNTED_TOURS                                            │
│    • CRIME_SCENES                                             │
│    • PARANORMAL                                               │
│    • DARK_HISTORY                                             │
│    • MACABRE_FESTIVALS                                        │
│    • HORROR_ATTRACTIONS                                       │
│    • SUPERNATURAL                                             │
│    • GOTHIC_ARCHITECTURE                                      │
│    • CEMETERY_TOURS                                           │
│    • OCCULT_EXPERIENCES                                       │
│                                                               │
│  DifficultyLevel:                                             │
│    • EASY                                                     │
│    • MODERATE                                                 │
│    • CHALLENGING                                              │
│    • EXTREME                                                  │
│                                                               │
│  HolidayStatus:                                               │
│    • DRAFT                                                    │
│    • PUBLISHED                                                │
│    • ARCHIVED                                                 │
│    • SOLD_OUT                                                 │
│                                                               │
│  BookingStatus:                                               │
│    • PENDING                                                  │
│    • CONFIRMED                                                │
│    • CANCELLED                                                │
│    • COMPLETED                                                │
│    • REFUNDED                                                 │
│                                                               │
│  PaymentStatus:                                               │
│    • PENDING                                                  │
│    • PAID                                                     │
│    • PARTIALLY_PAID                                           │
│    • FAILED                                                   │
│    • REFUNDED                                                 │
│                                                               │
│  PartnerStatus:                                               │
│    • PENDING                                                  │
│    • APPROVED                                                 │
│    • SUSPENDED                                                │
│    • REJECTED                                                 │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

### 1. UUID Primary Keys
- Better for distributed systems
- No sequential ID exposure
- Easier merging of databases

### 2. Soft Deletes
- `isActive` flag on User
- Status enums for state management
- Preserves data integrity

### 3. Denormalization
- `averageRating` and `reviewCount` on Holiday
- `viewCount` and `bookingCount` on Holiday
- Improves query performance

### 4. Flexible Pricing
- Support for multiple currencies
- Discount pricing
- Installment payment tracking

### 5. Comprehensive Audit Trail
- `createdAt` and `updatedAt` on all entities
- Specific timestamps (confirmedAt, cancelledAt, etc.)
- Enables analytics and debugging

---

**Last Updated**: November 5, 2025
