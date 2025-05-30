import { NextApiRequest, NextApiResponse } from 'next'
import {
  handle200Response,
  handle500Response
} from '../../../lambda-functions/helpers/handleResponses'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  BlocsUserServer,
  BlocsUserClient
} from '../../../global-types/blocs-user'

const pickBlocsUserData = (
  blocsUser: BlocsUserServer
): Partial<BlocsUserClient['data']> => ({
  name: blocsUser?.name,
  email: blocsUser?.email,
  purchasedProducts: blocsUser?.purchasedProducts,
  avatar_url: blocsUser?.avatar_url,
  freeTrialStartedAt: blocsUser?.freeTrialStartedAt,
  isSubscribed: blocsUser?.isSubscribed
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      let blocsUser = await getBlocsUser(req, res)
      if (blocsUser) {
        handle200Response(res, {
          data: {
            ...pickBlocsUserData(blocsUser)
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
      await supabase.from('users').delete().eq('id', blocsUser.id)
      await supabase.auth.admin.deleteUser(blocsUser.supabaseUserId)

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
