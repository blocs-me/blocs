# Progress Bar Widget — Implementation Plan

## Overview

A general-purpose progress tracker widget for Notion. Users define what they're tracking, set a target, and visualize progress as a bar, ring, or gauge. Supports three modes: manual tracking (interactive +/-), date range progress, and calendar progress.

**Architecture:** Same as countdown — localStorage for persistence, URL query params for config, no DB, no auth tokens. Pro-only widget.

---

## Modes

### 1. Manual
User defines a goal and tracks progress interactively from within the embedded widget.

- **title**: what they're tracking (e.g. "Pages Read", "Miles Run")
- **total**: target number (e.g. 100)
- **startValue**: initial value, default 0 (e.g. start at 20 if already partially done)
- **increment**: step size for +/- buttons, default 1 (supports decimals: 0.1, 0.5, 5, etc.)
- **current**: persisted in iframe localStorage, keyed by a unique widget ID derived from config

Progress = `(current - startValue) / (total - startValue) * 100`

The +/- buttons live inside the widget iframe. On click, update localStorage and re-render. The current value is NOT in the URL — it lives only in localStorage. The URL encodes the config (title, total, startValue, increment, mode, style, colors).

### 2. Date Range
Auto-calculated progress between a start date and end date.

- **title**: e.g. "Q2 Sprint", "School Year"
- **startDate**: beginning of the period
- **endDate**: target deadline
- **timezone**: for accurate calculation

Progress = `(now - startDate) / (endDate - startDate) * 100`, clamped to 0-100.

Fully stateless — no localStorage needed. Recalculates every second (or every minute, since percentage doesn't change fast).

### 3. Calendar
Ambient time awareness — shows how far through the current year/month/week/day.

- **visibleBars**: toggles for year, month, week, day (show any combination)
- **title**: optional override, defaults to "Time Progress"

Each bar is a simple calculation:
- Year: `dayOfYear / daysInYear`
- Month: `dayOfMonth / daysInMonth`
- Week: `(dayOfWeek + hoursIntoDay/24) / 7` (Monday = 0)
- Day: `(hours * 3600 + minutes * 60 + seconds) / 86400`

Fully stateless. Updates every minute.

---

## Visualization Styles

All three styles render a percentage (0-100). The mode determines how the percentage is calculated, the style determines how it's displayed.

### Bar (horizontal)
- Rounded or square ends (configurable)
- Fill color + track color (gray background)
- Percentage label to the right or inside the bar
- For calendar mode: stacked bars, one per enabled period (year/month/week/day) with labels

### Ring (circle/donut)
- SVG circle with stroke-dasharray for progress
- Percentage text centered inside the ring
- Clean, compact — works well for single-value display
- For calendar mode: separate rings side by side, one per enabled period

### Semicircle (gauge)
- Half-circle arc, like a speedometer
- Percentage or value text below the arc
- For calendar mode: multiple small gauges in a row

---

## Config Type

```ts
type ProgressMode = 'manual' | 'dateRange' | 'calendar'
type VisualStyle = 'bar' | 'ring' | 'gauge'

type ProgressWidgetConfig = {
  mode: ProgressMode
  style: VisualStyle
  title: string
  showTitle: boolean
  theme: 'light' | 'dark'
  fillColor: string      // bar/ring/gauge fill color
  // Manual mode
  total: number
  startValue: number
  increment: number
  // Date range mode
  startDate: string
  endDate: string
  timezone: string
  // Calendar mode
  calendarBars: {
    year: boolean
    month: boolean
    week: boolean
    day: boolean
  }
}
```

---

## URL Param Encoding

Same pattern as countdown — short keys, everything in query string.

```
/progress-bar?mode=manual&style=ring&title=Pages+Read&total=350&start=0&inc=1&theme=dark&fill=%234CAF50
/progress-bar?mode=date&style=bar&title=Q2+Sprint&from=2026-04-01&to=2026-06-30&tz=America/New_York
/progress-bar?mode=cal&style=ring&show=y,m,w,d&theme=light
```

Only encode fields relevant to the active mode. Current value for manual mode is NOT in the URL.

---

## localStorage Strategy (Manual Mode)

Key: `progress_${hash}` where hash is derived from the config URL params (or a stable subset: mode + title + total). This way, the same widget config always reads the same stored value.

Stored value: `{ current: number, updatedAt: string }`

On widget load:
1. Read config from URL params
2. Read current value from localStorage
3. If no stored value, initialize to `startValue`
4. Render progress

On +/- click:
1. Clamp new value between `startValue` and `total`
2. Write to localStorage
3. Re-render

---

## File Structure

```
src/components/widgets/ProgressBar/
  progressBarConfig.ts       — types, defaults, URL param encode/decode
  useProgressBar.ts          — hook: computes percentage from mode + config + localStorage
  ProgressBarDisplay.tsx     — pure display: renders bar/ring/gauge based on style prop
  ProgressBarControls.tsx    — +/- buttons for manual mode (used in widget iframe)
  ProgressBarSettings.tsx    — dashboard settings panel (mode picker, style picker, all config fields)
  DummyProgressBarPreview.tsx — marketing preview component

src/components/pages/Dashboard/ProgressBarDashboard/
  ProgressBarDashboard.tsx   — dashboard tab with live preview + settings

src/pages/
  progress-bar/index.tsx     — widget iframe page (reads URL params, renders widget)
  progress-bar-widget.tsx    — marketing/dedicated page
```

---

## Implementation Order

### Phase 1: Core logic + types (TDD)
1. Write `progressBarConfig.ts` — types, `getDefaultConfig()`, `configFromParams()`, `configToParams()`, `configToEmbedUrl()`
2. Write `useProgressBar.ts` — hook that computes percentage for each mode
   - Manual: reads localStorage, returns current/total/percentage + increment/decrement functions
   - Date range: computes from dates, updates on interval
   - Calendar: computes year/month/week/day percentages, updates on interval
3. Write tests first for:
   - Config encode/decode roundtrip
   - Percentage calculations for each mode (manual, date range edge cases, calendar)
   - Clamping behavior (can't go below startValue or above total)

### Phase 2: Display components
4. `ProgressBarDisplay.tsx` — pure component that takes `{ style, percentage, label, fillColor, theme }` and renders the correct visualization
   - Bar: simple div-in-div with width percentage
   - Ring: SVG circle with stroke-dasharray
   - Gauge: SVG arc path
   - Calendar variant: multiple bars/rings/gauges for year/month/week/day
5. `ProgressBarControls.tsx` — +/- buttons, current value display. Only rendered in manual mode.

### Phase 3: Widget iframe page
6. `src/pages/progress-bar/index.tsx` — reads URL params, renders ProgressBarDisplay + ProgressBarControls. Handles localStorage read/write for manual mode.

### Phase 4: Dashboard
7. `ProgressBarSettings.tsx` — mode selector (tabs or radio), conditional fields per mode, style picker (visual thumbnails), color picker, title input
8. `ProgressBarDashboard.tsx` — live preview + settings panel, localStorage config persistence, copy link button

### Phase 5: Integration + marketing
9. Add "Progress Bar" tab to DashboardNav (needs an icon — maybe a horizontal bar chart icon or a target/bullseye)
10. Add to Dashboard routing (lazy import, validPaths, ProGate)
11. Add to pricing table + Plans page features list
12. Create `DummyProgressBarPreview.tsx` for marketing pages
13. Landing page section (with Pro badge)
14. Dedicated marketing page `/progress-bar-widget`
15. Footer link
16. Update pricing page feature bullets and subtitle copy

---

## Key Decisions

- **No DB, no auth** — localStorage in iframe only. Single-device persistence is acceptable.
- **Pro-only** — gated like countdown. Free users see it in dashboard but blocked by ProGate overlay.
- **Increment supports decimals** — number input, any positive value (0.1, 0.5, 1, 5, etc.)
- **Widget ID for localStorage** — derived from config hash so same config = same stored progress. Changing title or total resets progress (new hash).
- **Update frequency** — manual mode: on click only. Date range: every 60 seconds. Calendar: every 60 seconds.
- **Calendar mode in ring style** — separate rings side by side, one per enabled period. Simple and clean.
