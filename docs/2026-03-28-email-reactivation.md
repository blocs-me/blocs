# Email Reactivation Plan

Re-engage ~10,667 dormant users from the Supabase `users` table who signed up via the old landing page email CTA.

## Step 1: Validate emails with Reacher

Self-hosted Reacher instance running on Hetzner VPS (`5.78.151.33`), bound to localhost only.

**Access:**

```bash
# SSH in directly
ssh root@5.78.151.33

# Or tunnel to use from your machine
ssh -L 8080:localhost:8080 root@5.78.151.33
```

**Verify a single email:**

```bash
curl -s -X POST http://localhost:8080/v0/check_email \
  -H 'Content-Type: application/json' \
  -d '{"to_email": "someone@example.com"}'
```

**Filter logic — keep, drop, or retry:**

| `is_reachable` | `smtp.is_deliverable` | `misc.is_disposable` | Action |
|---|---|---|---|
| `safe` | `true` | `false` | Keep |
| `risky` | any | `false` | Keep (send cautiously) |
| `invalid` | any | any | Drop |
| `unknown` | any | any | Retry once, then drop |
| any | any | `true` | Drop |

Also drop if `smtp.is_disabled` is `true`.

**Batch process:** Export emails from Supabase, write a script to POST each to Reacher (with a short delay between requests to avoid rate-limiting upstream SMTP servers), and bucket results into keep/drop lists. Expect to lose 30-50% of the list.

## Step 2: Send reactivation email via Resend

**Setup:**
- Create a Resend account (free tier: 100 emails/day)
- Add a sending subdomain like `updates.blocs.me` and configure SPF/DKIM/DMARC via the DNS records Resend provides

**Warmup schedule:**
- Week 1: 20-50 emails/day (most recent signups first)
- Week 2: ramp to 100/day
- Monitor bounce rate after each batch — pause if it exceeds 5%

**Email draft (plaintext, no HTML):**

> Subject: Blocs is back — new widgets for your Notion workspace
>
> Hey,
>
> You signed up for Blocs a while back. We've rebuilt it with new widgets — Pomodoro Timer, Water Tracker, Habit Tracker, Countdown Timer, and Progress Bar — all embeddable directly in Notion.
>
> Check it out: https://blocs.me
>
> If you have 30 seconds, reply and tell me what widget you'd want next. We're building based on what users ask for.
>
> — Aryan, Blocs

**Requirements:**
- Include an unsubscribe link (CAN-SPAM)
- Send from something like `aryan@updates.blocs.me`
- Track opens/replies to gauge interest before committing to the full list
