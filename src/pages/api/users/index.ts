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
import { BlocsUserServer } from '../../../global-types/blocs-user'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

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
    console.log('POST REQ : CREATE USER')
    // created by supabase hook
    // TODO: create production webhooks
    const { action } = req.query

    console.log({ body: req.body, query: req.query })
    const bearer = req.headers.authorization?.split(' ')?.[1]
    const body = req.body
    const validToken = bearer?.split('.').length === 3

    if (!validToken) {
      console.error('Could not create user, invalid jwt')
      return handle500Response(res)
    }

    try {
      jwt.verify(bearer, process.env.JWT_SALT)
    } catch (err) {
      console.error('Could not verify JWT')
      console.error(err)
      return handle500Response(res)
    }

    if (action === 'update') {
      try {
        const supabase = createServerSupabaseClient({ req, res })

        const { data, error } = await supabase.auth.getUser()

        if (error) throw error

        const blocsUser = (await faunaClient.query(
          q.Get(q.Match(q.Index('all_users_by_email'), data?.user?.email))
        )) as BlocsUserServer

        await faunaClient.query(
          q.Update(blocsUser.ref, {
            data: {
              email: req.body.record?.email
            }
          })
        )
      } catch (err) {
        console.log(err)
        handle500Response(res)
      }
    }
  }
}

export default handler
