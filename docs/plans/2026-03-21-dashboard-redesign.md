# Dashboard Redesign

## Goal
Make the dashboard dead simple: edit widgets, copy embed URLs, manage subscription. Remove all cruft.

## Current Problems
1. **Sidebar** — 350px wide, avatar that does nothing, plan badge, 5 nav items, sign out button. Doesn't scale, wastes space.
2. **Top nav** — "Home" and "FAQs" links are irrelevant in a dashboard context. Avatar does nothing.
3. **Widget previews are disabled** — `cursor: not-allowed` overlay blocks all interaction. Users can't edit durations, check habits, or adjust water goal from the dashboard.
4. **Editing UX is clunky** — Pomodoro: open modal → fill 5 fields → submit. Habit: click "Create New Habit" → type → click Save. Water: form below the fold.
5. **Copy Link modal** — shows private + public links with confusing copy. Link text overflows input. Copy button is inline (hidden).
6. **Presets are over-engineered** — multiple presets concept is confusing. Users just want to set their durations.
7. **Guide page** — outdated, YouTube embeds, adds nav clutter.
8. **Settings page** — profile photo URL, name, newsletter checkbox are all unused. Only payment management matters.

## Design

### Navigation: Replace Sidebar + Top Nav with a Single Header

Remove the 350px sidebar entirely. Replace with a compact top bar:

```
[Blocs Logo]   [Pomodoro] [Habits] [Water]   [🌙] [Account ▾]
```

- **Left:** Blocs logo (links to blocs.me home)
- **Center:** Three widget tabs — simple text buttons, active one underlined/highlighted. No icons needed.
- **Right:** Dark mode toggle + Account dropdown

**Account dropdown** (replaces avatar, settings page, sign out button):
- Plan status (e.g., "Pro" or "Free Trial — 5 days left")
- "Manage Subscription" link (goes to Stripe customer portal or pricing page)
- "Sign Out" button
- Maybe "Delete Account" (tucked away)

This removes: sidebar, guide page, settings page (as a separate route), avatar, profile photo, name, newsletter, "Home" link, "FAQs" link.

### Widget Pages: Single-Column Layout

Each widget page follows the same pattern:

```
┌─────────────────────────────────────────────┐
│  [Widget Title]              [Copy Link 📋] │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │                                       │  │
│  │         Interactive Widget            │  │
│  │      (fully functional, editable)     │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │         Analytics Chart               │  │
│  │      (with its own Copy Link)         │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

Key changes:
- **Remove the `cursor: not-allowed` overlay** — widgets are fully interactive
- **Copy Link** is a simple button with an icon, positioned prominently at top of each section
- **No modal for copy** — just copy to clipboard + show a brief "Copied!" toast notification
- Widget customization happens INSIDE the widget itself (we already built this for the free widgets)

### Per-Widget Changes

#### Pomodoro Dashboard
- Remove the "Customize" button and PresetSection entirely
- Remove PresetForm modal and preset grid
- Widget is interactive: user can click the label to edit durations (we already built this UX in PomodoroActiveSessionMenu)
- Edits from inside the widget save to the single preset in the DB (overwrite, don't create new rows)
- "Copy Link" button next to title, copies private link only
- Analytics chart below with its own "Copy Link"

#### Habit Tracker Dashboard
- Remove "Create A New Habit" button and HabitTrackerForm modal
- Widget is interactive: user can add/remove habits directly (we already built AddHabitInput)
- Habit changes save to DB via the existing API (same as current HabitTrackerForm but inline)
- Remove the separate habits list panel on the right
- "Copy Link" button next to title

#### Water Tracker Dashboard
- Widget is interactive: user can tap to increment/decrement
- "Set Daily Goal" form is simplified — just a small inline input near the widget, or keep it inside the widget's settings gear
- Remove the separate form card below the fold
- "Copy Link" button next to title

### Copy Link UX (replacing ClipboardModal)

Old: Click "Copy Link" → modal opens → shows private link + public link + explanation text → click copy → close modal.

New: Click "Copy Link" button → link copied to clipboard → show "Copied!" toast. That's it.

- Remove `ClipboardModal` component
- Remove `WidgetLinkWrapper` component (the pill button underneath each widget)
- Remove `ClipboardSection` component
- Use existing notification system for "Copied!" feedback
- Only copy the private/personal link (drop public links)

### Embed Instructions

Instead of a Guide page, add a small "How to Embed" help link/button on each widget page. Clicking it opens a simple modal with:
1. Copy the link above
2. In Notion, type `/embed`
3. Paste the link

Three steps, no YouTube embeds needed.

### Settings → Account Dropdown

Current settings page features and their fate:
- **Profile photo URL** → Remove (no one uses this)
- **Name** → Remove
- **Email** → Remove from dashboard (they signed in with it, they know it)
- **Newsletter checkbox** → Remove (no newsletter exists)
- **Payment management** → Move to Account dropdown → "Manage Subscription"
- **Delete Account** → Move to Account dropdown (small text link)

### Pages/Routes After Redesign

- `/dashboard/pomodoro` — Pomodoro widget + analytics
- `/dashboard/habit-tracker` — Habit tracker widget
- `/dashboard/water-tracker` — Water tracker widget + analytics
- Remove: `/dashboard/guide`, `/dashboard/settings`

## Files to Change

### Remove/Delete
- `src/components/pages/Dashboard/Guide.tsx`
- `src/components/pages/Dashboard/UserSettings/` (entire directory)
- `src/components/pages/Dashboard/ClipboardModal.tsx`
- `src/components/pages/Dashboard/ClipboardSection.tsx`
- `src/components/pages/Dashboard/WidgetLinkWrapper.tsx`
- `src/components/pages/Dashboard/Sidebar.tsx`
- `src/components/pages/Dashboard/DashboardSkeleton.tsx` (if it only shows sidebar skeleton)
- `src/components/pages/Dashboard/PremiumOverlay.tsx` (revisit later for payment funnel)
- `src/components/pages/Dashboard/PomodoroDashboard/PresetSection.tsx`
- `src/components/pages/Dashboard/PomodoroDashboard/PresetForm.js`
- `src/components/pages/Dashboard/PomodoroDashboard/DeletePresetForm.tsx`
- `src/components/pages/Dashboard/HabitTrackerDashboard/HabitTrackerForm.tsx`

### Rewrite
- `src/components/pages/Dashboard/index.tsx` — new layout with header nav
- `src/components/pages/Dashboard/DashboardNav.tsx` — becomes the single header with widget tabs + account dropdown
- `src/components/pages/Dashboard/PomodoroDashboard/PomodoroDashboard.tsx` — interactive widget + simple copy link
- `src/components/pages/Dashboard/HabitTrackerDashboard/HabitTrackerDashboard.tsx` — interactive widget + simple copy link
- `src/components/pages/Dashboard/WaterTrackerDashboard/WaterTrackerDashboard.tsx` — interactive widget + simple copy link

### New
- Account dropdown component (inside DashboardNav or as its own file)
- "How to Embed" modal component (small, reusable)

## Implementation Order

1. **Nav + Layout** — New DashboardNav with tabs + account dropdown. Remove sidebar. Update Dashboard index.
2. **Copy Link simplification** — Replace ClipboardModal/WidgetLinkWrapper with simple copy-to-clipboard button + toast.
3. **Pomodoro dashboard** — Remove preset section, make widget interactive, wire up saves to DB.
4. **Habit tracker dashboard** — Remove form modal, make widget interactive with inline editing, wire up saves to DB.
5. **Water tracker dashboard** — Make widget interactive, simplify goal input.
6. **Cleanup** — Remove dead files (Guide, Settings, old components).

## Decisions

- **Pomodoro preset API**: Always PATCH the most recent preset. No new rows.
- **"How to Embed" modal**: Build in this pass.
- **Account dropdown for paying users**: Show "Manage Subscription" but link to a dedicated plan page (not directly to Stripe portal). That page shows plan benefits in a table + "Cancel / Update Plan" link to Stripe portal. Adds one layer of friction to reduce churn.
- **Account dropdown for non-paying users**: Show "Upgrade" button linking to /pricing. Show trial days left in the nav bar as a subtle nudge. Defer deeper pricing funnel decisions.
