# Habit Tracker: Free Editing + Paywall Design

## Problem

The free habit tracker embed shows 5 hardcoded dummy habits with fake streak data ("40 day streak", "best streak is 60 days"). Users can't edit, add, or remove habits. There's no CTA to sign in or upgrade. This means:

- Free users get no real value from the widget
- No natural paywall trigger exists
- Users who embed it in Notion see obviously fake data

## Proposal

Allow free users to edit habits (add/remove/rename) without signing in, stored in localStorage. Gate streak analytics behind sign-in.

### Free tier (no sign-in, localStorage)

- **Custom habits**: users can add, remove, and rename habits
- **Daily check-off**: persists in localStorage, resets daily (existing behavior)
- **Habit list stored in localStorage**: keyed by a stable key, not date-dependent
- **Max 5 habits** for free (soft limit — could increase later)

### Gated behind sign-in (paywall trigger)

- **Streak analytics**: current streak, best streak, donut chart
- **Blur/padlock overlay** on the analytics column (right side) with a CTA: "Sign in to track streaks"
- Clicking the overlay opens a card/modal: "Track your habit streaks and analytics. Sign in to Blocs — it's free." with a sign-in button (`target="_blank"` to `/sign-in`)

### Gated behind Blocs Pro

- **Weekly/monthly analytics charts**
- **Shareable link** (public view)
- **Theme customization**

## UX Flow

1. User embeds free habit tracker in Notion
2. Sees empty state: "Add your first habit" button
3. Adds habits, checks them off daily — stored in localStorage
4. Sees blurred/padlocked streak area on the right
5. Clicks it → overlay says "Sign in to track streaks"
6. Signs in → gets 14-day free trial → streaks start tracking server-side
7. After trial → Blocs Pro for analytics, themes, sharing

## Implementation

### Phase 1: Free habit editing

1. **New component: `HabitEditor`** — inline add/edit/delete for habits
   - Add: text input at bottom of habit list, "+" button
   - Delete: swipe or X button (only in edit mode)
   - Rename: tap habit name to edit inline
   - Store in localStorage key `blocsHabitTrackerHabits`

2. **Update `DummyHabitTracker`**:
   - Accept `onHabitsChange` callback
   - Show `HabitEditor` when no token (free mode)
   - Remove hardcoded `demoHabits` from page — load from localStorage or show empty state

3. **Update `habit-tracker/[[...path]].tsx`**:
   - Load habits from localStorage instead of hardcoded `demoHabits`
   - If no saved habits, show empty state with "Add your first habit"

### Phase 2: Streak paywall

1. **New component: `StreakPaywall`** — replaces analytics column for free users
   - Blurred/frosted glass overlay on streak data
   - Padlock icon
   - CTA text + sign-in button

2. **Update `DummyHabitTracker`**:
   - When `isAnalyticsHidden=false` but no token: show `StreakPaywall` instead of real analytics
   - When authenticated: show real analytics

## Open Questions

- Should we show placeholder streak data behind the blur (fake "3 day streak") to tease the feature, or just blur an empty area?
- Should the 5-habit limit be enforced with a "Sign in for unlimited habits" message, or just silently cap at 5?
- Do we want an edit mode toggle, or always show edit affordances (X to delete, + to add)?
