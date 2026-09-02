import { createClient } from '@supabase/supabase-js'

// Server-only Supabase client. Uses the service-role key, which bypasses Row
// Level Security, so it MUST never be imported into client/browser code (the
// key would be useless there anyway — Next.js only inlines NEXT_PUBLIC_* env
// vars into the client bundle — but importing it client-side would break those
// calls). All authorization is enforced in the API layer (widget-token checks
// and per-user `.eq('user_id', ...)` scoping), not by RLS.
//
// Previously this client used the public anon key, which only worked because
// RLS was disabled on every table — the same misconfiguration that left user
// data publicly readable via the anon REST API. With RLS enabled, the anon key
// returns nothing, so the server must authenticate with the service-role key.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default supabase
