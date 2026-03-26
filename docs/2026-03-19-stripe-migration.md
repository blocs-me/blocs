# Stripe Account Migration — 2026-03-19

## Summary

Migrated all customer payment data and active subscriptions from the old Stripe account (Germany, `acct_1MQLeyHyXnRceQpO`) to the new US-based Stripe account (`acct_1TBtzvHuSirGScmM`). This was required because the old account was registered under the previous owner in Germany.

## What Was Done

### 1. PAN Data Copy (Customer + Payment Methods)

Used Stripe's self-serve PAN copy to transfer all ~140 customers from old account to new account. Customer IDs are preserved across accounts. Payment method IDs change (Stripe generates new `pm_` IDs on the destination account).

- Sender: `acct_1MQLeyHyXnRceQpO` (old, Germany)
- Recipient: `acct_1TBtzvHuSirGScmM` (new, US)
- Method: Full copy via Stripe Dashboard
- Result: 140 customers copied, all payment methods intact

### 2. Products & Prices Created on New Account

New account product: **Blocs Focus Pro** (`prod_UAHNvUa6RAPJaJ`)

Created legacy prices to grandfather existing customers at their original rates:

| Old Price ID | New Price ID | Amount | Interval |
|-------------|-------------|--------|----------|
| `price_1QfLmMHyXnRceQpOB0P4UvLC` | `price_1TCfQKHuSirGScmMUNZJ7kmT` | $12 | year |
| `price_1QfLkcHyXnRceQpOb4fMdxCj` | `price_1TCfRuHuSirGScmMV3oo9Pcg` | $2 | month |
| `price_1PktRfHyXnRceQpOxWWLfKjD` | `price_1TCfQpHuSirGScmMXTVWOSPb` | $19 | year |
| `price_1OMb1gHyXnRceQpOC64hlwPS` | `price_1TBwohHuSirGScmMB8N8628p` | $36 | year |
| `price_1OMb3cHyXnRceQpOicKpzH3B` | `price_1TCfR7HuSirGScmM81VEOSNw` | $24 | year |
| `price_1OLARHHyXnRceQpOvNcZVRnf` | `price_1TBwogHuSirGScmMqdOCwwoX` | $6 | month |

New default prices (for new customers going forward): **$6/mo** or **$36/yr**

### 3. Subscriptions Recreated (20 total)

Used `scripts/migrate-subscriptions.py` to create subscriptions on the new account via the Stripe API. Each subscription was created with `trial_end` set to the customer's `current_period_end` from the old account, so no one is charged until their natural billing date.

**Migrated (20 customers):**

| Customer | Email | Price | First Charge Date |
|----------|-------|-------|-------------------|
| Kevin Le | kevinle77777@gmail.com | $12/yr | 2027-03-01 |
| Cassandra Fikes | cassie.fikes@gmail.com | $12/yr | 2027-02-08 |
| Lein (Elena) | ellena.ella.2.0.0@gmail.com | $2/mo | 2026-04-01 |
| Jacob Dreiling | jd@jdtheplaytherapist.com | $2/mo | 2026-04-05 |
| Mohamud Ali | mohamud.mdg@gmail.com | $12/yr | 2026-11-28 |
| Gretchen Melby | gretchenmelby@gmail.com | $12/yr | 2026-06-23 |
| Lucy Yazzolino | lucyyazzolino@gmail.com | $12/yr | 2026-06-20 |
| John Plunkett | jplunk3tt@gmail.com | $12/yr | 2026-06-16 |
| Mariana Amorim | dramariamorim@gmail.com | $12/yr | 2026-05-27 |
| Victoria Yeo | nahanye@gmail.com | $12/yr | 2026-05-26 |
| Sondra Price | sondraprice91@gmail.com | $12/yr | 2026-05-23 |
| Sarah Quinn | sjquinn97@gmail.com | $12/yr | 2026-04-25 |
| Mohammed | mo7ammedalbaqer@gmail.com | $19/yr | 2026-11-14 |
| Ayoub Chaouachi | ayoub.chaouachi@gmail.com | $19/yr | 2026-09-05 |
| Evan Strand | evanbillstrand@gmail.com | $36/yr | 2026-05-23 |
| Brian Russo | jessicafruss@gmail.com | $24/yr | 2026-05-06 |
| Ahn Ha Eun | hani9708@gmail.com | $36/yr | 2026-04-15 |
| Carlos Rodriguez | stro.carlos@gmail.com | $36/yr | 2027-02-28 |
| Matthew Kokai | matthewkokai@outlook.com | $36/yr | 2026-12-29 |
| Yuta Ito | yuta.ito0311@gmail.com | $6/mo | 2026-04-09 |

**Skipped (3 customers):**
- Anirudh Nair (mr.anirudhnair@gmail.com) — cancel_at_period_end, expires 2026-07-20
- Lydia Brown (lydia@slemish.ca) — cancel_at_period_end, expires 2027-02-22
- Kimberly Su (ttsu1000@gmail.com) — cancelled due to dispute

### 4. Old Subscriptions Cancelled

All subscriptions on the old account were manually cancelled (immediate, not at period end) to prevent double-billing.

### 5. Database Fixes (Supabase)

- 7 paying customers had no row in the `users` table (older cohort, predated current signup flow). Inserted rows with correct `email`, `stripe_customer_id`, `purchased_products`, and `name`.
- Mohammed's `stripe_customer_id` was corrected (`cus_RDUKqsvfqJgPst` -> `cus_RDUOGY3vf9AhZe`).
- All 20 migrated customers now have `purchased_products: ["prod_UAHNvUa6RAPJaJ"]` in the database.

### 6. Codebase Changes

- **Price/product IDs** (`stripePriceIds.ts`, `stripeProductIds.ts`): Already pointed to new account — no changes needed.
- **Pricing page**: Updated monthly price display from $5 to $6, "Save 40%" to "Save 50%", SEO description updated.
- **Marketing pages** (`pomodoro-timer.tsx`, `habit-tracker-widget.tsx`, `water-tracker-widget.tsx`): Updated "$3/month" to "$6/month" in upgrade CTAs.
- **Checkout API**: Uses `stripePriceIds` dynamically — no hardcoded prices, no changes needed.

## Webhooks

- Old account webhook should be disabled/deleted (events fail signature verification against new secret, but generates noise from retries).
- New account webhook is active with `STRIPE_WEBHOOK_SIGNING_SECRET` in `.env`.

## Known Issues / Follow-ups

- **Lydia & Anirudh**: Still have `prod_UAHNvUa6RAPJaJ` in `purchased_products` but their subs were not migrated. When their old subs expire, the old webhook won't fire to clear access (webhook disabled). Manually clear their `purchased_products` when their periods end (Anirudh: Jul 2026, Lydia: Feb 2027).
- **Payment rejection risk**: Small chance (0-2 customers) that the first charge from the new merchant ID gets soft-declined. Stripe's smart retries should handle it. Worst case, customer re-enters card.
- **Old Stripe account**: Keep it as a backup/reference. Customer data still exists there.

## Files

- `scripts/migrate-subscriptions.py` — Script used to create subscriptions on new account
- `docs/subscriptions.csv` — Export of old account subscriptions used as source data
