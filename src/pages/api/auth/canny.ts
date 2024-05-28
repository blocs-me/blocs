import { BlocsUserClient, BlocsUserServer } from '@/gtypes/blocs-user'
import {
  handle200Response,
  handle500Response
} from '@/lambda/helpers/handleResponses'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const pickBlocsUserData = (
  blocsUser: BlocsUserServer['data']
): Partial<BlocsUserClient['data']> => ({
  name: blocsUser?.name,
  email: blocsUser?.email,
  purchasedProducts: blocsUser?.purchasedProducts,
  isDeleted: blocsUser?.isDeleted,
  scheduledForDeletion: blocsUser?.scheduledForDeletion,
  avatar_url: blocsUser?.avatar_url,
  freeTrialStartedAt: blocsUser?.freeTrialStartedAt,
  isSubscribed: blocsUser?.isSubscribed
})

const PRIVATE_KEY = process.env.CANNY_PRIVATE_KEY

const extractUserId = (refString: string) => {
  const match = refString.match(/Ref\(Collection\("users"\), "(\d+)"\)/)
  if (match) {
    return match[1]
  }

  throw new Error('Could not extract user ID from ref string')
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      let blocsUser = await getBlocsUser(req, res)
      if (blocsUser) {
        const user = pickBlocsUserData(blocsUser?.data)
        const userInfo = {
          name: user.name,
          email: user.email,
          id: extractUserId(String(blocsUser.ref)),
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
