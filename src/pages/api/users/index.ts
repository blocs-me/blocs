import { NextApiRequest, NextApiResponse } from 'next'
import {
  handle200Response,
  handle500Response
} from '../../../lambda-functions/helpers/handleResponses'
import getOrCreateBlocsUser from '@/lambda/middlewares/getOrCreateBlocsUser'
import checkIfUserIsSubscribed from '@/lambda/helpers/checkIfUserIsSubscribed'
import removeUserFromMailingList from '../../../lambda-functions/helpers/removeUserFromMailingList'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { queryGuard } from '../../../lambda-functions/helpers/faunadb/queryGuard'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const blocsUser = await getOrCreateBlocsUser(req, res)
    const isSubscribed = await checkIfUserIsSubscribed(blocsUser?.data)

    if (blocsUser) {
      handle200Response(res, {
        data: {
          ...(blocsUser?.data || {}),
          isSubscribed
        }
      })
    }
  }

  if (req.method === 'DELETE') {
    const blocsUser = await getOrCreateBlocsUser(req, res)

    try {
      await removeUserFromMailingList(blocsUser)
      await faunaClient.query(
        q.Update(blocsUser.ref, {
          data: {
            isDeleted: true
          }
        })
      )

      handle200Response(res, {
        message: 'Sad to see you go! Your account has been deleted'
      })
    } catch (err) {

      
    }
  }

  if (req.method === 'POST') {
    // created by supabase hook
    const body = req.body

    const blocsUser = await queryGuard(() =>
      faunaClient.query(
        q.Create(q.Collection('users'), {
          data: {
            email: body.record.email
          }
        })
      )
    )

    if (!blocsUser) {
      return handle500Response(res, 'Coulld not save blocs user data')
    }

    handle200Response(res)
  }
}

export default handler
