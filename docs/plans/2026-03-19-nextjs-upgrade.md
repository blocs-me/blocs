# Next.js Upgrade Plan

Branch: `aryan/nextjs-upgrade`

## Current State
- Next.js 12.3.4
- React 17.0.2 / ReactDOM 17.0.2
- Node 18.18.0 (Volta)

## Upgrade Path
1. **Hop 1:** Next.js 12 → 13, React 17 → 18 (this doc)
2. **Hop 2:** Next.js 13 → 14 (minimal changes, mostly stable)
3. **Hop 3:** Next.js 14 → 15, React 18 → 19 (bigger, future)

## Hop 1: Next.js 13 + React 18

### Breaking Changes to Address

**1. `<Link>` no longer needs `<a>` child**
Next.js 13 `<Link>` renders its own `<a>`. Wrapping `<a>` inside `<Link>` causes double anchors.
- Remove `<a>` children from `<Link>` components
- Remove `passHref` props (no longer needed)
- Move `className`, `style`, `onClick` etc from `<a>` to `<Link>`
- ~18 files affected

**2. `next/image` → `next/legacy/image`**
The old `Image` component behavior moved to `next/legacy/image`. New `next/image` has different API.
- 5 files use `next/image` — switch to `next/legacy/image` for now (safe migration path)
- Can modernize to new `next/image` API later

**3. React 18 — `createRoot`**
React 18 uses `createRoot` instead of `ReactDOM.render`. Next.js handles this internally for pages, but check for any manual `ReactDOM.render` calls.

**4. `@supabase/auth-helpers-*` compatibility**
- Current: `@supabase/auth-helpers-nextjs@0.5.2`, `auth-helpers-react@0.3.1`
- These old versions may not work with React 18
- Upgrade to latest compatible versions

**5. `next-seo` and `next-sitemap`**
- `next-seo@5.x` should work with Next 13
- `next-sitemap@2.x` may need bump to v3+

### Execution Order
1. Bump React 17 → 18, ReactDOM 17 → 18
2. Bump Next.js 12 → 13
3. Bump Supabase auth helpers to React 18 compatible versions
4. Run codemods: `npx @next/codemod@latest new-link ./src`
5. Fix `next/image` → `next/legacy/image`
6. Fix any remaining build errors
7. Test locally
