# Active Context: Exotic Q&A Platform

## Current State

**Status**: Full application built and operational

## Recently Completed

- [x] Full Next.js 16 App Router application "Exotic"
- [x] SQLite database via Drizzle ORM (users, questions, answers, likes, follows)
- [x] Cookie-based authentication (register, login, logout, sessions)
- [x] Dark (#000000) and Light (#ffffff) theme system with gold (#D4AF37) accents
- [x] 18 custom animated SVG icon components
- [x] Responsive layout: desktop sidebar, mobile header + bottom nav
- [x] Landing page for unauthenticated users
- [x] Auth pages: login, register
- [x] Home/Feed page with answered questions and likes
- [x] Explore page to discover users
- [x] Ask page (`/ask/[username]`) for anonymous/named questions
- [x] Inbox page to answer received questions
- [x] Profile page with Q&A history, follow, stats
- [x] Settings page: profile edit, theme switcher, logout
- [x] Notifications placeholder page
- [x] OpenRouter AI answer suggestions (via `/api/ai/suggest`)
- [x] API routes: auth session, users, questions, AI
- [x] Database migrations generated
- [x] TypeScript typecheck passing
- [x] ESLint passing

## Current File Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout with ThemeProvider
│   ├── page.tsx                 # Landing or Feed (conditional)
│   ├── globals.css              # Theme variables, animations, gold accents
│   ├── favicon.ico
│   ├── auth/
│   │   ├── login/page.tsx       # Login form
│   │   └── register/page.tsx    # Registration form
│   ├── explore/page.tsx         # Discover users
│   ├── inbox/page.tsx           # Unanswered questions
│   ├── notifications/page.tsx   # Notifications placeholder
│   ├── settings/page.tsx        # Profile + theme settings
│   ├── profile/[username]/page.tsx  # User profiles
│   ├── ask/[username]/page.tsx  # Send questions
│   └── api/
│       ├── ai/suggest/route.ts  # OpenRouter AI suggestions
│       ├── auth/session/route.ts
│       ├── users/[username]/route.ts
│       └── questions/route.ts
├── components/
│   ├── icons.tsx                # 18 animated SVG icons
│   ├── ThemeProvider.tsx        # next-themes provider
│   ├── LandingContent.tsx       # Marketing page
│   ├── FeedContent.tsx          # Feed with likes
│   ├── ExploreContent.tsx       # User discovery
│   ├── AskForm.tsx              # Question form + AI suggest
│   ├── InboxContent.tsx         # Answer questions + AI help
│   ├── ProfileContent.tsx       # Profile display
│   ├── SettingsContent.tsx      # Settings + theme toggle
│   ├── layout/
│   │   ├── AppShell.tsx         # Main layout wrapper
│   │   ├── Sidebar.tsx          # Desktop sidebar
│   │   ├── MobileNav.tsx        # Mobile bottom nav
│   │   └── Header.tsx           # Mobile header
│   └── ui/
│       ├── Button.tsx, Input.tsx, Textarea.tsx
│       ├── Card.tsx, Avatar.tsx, Badge.tsx
│       ├── Toggle.tsx, Spinner.tsx
├── db/
│   ├── schema.ts                # 5 tables
│   ├── index.ts                 # DB client
│   ├── migrate.ts               # Migration runner
│   └── migrations/              # Generated SQL
└── lib/
    ├── utils.ts                 # cn, formatDate, truncate
    ├── auth.ts                  # Session management
    ├── ai.ts                    # OpenRouter integration
    └── actions.ts               # Server actions
```

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with Next.js 16 base setup |
| Current | Built full Exotic Q&A platform with auth, DB, themes, AI |
