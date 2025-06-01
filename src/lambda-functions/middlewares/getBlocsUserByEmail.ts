import { BlocsUserServer } from 'src/global-types/blocs-user'
import supabase from '../helpers/supabase'
import { supabaseQueryGuard } from '../helpers/supabase/queryGuard'
import { mapUserToBlocUserServer } from '../helpers/supabase/mapDbToType'

const getBlocsUserByEmail = async (email: string) => {
  const blocsUser = await supabaseQueryGuard(() =>
    supabase.from('users').select('*').eq('email', email).maybeSingle()
  )

  return mapUserToBlocUserServer(blocsUser) as BlocsUserServer
}

export default getBlocsUserByEmail
