# Blocs.me

Productivity widgets (Pomodoro timer, Habit Tracker, Water Tracker) designed to be embedded in Notion pages as iframes. Users sign up, get a personal embed URL with a token, and paste it into Notion.

## Stack

| | |
|---|---|
| **Framework** | Next.js 15 (Pages Router), React 19 |
| **Language** | Mixed JS/TS (gradual TypeScript migration) |
| **Styling** | Emotion + Rebass + styled-system |
| **Database** | Supabase (PostgreSQL) — auth + `users` table |
| **Payments** | Stripe — subscriptions + one-time purchases |
| **Deployment** | Vercel (auto-deploys from `main`) |
| **Package manager** | bun |
| **Node version** | 18.18.0 (Volta, pinned in `package.json`) |

## Setup

### Prerequisites

- [bun](https://bun.sh) — `curl -fsSL https://bun.sh/install | bash`
- [Volta](https://volta.sh) (optional but recommended for Node version pinning)

### Install

```bash
bun install
```

### Environment variables

Copy `.example.env` to `.env` and fill in values:

```bash
cp .example.env .env
```

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL=         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Supabase anon key

STRIPE_SECRET_KEY=                # Stripe secret key (use test key locally)
STRIPE_WEBHOOK_SIGNING_SECRET=    # Stripe webhook secret

JWT_SALT=                         # Secret for signing widget access tokens

VERCEL_ENV=local                  # Set to 'production' automatically by Vercel
NEXT_PUBLIC_VERCEL_ENV=local      # Same, public-facing

NEXT_PUBLIC_MAINTENANCE=          # Set to 'yes' to show maintenance page
```

> ⚠️ `.env` is not in `.gitignore`. Never commit secrets.

### Run locally

```bash
bun run dev       # Dev server at localhost:3000
bun run build     # Production build
bun run lint      # ESLint
bun test          # Jest (watch mode)
```

## Project structure

```
src/
  pages/
    api/              # API routes — auth, payments, widget data endpoints
    dashboard/        # Dashboard app (dynamic route /dashboard/[path])
    pomodoro/         # Pomodoro widget iframe page
    habit-tracker/    # Habit Tracker widget iframe page
    water-tracker/    # Water Tracker widget iframe page
    bar-chart/        # Analytics chart iframe pages
  components/
    pages/            # Page-level React components (Landing, Dashboard, Pricing, etc.)
    widgets/          # Widget components — Pomodoro, HabitTracker, WaterTracker, Analytics
    design-system/    # Shared UI primitives — Button, Text, Modal, BarChart, etc.
    helpers/          # Wrappers and providers — BlocsThemeProvider, FadeIn, Box, Flex, etc.
  lambda-functions/   # Server-side business logic (NOT AWS Lambda — just API handlers)
    lib/rest.ts       # Lightweight REST router with middleware chain
    routers/          # Route handlers per domain (auth, pomodoro, habits, water)
    middleware/       # Shared middleware — getBlocsUser, getWidgetUser, upsertBlocsUser
  hooks/              # Custom hooks — useBlocsUser, useWidgetAuth, useColorMode, etc.
  constants/          # Stripe price/product IDs, base URLs, widget type constants
  styles/             # Theme tokens, global styles, CSS reset
  icons/              # SVG icon components
```

## Architecture

### Dual auth model

- **App auth** — Supabase Auth (email/password). Used for the dashboard at `/dashboard/*`.
- **Widget auth** — Token-based. Each user's embed URL contains a `?token=` query param. The widget validates this token independently of Supabase session. Tokens are JWT-signed with `JWT_SALT`.

### Widget embed flow

1. User signs up and lands on `/dashboard`
2. Dashboard creates a widget token via `/api/auth/create-token`
3. User copies the embed URL (e.g. `https://blocs.me/pomodoro?token=xxx&role=blocs-user`)
4. User pastes it as an iframe embed in Notion
5. Widget loads, validates the token, and reads/writes data to the user's account

### Dashboard

The dashboard at `/dashboard/[path]` has three tabs: Pomodoro, Habits, Water. Each tab shows the widget preview inline (editable, data saves to DB) plus analytics and an embed URL to copy.

### API pattern

API routes in `src/pages/api/` are thin — they delegate to router handlers in `src/lambda-functions/routers/` via a custom REST router (`rest.ts`) that supports middleware chains. Middleware handles auth, user lookup, and request validation.

### Stripe

- Products: `lifestylePro` (full subscription), individual widget products, `lifetimeAccess`
- Price IDs: `src/constants/stripePriceIds.ts` (separate local vs production IDs)
- Product IDs: `src/constants/stripeProductIds.ts`
- Webhook handler: `src/pages/api/payments/webhooks.ts`

## Deployment

Pushes to `main` deploy automatically to Vercel. There is no staging environment — use a local `.env` pointing at Supabase/Stripe test keys for development.

A pre-commit hook (husky) runs `bun run test:git` (Jest, single run) before every commit.

## Known caveats

- `@supabase/auth-helpers-*` is deprecated (v0.10.0 bridge); migration to `@supabase/ssr` is a future task
- Next.js 15 `<Link>` renders its own `<a>` — don't use `as="a"` on child components inside `<Link>`
- Some packages declare React 18 peer deps; `bun install` handles this fine, `npm install` needs `--legacy-peer-deps`
