import Rest from '@/lambda/lib/rest'
import { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { handle401Response } from '@/lambda/helpers/handleResponses'
import { queryGuard } from '@/lambda/helpers/faunadb/queryGuard'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { handle500Response } from '../../../lambda-functions/helpers/handleResponses'

const saveUserAvatar = async (req: NextApiRequest, res: NextApiResponse) => {
  const { avatar_url } = req.body
  const supabase = createServerSupabaseClient({ req, res })
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return handle401Response(res)
  }

  const blocsUser = (await queryGuard(() =>
    faunaClient.query(
      q.Get(q.Match(q.Index('all_users_by_email'), data?.user?.email))
    )
  )) as { data: any; ref }

  if (!blocsUser) return null

  const blocsUserRef = blocsUser.ref

  try {
    await faunaClient.query(
      q.Update(blocsUserRef, {
        data: {
          avatar_url
        }
      })
    )

    res.status(200).json({
      message: 'Successfully saved the profile picture',
      data: {
        avatar_url
      }
    })
  } catch (err) {
    console.error(err)
    handle500Response(res)
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rest = new Rest(req, res)

  rest.put(saveUserAvatar as any)
}

export default handler
