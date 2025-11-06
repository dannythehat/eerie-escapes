# Eerie Escapes Frontend

Next.js 14 frontend application for Eerie Escapes - Where Travel Meets Terror.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── holidays/          # Holidays pages
│   ├── about/             # About page
│   ├── partners/          # Partners page
│   └── contact/           # Contact page
├── components/            # React components
│   └── layout/           # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Navigation.tsx
├── lib/                   # Utility functions
│   └── utils.ts
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Features

- ✅ Dark horror-themed design
- ✅ Responsive layout with mobile menu
- ✅ Next.js 14 App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS with custom horror theme
- ✅ Layout components (Header, Footer, Navigation)
- ✅ Basic routing structure

## Custom Theme

The application uses a custom horror theme with:
- Blood red accent colors
- Midnight blue backgrounds
- Custom fonts (Inter + Creepster)
- Dark mode by default
- Custom scrollbar styling

## Next Steps

- Add Shadcn/ui components
- Implement search functionality
- Create holiday listing and detail pages
- Add authentication
- Integrate with backend API
