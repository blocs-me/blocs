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

const getClientUserData = (blocsUser: BlocsUserServer) => ({
  email: blocsUser?.data?.email,
  avatar_url: blocsUser?.data?.avatar_url,
  name: blocsUser?.data?.name
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

      let blocsUserById: BlocsUserServer = await queryGuard(() =>
        faunaClient.query(
          q.Get(
            q.Match(q.Index('all_users_by_supabase_user_id'), data?.user?.id)
          )
        )
      )
      let blocsUserByEmail: BlocsUserServer = await queryGuard(() =>
        faunaClient.query(
          q.Get(q.Match(q.Index('all_users_by_email'), data?.user?.email))
        )
      )

      if (blocsUserById && !blocsUserByEmail) {
        // implies email has changed
        let blocsUser: BlocsUserServer = await faunaClient.query(
          q.Update(blocsUserByEmail.ref, {
            data: {
              email: data?.user?.email
            }
          })
        )

        return handle200Response(res, {
          data: {
            user: getClientUserData(blocsUser)
          }
        })
      }

      if (!blocsUserById && blocsUserByEmail) {
        let blocsUser: BlocsUserServer = await faunaClient.query(
          q.Update(blocsUserByEmail.ref, {
            data: {
              supabaseUserId: data?.user?.id
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
        blocsUser = (await faunaClient.query(
          q.Create(q.Collection('users'), {
            data: {
              email: data?.user?.email,
              supabaseUserId: data?.user?.id
            }
          })
        )) as BlocsUserServer
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
