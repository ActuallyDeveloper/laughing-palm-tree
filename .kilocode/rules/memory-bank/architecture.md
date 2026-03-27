# System Patterns: Exotic

## Architecture Overview

```
src/
├── app/                    # Next.js App Router (pages + API)
├── components/             # React components
│   ├── ui/                 # Reusable UI (Button, Card, Input, etc.)
│   ├── layout/             # Layout (AppShell, Sidebar, Header, MobileNav)
│   └── *.tsx               # Feature components (Feed, Profile, etc.)
├── db/                     # Database (Drizzle ORM + SQLite)
├── lib/                    # Utilities (auth, ai, actions, utils)
```

## Key Design Patterns

### 1. App Router + Server Components
Pages are Server Components that fetch data, then pass to Client Components for interactivity.

### 2. Auth Pattern
Cookie-based sessions managed in `src/lib/auth.ts`. `getSession()` reads cookies, returns user or null.

### 3. Server Actions
All mutations (register, login, ask, answer, like, follow, update profile) are in `src/lib/actions.ts` as `"use server"` functions.

### 4. Theme System
`next-themes` manages dark/light state. CSS custom properties in `globals.css` define colors. `ThemeProvider` wraps the app in `layout.tsx`.

### 5. AI Integration
`src/lib/ai.ts` calls OpenRouter API. Client components call `/api/ai/suggest` POST endpoint.

### 6. Layout Pattern
`AppShell` composes `Sidebar` (desktop), `Header` (mobile), `MobileNav` (mobile bottom). All pages wrap content in `AppShell`.

## File Naming
- Components: PascalCase (`FeedContent.tsx`, `AskForm.tsx`)
- UI primitives: PascalCase (`Button.tsx`, `Card.tsx`)
- Pages: lowercase (`page.tsx`, `layout.tsx`)
- Utilities: camelCase (`utils.ts`, `auth.ts`)
- Directories: kebab-case (`api/`, `auth/`)

## Styling Conventions
- CSS custom properties for theme colors (`var(--bg-primary)`, `var(--text-primary)`)
- Gold accent classes: `text-gold-500`, `bg-gold-500/10`, `border-gold-500/30`
- Animation classes: `animate-fade-in`, `animate-slide-up`, `gold-gradient-text`
- Responsive: `sm:`, `md:`, `lg:` breakpoints
- Glass effects: `glass-effect` class with `backdrop-filter: blur()`
