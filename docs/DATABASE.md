# Database Schema Documentation

## Overview

The Eerie Escapes database is designed to support a horror-themed travel booking platform with comprehensive user management, holiday listings, booking systems, reviews, and partner management.

## Database Technology

- **DBMS**: PostgreSQL 15+
- **ORM**: Prisma
- **Connection Pooling**: PgBouncer (recommended for production)
- **Caching Layer**: Redis

---

## Entity Relationship Diagram

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│    User     │──────<│   Booking    │>──────│   Holiday   │
└─────────────┘       └──────────────┘       └─────────────┘
      │                      │                       │
      │                      │                       │
      ├──────────────────────┤                       │
      │                      │                       │
      ▼                      ▼                       ▼
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   Review    │       │   Payment    │       │  Itinerary  │
└─────────────┘       └──────────────┘       └─────────────┘
      │                                              │
      │                                              │
      ▼                                              ▼
┌─────────────┐                              ┌─────────────┐
│SavedHoliday │                              │ Inclusion   │
└─────────────┘                              └─────────────┘
      │                                              │
      │                                              ▼
      ▼                                        ┌─────────────┐
┌─────────────┐                              │ Exclusion   │
│   Partner   │                              └─────────────┘
└─────────────┘                                      │
                                                     ▼
                                              ┌─────────────┐
                                              │Availability │
                                              └─────────────┘
```

---

## Core Entities

### 1. User Management

#### **User**
Primary entity for all platform users (customers, partners, admins).

**Key Fields:**
- `id` (UUID): Primary key
- `email` (String, unique): User email address
- `role` (Enum): USER | PARTNER | ADMIN
- `authProvider` (Enum): EMAIL | GOOGLE | FACEBOOK

**Relationships:**
- One-to-Many: Bookings, Reviews, SavedHolidays
- One-to-One: Partner (if role is PARTNER)

**Indexes:**
- `email` (unique)
- `role`

**Constraints:**
- Email must be unique
- Password required for EMAIL auth, optional for OAuth

---

#### **Session**
Manages user authentication sessions.

**Key Fields:**
- `token` (String, unique): Session token
- `expiresAt` (DateTime): Session expiration

**Relationships:**
- Many-to-One: User

---

### 2. Holiday/Experience Management

#### **Holiday**
Core entity representing horror-themed travel experiences.

**Key Fields:**
- `slug` (String, unique): URL-friendly identifier
- `theme` (Enum): HAUNTED_TOURS, CRIME_SCENES, PARANORMAL, etc.
- `difficulty` (Enum): EASY, MODERATE, CHALLENGING, EXTREME
- `status` (Enum): DRAFT, PUBLISHED, ARCHIVED, SOLD_OUT
- `basePrice` (Decimal): Base price in specified currency
- `averageRating` (Float): Calculated from reviews

**Relationships:**
- Many-to-One: Partner
- One-to-Many: Itinerary, Inclusions, Exclusions, Bookings, Reviews, Availability

**Indexes:**
- `slug` (unique)
- `theme`
- `country, city` (composite)
- `status`
- `partnerId`

**Business Rules:**
- `maxParticipants` must be >= `minParticipants`
- `discountPrice` must be < `basePrice` if set
- `durationNights` typically = `durationDays - 1`

---

#### **Itinerary**
Day-by-day breakdown of holiday activities.

**Key Fields:**
- `day` (Int): Day number (1, 2, 3...)
- `activities` (String[]): List of activities
- `meals` (String[]): Included meals

**Relationships:**
- Many-to-One: Holiday

---

#### **Inclusion / Exclusion**
What's included or excluded in the holiday package.

**Relationships:**
- Many-to-One: Holiday

---

#### **Availability**
Tracks available spots for specific dates.

**Key Fields:**
- `date` (DateTime): Specific date
- `spotsLeft` (Int): Remaining capacity
- `isAvailable` (Boolean): Quick availability flag

**Relationships:**
- Many-to-One: Holiday

**Constraints:**
- Unique combination of `holidayId` + `date`

---

### 3. Booking Management

#### **Booking**
Represents a customer's holiday reservation.

**Key Fields:**
- `bookingNumber` (String, unique): Human-readable booking reference
- `bookingStatus` (Enum): PENDING, CONFIRMED, CANCELLED, COMPLETED, REFUNDED
- `paymentStatus` (Enum): PENDING, PAID, PARTIALLY_PAID, FAILED, REFUNDED
- `totalPrice` (Decimal): Total booking cost

**Relationships:**
- Many-to-One: User, Holiday
- One-to-Many: Payments

**Indexes:**
- `bookingNumber` (unique)
- `userId`
- `holidayId`
- `bookingStatus`

**Business Rules:**
- `endDate` must be after `startDate`
- `participants` must be between holiday's min/max
- Cannot cancel if `bookingStatus` is COMPLETED

---

#### **Payment**
Tracks individual payments (supports installments).

**Key Fields:**
- `stripePaymentId` (String, unique): Stripe payment reference
- `isInstallment` (Boolean): Whether this is an installment payment
- `installmentNumber` (Int): Which installment (1, 2, 3...)

**Relationships:**
- Many-to-One: Booking

**Business Rules:**
- Sum of all payments for a booking should equal `totalPrice`
- `installmentNumber` must be <= `totalInstallments`

---

### 4. Review System

#### **Review**
User reviews and ratings for holidays.

**Key Fields:**
- `rating` (Int): 1-5 stars
- `isVerified` (Boolean): Verified purchase
- `helpfulCount` (Int): Number of helpful votes

**Relationships:**
- Many-to-One: User, Holiday

**Constraints:**
- Unique combination of `userId` + `holidayId` (one review per user per holiday)
- `rating` must be between 1 and 5

**Business Rules:**
- Only users who have completed a booking can leave verified reviews
- `averageRating` on Holiday is calculated from all reviews

---

### 5. Partner Management

#### **Partner**
Business partners who list holidays on the platform.

**Key Fields:**
- `status` (Enum): PENDING, APPROVED, SUSPENDED, REJECTED
- `commissionRate` (Decimal): Platform commission percentage (default 15%)

**Relationships:**
- One-to-One: User
- One-to-Many: Holidays

**Business Rules:**
- Must be approved before holidays can be published
- Commission rate between 0-100%

---

### 6. Supporting Entities

#### **SavedHoliday**
User's wishlist/saved holidays.

**Constraints:**
- Unique combination of `userId` + `holidayId`

---

#### **Newsletter**
Email newsletter subscriptions.

**Key Fields:**
- `email` (String, unique)
- `isActive` (Boolean): Subscription status

---

#### **ContactMessage**
Contact form submissions.

**Key Fields:**
- `isRead` (Boolean): Admin tracking

---

#### **SearchLog**
Analytics for search queries.

**Key Fields:**
- `query` (String): Search term
- `filters` (JSON): Applied filters
- `resultsCount` (Int): Number of results

---

#### **PageView**
Page view analytics.

**Key Fields:**
- `page` (String): Page URL
- `referrer` (String): Referrer URL
- `userAgent` (String): Browser info

---

## Data Relationships Summary

### One-to-One
- User ↔ Partner

### One-to-Many
- User → Bookings
- User → Reviews
- User → SavedHolidays
- User → Sessions
- Holiday → Itineraries
- Holiday → Inclusions
- Holiday → Exclusions
- Holiday → Bookings
- Holiday → Reviews
- Holiday → Availability
- Partner → Holidays
- Booking → Payments

### Many-to-Many (via junction tables)
- User ↔ Holiday (via SavedHoliday)

---

## Indexes Strategy

### Primary Indexes (Automatic)
- All `id` fields (UUID primary keys)
- All `@unique` fields

### Custom Indexes
1. **User**: `email`, `role`
2. **Holiday**: `slug`, `theme`, `country+city`, `status`, `partnerId`
3. **Booking**: `bookingNumber`, `userId`, `holidayId`, `bookingStatus`
4. **Review**: `holidayId`, `rating`
5. **Availability**: `holidayId`, `date`, `holidayId+date` (unique)
6. **SearchLog**: `createdAt`
7. **PageView**: `holidayId`, `createdAt`

---

## Data Constraints

### Field Validations
- **Email**: Valid email format, unique
- **Rating**: Integer between 1-5
- **Price**: Positive decimal with 2 decimal places
- **Dates**: `endDate` > `startDate`
- **Participants**: Between `minParticipants` and `maxParticipants`

### Referential Integrity
- **Cascade Deletes**:
  - User deleted → Sessions, SavedHolidays deleted
  - Holiday deleted → Itineraries, Inclusions, Exclusions, Reviews, Availability deleted
  - Booking deleted → Payments deleted
  - Partner deleted → User deleted (via User cascade)

- **Restrict Deletes**:
  - Cannot delete Holiday if active Bookings exist
  - Cannot delete User if active Bookings exist

---

## Enums Reference

### UserRole
- `USER`: Regular customer
- `PARTNER`: Business partner
- `ADMIN`: Platform administrator

### AuthProvider
- `EMAIL`: Email/password authentication
- `GOOGLE`: Google OAuth
- `FACEBOOK`: Facebook OAuth

### HolidayTheme
- `HAUNTED_TOURS`
- `CRIME_SCENES`
- `PARANORMAL`
- `DARK_HISTORY`
- `MACABRE_FESTIVALS`
- `HORROR_ATTRACTIONS`
- `SUPERNATURAL`
- `GOTHIC_ARCHITECTURE`
- `CEMETERY_TOURS`
- `OCCULT_EXPERIENCES`

### DifficultyLevel
- `EASY`: Suitable for all ages
- `MODERATE`: Some physical activity required
- `CHALLENGING`: Significant physical/mental challenge
- `EXTREME`: Only for experienced thrill-seekers

### HolidayStatus
- `DRAFT`: Not yet published
- `PUBLISHED`: Live and bookable
- `ARCHIVED`: No longer available
- `SOLD_OUT`: Temporarily unavailable

### BookingStatus
- `PENDING`: Awaiting confirmation
- `CONFIRMED`: Booking confirmed
- `CANCELLED`: Cancelled by user/admin
- `COMPLETED`: Holiday completed
- `REFUNDED`: Refund processed

### PaymentStatus
- `PENDING`: Payment not yet received
- `PAID`: Fully paid
- `PARTIALLY_PAID`: Installment payment in progress
- `FAILED`: Payment failed
- `REFUNDED`: Payment refunded

### PartnerStatus
- `PENDING`: Application under review
- `APPROVED`: Active partner
- `SUSPENDED`: Temporarily suspended
- `REJECTED`: Application rejected

---

## Migration Strategy

### Initial Migration
```bash
npx prisma migrate dev --name init
```

### Seed Data
Create seed script for:
- Admin user
- Sample holidays (15-20)
- Sample reviews
- Test bookings

---

## Performance Considerations

### Query Optimization
1. Use indexes for frequently queried fields
2. Implement pagination for large result sets
3. Use `select` to limit returned fields
4. Implement Redis caching for:
   - Holiday listings
   - User sessions
   - Search results

### Database Scaling
1. **Read Replicas**: For analytics and reporting
2. **Connection Pooling**: PgBouncer for connection management
3. **Partitioning**: Consider partitioning `PageView` and `SearchLog` by date

---

## Security Considerations

1. **Sensitive Data**:
   - Hash passwords using bcrypt (cost factor 12)
   - Never store credit card details (use Stripe tokens)
   - Encrypt PII fields if required by regulations

2. **Access Control**:
   - Row-level security for multi-tenant data
   - Separate read/write database users
   - Audit logging for sensitive operations

3. **Data Retention**:
   - Archive old bookings after 2 years
   - Delete unverified users after 30 days
   - GDPR compliance for user data deletion

---

## Backup Strategy

1. **Automated Backups**: Daily full backups
2. **Point-in-Time Recovery**: Enable WAL archiving
3. **Backup Retention**: 30 days
4. **Disaster Recovery**: Cross-region replication

---

**Last Updated**: November 5, 2025
**Schema Version**: 1.0.0
