import Ajv from 'ajv'
import { NextApiRequest, NextApiResponse } from 'next'
import addFormats from 'ajv-formats'
import {
  handle400Response,
  handle500Response,
  handle200Response
} from '../../../lambda-functions/helpers/handleResponses'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { isEmail } from 'validator'

const ajv = new Ajv()
addFormats(ajv, ['email'])

const emailChange = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (!isEmail(req.body.email)) return handle400Response(res)

    const { email } = req.body

    const supabase = createServerSupabaseClient({ req, res })

    const { error } = await supabase.auth.updateUser({
      email
    })

    if (error) {
      console.error(error)
      return handle500Response(res)
    }

    handle200Response(res)
  }
}

export default emailChange
