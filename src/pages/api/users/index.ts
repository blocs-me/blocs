import { NextApiRequest, NextApiResponse } from 'next'
import {
  handle200Response,
  handle500Response
} from '../../../lambda-functions/helpers/handleResponses'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import checkIfUserIsSubscribed from '@/lambda/helpers/checkIfUserIsSubscribed'
import removeUserFromMailingList from '../../../lambda-functions/helpers/removeUserFromMailingList'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const blocsUser = await getBlocsUser(req, res)
      const isSubscribed = await (blocsUser
        ? checkIfUserIsSubscribed(blocsUser?.data)
        : false)

      const purchaseHistory = blocsUser?.data?.purchaseHistory

      let purchasedProducts = !purchaseHistory?.length
        ? []
        : await Promise.all(
            purchaseHistory.map((cs) =>
              stripe.checkout.sessions.listLineItems(cs).then((v) => v.data)
            )
          ).then((res) => res.flat().map((d) => d.price.product))

      if (blocsUser) {
        handle200Response(res, {
          data: {
            ...(blocsUser?.data || {}),
            purchasedProducts,
            isSubscribed
          }
        })
      } else {
        handle500Response(res)
      }
    } catch (err) {
      console.error(err)
      handle500Response(res)
    }
  }

  if (req.method === 'DELETE') {
    const blocsUser = await getBlocsUser(req, res)
    const supabase = createServerSupabaseClient({ req, res })

    try {
      await removeUserFromMailingList(blocsUser)
      await faunaClient.query(
        q.Update(blocsUser.ref, {
          data: {
            avatar_url: '',
            name: '',
            supabaseUserId: '',
            email: '',
            scheduledForDeletion: true
          }
        })
      )
      const { data, error } = await supabase.auth.getUser()
      await supabase.from('profiles').delete().eq('id', data.user.id)

      if (error) throw error

      handle200Response(res, {
        message: 'Sad to see you go! Your account has been deleted'
      })
    } catch (err) {
      console.error(err)
      handle500Response(
        res,
        'Something went wrong when requesting your data for deletion, please try again'
      )
    }
  }
}

export default handler
