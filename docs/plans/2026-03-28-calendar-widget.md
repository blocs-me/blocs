# Calendar Widget — Implementation Plan

## Overview

A visual calendar widget embeddable in Notion. Shows the current month (or year) with today highlighted and optional date markers for important dates. Fills a gap Notion doesn't cover — Notion's calendars are tied to databases, there's no standalone visual calendar embed.

**Architecture:** Same as countdown/clock — pure client-side, URL query params for config, no DB, no auth tokens. Pro-only widget. Date markers are configured in the dashboard and encoded in the URL.

---

## Views

### 1. Month View (default)
Standard month grid — 7 columns (days of week), 4-6 rows. Shows:
- Day numbers for the current month
- Today highlighted with accent color
- Previous/next month days faded
- Optional: marked dates highlighted (configured via dashboard)
- Optional: week numbers in a left column
- Nav arrows to browse months (in the embedded widget)

### 2. Year View
12 mini month grids in a 3×4 or 4×3 layout. Compact overview of the full year. Shows:
- Today highlighted
- Marked dates highlighted
- Current month slightly emphasized
- Click a month to switch to month view of that month (in the embedded widget)

---

## Date Markers

Users can mark specific dates from the dashboard. Markers are encoded in the URL and rendered as colored dots or highlights on the calendar.

Each marker has:
- **date**: ISO date string (YYYY-MM-DD)
- **color**: hex color (optional, defaults to accent color)
- **label**: short text (optional, shown on hover or below the date)

Markers are encoded as a compact string in URL params:
```
marks=2026-04-15,2026-05-01:red:Launch,2026-06-30
```
Format: `date[:color[:label]]` separated by commas.

This keeps the URL reasonably short for a handful of markers (10-20 dates). For more, the URL gets long but still works.

---

## Config Type

```ts
type CalendarView = 'month' | 'year'

type DateMarker = {
  date: string        // YYYY-MM-DD
  color: string       // hex color, default to fillColor
  label: string       // optional hover label
}

type CalendarWidgetConfig = {
  view: CalendarView
  theme: 'light' | 'dark'
  title: string
  showTitle: boolean
  startOfWeek: 0 | 1  // 0 = Sunday, 1 = Monday
  showWeekNumbers: boolean
  fillColor: string    // accent color for today + markers
  headerColor: string  // month/year header color
  markers: DateMarker[]
  timezone: string
}
```

---

## URL Param Encoding

```
/calendar?view=month&theme=dark&sow=1&wn=1&fill=%234CAF50&marks=2026-04-15,2026-05-01:red:Launch
/calendar?view=year&theme=light&title=2026&showTitle=1
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| view | month/year | month | Calendar view |
| theme | light/dark | light | Color scheme |
| title | string | "" | Optional title |
| showTitle | 0/1 | 0 | Show/hide title |
| sow | 0/1 | 0 | Start of week (0=Sun, 1=Mon) |
| wn | 0/1 | 0 | Show week numbers |
| fill | hex | theme default | Accent/highlight color |
| headerColor | hex | theme default | Header text color |
| marks | string | "" | Encoded date markers |
| tz | string | local | IANA timezone |

---

## File Structure

```
src/components/widgets/Calendar/
  calendarConfig.ts           — types, defaults, URL param encode/decode, marker parsing
  calendarConfig.test.ts      — config + marker encode/decode tests
  useCalendar.ts              — hook: current month/year state, navigation, today detection
  useCalendar.test.ts         — calendar date math tests
  MonthView.tsx               — month grid display component
  YearView.tsx                — 12-mini-month year display
  CalendarSettings.tsx        — dashboard settings panel
  MarkerEditor.tsx            — date marker add/remove UI for dashboard
  DummyCalendarPreview.tsx    — marketing preview component

src/components/pages/Dashboard/CalendarDashboard/
  CalendarDashboard.tsx       — dashboard tab with live preview + settings
  index.ts

src/pages/
  calendar/index.tsx          — widget iframe page
  calendar-widget.tsx         — marketing/dedicated page
```

---

## Implementation Order

### Phase 1: Core logic + types (TDD)

1. **`calendarConfig.ts`** — types, `getDefaultConfig()`, `configFromParams()`, `configToParams()`, `configToEmbedUrl()`, `parseMarkers()`, `serializeMarkers()`

2. **`useCalendar.ts`** — hook that computes calendar grid data
   - Input: `{ timezone, startOfWeek }`
   - Output: `{ year, month, days, today, goToNextMonth, goToPrevMonth, goToMonth, goToNextYear, goToPrevYear }`
   - `days` is an array of week arrays, each containing `{ date, dayOfMonth, isCurrentMonth, isToday, marker? }`
   - Handles month boundaries (days from prev/next month to fill the grid)

3. **Tests first** for:
   - Config encode/decode roundtrip
   - Marker encode/decode (with and without colors/labels)
   - Calendar grid generation (correct number of rows, correct day placement)
   - First day of week handling (Sunday vs Monday start)
   - Today detection with timezone
   - Month navigation (forward/back, wrapping Dec→Jan)

### Phase 2: Display components

4. **`MonthView.tsx`** — pure component rendering the month grid
   - Props: `{ days, markers, fillColor, theme, showWeekNumbers, onPrevMonth, onNextMonth, monthLabel }`
   - 7-column grid with day-of-week headers
   - Today cell gets accent background
   - Marked dates get colored dot below the number
   - Prev/next month days at reduced opacity
   - Nav arrows in the header row

5. **`YearView.tsx`** — 12 mini month grids
   - Props: `{ year, today, markers, fillColor, theme, onSelectMonth }`
   - 3×4 grid of compact month cells
   - Each mini month shows day numbers in a tiny grid
   - Today and markers highlighted
   - Click a month to drill into month view

### Phase 3: Widget iframe page

6. **Widget settings popover** — reuse `WidgetSettingsPopover` from Clock (or extract a shared version). View toggle (month/year) + dashboard link.

7. **`src/pages/calendar/index.tsx`** — reads URL params, renders MonthView or YearView based on view config. Month navigation arrows for browsing.

### Phase 4: Dashboard

8. **`MarkerEditor.tsx`** — UI for adding/removing date markers
   - Date picker input + optional color picker + optional label input
   - List of existing markers with delete buttons
   - Compact, fits in the settings sidebar

9. **`CalendarSettings.tsx`** — view picker (month/year), start of week toggle, show week numbers toggle, color pickers, timezone selector, marker editor

10. **`CalendarDashboard.tsx`** — live preview + settings panel, localStorage config persistence, copy link button

### Phase 5: Integration + marketing

11. Add "Calendar" tab to DashboardNav (use existing calendar icon from `src/icons/calendar.tsx`)
12. Add to Dashboard routing (lazy import, validPaths, ProGate)
13. Add to pricing table features list
14. Create `DummyCalendarPreview.tsx` for marketing pages
15. Landing page section with Pro badge
16. Dedicated marketing page `/calendar-widget`
17. Footer link

---

## Key Decisions

- **No events/scheduling** — this is a visual calendar, not a planner. If users want event management, that's Google Calendar territory. Our value is: a clean, embeddable calendar view that looks good in Notion.
- **Date markers, not events** — markers are simple highlights on dates. No times, no durations, no recurring rules. Just "this date is important." Keeps complexity low and URL params manageable.
- **Month navigation in the widget** — the embedded widget has prev/next arrows so users can browse months without going back to the dashboard. This is ephemeral (resets to current month on reload).
- **No DB, no auth** — same as countdown/clock/progress bar. Pure client-side.
- **Pro-only** — gated like all new widgets.
- **Marker limit** — practically limited by URL length (~2000 chars). Each marker takes ~10-25 chars, so roughly 50-80 markers before the URL gets too long. Fine for the use case.
- **Week numbers** — ISO 8601 week numbering. Optional, off by default. Popular in Europe.
- **Timezone** — affects "today" detection. Important for users in different timezones than their Notion workspace.
- **Widget settings popover** — same gear icon pattern as clock widget. View toggle (month ↔ year) + "Customize in Dashboard" link.
