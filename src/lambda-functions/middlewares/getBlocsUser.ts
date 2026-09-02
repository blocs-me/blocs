import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { BlocsUserServer as BlocsUser } from '../../global-types/blocs-user'
import { supabaseQueryGuard } from '../helpers/supabase/queryGuard'
import { mapUserToBlocUserServer } from '../helpers/supabase/mapDbToType'
import supabase from '@/lambda/helpers/supabase'

const getBlocsUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Auth-helpers client reads the caller's session from cookies; table reads go
  // through the service-role `supabase` client, which bypasses RLS.
  const supabaseAuth = createServerSupabaseClient({ req, res })

  const { data, error } = await supabaseAuth.auth.getUser()

  if (error) {
    console.error(error)
    res.status(500).json({
      error
    })

    return null
  }

  let blocsUser = await supabaseQueryGuard(
    () =>
      supabase
        .from('users')
        .select('*')
        .eq('supabase_user_id', data?.user?.id)
        .maybeSingle(),
    true
  )

  return mapUserToBlocUserServer(blocsUser) as BlocsUser
}

export default getBlocsUser
