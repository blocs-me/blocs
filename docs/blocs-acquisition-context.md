# Blocs.me — Acquisition Context & Operational Playbook

**Acquired:** March 2026
**Purchase price:** $300
**Owner:** Aryan
**Product:** Notion-embeddable productivity widgets (Pomodoro timer, Habit Tracker, Water Tracker)
**Stack:** Next.js / MongoDB (via Supabase) / Stripe / SendGrid / Vercel
**Domain:** blocs.me (currently on Namecheap, planned move to Porkbun)

---

## 1. What Blocs.me Is

Blocs is a SaaS that provides embeddable widgets for Notion pages via iframe. Users sign up, get access to a dashboard, copy widget embed links, and paste them into their Notion pages.

**Current widgets:**
- Pomodoro timer (by far the most popular — 13k of 21k visitors hit /pomodoro)
- Habit Tracker
- Water Tracker (with analytics)

The Notion integration works via iframe embeds. There is a dependency on the Notion API, but the API is versioned so breaking changes are unlikely without notice.

**Target audience:** Notion users who want to track habits, productivity, and health metrics within their Notion workspace.

---

## 2. Revenue & Subscription Data (Verified via Stripe, March 2026)

### Current MRR

Stripe-reported MRR as of Feb 2026: **~$41/mo** across two products:
- Blocs Lifestyle Pro: $39.16/mo
- Blocs Habit Tracker Widget: $2.00/mo

**Realistic healthy MRR after removing past-due subs: ~$28-33/mo**

### Active Subscriptions (as of acquisition)

~17 healthy paying customers, 3 past-due (likely churning), 2 flagged.

**Pricing is inconsistent across cohorts (founder lowered prices over time):**

| Cohort | Annual Price | Monthly Equivalent |
|--------|-------------|-------------------|
| Dec 2023 (earliest customer) | $72/yr | $6.00/mo |
| Late 2023 - May 2024 | $36/yr | $3.00/mo |
| Sep-Nov 2024 | $19/yr | $1.58/mo |
| 2025+ (current pricing) | $12/yr | $1.00/mo |

Current listed pricing: $2/mo or $12/yr for "Lifestyle Pro." There's also a Team plan at $3/mo that has zero customers.

### Past-Due Subscriptions (action needed)

- yumnafairooz@gmail.com — stolen card, this is dead
- ellena.ella.2.0.0@gmail.com — repeated insufficient funds
- stro.carlos@gmail.com — "Do not honor" on $36 renewal

These should be cleaned up (canceled) once you take over Stripe.

### Dispute

ttsu1000@gmail.com had a $36 dispute lost in Jan 2026. Customer is still listed as active. Investigate whether this resolved or if there's ongoing liability.

### Revenue History

All-time revenue: ~$2,494
Last 12 months revenue: $462 (32% decline from prior 12 months)

Monthly revenue is volatile ($6 to $102 range) due to mix of monthly and yearly renewals hitting at different times.

---

## 3. Traffic & Analytics

### Traffic Volume (last 90 days as of Jan 2026)

- **21.2k unique visitors** (down from 24.8k previous 90-day period, ~15% decline)
- 25.1k total visits
- 2.66 views per visit
- 64% bounce rate
- 3 min average visit duration (decent engagement)

### Traffic Sources — CRITICAL

| Channel | Visitors | % of Total |
|---------|----------|-----------|
| Referral | 16.1k | 76% |
| Direct | 4.6k | 22% |
| Organic Search | 405 | 1.9% |
| Other (email, social, video) | ~115 | <1% |

**~75% of referral traffic comes from widgetly.co / notion-widgets.com**, another property owned by the previous owner (Dan). As part of the acquisition, Dan has agreed to keep referral links active for 1 year post-sale.

**This is the single biggest risk**: after 1 year, if those referral links disappear and organic search hasn't grown, traffic drops ~75%.

**Organic search is essentially zero (405 visitors in 90 days).** Any SEO strategy is building from scratch, not optimizing existing presence.

### Top Pages

| Page | Visitors (90 days) |
|------|-------------------|
| /pomodoro | 13,000 |
| /water-tracker | 4,200 |
| / (homepage) | 3,700 |
| /dashboard/sign-in | 1,700 |
| /dashboard/pomodoro | 1,100 |
| /habit-tracker | 947 |
| /bar-chart/pomodoro | 849 |
| /pricing | 777 |
| /dashboard/habit-tracker | 724 |

### Conversion Funnel (estimated)

- ~7k monthly visitors
- ~250/mo reach pricing page
- ~1-2 convert to paid per month
- Conversion rate: **~0.3% visitor → paid** (very poor)

### SEO Baseline

- Ahrefs Domain Rating: 32/100 (decent for a small tool)
- Some quality backlinks from articles/blogs
- Essentially no organic keyword rankings driving traffic

### Plausible Analytics

Historical data has been exported from Dan's Plausible instance and needs to be imported into Aryan's self-hosted Plausible (CSV import). This preserves pageview history, sources, and referrers.

---

## 4. Infrastructure & Costs

### Current Setup (as transferred)

| Service | Account Status | Notes |
|---------|---------------|-------|
| **Domain** | Namecheap (transferred) | Plan to move to Porkbun later |
| **GitHub** | Repo ownership transferred | Full access to codebase |
| **Vercel** | Needs new project setup | Dan will delete his project; create new one on free plan |
| **Supabase** | Transferred to Aryan's org | Currently on paid plan |
| **Stripe** | Ownership transferred | Aryan is super admin |
| **SendGrid** | Need to swap API keys | Can use own account with new API key |
| **Plausible** | Export files obtained | Import into self-hosted instance |

### Cost Optimization Target

**Dan's costs were:**
- Vercel: $20/mo ($4 allocated to blocs)
- Supabase: $25/mo
- Domain: $12/yr
- **Total: ~$30/mo (eating most or all of the revenue)**

**Target costs:**
- Vercel free plan: $0
- Supabase free tier or cheaper alternative: $0
- SendGrid free tier: $0
- Domain: ~$12/yr (~$1/mo)
- **Target total: ~$1/mo**

This is the first priority — get costs to near zero so the existing ~$30/mo MRR is actual profit.

---

## 5. Technical Setup Checklist (Stabilization Phase)

### Immediate (before Dan deletes his Vercel project)

- [ ] Clone the GitHub repo locally
- [ ] Create new Vercel project on free plan, import the repo
- [ ] Copy all env vars from Dan's `.env` export into Vercel project settings
- [ ] Dan deletes his Vercel project
- [ ] Point blocs.me domain DNS to new Vercel project
- [ ] Verify the site loads correctly (test all pages: /, /pomodoro, /water-tracker, /habit-tracker, /pricing, /dashboard)
- [ ] Verify widget embeds still work (test in a Notion page)
- [ ] Verify Stripe payments work (test a subscription flow)
- [ ] Verify SendGrid emails send (or swap to your own SendGrid API key)
- [ ] Verify Supabase/MongoDB connections work

### Near-term (first week)

- [ ] Import Plausible historical data into self-hosted instance
- [ ] Set up Plausible tracking on blocs.me pointing to self-hosted instance
- [ ] Evaluate Supabase usage — what exactly is it doing? Can it move to free tier?
- [ ] Cancel the 3 zombie past-due subscriptions in Stripe
- [ ] Investigate the ttsu1000 dispute situation
- [ ] Update Stripe account legal entity, bank account, and tax info to yours
- [ ] Create own SendGrid account, verify blocs.me domain, swap API key
- [ ] Set up monitoring/alerting (even just uptime checks)

### Later (stabilization complete)

- [ ] Transfer domain from Namecheap to Porkbun
- [ ] Remove any references to Dan's personal accounts in the codebase
- [ ] Review and clean up any unused code, dependencies, or env vars

---

## 6. Growth Strategy (Post-Stabilization)

### Priority 1: Fix Pricing (Highest Leverage, Lowest Effort)

The current $2/mo ($12/yr) pricing is far too low. Legacy customers prove higher prices work:
- 4 customers happily pay $36/yr ($3/mo)
- 1 customer pays $72/yr ($6/mo)
- Nobody has churned over price

**Recommended pricing change:**
- Raise to $5/mo or $36/yr (3x current price, matches what legacy customers already pay)
- Grandfather existing customers at their current rate (they renew at their original price)
- Kill the Team plan (zero customers, adds confusion)
- Consider: Free tier with basic widget (no analytics, branding shown) → Paid tier with analytics, customization, no branding

Even if only half the customer base converts at the new price, MRR increases.

### Priority 2: Fix the Conversion Funnel

**Current problem:** 700 people view the pricing page per quarter and almost nobody converts. The product is gated behind signup/login for no good reason.

**Key insight:** The dashboard is just "copy embed links" — there's no reason this requires login. The current flow has too much friction:

Now: Landing page → Sign up → Log in → Dashboard → Copy link → Embed in Notion

Better: Landing page → Use widget instantly (free, with branding) → "Want analytics & customization? $5/mo" → Sign up

Let the free usage BE the marketing. Charge for analytics, custom presets, branding removal, and advanced features.

**Pricing page improvements:**
- Current copy ("Best plan to change your habits") is generic and unconvincing
- Reduce to 2 tiers: Free and Pro
- Show the actual widgets on the page so people can see what they're getting
- Add social proof if possible (even "used by X Notion users")

### Priority 3: Build Organic Search (SEO)

This is critical because the referral traffic from widgetly has a 1-year expiry.

**Current state:** 405 organic visitors in 90 days. Essentially starting from zero.

**Approach — Programmatic SEO:**
Create content pages targeting long-tail keywords like:
- "notion pomodoro timer"
- "notion habit tracker widget"
- "embed pomodoro in notion"
- "notion water tracker"
- "best notion widgets for productivity"
- "notion pomodoro template"
- "how to track habits in notion"

The domain already has DR 32 which gives some authority. Blog posts or landing pages targeting these keywords could capture organic traffic that's currently going elsewhere.

**Approach — Improve existing pages:**
- The /pomodoro, /water-tracker, and /habit-tracker pages get significant traffic but aren't optimized for search
- Add proper meta titles, descriptions, structured data
- Make these pages standalone valuable (not just funnels to sign up)

### Priority 4: Product Improvements (Only After Above)

- Improve dashboard design (it's functional but bare)
- Add more widget customization (colors, sizes, themes)
- Consider new widget types if there's demand (the "Feature Wishes" page in the dashboard might have user requests)
- Mobile responsiveness check

---

## 7. Key Risks

1. **Referral traffic cliff (1 year):** 75% of traffic comes from widgetly.co referrals. Must build organic traffic before these potentially disappear.

2. **Notion platform dependency:** If Notion ships native habit tracking, pomodoro, or widget embed features, this product's value proposition weakens significantly.

3. **Tiny customer base:** 17 paying customers. Losing 2-3 is a meaningful revenue hit. No single customer should represent >15% of MRR (yuta.ito at $6/mo is currently ~18%).

4. **Time investment:** This needs active work to grow. If it sits idle, traffic and revenue will continue declining.

---

## 8. Key Contacts & Accounts

- **Previous owner:** Dan (available for transition questions)
- **Stripe:** Transferred, Aryan is super admin. Update legal entity + bank details.
- **GitHub repo:** Under Aryan's control
- **Supabase:** Transferred to Aryan's org
- **Domain:** blocs.me on Namecheap (move to Porkbun when stable)

---

## 9. Success Metrics (6-month targets)

| Metric | Current | 6-Month Target |
|--------|---------|---------------|
| MRR | ~$30 | $100-150 |
| Monthly organic visitors | ~135 | 1,000+ |
| Pricing page conversion | <1% | 3-5% |
| Infrastructure cost | ~$30/mo | <$2/mo |
| Paying customers | 17 | 30-40 |
