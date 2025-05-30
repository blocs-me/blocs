import Rest from '@/lambda/lib/rest'
import { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { handle401Response } from '@/lambda/helpers/handleResponses'
import { handle500Response } from '../../../lambda-functions/helpers/handleResponses'

const saveUserAvatar = async (req: NextApiRequest, res: NextApiResponse) => {
  const { avatar_url } = req.body
  const supabase = createServerSupabaseClient({ req, res })
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return handle401Response(res)
  }

  const { data: blocsUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', data?.user?.email)
    .maybeSingle()

  if (!blocsUser) return null

  try {
    await supabase
      .from('users')
      .update({
        avatar_url
      })
      .eq('id', blocsUser.id)

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
