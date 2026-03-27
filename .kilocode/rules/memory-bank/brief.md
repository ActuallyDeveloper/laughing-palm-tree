# Project Brief: Exotic

## Purpose

Exotic is an AI-powered anonymous/unanonymous Q&A social platform. Users create profiles, receive questions from others (anonymously or openly), and answer them on a public feed. Think Tellonym, CuriousCat, or Ask.fm with modern design and AI assistance.

## Target Users

- Anyone who wants to receive and answer questions publicly
- Users who want to ask questions anonymously
- People looking for social Q&A interaction

## Core Features

### Must Have
- User registration and authentication
- Profile pages with Q&A history
- Anonymous and named question sending
- Question inbox and answering
- Public feed of answered questions
- Like system for answers
- Follow system for users
- Dark/light theme with gold accents
- Responsive design (desktop, tablet, mobile)
- AI-powered answer suggestions via OpenRouter

### Nice to Have
- Real-time notifications
- Image/avatar uploads
- Question categories/tags
- Share links with QR codes

## Key Requirements

- Package manager: Bun
- Framework: Next.js 16 + React 19 + Tailwind CSS 4
- Database: SQLite via Drizzle ORM
- Auth: Cookie-based session management
- AI: OpenRouter API integration
- Themes: #000000 dark, #ffffff light, #D4AF37 gold accents

## Success Metrics

- Clean typecheck and lint passes
- Responsive across all breakpoints
- Smooth theme transitions
- Functional auth flow
- Working Q&A with anonymous support
- AI suggestions return useful text
