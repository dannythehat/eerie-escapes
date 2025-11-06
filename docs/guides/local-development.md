# Local Development Setup Guide

This guide will help you set up the Eerie Escapes project for local development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **npm** 10+ (comes with Node.js)
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com/downloads))

## Quick Start with Docker (Recommended)

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/dannythehat/eerie-escapes.git
cd eerie-escapes

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Services Available

Once Docker Compose is running, you can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **pgAdmin**: http://localhost:5050 (admin@eerieescapes.com / admin)
- **Redis Commander**: http://localhost:8081

## Manual Setup (Without Docker)

### 1. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 2. Set Up Database

Install PostgreSQL 15 and create a database:

```bash
# Using psql
createdb eerie_escapes_dev

# Or using SQL
CREATE DATABASE eerie_escapes_dev;
```

### 3. Set Up Redis

Install Redis 7:

```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis

# Windows
# Download from https://redis.io/download
```

### 4. Configure Environment Variables

#### Frontend (.env.local)
```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://eerie_user:eerie_password@localhost:5432/eerie_escapes_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here
```

### 5. Run Database Migrations

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 6. Seed Database (Optional)

```bash
cd backend
npm run seed
```

### 7. Start Development Servers

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

## Development Workflow

### Running Tests

#### Frontend Tests
```bash
cd frontend
npm test                 # Run tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
```

#### Backend Tests
```bash
cd backend
npm test                 # Run tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage
```

### Linting

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run lint
```

### Type Checking

```bash
# Frontend
cd frontend
npm run type-check

# Backend
cd backend
npm run type-check
```

### Database Management

```bash
# Create a new migration
cd backend
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio (Database GUI)
npx prisma studio
```

## Project Structure

```
eerie-escapes/
├── frontend/              # Next.js frontend
│   ├── app/              # App router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── __tests__/        # Tests
├── backend/              # Express.js backend
│   ├── src/              # Source code
│   ├── prisma/           # Database schema
│   └── tests/            # Tests
├── automation/           # Automation scripts
├── docs/                 # Documentation
└── docker-compose.yml    # Docker configuration
```

## Common Issues & Solutions

### Port Already in Use

If you get "port already in use" errors:

```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>

# Or use different ports
PORT=3002 npm run dev
```

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Check DATABASE_URL in .env
3. Verify database exists: `psql -l`

### Redis Connection Issues

1. Ensure Redis is running: `redis-cli ping`
2. Check REDIS_URL in .env

### Docker Issues

```bash
# Clean up Docker
docker-compose down -v
docker system prune -a

# Rebuild containers
docker-compose up --build
```

## IDE Setup

### VS Code (Recommended)

Install these extensions:
- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
- Docker
- GitLens

### Settings

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Git Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: add feature"`
3. Push to GitHub: `git push origin feature/your-feature`
4. Create a Pull Request

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

## Getting Help

- Check the [Contributing Guide](../CONTRIBUTING.md)
- Review [API Documentation](./api/)
- Ask in GitHub Discussions
- Create an issue for bugs

## Next Steps

- Read the [Architecture Guide](./architecture/)
- Review the [API Documentation](./api/)
- Check the [Development Roadmap](../README.md#6-month-development-roadmap)
