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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const supabase = createServerSupabaseClient({
        req,
        res
      })

      const { data, error } = await supabase.auth.getUser()

      if (error) throw error

      let blocsUser: BlocsUserServer = await queryGuard(() =>
        faunaClient.query(
          q.Get(q.Match(q.Index('all_users_by_email'), data?.user?.email))
        )
      )

      if (!blocsUser) {
        blocsUser = (await faunaClient.query(
          q.Create(q.Collection('users'), {
            data: {
              email: data?.user?.email
            }
          })
        )) as BlocsUserServer
      }

      handle200Response(res, {
        data: {
          user: blocsUser?.data
        }
      })
    } catch (err) {
      console.error(err)
      handle500Response(res)
    }
  }
}

export default handler
