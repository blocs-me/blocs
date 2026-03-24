# Countdown Timer Widget

**Date:** 2026-03-24
**Goal:** New Pro widget — simple countdown/countup timer embeddable in Notion.

## Architecture

No DB, no tokens. Config encoded in URL query params. Widget is pure client-side.

- Dashboard page: configure widget, live preview, copy embed URL
- Widget page: reads config from URL params, renders timer
- Dashboard settings saved in localStorage (so user doesn't lose config between visits)

## URL Params

```
/countdown?title=Launch+Day&showTitle=1&end=2026-12-31T00:00:00&tz=America/New_York&theme=dark&countUp=0&show=d,h,m,s&numColor=%23333&labelColor=%23999
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| title | string | "Countdown" | Widget title |
| showTitle | 0/1 | 1 | Show/hide title |
| end | ISO datetime | tomorrow noon | Target date/time |
| tz | string | system tz | IANA timezone |
| theme | light/dark | light | Color scheme |
| countUp | 0/1 | 0 | Count up from date instead of down |
| show | csv | auto | Units to show: y,mo,w,d,h,m,s |
| numColor | hex | theme default | Number color |
| labelColor | hex | theme default | Label color |

## Files

```
src/
  components/widgets/Countdown/
    useCountdown.ts              # Core logic: calculate time units from diff
    useCountdown.test.ts         # TDD tests
    CountdownDisplay.tsx         # Pure display component
    CountdownSettings.tsx        # Settings panel for dashboard
    countdownConfig.ts           # Parse URL params -> config, config -> URL params
  pages/
    countdown/
      index.tsx                  # Widget iframe page
  components/pages/Dashboard/
    CountdownDashboard/
      CountdownDashboard.tsx     # Dashboard tab content
      index.ts                   # Re-export
```

## Implementation Order

1. useCountdown hook + tests (TDD)
2. countdownConfig (parse/serialize)
3. CountdownDisplay component
4. Widget page (/countdown)
5. CountdownSettings component
6. CountdownDashboard + wire into dashboard
