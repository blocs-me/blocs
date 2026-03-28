# Clock & Timer Widget — Implementation Plan

## Overview

A single widget with two modes — **Clock** and **Timer** — covering three keyword targets: "notion clock widget", "notion timer widget", and "notion flip clock widget".

**Architecture:** Same as countdown — pure client-side, URL query params for config, no DB, no auth tokens. Pro-only widget.

---

## Modes

### 1. Clock
Displays the current time. Updates every second.

- **format**: 12h or 24h
- **showSeconds**: toggle
- **showDate**: toggle (displays date below time)
- **dateFormat**: "Mon, Mar 28" / "March 28, 2026" / "2026-03-28"
- **timezone**: IANA timezone string (defaults to viewer's local timezone)
- **showTimezone**: toggle (display timezone label below time)

No state, no localStorage. Pure render of `new Date()` formatted per config.

### 2. Timer
A stopwatch/countdown hybrid. User sets a duration (or starts at 0:00), hits start, and it counts.

- **direction**: "up" (stopwatch) or "down" (countdown from duration)
- **duration**: initial time in seconds (for countdown mode; ignored in stopwatch)
- **autoStart**: whether the timer starts automatically on load (useful for embeds)

State lives in the iframe's memory only (not localStorage — a timer reset on page reload is expected behavior). Start/pause/reset buttons rendered inside the widget.

This is intentionally simpler than Pomodoro — no sessions, no breaks, no DB persistence. Just a clean timer.

---

## Display Styles

Both modes support three visual styles, selectable in settings:

### Digital
Clean segmented-display look. Monospace font, large numbers, optional colon separators.
- Clock: `12:34:56 PM` or `12:34 PM`
- Timer: `05:23` or `1:05:23`

### Flip
CSS flip-clock animation. Each digit has a flip card that animates on change.
- Targets the "notion flip clock widget" keyword directly
- Individual digit cards with top/bottom halves and a CSS perspective flip transition
- Clock: digits flip every second (or every minute if seconds hidden)
- Timer: digits flip on each tick

### Minimal
Just the numbers, large and centered. No decoration, no cards. Like the countdown display style.
- Clock: `12:34` centered, clean sans-serif
- Timer: `5:23` centered

---

## Config Type

```ts
type ClockTimerMode = 'clock' | 'timer'
type DisplayStyle = 'digital' | 'flip' | 'minimal'
type DateFormatOption = 'short' | 'long' | 'iso'

type ClockTimerWidgetConfig = {
  mode: ClockTimerMode
  style: DisplayStyle
  theme: 'light' | 'dark'
  title: string
  showTitle: boolean
  numberColor: string
  labelColor: string
  // Clock mode
  format: '12h' | '24h'
  showSeconds: boolean
  showDate: boolean
  dateFormat: DateFormatOption
  timezone: string
  showTimezone: boolean
  // Timer mode
  direction: 'up' | 'down'
  duration: number     // seconds (for countdown timer)
  autoStart: boolean
}
```

---

## URL Param Encoding

Short keys, same pattern as countdown. Only encode fields relevant to the active mode.

```
/clock?mode=clock&style=flip&theme=dark&fmt=12&sec=1&date=1&dateFmt=short&tz=America/New_York&showTz=1
/clock?mode=timer&style=digital&dir=down&dur=300&auto=1&theme=light
/clock?mode=clock&style=minimal&title=Tokyo&tz=Asia/Tokyo&showTz=1&showTitle=1
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| mode | clock/timer | clock | Widget mode |
| style | digital/flip/minimal | digital | Display style |
| theme | light/dark | light | Color scheme |
| title | string | "" | Optional title |
| showTitle | 0/1 | 0 | Show/hide title |
| numColor | hex | theme default | Number color |
| labelColor | hex | theme default | Label/date color |
| fmt | 12/24 | 12 | Time format (clock mode) |
| sec | 0/1 | 1 | Show seconds (clock mode) |
| date | 0/1 | 0 | Show date (clock mode) |
| dateFmt | short/long/iso | short | Date format (clock mode) |
| tz | string | local | IANA timezone (clock mode) |
| showTz | 0/1 | 0 | Show timezone label (clock mode) |
| dir | up/down | up | Direction (timer mode) |
| dur | number | 300 | Duration in seconds (timer mode, countdown only) |
| auto | 0/1 | 0 | Auto-start on load (timer mode) |

---

## File Structure

```
src/components/widgets/Clock/
  clockConfig.ts              — types, defaults, URL param encode/decode
  useClock.ts                 — hook: returns formatted time string, updates every second
  useTimer.ts                 — hook: start/pause/reset, elapsed/remaining, tick every second
  useClock.test.ts            — tests for time formatting logic
  useTimer.test.ts            — tests for timer logic (start, pause, reset, countdown, clamp)
  ClockDisplay.tsx            — renders time in digital/flip/minimal style
  TimerDisplay.tsx            — renders timer with controls (start/pause/reset buttons)
  FlipDigit.tsx               — single flip-card digit component (CSS animation)
  ClockTimerSettings.tsx      — dashboard settings panel
  WidgetSettingsPopover.tsx   — gear icon + popover for embedded widget (mode toggle, dashboard link)
  DummyClockPreview.tsx       — marketing preview component

src/components/pages/Dashboard/ClockDashboard/
  ClockDashboard.tsx          — dashboard tab with live preview + settings
  index.ts

src/pages/
  clock/index.tsx             — widget iframe page (reads URL params, renders widget)
  clock-widget.tsx            — marketing/dedicated page
```

---

## Implementation Order

### Phase 1: Core hooks (TDD)

1. **`clockConfig.ts`** — types, `getDefaultConfig()`, `configFromParams()`, `configToParams()`, `configToEmbedUrl()`

2. **`useClock.ts`** — hook that returns the current time formatted per config
   - Input: `{ format, showSeconds, timezone }`
   - Output: `{ hours, minutes, seconds, ampm, dateString, timezoneLabel }`
   - Updates via `setInterval` every 1000ms
   - Pure formatting function extracted and exported for testing

3. **`useTimer.ts`** — hook for timer mode
   - Input: `{ direction, duration, autoStart }`
   - Output: `{ hours, minutes, seconds, isRunning, start, pause, reset }`
   - Countdown mode: starts at `duration`, counts to 0, stops
   - Stopwatch mode: starts at 0, counts up indefinitely
   - `start()`, `pause()`, `reset()` controls

4. **Tests first** for:
   - Config encode/decode roundtrip
   - `formatTime()` — 12h vs 24h, with/without seconds, timezone handling
   - Timer: start → tick → pause → resume → reset
   - Timer countdown: starts at duration, decrements, stops at 0
   - Timer stopwatch: starts at 0, increments

### Phase 2: Display components

5. **`FlipDigit.tsx`** — single digit card with CSS flip animation
   - Accepts `digit: string` (0-9) and `prevDigit: string`
   - CSS: top half shows current, bottom half flips from prev to current
   - Pure CSS animation (transform, perspective, backface-visibility)
   - Used by both clock and timer in flip style

6. **`ClockDisplay.tsx`** — renders formatted time
   - Props: `{ hours, minutes, seconds, ampm, dateString, timezoneLabel, style, theme, numberColor, labelColor, showSeconds, showDate, showTimezone }`
   - Renders differently based on `style`:
     - `digital`: monospace font, colon separators
     - `flip`: FlipDigit components for each digit
     - `minimal`: large centered text, same approach as CountdownDisplay

7. **`TimerDisplay.tsx`** — renders timer with controls
   - Props: timer hook output + style/theme/color config
   - Same three visual styles as ClockDisplay
   - Adds start/pause/reset button row below the time display
   - Buttons styled inline (same pattern as ProgressBarControls)

### Phase 3: Widget iframe page

8. **`WidgetSettingsPopover.tsx`** — gear icon (top-right, low opacity, shows on hover). Popover contains:
   - Mode toggle (Clock ↔ Timer) — switches mode in-place (ephemeral, resets on reload)
   - "Customize in Dashboard →" link — opens `/dashboard/clock` in `_blank`
   - Styled inline, no external dependencies

9. **`src/pages/clock/index.tsx`** — reads URL params, renders ClockDisplay or TimerDisplay based on mode. Includes WidgetSettingsPopover. Same pattern as countdown widget page.

### Phase 4: Dashboard

10. **`ClockTimerSettings.tsx`** — mode tabs (Clock / Timer), conditional fields per mode, style picker (visual thumbnails or radio buttons), timezone selector, color pickers

11. **`ClockDashboard.tsx`** — live preview + settings panel, localStorage config persistence, copy link button. Same layout as CountdownDashboard.

### Phase 5: Integration + marketing

12. Add "Clock" tab to DashboardNav (clock icon)
13. Add to Dashboard routing (lazy import, validPaths, ProGate)
14. Add to pricing table + Plans page features list
15. Create `DummyClockPreview.tsx` for marketing pages
16. Landing page section (with Pro badge)
17. Dedicated marketing page `/clock-widget`
18. Footer link
19. Update pricing page feature bullets and subtitle copy

---

## Key Decisions

- **Single widget, two modes** — Clock and Timer share enough DNA (time display, same three styles, same settings pattern) to be one widget with a mode toggle. Avoids duplicating dashboard/settings/config infrastructure. The URL route is `/clock` for both.
- **No DB, no auth** — same as countdown. Pure client-side.
- **Timer state is ephemeral** — no localStorage for timer state. A page reload resets the timer. This is the expected UX for a simple timer. (If users want persistent timer sessions, that's Pomodoro.)
- **Flip clock is a display style, not a separate widget** — all three styles apply to both modes. This means the "flip clock" keyword is served by `/clock?style=flip`.
- **Pro-only** — gated like countdown and progress bar.
- **No alarm/sound** — timers don't play audio. Notion iframes can't reliably play sound anyway, and it adds complexity for marginal value. If users request it later, it's a straightforward addition.
- **Date display is clock-mode only** — timer doesn't show the date.
- **Widget settings access** — the embedded widget shows a small gear icon (top-right corner, low opacity, visible on hover). Clicking it opens a popover with: (1) a mode toggle to switch between Clock and Timer in-place (ephemeral — reverts to URL config on reload), and (2) a "Customize in Dashboard" link that opens `/dashboard/clock` in a new tab. This lets users discover the other mode and easily navigate to the dashboard to reconfigure and re-copy the embed URL.
- **Future: server-side config** — to support changing settings without re-embedding, config would need to be stored server-side (keyed by widget ID, embed URL becomes `/clock?id=abc`). This is a broader architectural change that would benefit countdown and progress bar too. Deferred for now — URL-param config is the baseline.
- **Widget page route: `/clock`** — not `/clock-timer`. Shorter, cleaner, targets the primary keyword. Timer mode is accessed via `?mode=timer`.
- **Marketing page route: `/clock-widget`** — dedicated SEO page. Can have sections for both clock and timer with separate keyword targeting.

---

## Flip Clock CSS Approach

The flip animation is the only non-trivial UI piece. Approach:

Each digit is a card with fixed dimensions. When the digit changes:
1. Current value is shown (top half static, bottom half static)
2. A "flap" element (absolutely positioned) starts showing the old value on its front face and the new value on its back face
3. CSS `rotateX(-180deg)` transition (0.6s ease-in-out) flips the flap
4. On transition end, clean up and set the new value as the static display

Structure per digit:
```
<div class="flip-digit">
  <div class="top">{current}</div>       <!-- static top half -->
  <div class="bottom">{current}</div>     <!-- static bottom half -->
  <div class="flap flap-front">{prev}</div>  <!-- animates: rotates down -->
  <div class="flap flap-back">{current}</div> <!-- revealed after flip -->
</div>
```

Key CSS properties:
- `perspective: 300px` on container
- `transform-style: preserve-3d` on flap
- `backface-visibility: hidden`
- `transform-origin: bottom` for top flap
- Overflow hidden to clip halves

This is a well-documented CSS pattern — no libraries needed.
