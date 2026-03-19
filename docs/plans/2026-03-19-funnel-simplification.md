# Funnel Simplification — Design Doc

## Problem

The current landing page requires email sign-up as the primary CTA. This creates unnecessary friction since the core widgets (Pomodoro, Water Tracker, Habit Tracker) work without auth. Visitors should be able to start using widgets immediately, with sign-in only required when they want to customize.

## Current Flow (broken)

```
Landing page → Enter email → Magic link → Dashboard → Copy widget URL → Embed
```

Problems:
- Sign-up before value delivery
- Dashboard is overkill for 3 widgets
- Magic link adds email round-trip delay
- High drop-off at every step

## Target Flow

```
Landing page → Widget marketing page → Copy URL → Embed in Notion → Use widget (free)
                                                                         |
                                                                   Wants to customize?
                                                                         |
                                                             Sign in (new tab) → Dashboard → Copy personalized URL → Re-embed
```

---

## Changes

### 1. Landing Page Hero Redesign

**Remove:** Email sign-up form as primary CTA for non-authenticated users.

**Add:** Two widget CTA buttons side by side:
- "Try the Pomodoro Timer" → `/pomodoro-timer`
- "Try the Water Tracker" → `/water-tracker-widget`

These are the two highest-traffic widgets. Habit Tracker is still linked in the sections below.

Below the buttons, a subtle text link: "Or explore all widgets" → scrolls to widget sections.

**Keep:** "Go to dashboard" button for already-authenticated users (existing behavior).

**Keep:** Maintenance banner (existing behavior).

### 2. Sign-In Page Improvements

Current state:
- Title: "Sign In"
- Subtitle: "Welcome Back!" (returning) or "No password is required to sign in !" (new)
- Email input + "Continue" button
- Magic link confirmation message

Problems:
- No context about *why* the user is signing in
- Generic copy doesn't reinforce value
- Typo: extra space before "!" in "No password is required to sign in !"
- SEO: title "Sign In | blocs notion widgets" is awkward, canonical uses `www.blocs.me` (inconsistent with `blocs.me` everywhere else)

**Copy improvements:**
- Title: "Sign in to Blocs"
- New user subtitle: "Enter your email and we'll send you a sign-in link. No password needed."
- Returning user subtitle: "Welcome back! Enter your email for a sign-in link."
- After link sent: "Check your inbox — we sent a sign-in link to {email}. It expires in 1 hour."
- SEO title: "Sign In — Blocs"
- Fix canonical to `https://blocs.me/sign-in`

**Magic Link vs OTP:**
Magic links are fine. They're simpler for the user (one click vs typing 6 digits), work across devices (click on phone, authenticated on desktop if same browser), and Supabase supports them natively. OTPs add friction (switch to email, copy code, switch back, paste). The only advantage of OTP is it works when the user's email client mangles links, but that's rare. Stick with magic links.

### 3. Widget Iframe Link Safety

Any link inside widget code (embedded in Notion iframes) that navigates to blocs.me pages will open inside the Notion embed frame, breaking UX.

**Rule:** All links inside widget components that point to blocs.me pages must use:
```html
<a href="..." target="_blank" rel="noopener noreferrer">
```

Never use Next.js `<Link>` or `router.push()` inside widget iframe code for external navigation.

**Files to audit and fix:**
- `src/components/widgets/Pomodoro/PomodoroSettingsPopover.tsx` — "Custom Durations" link currently goes to `/pricing`
- `src/components/design-system/PoweredBy/index.js` — already uses `target="_blank"` (OK)
- All "Powered by Blocs" components in widget demo pages — already use `target="_blank"` (OK)

**Behavior change for "Custom Durations" paywall CTA:**
Instead of linking to `/pricing`, link to `/sign-in` with `target="_blank"`. Copy: "Sign in to customize" instead of "Upgrade to Focus Pro". The user signs in, gets their 14-day trial automatically (existing behavior — `free_trial_started_at` is set on first sign-in), and can customize from the dashboard.

### 4. Pricing References on Widget Pages

The three marketing pages (`/pomodoro-timer`, `/water-tracker-widget`, `/habit-tracker-widget`) each have a "Pro CTA" section at the bottom with a "See Pricing" button. This is fine — these are full web pages, not iframes. No changes needed.

---

## What We're NOT Doing (for now)

- **In-place widget upgrade** (widget detects auth without re-embed): Would be ideal but requires architectural changes to the token-based auth flow. Keep the re-embed approach for now.
- **Removing the dashboard**: It's clunky for 3 widgets, but it's where users manage their embed URLs and settings. Simplifying the dashboard is a separate effort.
- **Changing auth method**: Keeping magic links via Supabase. They're simpler than OTP.
- **Anonymous/cookieless payment flow**: Would need a way to associate payment with a widget instance without auth. Too complex for now.

---

## Implementation Order

1. Landing page hero: replace email form with widget CTAs
2. Sign-in page: copy improvements, SEO fixes
3. Widget iframe links: fix "Custom Durations" CTA to use `target="_blank"` and point to `/sign-in`
