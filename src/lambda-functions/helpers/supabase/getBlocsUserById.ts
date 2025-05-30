import supabase from '../supabase'
import { mapUserToBlocUserServer } from './mapDbToType'
import { supabaseQueryGuard } from './queryGuard'

const getBlocsUserById = async (userId: string) => {
  const blocsUser = await supabaseQueryGuard(() =>
    supabase.from('users').select('*').eq('id', userId).single()
  )

  if (!blocsUser) return null

  return mapUserToBlocUserServer(blocsUser)
}

export default getBlocsUserById
