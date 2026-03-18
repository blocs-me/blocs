# Pomodoro Widget Revamp — Implementation Plan

Last updated: 2026-03-18

## Overview

Three-part project to improve the Pomodoro widget's UX, create a dedicated SEO/marketing page, and establish the free-tier embed flow. Work proceeds in order: Part 2 (dedicated page) first, then Part 1 (UX), then Part 3 (free-tier plumbing).

---

## Part 2: Dedicated Pomodoro Marketing Page

**Goal:** A page at `/pomodoro-timer` that ranks for "notion pomodoro timer" and converts visitors into widget users. Modeled after widgetly.co/free-widgets/pomodoro.

### Route & File

- New page: `src/pages/pomodoro-timer.tsx`
- Static page (no auth required, no dynamic data)

### Page Structure (top to bottom)

1. **Nav** (existing component)

2. **Hero / First Fold**
   - H1: "Free Pomodoro Timer for Notion" (target keyword)
   - Short tagline: "Stay focused with the Pomodoro Technique — embedded directly in your Notion workspace."
   - Embedded widget: iframe of `/pomodoro` (the demo version, with banner stripped — see below)
   - Two CTAs side by side:
     - **"Copy Widget URL"** — copies `https://blocs.me/pomodoro` to clipboard, button text changes to "Copied!" for 2 seconds
     - **"How to Embed"** — smooth-scrolls to the embed guide section

3. **"How It Works" Section**
   - Three-step layout (numbered cards or icons):
     1. **Copy the URL** — "Click 'Copy Widget URL' above to get your embed link."
     2. **Paste in Notion** — "Type /embed in any Notion page and paste the URL."
     3. **Start Focusing** — "Your Pomodoro timer is live. Hit play and focus."

4. **Embed Guide Section** (anchor: `#how-to-embed`)
   - Show `public/pomodoro-guide.gif` — the GIF demonstrating the embed flow
   - Brief text instructions alongside:
     - "Open any Notion page"
     - "Type /embed and press Enter"
     - "Paste the widget URL and click 'Embed link'"
   - Optionally show `public/notion-embed.png` as a static fallback/reference

5. **"What is the Pomodoro Technique?" Section**
   - Brief explainer (2-3 paragraphs): origin, how it works, why it's effective
   - Three benefit cards:
     - **Reduced Burnout** — Strategic breaks prevent mental fatigue
     - **Better Focus** — 25-minute sessions eliminate multitasking
     - **Track Your Progress** — See how you spend your time with built-in analytics

6. **FAQ Section**
   - 6-8 questions, targeting long-tail search queries:
     - "What is a Pomodoro timer?"
     - "How long is a Pomodoro session?"
     - "Can I customize the timer duration?"
     - "Does the timer work offline?"
     - "Can I use this timer outside of Notion?"
     - "Is this Pomodoro timer free?"
     - "How do I track my focus time over multiple days?"
     - "What happens when the timer ends?"
   - Use `<details>`/`<summary>` or a simple accordion component for FAQ items
   - Wrap in a `<script type="application/ld+json">` FAQ schema for rich results

7. **CTA Banner**
   - "Want analytics, custom presets, and more? Upgrade to Focus Pro."
   - Button links to `/pricing`

8. **Footer** (existing component)

### SEO

- `<title>`: "Free Pomodoro Timer for Notion — Blocs"
- `<meta description>`: "Embed a free Pomodoro timer in your Notion workspace. 25-minute focus sessions with short and long breaks. No sign-up required."
- Canonical: `https://blocs.me/pomodoro-timer`
- Open Graph + Twitter meta tags
- FAQ structured data (JSON-LD)

### Stripping the DemoBanner from `/pomodoro`

The `/pomodoro` page currently shows `<DemoBanner />` for unauthenticated visitors. Since `/pomodoro` will now be the clean embed URL (used inside Notion iframes), and `/pomodoro-timer` is the marketing page:

- **Remove `<DemoBanner />` from the demo pomodoro** in `src/pages/pomodoro/[[...slug]].tsx`
- Add "Powered by Blocs" branding instead (small text at bottom of widget, links to `/pomodoro-timer`)
- Authenticated users (with token) see neither banner nor branding

This makes `/pomodoro` the clean embed URL for both free and paid users.

---

## Part 1: Pomodoro UX Simplification

**Goal:** Make the Pomodoro widget as immediately usable as widgetly's — mode tabs visible, settings accessible, no multi-screen navigation needed for basic usage.

### Current Architecture Problems

- Mode switching (Pomodoro / Short Break / Long Break) requires: hamburger menu → main menu → session menu. Should be one click.
- Settings are a full separate screen navigated via router slugs. Should be a popover/dropdown.
- Presets are a separate screen. Power feature — can be folded into settings or kept as a secondary option.
- Theme selection is a separate screen. Minor feature — can be a toggle in settings.

### Proposed Changes

#### A. Add Mode Tabs to Main Screen

Add a tab bar at the top of the timer display with three tabs:
- **Pomodoro** (25:00 default)
- **Short Break** (5:00 default)
- **Long Break** (10:00 default)

Clicking a tab:
- Switches the current mode (dispatches `setIntervalMode`)
- Resets the timer to the new interval
- Active tab is visually highlighted (filled background, like widgetly's)

The tab intervals should respect the user's preset values (if authenticated and using custom presets). For the free/demo version, use standard 25/5/15 defaults.

**Files to modify:**
- `src/components/widgets/Pomodoro/PomodoroMainPage/index.js` — add tab bar above Timer
- `src/components/widgets/Pomodoro/pomodoroActions.js` — may need a new action for direct mode switch
- `src/components/widgets/Pomodoro/pomodoroReducer.js` — handle mode switch + timer reset

#### B. Simplify Settings into a Popover

Replace the full-screen settings navigation with a popover/dropdown triggered by a gear icon in the top-right corner of the widget.

**Popover contents (unified for all users):**
- Sound Alert toggle (on/off)
- Alert Sound selector (Alarm Bell / Alarm Digital)
- Volume slider
- Divider
- Auto-start Pomodoro (toggle) — start next pomodoro after break ends
- Auto-start Break (toggle) — start break after pomodoro ends
- Deep Focus (toggle) — hide controls while timer is running

**For authenticated users, add below another divider:**
- Custom Presets link → opens existing preset management (can stay as a sub-view)
- Theme selector (Light / Dark / Auto) — three small buttons or a segmented control

This replaces:
- `PomodoroMainMenu` (the hub screen) — no longer needed as primary navigation
- `PomodoroSettings` full screen → becomes the popover content
- `PomdoroThemeMenu` full screen → becomes a row in the popover

**Files to modify:**
- Create new `src/components/widgets/Pomodoro/PomodoroSettingsPopover/` component
- `src/components/widgets/Pomodoro/PomodoroMainPage/index.js` — replace hamburger menu with gear icon, wire up popover
- `src/components/widgets/Pomodoro/index.jsx` — simplify routing (may still need settings/presets routes for deep linking, but main flow doesn't use them)

#### C. Clean Up Timer Display

- Keep the SVG circular progress ring (it's a nice visual)
- Make timer digits larger/bolder for readability
- Keep Play/Pause and Reset circle buttons
- Remove the preset label display from the timer face (the tabs already show the current mode)
- Session count indicator: small dots or "2/4" text below the timer showing progress toward long break

#### D. Update DummyPomodoro

Update the demo component to reflect the new UI:
- Include mode tabs
- Include simplified gear icon (non-functional or with basic sound settings)
- Used on landing page sections and the `/pomodoro-timer` marketing page

---

## Part 3: Free-Tier Embed Flow

**Goal:** Let users copy the widget URL and embed it in Notion without signing up. Data persists via localStorage.

### How It Works

- User visits `/pomodoro-timer`, clicks "Copy Widget URL"
- URL copied: `https://blocs.me/pomodoro`
- User pastes into Notion as `/embed`
- Widget loads in iframe. No token in URL → free tier.
- Timer works fully. Data (preferences, session count) stored in localStorage within the iframe's origin.
- "Powered by Blocs" branding visible at bottom, linking to `/pomodoro-timer`

### Free vs Pro Distinction

| Feature | Free (no sign-up) | Pro (authenticated) |
|---------|-------------------|---------------------|
| Basic timer (Pomodoro/Short/Long) | Yes | Yes |
| Sound alerts | Yes | Yes |
| Custom intervals | No (fixed 25/5/15) | Yes (via presets) |
| Analytics / history | No | Yes |
| Theme customization | No (light only) | Yes |
| Deep Focus mode | No | Yes |
| Data persistence | localStorage only | Cloud (Supabase) |
| Branding | "Powered by Blocs" | No branding |
| Session count tracking | Current session only | Persistent across days |

### Implementation

- The `/pomodoro` page already differentiates: no token → demo, token → authenticated.
- Currently the demo uses `DummyPomodoro` (static). Change it to use the real `Pomodoro` component but in "free mode":
  - Skip auth/token validation
  - Use localStorage for preferences
  - Hide pro-only features (custom presets, analytics, theme, deep focus)
  - Show "Powered by Blocs" branding
- Add a `usePomodoroMode()` hook or context that returns `'free' | 'pro'` based on whether a token is present. Widget components check this to show/hide features.

### Upgrade Prompts

When a free user tries to access a gated feature:
- Tapping "Custom Presets" in settings → show inline message: "Custom presets are a Pro feature. Sign up to unlock."
- No aggressive paywalls. The timer should just work.

---

## Implementation Order

### Phase 1: Dedicated Page (Part 2) — do first
1. Strip DemoBanner from `/pomodoro` demo, add "Powered by Blocs" branding
2. Build `/pomodoro-timer` page with all sections
3. Add FAQ JSON-LD structured data
4. Link from landing page widget sections to `/pomodoro-timer`

### Phase 2: UX Simplification (Part 1)
1. Add mode tabs to PomodoroMainPage
2. Build PomodoroSettingsPopover component
3. Wire up gear icon to popover on main page
4. Update DummyPomodoro to match new UI
5. Clean up / deprecate old multi-screen navigation
6. Test with authenticated users (existing token-based flow) to make sure nothing breaks

### Phase 3: Free-Tier Plumbing (Part 3)
1. Replace DummyPomodoro on `/pomodoro` (no-token) with real Pomodoro in free mode
2. Add `usePomodoroMode` hook for free/pro feature gating
3. localStorage persistence for free users
4. Upgrade prompts on gated features
5. Apply same pattern to water-tracker and habit-tracker (future)

---

## Open Questions / Decisions Made

- **Embed URL:** `/pomodoro` (existing, banner stripped) — no new route needed
- **Marketing page:** `/pomodoro-timer` (new page)
- **Settings UI:** Unified popover for all users. Pro users see extra options (presets, theme, deep focus) in the same popover.
- **Free data:** localStorage only, no anonymous session tracking
- **Branding:** "Powered by Blocs" on free embeds, links to `/pomodoro-timer`
- **Video:** Using `public/pomodoro-guide.gif` + `public/notion-embed.png` instead of video

---

## Completed Work (PR #86, merged 2026-03-18)

### Phase 1: Dedicated Page (Part 2) — Done

- Built `/pomodoro-timer` marketing page with:
  - Hero with live embedded widget (iframe of `/pomodoro`) + "Copy Widget URL" CTA
  - "How It Works" 3-step section (Copy → Paste in Notion → Focus)
  - Embed guide with `pomodoro-guide.gif`
  - Pomodoro Technique explainer with 3 benefit cards
  - 8 FAQs with JSON-LD structured data for Google rich results
  - Focus Pro upgrade CTA at bottom
  - Full SEO meta tags targeting "free pomodoro timer for notion"
- Replaced `DemoBanner` on `/pomodoro` (no-token) with "Powered by Blocs" linking to `/pomodoro-timer`
- `/pomodoro` is now the clean embed URL (no banner, no sign-up required)
- Page auto-included in sitemap (not in exclude list)
- Added "Try the free Pomodoro timer" link in landing page PomodoroSection

### Phase 2: UX Simplification (Part 1) — Done

- **ModeTabBar**: Pomodoro / Short Break / Long Break tabs on the main timer screen. Clicking a tab stops the timer and switches mode.
- **PomodoroSettingsPopover**: Gear icon in top-right opens a dropdown with volume slider, auto-start toggles, deep focus toggle, and "Custom Durations" Pro paywall CTA.
- Replaced hamburger menu with gear icon on main page. Sub-page navigation (presets, theme) still accessible via routes for authenticated users.
- **DummyPomodoro fully interactive**: play/pause, reset, mode tabs, gear icon + settings popover. No more auto-start on page load.
- **Timer fixes**: Added `interval` to useEffect deps so timer display resets correctly when switching modes.
- **Long break default**: Changed from 10min to 15min (standard Pomodoro convention).
- **Visual improvements**: Smaller ring (85% → 70%), larger digits (lg → xl font size).
- **Mode-specific colors**: Warm pink/coral ring gradient for Pomodoro, cool blue for breaks. Label badge matches (red for work, blue for breaks). Applied to both light and dark mode.
- **Custom Durations paywall**: Settings popover includes a CTA linking to /pricing for Pro custom intervals.

### Phase 3: Free-Tier Plumbing (Part 3) — Partially Done

The free-tier embed flow is now working end-to-end for Pomodoro:
- `/pomodoro` without a token renders a fully interactive widget with localStorage preferences
- "Powered by Blocs" branding links to `/pomodoro-timer`
- Settings popover has "Custom Durations" upgrade prompt
- No sign-up required to use the basic timer

**Still TODO for Phase 3:**
- `usePomodoroMode` hook for explicit free/pro feature gating (currently DummyPomodoro vs Pomodoro component split handles this implicitly)
- Apply same pattern to water-tracker and habit-tracker (dedicated pages + interactive demos)
- Design deeper paywall triggers (analytics access, theme customization)
