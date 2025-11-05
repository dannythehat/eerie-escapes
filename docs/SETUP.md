# Development Environment Setup Guide

## Prerequisites

Before starting development on Eerie Escapes, ensure you have the following installed:

### Required Software

1. **Node.js** (v20.x or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **npm** or **pnpm** (comes with Node.js)
   - Verify: `npm --version`
   - Optional: Install pnpm: `npm install -g pnpm`

3. **PostgreSQL** (v15 or higher)
   - Download from [postgresql.org](https://www.postgresql.org/download/)
   - Verify: `psql --version`

4. **Redis** (v7 or higher)
   - Download from [redis.io](https://redis.io/download)
   - Verify: `redis-cli --version`

5. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify: `git --version`

6. **PowerShell** (v7 or higher) - For automation scripts
   - Download from [github.com/PowerShell/PowerShell](https://github.com/PowerShell/PowerShell)
   - Verify: `pwsh --version`

### Optional but Recommended

- **Docker** - For containerized development
- **VS Code** - Recommended IDE with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - Prisma
  - PowerShell

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dannythehat/eerie-escapes.git
cd eerie-escapes
```

### 2. Set Up PostgreSQL Database

```bash
# Create database
createdb eerie_escapes_dev

# Create test database
createdb eerie_escapes_test
```

### 3. Set Up Redis

```bash
# Start Redis server
redis-server

# Or with Docker
docker run -d -p 6379:6379 redis:7-alpine
```

### 4. Environment Variables

Create `.env` files in both frontend and backend directories:

#### Backend `.env`

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eerie_escapes_dev"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRES_IN="7d"

# API Keys (to be added later)
OPENAI_API_KEY=""
AMADEUS_API_KEY=""
AMADEUS_API_SECRET=""
STRIPE_SECRET_KEY=""
SENDGRID_API_KEY=""

# Server
PORT=3001
NODE_ENV="development"

# Frontend URL
FRONTEND_URL="http://localhost:3000"
```

#### Frontend `.env.local`

```env
# API
NEXT_PUBLIC_API_URL="http://localhost:3001/api"

# Stripe (public key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# Analytics
NEXT_PUBLIC_GA_ID=""
```

### 5. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Return to root
cd ..
```

---

## Development Workflow

### Running the Development Servers

#### Backend (Port 3001)

```bash
cd backend
npm run dev
```

#### Frontend (Port 3000)

```bash
cd frontend
npm run dev
```

### Database Management

```bash
cd backend

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Seed database
npm run seed
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type check
npm run type-check
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

---

## Project Structure

```
eerie-escapes/
├── frontend/                 # Next.js frontend
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities
│   ├── public/              # Static files
│   └── styles/              # CSS/Tailwind
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   └── utils/           # Helper functions
│   └── prisma/              # Database schema
├── automation/              # Scraping & AI
│   ├── scrapers/            # PowerShell scrapers
│   ├── content-gen/         # AI content generation
│   └── schedulers/          # Task scheduling
├── docs/                    # Documentation
└── tests/                   # Test suites
```

---

## Common Commands

### Development

```bash
# Start all services (requires Docker)
docker-compose up

# Start backend only
cd backend && npm run dev

# Start frontend only
cd frontend && npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database

```bash
# Generate Prisma client
npx prisma generate

# View database in browser
npx prisma studio

# Create migration
npx prisma migrate dev

# Apply migrations
npx prisma migrate deploy
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Commit changes
git add .
git commit -m "feat: your feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create pull request on GitHub
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Issues

```bash
# Check PostgreSQL is running
pg_isready

# Restart PostgreSQL
# macOS: brew services restart postgresql
# Linux: sudo systemctl restart postgresql
# Windows: Restart PostgreSQL service
```

### Redis Connection Issues

```bash
# Check Redis is running
redis-cli ping

# Should return: PONG

# Restart Redis
# macOS: brew services restart redis
# Linux: sudo systemctl restart redis
# Windows: Restart Redis service
```

### Node Modules Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with pnpm
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Next Steps

1. ✅ Complete Day 1 setup tasks
2. Move to Day 2: Database Design
3. Start building core features
4. Track progress in GitHub Projects

---

## Support

- **Issues**: [GitHub Issues](https://github.com/dannythehat/eerie-escapes/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dannythehat/eerie-escapes/discussions)
- **Email**: dev@eerieescapes.com

---

**Happy Coding! 🌙🦇**