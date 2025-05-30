import getBlocsUserByEmail from './getBlocsUserByEmail'
import supabase from '../helpers/supabase'
import {
  mapBlocUserServerToUser,
  mapUserToBlocUserServer
} from '../helpers/supabase/mapDbToType'

const upsertBlocsUser = async (email: string, data: any) => {
  let blocsUser = await getBlocsUserByEmail(email)
  const dbRecord = mapBlocUserServerToUser(blocsUser)

  if (blocsUser) {
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update(dbRecord)
      .eq('email', email)
      .select()
      .single()

    blocsUser = mapUserToBlocUserServer(updatedUser)
  } else {
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert(dbRecord)
      .select()
      .single()

    blocsUser = mapUserToBlocUserServer(newUser)
  }

  return blocsUser
}

export default upsertBlocsUser
