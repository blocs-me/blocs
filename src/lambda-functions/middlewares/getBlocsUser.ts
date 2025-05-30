import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { BlocsUserServer as BlocsUser } from '../../global-types/blocs-user'
import { supabaseQueryGuard } from '../helpers/supabase/queryGuard'
import { mapUserToBlocUserServer } from '../helpers/supabase/mapDbToType'

const getBlocsUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res })

  const { data, error } = await supabase.auth.getUser()

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
