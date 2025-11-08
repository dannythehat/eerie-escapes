# 🌙 Eerie Escapes

![Eerie Escapes Logo](https://client-uploads.nyc3.digitaloceanspaces.com/images/64d1c5c7-ac87-405e-a62c-369bdf042155/2025-11-05T06-52-32-915Z-0f3103c0.jpg)

> **"Where Travel Meets Terror"** - Experience the world's most spine-chilling holidays and morbid vacations.

🚧 **Status**: In Development (Days 1-19 Complete) | 📚 [Documentation](./docs) | 🚀 [Deployment Status](./docs/DEPLOYMENT_STATUS.md) | 🐛 [Report Bug](https://github.com/dannythehat/eerie-escapes/issues)

> **Note**: The live site is not yet deployed. The application is currently in active development and can be run locally. See [Getting Started](#getting-started) for local setup instructions or check [Deployment Status](./docs/DEPLOYMENT_STATUS.md) for launch timeline.

## 📖 Table of Contents

- [Overview](#overview)
- [Mission](#mission)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [6-Month Development Roadmap](#6-month-development-roadmap)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Eerie Escapes** is a unique platform dedicated to connecting horror enthusiasts and thrill-seekers with unforgettable, immersive scare-cations worldwide. From haunted tours and crime scene investigations to macabre festivals and paranormal experiences, we curate the strangest, most eerie celebrations globally.

### What Makes Us Different?

- 🤖 **AI-Powered Content**: Automated holiday discovery and rich content generation
- 🌍 **Global Coverage**: Curated horror experiences from every corner of the world
- 💳 **Flexible Payments**: Monthly installment options for dream scare-cations
- ⭐ **Verified Reviews**: Community-driven ratings with reward incentives
- 🎫 **Direct Booking**: Seamless integration with travel and accommodation APIs

---

## 🎭 Mission

We are passionate entrepreneurs and horror enthusiasts who have spent years exploring the chilling corners of the world and the macabre stories that captivate us. Combining our experience in automation, AI, and app development with our love for spine-tingling travel, we created **EerieEscapes.com** to unite horror fans through unforgettable experiences.

**Our mission**: Bring the strangest, most eerie celebrations and holidays worldwide into one hauntingly beautiful experience, making it easy for fellow horror lovers to book their dream scares.

---

## ✨ Features

### Phase 1: MVP (Months 1-3)
- ✅ Dark horror-themed landing page with hero section
- ✅ Search functionality (location, date, theme)
- ✅ 15-20 manually curated scare-cations
- ✅ Basic holiday detail pages with galleries
- ✅ About Us and Partner information pages
- ✅ Contact forms and email capture
- ✅ SEO optimization and performance monitoring

### Phase 2: Automation (Months 4-6)
- 🔄 PowerShell scraping automation for holiday discovery
- 🤖 GPT API integration for content generation
- 🛫 Travel API connections (flights, hotels)
- 📊 Partner dashboard for listing management
- 💰 Secure booking system with payment processing

### Phase 3: Community (Future)
- 👥 User reviews and ratings system
- 🎁 Reward incentives for verified reviews
- 💬 Community forums and social features
- 🎯 AI-powered recommendation engine
- 📱 Mobile app development

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Cache**: Redis
- **Authentication**: NextAuth.js

### AI & Automation
- **Content Generation**: OpenAI GPT-4
- **Scraping**: PowerShell + Puppeteer
- **Scheduling**: Azure Functions / Windows Task Scheduler
- **Sentiment Analysis**: Hugging Face Transformers

### APIs & Integrations
- **Flights**: Amadeus API / Skyscanner API
- **Hotels**: Booking.com API
- **Payments**: Stripe (with installments)
- **Email**: SendGrid
- **Analytics**: Google Analytics 4

### DevOps
- **Hosting**: Vercel (Frontend) + Railway (Backend)
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry
- **Version Control**: Git + GitHub

---

## 📁 Project Structure

```
eerie-escapes/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions
│   ├── public/              # Static assets
│   └── styles/              # Global styles
├── backend/                 # Express.js backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── middleware/      # Custom middleware
│   └── prisma/              # Database schema
├── automation/              # PowerShell & scraping scripts
│   ├── scrapers/            # Holiday data scrapers
│   ├── content-gen/         # AI content generation
│   └── schedulers/          # Automation schedules
├── docs/                    # Documentation
│   ├── api/                 # API documentation
│   ├── architecture/        # System architecture
│   └── guides/              # Development guides
└── tests/                   # Test suites
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## 🗓️ 6-Month Development Roadmap

**Work Schedule**: 5 hours per day, 5 days per week (125 hours/month, 750 hours total)

### Month 1: Foundation & Planning (Nov 2025)

#### Week 1: Project Setup & Architecture (25 hours)
**Day 1 (5h)** - Project Initialization
- [x] Initialize Git repository
- [x] Set up project structure (frontend/backend/automation)
- [x] Configure ESLint, Prettier, TypeScript
- [x] Create development environment documentation
- [x] Set up GitHub Projects board for task tracking

**Day 2 (5h)** - Database Design
- [x] Design PostgreSQL schema (holidays, users, bookings, reviews, partners)
- [x] Create Prisma schema file
- [x] Set up database migrations
- [x] Document data relationships and constraints
- [x] Create seed data for testing

**Day 3 (5h)** - Backend Foundation
- [x] Initialize Express.js server
- [x] Set up middleware (CORS, helmet, rate limiting)
- [x] Configure environment variables
- [x] Create basic API structure
- [x] Set up error handling and logging

**Day 4 (5h)** - Frontend Foundation
- [x] Initialize Next.js 14 project
- [x] Configure Tailwind CSS
- [x] Set up Shadcn/ui components
- [x] Create layout components (Header, Footer, Navigation)
- [x] Configure routing structure

**Day 5 (5h)** - Development Workflow
- [x] Set up GitHub Actions for CI/CD
- [x] Configure testing framework (Jest + React Testing Library)
- [x] Create Docker development environment
- [x] Document local development setup
- [x] Create contribution guidelines

#### Week 2: Core Backend APIs (25 hours)
**Day 6 (5h)** - Holiday API - Part 1
- [x] Create Holiday model and controller
- [x] Implement GET /api/holidays (list with pagination)
- [x] Implement GET /api/holidays/:id (single holiday)
- [x] Add filtering by location, date, theme
- [x] Write API tests

**Day 7 (5h)** - Holiday API - Part 2
- [x] Implement POST /api/holidays (admin only)
- [x] Implement PUT /api/holidays/:id
- [x] Implement DELETE /api/holidays/:id
- [x] Add image upload functionality
- [x] Document API endpoints

**Day 8 (5h)** - Search & Filter System
- [x] Implement full-text search
- [x] Create advanced filter logic (price range, duration, difficulty)
- [x] Add sorting options (popularity, price, date)
- [x] Optimize database queries
- [x] Add search analytics tracking

**Day 9 (5h)** - User Authentication
- [x] Set up NextAuth.js
- [x] Implement email/password authentication
- [x] Add OAuth providers (Google, Facebook)
- [x] Create user registration flow
- [x] Implement password reset functionality

**Day 10 (5h)** - User Profile Management
- [x] Create user profile API endpoints
- [x] Implement profile update functionality
- [x] Add avatar upload
- [x] Create user preferences system
- [x] Build saved holidays feature

#### Week 3: Frontend Core Pages (25 hours)
**Day 11 (5h)** - Home Page - Part 1
- [x] Design hero section with dark horror theme
- [x] Create search bar component
- [x] Build featured holidays carousel
- [x] Add loading states and animations
- [x] Implement responsive design

**Day 12 (5h)** - Home Page - Part 2
- [x] Create testimonials section
- [x] Build "How It Works" section
- [x] Add newsletter signup form
- [x] Implement scroll animations
- [x] Optimize images and performance

**Day 13 (5h)** - Holiday Listing Page
- [x] Create holiday grid/list view
- [x] Build filter sidebar
- [x] Implement search functionality
- [x] Add pagination
- [x] Create holiday card component

**Day 14 (5h)** - Holiday Detail Page - Part 1
- [x] Design page layout
- [x] Create image gallery component
- [x] Build itinerary section
- [x] Add accommodation details
- [x] Implement breadcrumb navigation

**Day 15 (5h)** - Holiday Detail Page - Part 2
- [x] Create booking widget
- [x] Add "What's Included" section
- [x] Build FAQ accordion
- [x] Implement related holidays section
- [x] Add social sharing buttons

#### Week 4: Content & Polish (25 hours)
**Day 16 (5h)** - About & Partner Pages
- [ ] Create About Us page with story
- [ ] Build Partner Portal information page
- [ ] Design partner signup form
- [ ] Create contact page
- [ ] Add team section

**Day 17 (5h)** - Manual Content Curation
- [x] Research and curate 20 horror holidays
- [x] Write detailed descriptions for each
- [x] Source high-quality images
- [x] Create itineraries and day planners
- [x] Add pricing and booking information

**Day 18 (5h)** - Content Entry & Testing
- [x] Enter all 20 holidays into database
- [x] Upload and optimize images
- [x] Test all holiday detail pages
- [x] Verify search and filter functionality
- [x] Fix any bugs or issues

**Day 19 (5h)** - SEO & Performance
- [x] Implement meta tags and Open Graph
- [x] Create sitemap.xml
- [x] Add structured data (JSON-LD)
- [x] Optimize images (WebP, lazy loading)
- [x] Implement caching strategies

**Day 20 (5h)** - Testing & Bug Fixes
- [ ] Comprehensive testing of all features
- [ ] Fix identified bugs
- [ ] Test on multiple devices and browsers
- [ ] Performance optimization
- [ ] Prepare for deployment

---

### Month 2: MVP Completion & Launch (Dec 2025)

#### Week 5: Booking System Foundation (25 hours)
**Day 21 (5h)** - Booking API - Part 1
- [ ] Design booking database schema
- [ ] Create Booking model and relationships
- [ ] Implement POST /api/bookings
- [ ] Add booking validation logic
- [ ] Create booking confirmation emails

**Day 22 (5h)** - Booking API - Part 2
- [ ] Implement GET /api/bookings (user bookings)
- [ ] Add booking status management
- [ ] Create cancellation logic
- [ ] Implement booking modifications
- [ ] Add admin booking management

**Day 23 (5h)** - Payment Integration - Stripe Setup
- [ ] Set up Stripe account and API keys
- [ ] Implement Stripe checkout session
- [ ] Create payment intent flow
- [ ] Add webhook handlers
- [ ] Test payment processing

**Day 24 (5h)** - Payment Integration - Installments
- [ ] Research Stripe installment options
- [ ] Implement installment payment logic
- [ ] Create payment schedule system
- [ ] Add payment reminders
- [ ] Test installment flows

**Day 25 (5h)** - Booking Frontend - Part 1
- [ ] Create booking form component
- [ ] Build date picker with availability
- [ ] Add guest selection
- [ ] Implement price calculation
- [ ] Create booking summary

#### Week 6: Booking System Completion (25 hours)
**Day 26 (5h)** - Booking Frontend - Part 2
- [ ] Integrate Stripe Elements
- [ ] Build payment form
- [ ] Add installment option UI
- [ ] Create booking confirmation page
- [ ] Implement error handling

**Day 27 (5h)** - User Dashboard - Part 1
- [ ] Create dashboard layout
- [ ] Build upcoming bookings section
- [ ] Add past bookings history
- [ ] Create booking details modal
- [ ] Implement cancellation flow

**Day 28 (5h)** - User Dashboard - Part 2
- [ ] Add payment history section
- [ ] Create saved holidays list
- [ ] Build profile settings page
- [ ] Implement notification preferences
- [ ] Add account deletion option

**Day 29 (5h)** - Email System
- [ ] Set up SendGrid account
- [ ] Create email templates (booking confirmation, reminders, etc.)
- [ ] Implement email service
- [ ] Add email queue system
- [ ] Test all email flows

**Day 30 (5h)** - Admin Dashboard - Part 1
- [ ] Create admin authentication
- [ ] Build admin layout
- [ ] Create holiday management interface
- [ ] Add booking overview dashboard
- [ ] Implement analytics widgets

#### Week 7: Admin & Partner Features (25 hours)
**Day 31 (5h)** - Admin Dashboard - Part 2
- [ ] Build user management interface
- [ ] Create partner approval system
- [ ] Add content moderation tools
- [ ] Implement revenue analytics
- [ ] Create export functionality

**Day 32 (5h)** - Partner Portal - Part 1
- [ ] Design partner registration flow
- [ ] Create partner profile system
- [ ] Build partner dashboard
- [ ] Add listing creation form
- [ ] Implement partner verification

**Day 33 (5h)** - Partner Portal - Part 2
- [ ] Create booking management for partners
- [ ] Add revenue tracking
- [ ] Build messaging system
- [ ] Implement calendar availability
- [ ] Create partner analytics

**Day 34 (5h)** - Review System Foundation
- [ ] Design review database schema
- [ ] Create Review model
- [ ] Implement POST /api/reviews
- [ ] Add review moderation queue
- [ ] Create review display components

**Day 35 (5h)** - Review System Completion
- [ ] Build review submission form
- [ ] Add star rating component
- [ ] Implement review voting (helpful/not helpful)
- [ ] Create review rewards system
- [ ] Add review verification badges

#### Week 8: Pre-Launch Polish (25 hours)
**Day 36 (5h)** - Mobile Optimization
- [ ] Test all pages on mobile devices
- [ ] Fix responsive design issues
- [ ] Optimize touch interactions
- [ ] Improve mobile navigation
- [ ] Test mobile payment flow

**Day 37 (5h)** - Security Hardening
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Set up security headers
- [ ] Conduct security audit
- [ ] Fix identified vulnerabilities

**Day 38 (5h)** - Performance Optimization
- [ ] Analyze bundle size
- [ ] Implement code splitting
- [ ] Optimize database queries
- [ ] Add Redis caching
- [ ] Improve Core Web Vitals

**Day 39 (5h)** - Legal & Compliance
- [ ] Create Terms of Service
- [ ] Write Privacy Policy
- [ ] Add Cookie Consent
- [ ] Create Refund Policy
- [ ] Add GDPR compliance features

**Day 40 (5h)** - Final Testing & Deployment
- [ ] Comprehensive end-to-end testing
- [ ] Fix all critical bugs
- [ ] Set up production environment
- [ ] Deploy to Vercel and Railway
- [ ] Configure custom domain

---

### Month 3: Launch & Initial Marketing (Jan 2026)

#### Week 9: Soft Launch (25 hours)
**Day 41 (5h)** - Launch Preparation
- [ ] Final production checks
- [ ] Set up monitoring (Sentry, analytics)
- [ ] Create launch announcement
- [ ] Prepare social media content
- [ ] Set up customer support system

**Day 42 (5h)** - Soft Launch Execution
- [ ] Launch to limited audience
- [ ] Monitor for issues
- [ ] Collect initial feedback
- [ ] Fix urgent bugs
- [ ] Optimize based on real usage

**Day 43 (5h)** - Content Marketing - Part 1
- [ ] Create horror travel blog structure
- [ ] Write 5 blog posts (SEO-optimized)
- [ ] Design blog layout
- [ ] Implement blog CMS
- [ ] Add social sharing

**Day 44 (5h)** - Content Marketing - Part 2
- [ ] Create Instagram account
- [ ] Design 20 Instagram posts
- [ ] Create TikTok account
- [ ] Plan content calendar
- [ ] Schedule first month of posts

**Day 45 (5h)** - SEO & Marketing Setup
- [ ] Submit to Google Search Console
- [ ] Set up Google My Business
- [ ] Create backlink strategy
- [ ] Submit to travel directories
- [ ] Set up Google Ads account

#### Week 10: Marketing & Growth (25 hours)
**Day 46 (5h)** - Email Marketing
- [ ] Set up email marketing platform
- [ ] Create welcome email sequence
- [ ] Design newsletter template
- [ ] Build email list from signups
- [ ] Launch first newsletter

**Day 47 (5h)** - Partner Outreach - Part 1
- [ ] Create partner outreach list (50 targets)
- [ ] Write outreach email templates
- [ ] Design partner pitch deck
- [ ] Send first batch of outreach emails
- [ ] Track responses

**Day 48 (5h)** - Partner Outreach - Part 2
- [ ] Follow up with interested partners
- [ ] Conduct partner onboarding calls
- [ ] Help partners create listings
- [ ] Negotiate commission structures
- [ ] Sign first 3-5 partners

**Day 49 (5h)** - Influencer Marketing
- [ ] Identify horror/travel influencers
- [ ] Create influencer partnership packages
- [ ] Reach out to 20 influencers
- [ ] Negotiate collaboration terms
- [ ] Launch first influencer campaign

**Day 50 (5h)** - Analytics & Optimization
- [ ] Set up conversion tracking
- [ ] Create analytics dashboard
- [ ] Analyze user behavior
- [ ] Identify optimization opportunities
- [ ] Implement A/B testing framework

---

### Month 4: Automation & Scaling (Feb 2026)

#### Week 11: Content Automation (25 hours)
**Day 51 (5h)** - PowerShell Scraping - Part 1
- [ ] Set up PowerShell environment
- [ ] Create web scraping framework
- [ ] Build holiday discovery scrapers
- [ ] Implement data extraction logic
- [ ] Add error handling

**Day 52 (5h)** - PowerShell Scraping - Part 2
- [ ] Create image scraping functionality
- [ ] Implement data validation
- [ ] Add duplicate detection
- [ ] Create scheduling system
- [ ] Test scraping workflows

**Day 53 (5h)** - GPT Content Generation - Part 1
- [ ] Set up OpenAI API integration
- [ ] Create content generation prompts
- [ ] Implement description generation
- [ ] Add itinerary generation
- [ ] Test content quality

**Day 54 (5h)** - GPT Content Generation - Part 2
- [ ] Create FAQ generation
- [ ] Implement SEO optimization
- [ ] Add content review workflow
- [ ] Create batch processing
- [ ] Test automation pipeline

**Day 55 (5h)** - Automation Integration
- [ ] Connect scraping to database
- [ ] Implement content approval flow
- [ ] Create admin review interface
- [ ] Add automation monitoring
- [ ] Test end-to-end automation

#### Week 12: Travel API Integration (25 hours)
**Day 56 (5h)** - Flight API Integration
- [ ] Research flight APIs (Amadeus/Skyscanner)
- [ ] Set up API credentials
- [ ] Implement flight search
- [ ] Add price comparison
- [ ] Create booking flow

**Day 57 (5h)** - Hotel API Integration
- [ ] Set up Booking.com API
- [ ] Implement hotel search
- [ ] Add accommodation filtering
- [ ] Create booking integration
- [ ] Test hotel workflows

**Day 58 (5h)** - Package Creation
- [ ] Build package builder interface
- [ ] Implement flight + hotel bundling
- [ ] Add pricing calculations
- [ ] Create package management
- [ ] Test package bookings

**Day 59 (5h)** - Travel Integration Polish
- [ ] Optimize API performance
- [ ] Add caching for searches
- [ ] Implement error handling
- [ ] Create fallback options
- [ ] Test edge cases

**Day 60 (5h)** - Travel Features Testing
- [ ] Comprehensive travel API testing
- [ ] Fix integration bugs
- [ ] Optimize user experience
- [ ] Add loading states
- [ ] Document travel features

---

### Month 5: Advanced Features (Mar 2026)

#### Week 13-16: Advanced Features
- Community features
- Advanced analytics
- Mobile app planning
- Performance optimization
- Security enhancements

---

### Month 6: Launch & Growth (Apr 2026)

#### Week 17-20: Full Launch
- Public launch
- Marketing campaigns
- Partner expansion
- User acquisition
- Continuous improvement

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 15
- Redis 7
- Docker (optional)

### Quick Start

```bash
# Clone repository
git clone https://github.com/dannythehat/eerie-escapes.git
cd eerie-escapes

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Set up environment variables
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Start with Docker
docker-compose up -d

# Or start manually
cd backend && npm run dev  # Terminal 1
cd frontend && npm run dev # Terminal 2
```

Visit http://localhost:3000

For detailed setup instructions, see [docs/guides/local-development.md](docs/guides/local-development.md)

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with 🦇 by horror enthusiasts, for horror enthusiasts**
