import Ajv from 'ajv'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  handle400Response,
  handle500Response
} from '../../../lambda-functions/helpers/handleResponses'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import getOrCreateBlocsUser from '@/lambda/middlewares/getOrCreateBlocsUser'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
const ajv = new Ajv()

const validate = (data) =>
  ajv.validate(
    {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      },
      required: ['name']
    },
    data
  )

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const isValid = validate(req.body)
    if (!isValid) return handle400Response(res)

    const { name } = req.body

    const blocsUser = await getOrCreateBlocsUser(req, res)

    if (blocsUser) {
      try {
        await faunaClient.query(
          q.Update(blocsUser?.ref, {
            data: {
              name
            }
          })
        )

        res.status(200).json({})
      } catch (err) {
        handle500Response(res, "Uh oh! we weren't able to update your name")
      }
    }
  }
}

export default handler
