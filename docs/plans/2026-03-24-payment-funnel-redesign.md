# Payment Funnel Redesign

**Date:** 2026-03-24
**Goal:** Tighten the funnel from widget usage to payment. Kill trial, go lifetime-only, payment-before-signup.

## Context

Current funnel (22-24 Mar Plausible data):
- 88 landing page -> 25 pomodoro -> 18 sign-in -> 12 dashboard -> 11 pricing -> 0 clicks on "Get Blocs Pro"
- Zero conversions from pricing page. The page isn't working.

## Pricing Change

- **Kill:** Monthly/yearly subscription toggle, free trial, "sign in before checkout" modal
- **New:** $17 lifetime one-time payment. Single option, no decisions.
- **Existing subscribers:** Keep their current plans. No migration needed. Stripe handles both.
- **Stripe setup required:** Create a new Price object for lifetime access ($17, one-time) in both test and production Stripe dashboards. Add the price ID to `stripePriceIds.ts`.

## New Funnel

```
Widget in Notion -> hits gated feature -> "Unlock Pro" (new tab) -> /pricing -> Stripe Checkout -> webhook creates account + sends magic link -> /welcome ("check your email") -> magic link -> /dashboard
```

Key change: payment happens BEFORE account creation. No trial, no sign-up-first.

---

## Implementation Plan

### Step 1: Create lifetime price in Stripe + update constants

**Files:**
- `src/constants/stripePriceIds.ts` — add `lifetime` price ID (one-time, $17)

**Stripe Dashboard (manual):**
- Create a Price on the existing `lifetimeAccess` product: $17, one-time
- Do this in both test and production Stripe dashboards
- Copy the price IDs into `stripePriceIds.ts`

**Changes to type:**
- Add `lifetime` to the PriceIds type (alongside yearly/monthly)

### Step 2: New checkout API route for anonymous users

**File:** `src/pages/api/payments/checkout-lifetime.ts` (new)

The current `checkout.ts` requires auth (`getBlocsUser` — returns 401 if not signed in). We need a new route that:
- Accepts POST with no auth required
- Creates a Stripe Checkout Session in `mode: 'payment'` (not 'subscription')
- Uses the lifetime price ID
- Sets `customer_creation: 'always'` so Stripe creates a Customer
- Sets `success_url` to `/welcome?session_id={CHECKOUT_SESSION_ID}`
- Sets `cancel_url` to `/pricing?canceled=true`
- Does NOT set `client_reference_id` (no user exists yet)
- Passes `customer_email` if provided (optional — user can enter on Stripe's page)

```ts
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{ price: LIFETIME_PRICE_ID, quantity: 1 }],
  customer_creation: 'always',
  allow_promotion_codes: true,
  success_url: `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/pricing?canceled=true`,
  automatic_tax: { enabled: true },
})
```

### Step 3: Webhook — auto-create Supabase account on payment

**File:** `src/pages/api/payments/webhooks.ts`

In the `checkout.session.completed` handler, add a new branch: if no `client_reference_id` (anonymous checkout), create the user.

```
1. Extract customer email from session.customer_details.email
2. Check if user already exists (getBlocsUserByEmail)
3. If not, create user in Supabase:
   - Insert into `users` table with email, purchased_products: [lifetimeAccess product ID], stripe_customer_id
4. Send magic link via Supabase Admin API: supabase.auth.admin.createUser({ email, email_confirm: true })
   then supabase.auth.admin.generateLink({ type: 'magiclink', email })
   (or use the existing signInWithOtp pattern from a server-side Supabase client)
5. Existing flow handles the case where user already exists (has client_reference_id)
```

**Key detail:** We need the Supabase service_role key (not anon key) to create users server-side. Check if the existing `src/lambda-functions/helpers/supabase.ts` already uses service_role. If not, we need a separate admin client.

### Step 4: /welcome page

**File:** `src/pages/welcome.tsx` (new)

Simple page, no auth required:
- Reads `session_id` from query params (for potential future use, not strictly needed)
- Shows: "You're in! Check your email for a login link."
- Subtext: "We sent a magic link to your email. Click it to access your Pro dashboard."
- Link: "Didn't get it? Go to sign-in to request another."
- Uses Nav + Footer for consistency

### Step 5: Redesign /pricing page

**File:** `src/components/pages/PricingPage/index.tsx` (rewrite)

Remove:
- Monthly/yearly toggle
- `useBlocsUser` hook (no auth needed)
- "Sign in before checkout" modal
- PricingCard component (too complex)
- Free trial link
- All subscription-related logic

New layout:
```
[Nav]

H1: "Your productivity tools, inside Notion"
H2: "Pomodoro timer, habit tracker, and water tracker — fully customizable, embedded in your workspace."

[3-4 feature bullets in a row or grid]
  - Custom Pomodoro durations
  - Unlimited habits & streaks
  - Analytics & progress tracking
  - No branding on widgets

[Pricing Card]
  ┌─────────────────────────────┐
  │  Lifetime Access    ONE-TIME │
  │  Pay once, keep forever      │
  │                              │
  │         $17                  │
  │                              │
  │  [Get Blocs Pro]             │
  │                              │
  │  No subscription. No         │
  │  recurring charges.          │
  ├──────────────────────────────┤
  │  Secure payment via Stripe   │
  └──────────────────────────────┘

[Comparison Table — reuse PlanPage style]
  Feature          | Free | Pro
  ─────────────────┼──────┼────
  Pomodoro Timer   |  yes | yes
  Habit Tracker    |  yes | yes
  Water Tracker    |  yes | yes
  Edit Durations   |  no  | yes
  Unlimited Habits |  no  | yes
  Analytics/Streaks|  no  | yes
  No Branding      |  no  | yes

[Footer]
```

The "Get Blocs Pro" button calls `POST /api/payments/checkout-lifetime` and redirects to Stripe Checkout.

**Plausible tracking:** Add `className="plausible-event-name=Checkout+Lifetime"` to the button.

### Step 6: Update widget CTAs — gated features point to /pricing

**Files to change:**

1. `src/components/widgets/Pomodoro/PomodoroSettingsPopover.tsx` (line 226-246)
   - Change unauthenticated "Customize Durations" link from `/sign-in` to `/pricing`
   - Update copy: "Get Pro to customize your timer durations"

2. `src/components/widgets/HabitTracker/DummyHabitTracker.tsx` (line 210, 425)
   - Change `/sign-in` links to `/pricing` for habit limit CTA
   - Update copy to mention Pro

3. `src/components/widgets/WaterTracker/DummyWaterTracker.tsx` (line 122)
   - Change `/sign-in` link to `/pricing` for water goal CTA
   - Update copy to mention Pro

All links keep `target="_blank"` (they're inside iframes).

---

## What We're NOT Doing (P2)

- Dashboard gating for free users (redirect unpaid users to pricing)
- "Change email" UI post-purchase
- Per-widget pricing tiers
- Future paid-only widgets and their marketing pages
- Smart detection of "user already has account" in checkout flow

## Open Questions

1. **Supabase admin client:** Need to verify we have service_role key access for server-side user creation. Check `.env` / Supabase dashboard.
2. **Lifetime price IDs:** Need to create these in Stripe before we can code Step 2. Aryan to do this in Stripe dashboard?
3. **H1 copy:** Proposed "Your productivity tools, inside Notion" — open to alternatives.
4. **What happens if someone visits /pricing who already has an account?** For now, they'd just buy again (Stripe handles duplicate customer gracefully). P2: detect and show "You already have Pro" or redirect to dashboard.

## Implementation Order

Steps 1-2-3 are backend prereqs. Steps 4-5 are the pages. Step 6 is the CTA rewiring.

Suggested order: 1 -> 2 -> 3 -> 5 -> 4 -> 6 (pricing page before welcome page since we want to test the full flow)
