# Eerie Escapes - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Web App (Next.js)  │  Mobile App (React Native - Future)       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  Express.js REST API  │  GraphQL (Future)  │  WebSockets        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BUSINESS LOGIC LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│  Holiday Service  │  Booking Service  │  User Service           │
│  Payment Service  │  Review Service   │  Partner Service        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL (Primary)  │  Redis (Cache)  │  S3 (Media Storage)  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AUTOMATION LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  PowerShell Scrapers  │  AI Content Gen  │  Task Schedulers     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                              │
├─────────────────────────────────────────────────────────────────┤
│  OpenAI API  │  Amadeus API  │  Stripe  │  SendGrid  │  Maps    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Authentication**: NextAuth.js

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Validation**: Zod
- **Authentication**: JWT + Passport.js
- **File Upload**: Multer
- **Email**: SendGrid

### Database
- **Primary**: PostgreSQL 15
- **Cache**: Redis 7
- **Search**: Elasticsearch (Future)
- **Media Storage**: AWS S3 / DigitalOcean Spaces

### AI & Automation
- **Content Generation**: OpenAI GPT-4
- **Scraping**: PowerShell + Puppeteer
- **Scheduling**: Azure Functions / Windows Task Scheduler
- **Sentiment Analysis**: Hugging Face Transformers
- **Image Processing**: Sharp

### External APIs
- **Flights**: Amadeus API
- **Hotels**: Booking.com API
- **Payments**: Stripe
- **Email**: SendGrid
- **Maps**: Mapbox / Google Maps
- **Analytics**: Google Analytics 4

### DevOps
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Railway / DigitalOcean
- **Monitoring**: Sentry
- **Logging**: Winston + LogTail
- **Containerization**: Docker

---

## Database Schema (High-Level)

### Core Entities

**Users**
- id, email, password, name, avatar
- role (user, partner, admin)
- preferences, created_at, updated_at

**Holidays**
- id, title, slug, description, content
- location, country, region
- start_date, end_date, duration
- price, currency
- category, tags
- images, videos
- partner_id, status
- created_at, updated_at

**Bookings**
- id, user_id, holiday_id
- booking_date, travel_date
- guests, total_price
- payment_status, payment_method
- status (pending, confirmed, cancelled)
- created_at, updated_at

**Reviews**
- id, user_id, holiday_id, booking_id
- rating, title, content
- verified_purchase, helpful_count
- status (pending, approved, rejected)
- created_at, updated_at

**Partners**
- id, user_id, company_name
- description, website, contact
- commission_rate, status
- created_at, updated_at

**Payments**
- id, booking_id, user_id
- amount, currency, status
- stripe_payment_id, installment_plan
- created_at, updated_at

---

## API Structure

### REST Endpoints

```
/api/v1
├── /auth
│   ├── POST   /register
│   ├── POST   /login
│   ├── POST   /logout
│   ├── POST   /refresh
│   └── POST   /reset-password
├── /holidays
│   ├── GET    /
│   ├── GET    /:id
│   ├── POST   /
│   ├── PUT    /:id
│   ├── DELETE /:id
│   └── GET    /search
├── /bookings
│   ├── GET    /
│   ├── GET    /:id
│   ├── POST   /
│   ├── PUT    /:id
│   └── DELETE /:id
├── /reviews
│   ├── GET    /
│   ├── GET    /:id
│   ├── POST   /
│   ├── PUT    /:id
│   └── DELETE /:id
├── /users
│   ├── GET    /profile
│   ├── PUT    /profile
│   ├── GET    /bookings
│   └── GET    /reviews
├── /partners
│   ├── GET    /
│   ├── POST   /register
│   ├── GET    /dashboard
│   └── GET    /analytics
└── /payments
    ├── POST   /create-intent
    ├── POST   /confirm
    └── GET    /history
```

---

## Security Measures

### Authentication & Authorization
- JWT tokens with refresh mechanism
- Role-based access control (RBAC)
- OAuth 2.0 for social login
- Password hashing with bcrypt

### Data Protection
- HTTPS/TLS encryption
- SQL injection prevention (Prisma ORM)
- XSS protection (sanitization)
- CSRF tokens
- Rate limiting
- Input validation (Zod)

### Payment Security
- PCI DSS compliance via Stripe
- No credit card storage
- Secure payment webhooks
- Transaction logging

---

## Scalability Strategy

### Phase 1: MVP (0-1K users)
- Single server deployment
- PostgreSQL on same server
- Redis for session storage
- Vercel for frontend

### Phase 2: Growth (1K-10K users)
- Separate database server
- Redis cluster for caching
- CDN for static assets
- Load balancer

### Phase 3: Scale (10K+ users)
- Microservices architecture
- Database read replicas
- Elasticsearch for search
- Message queue (RabbitMQ)
- Horizontal scaling

---

## Monitoring & Observability

### Metrics
- API response times
- Database query performance
- Error rates
- User engagement
- Conversion rates

### Logging
- Application logs (Winston)
- Access logs (Morgan)
- Error tracking (Sentry)
- Performance monitoring (New Relic)

### Alerts
- Server downtime
- High error rates
- Payment failures
- Database issues

---

## Deployment Pipeline

```
Developer → Git Push → GitHub Actions → Tests → Build → Deploy
                                          │
                                          ├─→ Vercel (Frontend)
                                          └─→ Railway (Backend)
```

### Environments
- **Development**: Local machine
- **Staging**: Pre-production testing
- **Production**: Live environment

---

## Future Enhancements

### Phase 4 (Months 7-12)
- Mobile app (React Native)
- GraphQL API
- Real-time chat
- Video streaming
- AR/VR experiences
- Machine learning recommendations
- Multi-language support
- Multi-currency support

### Phase 5 (Year 2)
- Marketplace for horror merchandise
- Community forums
- User-generated content
- Affiliate program
- White-label solutions for partners

---

**Last Updated**: November 5, 2025