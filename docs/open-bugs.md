# Open Bugs

## 1. Pomodoro Timer — Play → Pause → Reset crash

**Symptom**: On the dashboard at `/dashboard/pomodoro`, doing Play → Pause → Reset reliably triggers a full-page "Application error: a client-side exception has occurred". Same crash can appear when switching tabs (e.g. "Long Break") after pausing.

**Console error**:
```
TypeError: i is not a function
    at o3 (framework-e60c938074ff7136.js:1:97152)
    at iF (framework-e60c938074ff7136.js:1:115731)
    ...
```

This is a React reconciler crash during a component re-render. `i is not a function` in minified React means a function expected to be callable is `null`. The most likely source is `usePomodoroDispatch()` returning `null` (the default value of `makeStore`'s `dispatchContext`) during a render cycle, then something trying to call it.

**Files to read**:
- `src/components/widgets/Pomodoro/Timer/useTimer.js` — primary suspect. Contains the timer effects and is called on every render. Has a `useEffect` at line 263 depending on `[startedAt, pausedAt, interval]` with missing deps (`handlePauseResume`, `initTimer`) suppressed by `// eslint-disable-line`. Also calls `useSavePomodoroAnalytics` and `useNotifications` which use external contexts.
- `src/components/widgets/Pomodoro/usePomodoroStore.js` — `makeStore` creates `dispatchContext = createContext(null)`. If called without a provider, dispatch is `null`.
- `src/components/widgets/Pomodoro/pomodoroReducer.js` — has `const` declarations inside `switch` cases without block scope (same lexical scope). Technically valid (different names) but worth reviewing.
- `src/utils/makeStore.tsx` — shows `dispatchContext` defaults to `null`.
- `src/components/widgets/Pomodoro/DummyPomodoro/index.tsx` — the widget rendered on the dashboard. Renders `<Timer>` → `<DefaultTimer>` → `useTimer`.

**Key suspicion**: After Reset dispatches `setPausedAt(null)` + `setStartedAt(null)`, `useTimer`'s effect fires and calls `setProgressInMilliseconds(interval)` and `setPercentProgressed(0)`, triggering a re-render. Something during that re-render ends up calling a null function. Needs source maps or a dev build to identify the exact line.

**Context**: This is a pre-existing bug (predates our dashboard work). It occurs on the standalone `/pomodoro` free demo too, just less visible because users typically use the authenticated widget.

---

## 2. Analytics bar chart — x-axis labels not showing

**Symptom**: On `/dashboard/pomodoro` and `/dashboard/water-tracker`, the analytics bar charts render without x-axis date labels. The bars and y-axis labels show, but the bottom row of dates is missing. Also reportedly missing on the standalone embedded chart pages.

**Root cause (identified)**: The `AnalyticsBarChart` reads `timePeriod` from `AnalyticsBarChartProvider` which initialises from `storage.getItem('SET_TIME_FORMAT') || 'weekly'`. If the user previously selected "monthly" view via the hamburger menu on a standalone chart page, all future chart instances load in monthly view. The BarChart component (`src/components/design-system/BarChart/index.tsx`, line 48) only renders `<XAxisLabels>` when `timePeriod === 'weekly'`. Monthly view has no x-axis labels by design.

**Partial fix applied**: `WeeklyViewEnforcer` component in both dashboard files dispatches `SET_TIME_FORMAT: 'weekly'` on mount, overriding the stored preference. This works for the dashboard. The standalone embedded pages still respect localStorage.

**If labels are still missing after this fix**: the issue is likely height — the `AnalyticsBarChart`'s inner container uses `height: 100%` in a flex column alongside a controls row, so the chart area is shorter than the wrapper. The `XAxisLabels` are `position: absolute; bottom: 0` inside the BarChart box. If `useResizeObserver` reports an unexpected height, `stepY` in `useBarChart` uses `height - 50` for bar positioning which could push labels out of view.

**Files to read**:
- `src/components/widgets/AnalyticsBarChart/useAnalyticsBarChart/useAnalyticsBarChart.tsx` — the store. `initialState.timePeriod = storage.getItem('SET_TIME_FORMAT') || 'weekly'`
- `src/components/design-system/BarChart/index.tsx` — line 48: `{timePeriod === 'weekly' && <XAxisLabels>}`. Monthly view has no labels.
- `src/components/design-system/BarChart/useBarChart/useBarChart.ts` — `stepY` uses `height - (timePeriod === 'weekly' ? 50 : 20)`. Labels need 50px of bottom space.
- `src/components/design-system/BarChart/XAxisLabels.tsx` — the label component itself.
- `src/components/widgets/AnalyticsBarChart/AnalyticsBarChart.tsx` — the wrapper that uses `useResizeObserver` to measure height and pass it to `BarChart`.
