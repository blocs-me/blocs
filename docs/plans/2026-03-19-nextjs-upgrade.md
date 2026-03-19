# Next.js Upgrade Plan

Branch: `aryan/nextjs-upgrade`

## Final State
- Next.js 15.5.13
- React 19 / ReactDOM 19
- Node 18.18.0 (Volta)

## Upgrade Path (all completed)
1. **Hop 1:** Next.js 12 → 13, React 17 → 18
2. **Hop 2:** Next.js 13 → 14
3. **Hop 3:** Next.js 14 → 15, React 18 → 19

## Hop 1: Next.js 13 + React 18 — DONE

- Bumped React 17→18, Next.js 12→13
- Downgraded Supabase auth helpers to v0.10.0 bridge version (v0.15.0 removed old APIs)
- Ran `npx @next/codemod new-link` (auto-fixed 9 files)
- Switched `next/image` → `next/legacy/image` (5 files)
- Fixed Image width/height from strings to numbers (4 files)
- ~9 files still have `passHref` (harmless, just unnecessary)

## Hop 2: Next.js 14 — DONE

- No breaking changes for Pages Router
- Just a version bump

## Hop 3: Next.js 15 + React 19 — DONE

- No breaking changes for Pages Router (async APIs, server components only affect App Router)
- Supabase auth helpers v0.10.0 still works via `--legacy-peer-deps`

## Remaining / Future

- **Clean up `passHref` props** — ~9 files still have unnecessary `passHref` (no-op, low priority)
- **Migrate `next/legacy/image` → `next/image`** — New Image API has different sizing/layout model
- **Migrate `@supabase/auth-helpers-*` → `@supabase/ssr`** — Auth helpers are deprecated, but working
- **Remove `--legacy-peer-deps`** — Some packages have React 18 peer deps; update or replace them
