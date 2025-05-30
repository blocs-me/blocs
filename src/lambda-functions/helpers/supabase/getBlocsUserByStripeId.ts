import { BlocsUserServer } from 'src/global-types/blocs-user'
import { supabaseQueryGuard } from './queryGuard'
import supabase from '../supabase'

const getBlocsUserByStripeCustomerId = async (stripeCustomerId: string) => {
  const blocsUser: BlocsUserServer = await supabaseQueryGuard(() =>
    supabase
      .from('users')
      .select('*')
      .eq('stripeCustomerId', stripeCustomerId)
      .single()
  )
  return blocsUser
}

export default getBlocsUserByStripeCustomerId
