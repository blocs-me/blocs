import { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  handle500Response,
  handle200Response
} from '../../../lambda-functions/helpers/handleResponses'
import { supabaseQueryGuard } from '../../../lambda-functions/helpers/supabase/queryGuard'
import { BlocsUserServer } from '../../../global-types/blocs-user'
import Stripe from 'stripe'
import { mapUserToBlocUserServer } from '@/lambda/helpers/supabase/mapDbToType'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
  typescript: true
})

const getClientUserData = (blocsUser: BlocsUserServer) => ({
  email: blocsUser?.email,
  avatar_url: blocsUser?.avatar_url,
  name: blocsUser?.name,
  stripeCustomerId: blocsUser?.stripeCustomerId || null,
  freeTrialStartedAt: blocsUser?.freeTrialStartedAt
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const supabase = createServerSupabaseClient({
        req,
        res
      })

      const { data: authData, error: authError } = await supabase.auth.getUser()

      if (authError) throw authError

      let blocsUserById: BlocsUserServer =
        await supabaseQueryGuard<BlocsUserServer>(
          () =>
            supabase
              .from('users')
              .select('*')
              .eq('supabase_user_id', authData?.user?.id)
              .single(),
          true
        )
      blocsUserById = mapUserToBlocUserServer(blocsUserById)

      let blocsUserByEmail: BlocsUserServer =
        await supabaseQueryGuard<BlocsUserServer>(
          () =>
            supabase
              .from('users')
              .select('*')
              .eq('email', authData?.user?.email)
              .single(),
          true
        )

      blocsUserByEmail = mapUserToBlocUserServer(blocsUserByEmail)

      if (blocsUserById && !blocsUserByEmail) {
        // implies email has changed
        const { data: updatedUser, error: updateError } = await supabase
          .from('users')
          .update({ email: authData?.user?.email })
          .eq('id', blocsUserById.id)
          .select()
          .single()

        if (updateError) throw updateError

        await stripe.customers.update(updatedUser.stripeCustomerId, {
          email: authData?.user?.email
        })

        return handle200Response(res, {
          data: {
            user: getClientUserData(updatedUser)
          }
        })
      }

      if (!blocsUserById && blocsUserByEmail) {
        // already existing user signs in with supabase for the first time
        const { data: updatedUser, error: updateError } = await supabase
          .from('users')
          .update({
            supabase_user_id: authData?.user?.id,
            free_trial_started_at: new Date().toISOString()
          })
          .eq('id', blocsUserByEmail.id)
          .select()
          .single()

        const updatedUserMapped = mapUserToBlocUserServer(updatedUser)
        if (updateError) throw updateError

        return handle200Response(res, {
          data: {
            user: getClientUserData(updatedUserMapped)
          }
        })
      }

      let blocsUser: BlocsUserServer

      if (!blocsUserByEmail && !blocsUserById) {
        // first time sign in
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            email: authData?.user?.email,
            supabase_user_id: authData?.user?.id,
            free_trial_started_at: new Date().toISOString()
          })
          .select()
          .single()

        if (createError) throw createError
        blocsUser = mapUserToBlocUserServer(newUser)
      }

      if (blocsUserByEmail || blocsUserById) {
        blocsUser = blocsUserByEmail || blocsUserById
      }

      handle200Response(res, {
        data: {
          user: getClientUserData(blocsUser)
        }
      })
    } catch (err) {
      console.error(err)
      handle500Response(res)
    }
  }
}

export default handler
