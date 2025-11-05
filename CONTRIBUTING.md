# Contributing to Eerie Escapes

Thank you for your interest in contributing to Eerie Escapes! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/dannythehat/eerie-escapes/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check existing [Issues](https://github.com/dannythehat/eerie-escapes/issues) and [Discussions](https://github.com/dannythehat/eerie-escapes/discussions)
2. Create a new discussion or issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Potential implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow code style guidelines
   - Write clear commit messages
   - Add tests for new features
   - Update documentation

4. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

5. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new holiday search filter"
   git commit -m "fix: resolve booking payment issue"
   git commit -m "docs: update API documentation"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots for UI changes

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add holiday wishlist feature
fix: resolve payment processing error
docs: update setup instructions
style: format code with prettier
refactor: optimize database queries
test: add unit tests for booking service
chore: update dependencies
```

## Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Prefer `const` over `let`, avoid `var`

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types with TypeScript

### File Naming

- Components: `PascalCase.tsx` (e.g., `HolidayCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Constants: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)

## Testing Guidelines

- Write unit tests for utilities and services
- Write integration tests for API endpoints
- Write e2e tests for critical user flows
- Aim for >80% code coverage
- Test edge cases and error scenarios

## Documentation

- Update README.md for major changes
- Document new APIs in `docs/api/`
- Add inline comments for complex logic
- Update setup guide if dependencies change

## Development Workflow

1. **Pick an issue** from the [project board](https://github.com/dannythehat/eerie-escapes/projects)
2. **Assign yourself** to avoid duplicate work
3. **Create a branch** from `main`
4. **Develop and test** your changes
5. **Submit a PR** for review
6. **Address feedback** from reviewers
7. **Merge** once approved

## Review Process

- All PRs require at least one approval
- Automated checks must pass (tests, linting)
- Maintainers will review within 48 hours
- Be responsive to feedback and questions

## Getting Help

- **Questions**: Use [GitHub Discussions](https://github.com/dannythehat/eerie-escapes/discussions)
- **Bugs**: Create an [Issue](https://github.com/dannythehat/eerie-escapes/issues)
- **Chat**: Join our Discord (link in README)

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the About page

Thank you for contributing to Eerie Escapes! 🌙🦇