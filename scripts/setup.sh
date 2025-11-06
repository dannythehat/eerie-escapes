#!/bin/bash

# Eerie Escapes - Quick Setup Script
# This script sets up the development environment

set -e

echo "🌙 Eerie Escapes - Development Setup"
echo "===================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version must be 20 or higher. Current: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✅ npm $(npm -v)"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. Docker is recommended for development."
    echo "   You can install it from https://www.docker.com/products/docker-desktop"
else
    echo "✅ Docker $(docker -v | cut -d' ' -f3 | cut -d',' -f1)"
fi

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  Docker Compose is not installed"
else
    echo "✅ Docker Compose $(docker-compose -v | cut -d' ' -f4 | cut -d',' -f1)"
fi

echo ""
echo "Installing dependencies..."
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo "✅ Frontend dependencies installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..
echo "✅ Backend dependencies installed"

echo ""
echo "Setting up environment files..."

# Copy environment files
if [ ! -f frontend/.env.local ]; then
    cp frontend/.env.example frontend/.env.local
    echo "✅ Created frontend/.env.local"
else
    echo "⚠️  frontend/.env.local already exists"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
else
    echo "⚠️  backend/.env already exists"
fi

echo ""
echo "===================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo ""
echo "1. Update environment variables:"
echo "   - frontend/.env.local"
echo "   - backend/.env"
echo ""
echo "2. Start development environment:"
echo "   Option A (Docker - Recommended):"
echo "     docker-compose up -d"
echo ""
echo "   Option B (Manual):"
echo "     Terminal 1: cd backend && npm run dev"
echo "     Terminal 2: cd frontend && npm run dev"
echo ""
echo "3. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend: http://localhost:3001"
echo ""
echo "For more information, see docs/guides/local-development.md"
echo ""
