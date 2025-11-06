# Authentication System Documentation

## Overview

Eerie Escapes uses a comprehensive authentication system with multiple sign-in methods:
- Email/Password authentication
- Google OAuth
- Facebook OAuth
- Email verification
- Password reset functionality

## Tech Stack

- **Frontend**: NextAuth.js v4
- **Backend**: Express.js with JWT
- **Database**: PostgreSQL with Prisma ORM
- **Password Hashing**: bcryptjs
- **Email**: SendGrid

## Setup Instructions

### 1. Install Dependencies

```bash
# Frontend
cd frontend
npm install next-auth @next-auth/prisma-adapter bcryptjs

# Backend
cd backend
npm install jsonwebtoken bcryptjs express-validator
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

#### Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret to `.env`

#### Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook` (development)
   - `https://yourdomain.com/api/auth/callback/facebook` (production)
5. Copy App ID and App Secret to `.env`

#### SendGrid Setup

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key with Mail Send permissions
3. Verify your sender email address
4. Add API key to `.env`

### 3. Update Prisma Schema

Ensure your `prisma/schema.prisma` includes:

```prisma
model User {
  id                     String    @id @default(cuid())
  email                  String    @unique
  name                   String?
  hashedPassword         String?
  image                  String?
  role                   UserRole  @default(USER)
  emailVerified          DateTime?
  verificationToken      String?   @unique
  verificationTokenExpiry DateTime?
  resetToken             String?   @unique
  resetTokenExpiry       DateTime?
  isActive               Boolean   @default(true)
  lastLogin              DateTime?
  createdAt              DateTime  @default(now())
  updatedAt              DateTime  @updatedAt

  // NextAuth fields
  accounts               Account[]
  sessions               Session[]
  
  // Relations
  bookings               Booking[]
  reviews                Review[]
  savedHolidays          SavedHoliday[]
  partner                Partner?
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

enum UserRole {
  USER
  PARTNER
  ADMIN
}
```

Run migrations:

```bash
npx prisma migrate dev --name add-auth-fields
npx prisma generate
```

### 4. Update Backend Routes

Add authentication routes to your Express app:

```typescript
// backend/src/index.ts
import authRoutes from './routes/auth.routes';

app.use('/api/auth', authRoutes);
```

### 5. Protect Routes

Use authentication middleware to protect routes:

```typescript
import { authenticate, authorize } from './middleware/auth.middleware';

// Require authentication
router.get('/protected', authenticate, controller);

// Require specific role
router.post('/admin-only', authenticate, authorize('ADMIN'), controller);

// Optional authentication
router.get('/public-or-private', optionalAuth, controller);
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/verify-email` | Verify email | No |
| POST | `/api/auth/request-password-reset` | Request password reset | No |
| POST | `/api/auth/reset-password` | Reset password | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### NextAuth

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler |
| GET | `/api/auth/signin` | Sign in page |
| GET | `/api/auth/signout` | Sign out page |
| GET | `/api/auth/callback/:provider` | OAuth callback |

## Frontend Usage

### Sign In

```typescript
import { signIn } from 'next-auth/react';

// Email/Password
await signIn('credentials', {
  email: 'user@example.com',
  password: 'password123',
  redirect: false
});

// Google OAuth
await signIn('google', { callbackUrl: '/dashboard' });

// Facebook OAuth
await signIn('facebook', { callbackUrl: '/dashboard' });
```

### Get Session

```typescript
import { useSession } from 'next-auth/react';

function Component() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'unauthenticated') return <div>Not signed in</div>;
  
  return <div>Signed in as {session.user.email}</div>;
}
```

### Sign Out

```typescript
import { signOut } from 'next-auth/react';

await signOut({ callbackUrl: '/' });
```

### Protect Pages

```typescript
// app/dashboard/page.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return <div>Protected content</div>;
}
```

## Email Templates

Email templates are sent via SendGrid. Create templates for:

1. **Email Verification** (`email-verification`)
   - Subject: "Verify Your Email - Eerie Escapes"
   - Variables: `name`, `verificationUrl`

2. **Password Reset** (`password-reset`)
   - Subject: "Password Reset Request - Eerie Escapes"
   - Variables: `name`, `resetUrl`

3. **Password Changed** (`password-changed`)
   - Subject: "Password Changed Successfully - Eerie Escapes"
   - Variables: `name`

## Security Best Practices

1. **Password Requirements**
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number

2. **Token Expiry**
   - Email verification: 24 hours
   - Password reset: 1 hour
   - JWT: 7 days
   - Session: 30 days

3. **Rate Limiting**
   - Implement rate limiting on auth endpoints
   - Use express-rate-limit middleware

4. **HTTPS Only**
   - Always use HTTPS in production
   - Set secure cookies

5. **CSRF Protection**
   - NextAuth handles CSRF automatically
   - Use CSRF tokens for API requests

## Testing

### Manual Testing

1. **Registration Flow**
   - Register with email/password
   - Check email for verification link
   - Verify email
   - Login

2. **OAuth Flow**
   - Click Google/Facebook sign in
   - Authorize app
   - Redirect to dashboard

3. **Password Reset**
   - Request password reset
   - Check email for reset link
   - Set new password
   - Login with new password

### Automated Testing

```bash
# Run tests
npm test

# Test specific file
npm test auth.controller.test.ts
```

## Troubleshooting

### Common Issues

1. **OAuth redirect mismatch**
   - Ensure redirect URIs match exactly in provider settings
   - Check for trailing slashes

2. **Email not sending**
   - Verify SendGrid API key
   - Check sender email is verified
   - Review SendGrid activity logs

3. **JWT token invalid**
   - Ensure JWT_SECRET matches between requests
   - Check token expiry
   - Verify token format

4. **Session not persisting**
   - Check NEXTAUTH_SECRET is set
   - Verify cookie settings
   - Ensure database connection

## Day 9 Completion Checklist

- [x] Set up NextAuth.js configuration
- [x] Implement email/password authentication
- [x] Add OAuth providers (Google, Facebook)
- [x] Create user registration flow
- [x] Implement password reset functionality
- [x] Create authentication middleware
- [x] Build sign-in page
- [x] Build sign-up page
- [x] Build forgot password page
- [x] Build reset password page
- [x] Add environment variables
- [x] Document authentication system

## Next Steps (Day 10)

- User profile management
- Avatar upload
- User preferences
- Saved holidays feature
- Account settings page
