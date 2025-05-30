import { BlocsUserClient, BlocsUserServer } from '@/gtypes/blocs-user'
import {
  handle200Response,
  handle500Response
} from '@/lambda/helpers/handleResponses'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const pickBlocsUserData = (
  blocsUser: BlocsUserServer
): Partial<BlocsUserClient['data']> => ({
  name: blocsUser?.name || blocsUser?.email,
  email: blocsUser?.email,
  purchasedProducts: blocsUser?.purchasedProducts,
  avatar_url: blocsUser?.avatar_url,
  freeTrialStartedAt: blocsUser?.freeTrialStartedAt,
  isSubscribed: blocsUser?.isSubscribed
})

const PRIVATE_KEY = process.env.CANNY_PRIVATE_KEY

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      let blocsUser = await getBlocsUser(req, res)
      if (blocsUser) {
        const user = pickBlocsUserData(blocsUser)
        const userInfo = {
          name: user.name,
          email: user.email,
          id: blocsUser.id,
          avatarURL: user.avatar_url
        }

        const ssoToken = await jwt.sign(userInfo, PRIVATE_KEY, {
          algorithm: 'HS256'
        })
        handle200Response(res, {
          data: {
            token: ssoToken
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
}

export default handler
