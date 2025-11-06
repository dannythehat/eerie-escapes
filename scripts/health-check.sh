#!/bin/bash

# Eerie Escapes - Health Check Script
# Checks if all services are running correctly

set -e

echo "🌙 Eerie Escapes - Health Check"
echo "==============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check frontend
echo -n "Checking frontend (http://localhost:3000)... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${RED}❌ Not responding${NC}"
fi

# Check backend
echo -n "Checking backend (http://localhost:3001)... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${RED}❌ Not responding${NC}"
fi

# Check PostgreSQL
echo -n "Checking PostgreSQL (localhost:5432)... "
if nc -z localhost 5432 2>/dev/null; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${RED}❌ Not responding${NC}"
fi

# Check Redis
echo -n "Checking Redis (localhost:6379)... "
if nc -z localhost 6379 2>/dev/null; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${RED}❌ Not responding${NC}"
fi

# Check pgAdmin
echo -n "Checking pgAdmin (http://localhost:5050)... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:5050 | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${YELLOW}⚠️  Not running (optional)${NC}"
fi

# Check Redis Commander
echo -n "Checking Redis Commander (http://localhost:8081)... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8081 | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ Running${NC}"
else
    echo -e "${YELLOW}⚠️  Not running (optional)${NC}"
fi

echo ""
echo "==============================="
echo "Health check complete!"
echo ""
