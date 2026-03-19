# Water Tracker & Habit Tracker — Dedicated Pages + Demo Fixes

## Goal

Apply the same pattern from the Pomodoro revamp (PR #86) to Water Tracker and Habit Tracker:
1. Create dedicated marketing/SEO pages (`/water-tracker-widget`, `/habit-tracker-widget`)
2. Fix demo pages to replace `DemoBanner` with "Powered by Blocs" branding
3. Add "Try the free X" links from landing page sections

## Current State

Both widgets follow the same architecture as Pomodoro did pre-revamp:
- **Demo mode** (`/water-tracker`, `/habit-tracker` without token): Shows `DummyX` + `DemoBanner` (fixed banner at bottom linking to /pricing)
- **Authenticated mode**: Full widget with settings, analytics, etc.
- **Landing page sections**: Auto-animating dummy components

Key difference from Pomodoro: Water Tracker and Habit Tracker don't need the same UX overhaul (mode tabs, settings popover). Their existing hamburger menus work fine since they're simpler widgets. We're only doing marketing pages + demo cleanup.

## Implementation

### Step 1: Water Tracker Demo Cleanup

**File: `src/pages/water-tracker/[[...path]].tsx`**
- Replace `DemoBanner` with `PoweredByBlocs` component (links to `/water-tracker-widget`)
- Remove auto-start useEffect (progress auto-increments to 1 on load — remove this, start at 0)
- Keep the interactive up/down buttons

### Step 2: Habit Tracker Demo Cleanup

**File: `src/pages/habit-tracker/[[...path]].tsx`**
- Replace `DemoBanner` with `PoweredByBlocs` component (links to `/habit-tracker-widget`)
- Demo data is fine as-is (5 sample habits, 2 checked)

### Step 3: Water Tracker Marketing Page

**File: `src/pages/water-tracker-widget.tsx`**

Structure (mirroring `/pomodoro-timer`):
- **SEO**: Title "Free Water Tracker for Notion — Blocs", canonical, OG tags
- **Hero**: H1 + subtitle + iframe embed of `/water-tracker` + "Copy Widget URL" CTA + "How to Embed" link
- **How It Works**: 3-step cards (Copy → Paste in Notion → Track)
- **Embed Guide**: Reuse the `/pomodoro-guide.gif` (same embed flow) or `/notion-embed.png`
- **Why Track Water**: 3 benefit cards (Stay Hydrated, Build the Habit, See Your Progress)
- **FAQs**: 5-6 widget-specific FAQs with JSON-LD
- **Pro CTA**: Focus Pro upsell

Widget URL to copy: `https://blocs.me/water-tracker`

### Step 4: Habit Tracker Marketing Page

**File: `src/pages/habit-tracker-widget.tsx`**

Same structure:
- **SEO**: Title "Free Habit Tracker for Notion — Blocs"
- **Hero**: iframe embed of `/habit-tracker` + "Copy Widget URL" + "How to Embed"
- **How It Works**: 3-step cards (Copy → Paste in Notion → Build Habits)
- **Embed Guide**: Same GIF/image
- **Why Track Habits**: 3 benefit cards (Consistency, Streaks, Accountability)
- **FAQs**: 5-6 widget-specific FAQs with JSON-LD
- **Pro CTA**: Focus Pro upsell

Widget URL to copy: `https://blocs.me/habit-tracker`

### Step 5: Landing Page Links

**Files:**
- `src/components/pages/LandingPage/WaterTrackerSection.tsx` — Add "Try the free Water Tracker →" link
- `src/components/pages/LandingPage/HabitTrackerSection.tsx` — Add "Try the free Habit Tracker →" link

Same pattern as PomodoroSection's existing link.

### Step 6: Sitemap

No changes needed — new pages auto-included, `/water-tracker` and `/habit-tracker` already excluded (they're widget embed URLs, not marketing pages).

## Shared Components

The `CopyWidgetButton`, `StepCard`, `BenefitCard`, and `FAQItem` are currently defined inline in `pomodoro-timer.tsx`. Since we'll reuse them across 3 pages, extract to a shared file:

**File: `src/components/pages/WidgetMarketingPage/shared.tsx`**
- `CopyWidgetButton({ url })` — takes the widget URL as prop
- `StepCard({ number, title, description })`
- `BenefitCard({ title, description })`
- `FAQItem({ question, answer })`

Then refactor `pomodoro-timer.tsx` to import from shared.

## Not In Scope

- UX changes to the actual widgets (hamburger menus, settings, etc.)
- Making DummyWaterTracker / DummyHabitTracker more interactive (they already are)
- Analytics page changes
- PoweredBy component in authenticated widget (already exists)

---

## Completed (2026-03-19)

All steps implemented and deployed:
- Water Tracker demo: DemoBanner replaced with "Powered by Blocs", auto-start removed
- Habit Tracker demo: DemoBanner replaced with "Powered by Blocs", flexDirection fixed
- `/water-tracker-widget` marketing page: full SEO, 6 FAQs with JSON-LD, SoftwareApplication schema
- `/habit-tracker-widget` marketing page: full SEO, 6 FAQs with JSON-LD, SoftwareApplication schema
- Shared components extracted to `src/components/pages/WidgetMarketingPage/shared.tsx`
- Landing page: "Try the free X" buttons on all three widget sections, animations removed
- Nav: "Widgets" hover dropdown added
- Footer: "Free Widgets" column added
- SEO audit fixes: noindex on embed pages, og:image, heading semantics, expanded meta descriptions, structured data
