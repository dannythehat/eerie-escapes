# Eerie Escapes Backend API

Backend API for the Eerie Escapes horror-themed travel booking platform.

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 15+ with Prisma ORM
- **Authentication**: JWT
- **Logging**: Winston
- **Validation**: Joi

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Set up database**
```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with test data
npm run db:seed
```

4. **Start development server**
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

### Database
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes (dev only)
- `npm run db:migrate` - Run migrations
- `npm run db:migrate:deploy` - Deploy migrations (production)
- `npm run db:seed` - Seed database with test data
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database (⚠️ deletes all data)

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

### Testing
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   └── database.ts  # Prisma client setup
│   ├── controllers/     # Route controllers (Day 6+)
│   ├── middleware/      # Express middleware
│   │   ├── errorHandler.ts
│   │   └── notFoundHandler.ts
│   ├── models/          # Business logic models (Day 6+)
│   ├── routes/          # API routes
│   │   ├── index.ts
│   │   ├── holiday.routes.ts
│   │   ├── user.routes.ts
│   │   ├── booking.routes.ts
│   │   ├── review.routes.ts
│   │   └── partner.routes.ts
│   ├── services/        # Business logic services (Day 6+)
│   ├── utils/           # Utility functions
│   │   ├── AppError.ts  # Custom error classes
│   │   └── logger.ts    # Winston logger
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data
├── logs/                # Log files (gitignored)
├── .env.example         # Environment variables template
├── package.json
└── tsconfig.json
```

## API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Health Check
```
GET /health
```

### Holidays
```
GET    /api/v1/holidays       # Get all holidays
GET    /api/v1/holidays/:id   # Get single holiday
POST   /api/v1/holidays       # Create holiday (admin/partner)
PUT    /api/v1/holidays/:id   # Update holiday
DELETE /api/v1/holidays/:id   # Delete holiday
```

### Users
```
GET    /api/v1/users/profile  # Get user profile
PUT    /api/v1/users/profile  # Update user profile
```

### Bookings
```
GET    /api/v1/bookings       # Get user bookings
POST   /api/v1/bookings       # Create booking
```

### Reviews
```
GET    /api/v1/reviews        # Get reviews
POST   /api/v1/reviews        # Create review
```

### Partners
```
GET    /api/v1/partners       # Get partners
POST   /api/v1/partners       # Apply as partner
```

## Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - Allowed CORS origin

## Error Handling

The API uses a centralized error handling system with custom error classes:

- `BadRequestError` (400)
- `UnauthorizedError` (401)
- `ForbiddenError` (403)
- `NotFoundError` (404)
- `ConflictError` (409)
- `ValidationError` (422)
- `InternalServerError` (500)

All errors return a consistent JSON format:
```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

## Logging

Winston logger is configured with:
- Console output (colorized in development)
- File output (`logs/combined.log`, `logs/error.log`)
- Exception and rejection handlers

Log levels: `error`, `warn`, `info`, `debug`

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request throttling
- **Input Validation**: Joi validation (coming in Day 6+)
- **JWT Authentication**: Secure token-based auth (coming in Day 9)

## Database

PostgreSQL with Prisma ORM. See `prisma/schema.prisma` for full schema.

Key models:
- User, Session, Partner
- Holiday, Itinerary, Inclusion, Exclusion, Availability
- Booking, Payment
- Review, SavedHoliday

## Development Status

✅ **Day 3 Complete**: Backend Foundation
- Express.js server setup
- Middleware configuration
- Error handling
- Logging system
- Basic API structure

🔜 **Coming Next**:
- Day 4: Frontend Foundation
- Day 5: Development Workflow
- Day 6-7: Holiday API implementation
- Day 8: Search & Filter System
- Day 9-10: User Authentication & Profiles

## Contributing

See `CONTRIBUTING.md` in the root directory.

## License

MIT License - See `LICENSE` file

---

**Last Updated**: November 5, 2025
