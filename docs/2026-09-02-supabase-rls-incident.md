# Supabase public-data exposure (RLS disabled) — 2026-09-02

## Report

A security researcher (Director of Research, UpGuard) notified us that the
Supabase database at `https://aeqfdftgibwotjiqqizv.supabase.co`, reachable from
blocs.me, was publicly readable and exposed users' full names, email addresses,
and Stripe payment IDs. Valid report.

## Root cause

- Supabase auto-exposes a PostgREST API at `<project>.supabase.co/rest/v1/<table>`.
- Access to that API is gated by **Row Level Security (RLS)**, not by the API
  key: the anon key is public by design (shipped in the client bundle as
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- **RLS was disabled on all public tables**, so anyone with the (public) anon key
  could read every row via the REST API.
- Compounding factor: our *server* client (`src/lambda-functions/helpers/supabase.ts`)
  also used the anon key, so the app only worked *because* RLS was off. That's why
  the naive fix ("just turn on RLS") would have broken the app.

Restricting by origin/referer is **not** a fix — the anon key is public and
Origin headers are trivially spoofed. RLS is the actual security boundary.

## Fix

1. **Code (deployed, commit `223ae17`):** switched the server Supabase client to
   the `SUPABASE_SERVICE_ROLE_KEY`. The service role bypasses RLS, so all API
   routes keep full DB access once RLS is enabled. It is server-only and never
   imported into client code (verified). Authorization is enforced in the API
   layer (widget-token validation + per-user `user_id` scoping), not by RLS.

2. **Database:** enable RLS on every public table (see SQL below). With RLS on
   and no policies, the anon key can read/write nothing; the service-role server
   is unaffected.

### Deploy ordering (important)

Deploy the code change **before** enabling RLS, otherwise the still-anon server
loses DB access. The code is already deployed; run the SQL once the Vercel
deploy is live.

### Lockdown SQL (run in Supabase SQL editor)

```sql
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', r.tablename);
  END LOOP;
END $$;
```

Exposed tables confirmed in code: `users`, `widget_access_tokens`,
`pomodoro_presets`, `pomodoro_analytics`, `habit_tracker_analytics`,
`water_tracker_analytics`. The loop covers all public tables so nothing is missed.

### Verify

- App: load the dashboard and a token-authed widget — should still work.
- Leak closed: `curl 'https://<project>.supabase.co/rest/v1/users?select=*' -H "apikey: <ANON_KEY>"`
  should return `[]` instead of rows.

## Follow-ups

- Consider rotating the anon + service-role keys (defense in depth; neither was
  committed to git — `.env` is untracked and gitignored).
- Check Supabase **Storage** bucket visibility (avatars via `/api/users/avatar`).
- Later: proper per-user RLS policies + move client to `@supabase/ssr` (the
  auth-helpers packages are deprecated).
- Unrelated latent bug spotted: `deleteHabit.ts` queries `habit_trackers_analytics`
  while the rest of the code uses `habit_tracker_analytics`. Tracked separately.
