# Contributing to Eerie Escapes

Thank you for your interest in contributing to Eerie Escapes! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences
- No harassment, discrimination, or inappropriate behavior

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js 20+ installed
- Docker & Docker Compose (for local development)
- Git configured with your GitHub account
- Read the [Local Development Guide](docs/guides/local-development.md)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/eerie-escapes.git
   cd eerie-escapes
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/dannythehat/eerie-escapes.git
   ```

4. **Start development environment**
   ```bash
   docker-compose up -d
   ```

5. **Verify setup**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001
   - Run tests: `npm test`

## How to Contribute

### Reporting Bugs

1. **Search existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos if applicable
   - Environment details (OS, browser, Node version)
   - Error messages and stack traces

**Bug Report Template:**
```markdown
**Description**
A clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Node: [e.g., 20.10.0]
```

### Suggesting Features

1. **Check existing discussions** and issues
2. **Create a feature request** with:
   - Clear description of the feature
   - Problem it solves
   - Proposed solution
   - Alternative solutions considered
   - Use cases and benefits

### Pull Requests

#### Before You Start

1. **Check the roadmap** in README.md
2. **Discuss major changes** in an issue first
3. **Assign yourself** to avoid duplicate work
4. **Keep PRs focused** - one feature/fix per PR

#### PR Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**
   - Follow code style guidelines
   - Write clear, descriptive commit messages
   - Add tests for new features
   - Update documentation
   - Keep commits atomic and logical

3. **Test thoroughly**
   ```bash
   # Frontend
   cd frontend
   npm run lint
   npm run type-check
   npm test

   # Backend
   cd backend
   npm run lint
   npm run type-check
   npm test
   ```

4. **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Use a clear, descriptive title
   - Fill out the PR template completely
   - Reference related issues (#123)
   - Add screenshots for UI changes
   - Request review from maintainers

#### PR Requirements

- ✅ All tests pass
- ✅ No linting errors
- ✅ Type checking passes
- ✅ Code coverage maintained/improved
- ✅ Documentation updated
- ✅ Commit messages follow convention
- ✅ No merge conflicts

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, semicolons, etc.)
- `refactor:` Code refactoring (no functional changes)
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks (dependencies, build, etc.)
- `ci:` CI/CD changes
- `revert:` Revert a previous commit

### Scopes (Optional)

- `frontend` - Frontend changes
- `backend` - Backend changes
- `api` - API changes
- `db` - Database changes
- `auth` - Authentication
- `ui` - UI components

### Examples

```bash
feat(frontend): add holiday wishlist feature
fix(api): resolve payment processing timeout
docs: update API documentation for bookings
style(frontend): format components with prettier
refactor(backend): optimize database queries
test(api): add integration tests for booking flow
chore: update dependencies to latest versions
ci: add automated deployment workflow
```

### Breaking Changes

For breaking changes, add `BREAKING CHANGE:` in the footer:

```
feat(api): change booking response format

BREAKING CHANGE: Booking API now returns ISO dates instead of timestamps
```

## Code Style Guidelines

### General Principles

- Write clean, readable, maintainable code
- Follow DRY (Don't Repeat Yourself)
- Keep functions small and focused
- Use meaningful names for variables and functions
- Comment complex logic, not obvious code
- Prefer composition over inheritance

### TypeScript/JavaScript

```typescript
// ✅ Good
const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// ❌ Bad
const calc = (i: any) => {
  let t = 0
  for (let x = 0; x < i.length; x++) {
    t = t + i[x].p * i[x].q
  }
  return t
}
```

### React Components

```typescript
// ✅ Good - Functional component with proper types
interface HolidayCardProps {
  holiday: Holiday
  onBook: (id: string) => void
}

export function HolidayCard({ holiday, onBook }: HolidayCardProps) {
  return (
    <div className="holiday-card">
      <h3>{holiday.title}</h3>
      <button onClick={() => onBook(holiday.id)}>Book Now</button>
    </div>
  )
}

// ❌ Bad - No types, unclear naming
export function Card(props: any) {
  return <div onClick={props.click}>{props.data.t}</div>
}
```

### File Organization

```
components/
├── layout/           # Layout components
│   ├── Header.tsx
│   └── Footer.tsx
├── ui/              # Reusable UI components
│   ├── Button.tsx
│   └── Card.tsx
└── features/        # Feature-specific components
    └── holidays/
        ├── HolidayCard.tsx
        └── HolidayList.tsx
```

### Naming Conventions

- **Components**: `PascalCase` (e.g., `HolidayCard.tsx`)
- **Utilities**: `camelCase` (e.g., `formatDate.ts`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_ENDPOINTS.ts`)
- **Hooks**: `use` prefix (e.g., `useHolidays.ts`)
- **Types/Interfaces**: `PascalCase` (e.g., `Holiday`, `BookingRequest`)

## Testing Guidelines

### Test Coverage

- Aim for >80% code coverage
- Test critical paths thoroughly
- Test edge cases and error scenarios
- Mock external dependencies

### Frontend Tests

```typescript
// Component test
import { render, screen, fireEvent } from '@testing-library/react'
import { HolidayCard } from './HolidayCard'

describe('HolidayCard', () => {
  it('renders holiday information', () => {
    const holiday = { id: '1', title: 'Haunted Tour', price: 99 }
    render(<HolidayCard holiday={holiday} onBook={jest.fn()} />)
    
    expect(screen.getByText('Haunted Tour')).toBeInTheDocument()
  })

  it('calls onBook when button clicked', () => {
    const onBook = jest.fn()
    const holiday = { id: '1', title: 'Haunted Tour', price: 99 }
    render(<HolidayCard holiday={holiday} onBook={onBook} />)
    
    fireEvent.click(screen.getByText('Book Now'))
    expect(onBook).toHaveBeenCalledWith('1')
  })
})
```

### Backend Tests

```typescript
// API endpoint test
describe('GET /api/holidays', () => {
  it('returns list of holidays', async () => {
    const response = await request(app).get('/api/holidays')
    
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('holidays')
    expect(Array.isArray(response.body.holidays)).toBe(true)
  })

  it('filters holidays by location', async () => {
    const response = await request(app)
      .get('/api/holidays')
      .query({ location: 'Romania' })
    
    expect(response.status).toBe(200)
    expect(response.body.holidays.every(h => h.location === 'Romania')).toBe(true)
  })
})
```

## Documentation

### Code Documentation

```typescript
/**
 * Calculates the total price for a booking including taxes and fees
 * 
 * @param basePrice - The base price of the holiday
 * @param guests - Number of guests
 * @param options - Additional booking options
 * @returns Total price including all fees
 * 
 * @example
 * const total = calculateBookingTotal(500, 2, { insurance: true })
 * // Returns: 1150 (500 * 2 + taxes + insurance)
 */
export function calculateBookingTotal(
  basePrice: number,
  guests: number,
  options: BookingOptions
): number {
  // Implementation
}
```

### API Documentation

Update `docs/api/` when adding/changing endpoints:

```markdown
## GET /api/holidays/:id

Get details for a specific holiday.

**Parameters:**
- `id` (string, required) - Holiday ID

**Response:**
```json
{
  "id": "123",
  "title": "Haunted Castle Tour",
  "description": "...",
  "price": 99.99
}
```

**Errors:**
- `404` - Holiday not found
- `500` - Server error
```

## Review Process

### For Contributors

1. **Self-review** your code before submitting
2. **Respond promptly** to review feedback
3. **Make requested changes** or discuss alternatives
4. **Keep PR updated** with main branch
5. **Be patient** - reviews may take 24-48 hours

### For Reviewers

1. **Be constructive** and respectful
2. **Explain reasoning** for requested changes
3. **Approve** when requirements are met
4. **Test locally** for complex changes

## Release Process

1. Version bump following [Semantic Versioning](https://semver.org/)
2. Update CHANGELOG.md
3. Create release notes
4. Tag release in Git
5. Deploy to production

## Getting Help

- **Questions**: [GitHub Discussions](https://github.com/dannythehat/eerie-escapes/discussions)
- **Bugs**: [GitHub Issues](https://github.com/dannythehat/eerie-escapes/issues)
- **Documentation**: [docs/](docs/)
- **Setup Help**: [Local Development Guide](docs/guides/local-development.md)

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the About page
- Invited to contributor events

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Eerie Escapes! 🌙🦇
