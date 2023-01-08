import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import faunaClient from '../faunaClient'
import { queryGuard } from '../helpers/faunadb/queryGuard'
import { query as q } from 'faunadb'

type BlocsUser = {
  data: {
    name: string
    email: string
    avatar_url?: string
  }
}

const getOrCreateBlocsUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const supabase = createServerSupabaseClient({ req, res })

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
    res.status(500).json({
      error
    })

    return null
  }

  let blocsUser = await queryGuard(() =>
    faunaClient.query(
      q.Get(q.Match(q.Index('all_users_by_email'), data?.user?.email))
    )
  )

  if (!blocsUser) {
    await faunaClient.query(
      q.Create(q.Collection('users'), {
        data: {
          email: data?.user?.email
        }
      })
    )
  }

  return blocsUser as BlocsUser
}

export default getOrCreateBlocsUser
