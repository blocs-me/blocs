import mailchimp from '@/lambda/mailchimpMarketingClient'
import Ajv from 'ajv'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  handle400Response,
  handle500Response
} from '../../../lambda-functions/helpers/handleResponses'
import md5 from 'md5'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { BlocsUserServer } from '@/gtypes/blocs-user'
import { handle200Response } from '../../../lambda-functions/helpers/handleResponses'

const ajv = new Ajv()

const validate = (data) =>
  ajv.validate(
    {
      type: 'object',
      properties: {
        subscriptionType: {
          enum: ['blocs_updates', 'blocs_tips']
        },
        status: {
          enum: ['subscribe', 'unsubscribe']
        }
      },
      required: ['subscriptionType', 'status'],
      additionalProperties: false
    },
    data
  )

type Body = {
  subscriptionType: 'blocs_updates' | 'blocs_tips'
  status: 'subscribe' | 'unsubscribe'
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const isValid = validate(req.body)

  if (!isValid) {
    return handle400Response(res)
  }

  if (req.method === 'PUT') {
    const user = await getBlocsUser(req, res)
    const { status } = req.body as Body

    if (status === 'unsubscribe') {
      try {
        await faunaClient.query(
          q.Update(user.ref, {
            isSubscribed: false
          } as Partial<BlocsUserServer>)
        )

        return handle200Response(res, 'Sucessfully unsubscribed')
      } catch (err) {
        console.error(err)

        return handle500Response(
          res,
          'Something went wrong when unsubscribing from the newsletter'
        )
      }
    } else {
      try {
        await faunaClient.query(
          q.Update(user.ref, {
            isSubscribed: true
          } as Partial<BlocsUserServer>)
        )

        res.status(200).json({
          message: 'Successfully subscribed'
        })
      } catch (err) {
        console.error(err)

        handle500Response(
          res,
          'Something went wrong when subscribing to the newsletter'
        )
      }
    }
  }
}

export default handler
