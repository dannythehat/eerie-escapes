.PHONY: help install dev build test lint clean docker-up docker-down docker-logs

# Default target
help:
	@echo "Eerie Escapes - Development Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make install        Install all dependencies"
	@echo "  make setup          Complete project setup"
	@echo ""
	@echo "Development:"
	@echo "  make dev            Start development servers"
	@echo "  make dev-frontend   Start frontend only"
	@echo "  make dev-backend    Start backend only"
	@echo ""
	@echo "Testing:"
	@echo "  make test           Run all tests"
	@echo "  make test-frontend  Run frontend tests"
	@echo "  make test-backend   Run backend tests"
	@echo "  make test-coverage  Run tests with coverage"
	@echo ""
	@echo "Quality:"
	@echo "  make lint           Run linters"
	@echo "  make format         Format code"
	@echo "  make type-check     Run TypeScript type checking"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-up      Start Docker services"
	@echo "  make docker-down    Stop Docker services"
	@echo "  make docker-logs    View Docker logs"
	@echo "  make docker-clean   Clean Docker volumes"
	@echo ""
	@echo "Database:"
	@echo "  make db-migrate     Run database migrations"
	@echo "  make db-seed        Seed database"
	@echo "  make db-reset       Reset database"
	@echo "  make db-studio      Open Prisma Studio"
	@echo ""
	@echo "Build:"
	@echo "  make build          Build all projects"
	@echo "  make clean          Clean build artifacts"

# Setup
install:
	@echo "Installing dependencies..."
	cd frontend && npm install
	cd backend && npm install
	@echo "✅ Dependencies installed"

setup: install
	@echo "Setting up project..."
	cp frontend/.env.example frontend/.env.local || true
	cp backend/.env.example backend/.env || true
	@echo "✅ Project setup complete"
	@echo "⚠️  Please update .env files with your configuration"

# Development
dev:
	@echo "Starting development servers..."
	docker-compose up

dev-frontend:
	@echo "Starting frontend..."
	cd frontend && npm run dev

dev-backend:
	@echo "Starting backend..."
	cd backend && npm run dev

# Testing
test:
	@echo "Running all tests..."
	cd frontend && npm test
	cd backend && npm test

test-frontend:
	@echo "Running frontend tests..."
	cd frontend && npm test

test-backend:
	@echo "Running backend tests..."
	cd backend && npm test

test-coverage:
	@echo "Running tests with coverage..."
	cd frontend && npm run test:coverage
	cd backend && npm run test:coverage

# Quality
lint:
	@echo "Running linters..."
	cd frontend && npm run lint
	cd backend && npm run lint

format:
	@echo "Formatting code..."
	cd frontend && npx prettier --write .
	cd backend && npx prettier --write .

type-check:
	@echo "Running type checks..."
	cd frontend && npm run type-check
	cd backend && npm run type-check

# Docker
docker-up:
	@echo "Starting Docker services..."
	docker-compose up -d
	@echo "✅ Services started"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:3001"
	@echo "pgAdmin: http://localhost:5050"
	@echo "Redis Commander: http://localhost:8081"

docker-down:
	@echo "Stopping Docker services..."
	docker-compose down

docker-logs:
	docker-compose logs -f

docker-clean:
	@echo "Cleaning Docker volumes..."
	docker-compose down -v
	docker system prune -f

# Database
db-migrate:
	@echo "Running database migrations..."
	cd backend && npx prisma migrate dev

db-seed:
	@echo "Seeding database..."
	cd backend && npm run seed

db-reset:
	@echo "Resetting database..."
	cd backend && npx prisma migrate reset

db-studio:
	@echo "Opening Prisma Studio..."
	cd backend && npx prisma studio

# Build
build:
	@echo "Building projects..."
	cd frontend && npm run build
	cd backend && npm run build
	@echo "✅ Build complete"

clean:
	@echo "Cleaning build artifacts..."
	rm -rf frontend/.next
	rm -rf frontend/out
	rm -rf backend/dist
	rm -rf frontend/node_modules
	rm -rf backend/node_modules
	@echo "✅ Clean complete"
