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
import jwt from 'jsonwebtoken'
import addUserToMailingList from '@/lambda/helpers/addUserToMailingList'

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
    } catch (err) {}
  }

  if (req.method === 'POST') {
    // created by supabase hook
    // TODO: create production webhooks
    const { action } = req.query
    const bearer = req.headers.authorization?.split(' ')?.[1]
    const body = req.body
    const validToken = bearer?.split('.').length === 3

    if (!validToken) {
      return handle500Response(res)
    }

    try {
      jwt.verify(bearer, process.env.JWT_SALT)
    } catch (err) {
      console.error('JWT not verified')
      console.error(err)
      return handle500Response(res)
    }

    if (action === 'create') {
      if (body.record?.email) {
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
          return handle500Response(res, 'Could not save blocs user data')
        }

        try {
          await addUserToMailingList({
            email: body.record.email,
            name: body.record?.full_name || ''
          })
        } catch (err) {
          console.error(err)
          handle500Response(
            res,
            'Something went wrong when subscribing the user'
          )
        }
      }

      handle200Response(res)
    }
  }
}

export default handler
