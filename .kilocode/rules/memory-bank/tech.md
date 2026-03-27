# Technical Context: Exotic

## Technology Stack

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 16.x    | React framework with App Router |
| React        | 19.x    | UI library                      |
| TypeScript   | 5.9.x   | Type-safe JavaScript            |
| Tailwind CSS | 4.x     | Utility-first CSS               |
| Bun          | Latest  | Package manager & runtime       |
| Drizzle ORM  | 0.45.x  | PostgreSQL ORM                   |
| postgres     | 3.x     | PostgreSQL driver (postgres.js)   |
| next-themes  | 0.4.x   | Dark/light theme management      |
| bcryptjs     | 3.x     | Password hashing                 |
| uuid         | 13.x    | Session token generation         |

## Development Commands

```bash
bun install        # Install dependencies
bun dev            # Start dev server (http://localhost:3000)
bun build          # Production build
bun start          # Start production server
bun lint           # Run ESLint
bun typecheck      # Run TypeScript type checking
bun db:generate    # Generate Drizzle migrations
bun db:migrate     # Run migrations (auto in sandbox)
```

## Environment Variables

Set in `.env.local`:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Supabase PostgreSQL connection string |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI suggestions |
| `NEXT_PUBLIC_APP_URL` | App URL for OpenRouter referer header |

## Database

PostgreSQL via Supabase, using `postgres` (postgres.js) driver with Drizzle ORM.

5 tables: `users`, `questions`, `answers`, `likes`, `follows`

- **users**: id, username, displayName, email, passwordHash, bio, avatarUrl, allowAnonymous, createdAt
- **questions**: id, content, authorId (nullable for anon), isAnonymous, recipientId, createdAt
- **answers**: id, content, questionId, authorId, isAiGenerated, createdAt
- **likes**: id, userId, answerId, createdAt
- **follows**: id, followerId, followingId, createdAt

## Key Patterns

- Server Components by default, `"use client"` for interactivity
- Server Actions in `src/lib/actions.ts` for mutations
- Cookie-based auth with `src/lib/auth.ts`
- OpenRouter AI via `src/lib/ai.ts` and `/api/ai/suggest`
- Theme via `next-themes` with CSS custom properties
