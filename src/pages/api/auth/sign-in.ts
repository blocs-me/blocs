import { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  handle500Response,
  handle200Response
} from '../../../lambda-functions/helpers/handleResponses'
import { queryGuard } from '@/lambda/helpers/faunadb/queryGuard'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { BlocsUserServer } from '../../../global-types/blocs-user'
import addUserToMailingList from '@/lambda/helpers/addUserToMailingList'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

const getClientUserData = (blocsUser: BlocsUserServer) => ({
  email: blocsUser?.data?.email,
  avatar_url: blocsUser?.data?.avatar_url,
  name: blocsUser?.data?.name,
  stripeCustomerId: blocsUser?.data?.stripeCustomerId || null,
  freeTrialStartedAt: blocsUser?.data?.freeTrialStartedAt
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const supabase = createServerSupabaseClient({
        req,
        res
      })

      const { data, error } = await supabase.auth.getUser()

      if (error) throw error

      let blocsUserById: BlocsUserServer = await queryGuard(
        () =>
          faunaClient.query(
            q.Get(
              q.Match(q.Index('all_users_by_supabase_user_id'), data?.user?.id)
            )
          ),
        true
      )

      let blocsUserByEmail: BlocsUserServer = await queryGuard(
        () =>
          faunaClient.query(
            q.Get(q.Match(q.Index('all_users_by_email'), data?.user?.email))
          ),
        true
      )

      if (blocsUserById && !blocsUserByEmail) {
        // implies email has changed
        let blocsUser: BlocsUserServer = await faunaClient.query(
          q.Update(blocsUserById.ref, {
            data: {
              email: data?.user?.email
            }
          })
        )

        await stripe.customers.update(blocsUser.data.stripeCustomerId, {
          email: data?.user?.email
        })

        return handle200Response(res, {
          data: {
            user: getClientUserData(blocsUser)
          }
        })
      }

      if (!blocsUserById && blocsUserByEmail) {
        // already existing user signs in with supabase for the first time

        let blocsUser: BlocsUserServer = await faunaClient.query(
          q.Update(blocsUserByEmail.ref, {
            data: {
              supabaseUserId: data?.user?.id,
              freeTrialStartedAt: new Date().toISOString()
            }
          })
        )

        return handle200Response(res, {
          data: {
            user: getClientUserData(blocsUser)
          }
        })
      }

      let blocsUser: BlocsUserServer

      if (!blocsUserByEmail && !blocsUserById) {
        // first time sign in

        blocsUser = (await faunaClient.query(
          q.Create(q.Collection('users'), {
            data: {
              email: data?.user?.email,
              supabaseUserId: data?.user?.id,
              freeTrialStartedAt: new Date().toISOString()
            }
          })
        )) as BlocsUserServer

        await addUserToMailingList(blocsUser?.data, true)
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
