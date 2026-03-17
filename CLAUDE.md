# Blocs.me

Notion-embeddable productivity widgets (Pomodoro timer, Habit Tracker, Water Tracker).
Acquired March 2026 for $300. ~17 paying customers, ~$30 MRR.

## Stack

- **Framework:** Next.js 12 (Pages Router) with React 17
- **Language:** Mixed JS/TS (gradual TypeScript migration in progress)
- **Styling:** Emotion + Rebass + styled-system
- **Database:** Supabase (PostgreSQL) — auth + custom `users` table
- **Payments:** Stripe (subscriptions + one-time purchases)
- **Email:** SendGrid (needs API key swap to Aryan's account)
- **Analytics:** Self-hosted Plausible at analytics.aryanbhasin.com (migration pending)
- **Deployment:** Vercel (free plan) — new project needed
- **Domain:** blocs.me (transferred from Namecheap)
- **Node version:** 16.15.0 (via Volta, specified in package.json)
- **Package manager:** npm (package-lock.json present; yarn.lock also exists)

## Project Structure

```
src/
  pages/              # Next.js pages (routes)
    api/              # API routes (auth, payments, widget endpoints, pomodoro, users)
    dashboard/        # Dashboard (dynamic route: [path].tsx)
    pomodoro/         # Pomodoro widget page
    water-tracker/    # Water tracker widget page
    habit-tracker/    # Habit tracker widget page
    bar-chart/        # Analytics chart pages
  components/
    pages/            # Page-level components (LandingPage, Dashboard, PricingPage, etc.)
    widgets/          # Widget components (Pomodoro, WaterTracker, HabitTracker, Analytics)
    design-system/    # Reusable UI (Button, Text, Box, Modal, BarChart, etc.)
    helpers/          # Providers (SupabaseAuthProvider, BlocsThemeProvider, etc.)
  lambda-functions/   # Backend logic (NOT actual AWS lambdas — just API route handlers)
    helpers/          # Supabase client, Stripe utils, auth helpers, subscription checker
    lib/rest.ts       # Custom REST router with middleware support
    routers/          # Route handlers (auth, pomodoro, water-tracker, habit-tracker)
    middleware/       # getBlocsUser, getWidgetUser, upsertBlocsUser
  hooks/              # Custom React hooks (useBlocsUser, useWidgetAuth, useColorMode, etc.)
  constants/          # Config (Stripe price/product IDs, base URL, widget types)
  contexts/           # React context (GlobalContextProvider)
  services/           # fetchWithToken helper
  styles/             # Theme, global styles, reset
  icons/              # SVG icon components
```

## Architecture

### Auth Model (Dual)
- **App auth:** Supabase Auth (email/password) — wraps pages with `SupabaseAuthProvider`
- **Widget auth:** Token-based — widgets embedded in Notion use access tokens passed via URL query params. Separate from app auth.

### API Pattern
Custom REST framework in `src/lambda-functions/lib/rest.ts` with middleware chain. API routes in `src/pages/api/` delegate to router handlers in `src/lambda-functions/routers/`.

### Widget Embed Flow
Users sign up -> dashboard -> copy widget embed URL (with token) -> paste as iframe in Notion page. Widgets authenticate independently via token validation.

### Stripe Integration
- Products: lifestylePro (main subscription), individual widgets, lifetimeAccess
- Price IDs in `src/constants/stripePriceIds.ts` (separate local/production IDs)
- Product IDs in `src/constants/stripeProductIds.ts`
- Webhook handler at `/api/payments/webhooks.ts`

## Commands

```bash
npm run dev          # Local dev server (localhost:3000)
npm run build        # Production build (runs next-sitemap postbuild)
npm run lint         # ESLint
npm test             # Jest (watch mode)
npm run test:git     # Jest (single run, used in pre-commit hook)
```

## Environment Variables

See `.example.env` for required vars. Key ones:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase connection
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SIGNING_SECRET` — Stripe
- `JWT_SALT` — JWT signing for widget tokens
- `VERCEL_ENV` / `NEXT_PUBLIC_VERCEL_ENV` — Environment detection (production/local)
- `NEXT_PUBLIC_MAINTENANCE` — Feature flag to show maintenance page

**Important:** `.env` is NOT in `.gitignore`. Do not commit secrets. Add `.env` to `.gitignore`.

## Setup Status (Post-Acquisition)

See `docs/blocs-acquisition-context.md` for full acquisition context and checklist.

### Done
- GitHub repo transferred
- Supabase transferred to Aryan's org
- Stripe ownership transferred
- Domain transferred

### TODO
- Create new Vercel project, deploy, point DNS
- Swap SendGrid API key to Aryan's account
- Set up Plausible tracking (self-hosted at analytics.aryanbhasin.com)
- Cancel 3 zombie past-due Stripe subscriptions
- Add `.env` to `.gitignore`
- Update SEO config (still references @__moniet Twitter handle)
