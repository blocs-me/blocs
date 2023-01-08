import mailchimp from '@/lambda/mailchimpMarketingClient'
import Ajv from 'ajv'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  handle400Response,
  handle500Response
} from '../../../lambda-functions/helpers/handleResponses'
import md5 from 'md5'
import getOrCreateBlocsUser from '@/lambda/middlewares/getOrCreateBlocsUser'

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
    const user = await getOrCreateBlocsUser(req, res)
    const { status } = req.body as Body

    const nameArr = user?.data?.name?.split(' ')
    const [FNAME = '', LNAME = ''] = [nameArr?.[0], nameArr?.slice(-1)?.[0]]
    const email_address = user?.data?.email

    if (status === 'unsubscribe') {
      try {
        const response = await mailchimp.lists.setListMember(
          process.env.MAILCHIMP_LIST_ID,
          md5(user?.data?.email),
          {
            email_address,
            status: 'unsubscribed',
            merge_fields: {
              FNAME,
              LNAME
            }
          }
        )

        res.status(200).json({
          message: 'Successfully unsubscribed'
        })
      } catch (err) {
        console.error(err)

        handle500Response(
          res,
          'Something went wrong when unsubscribing from the newsletter'
        )
      }
    } else {
      try {
        await mailchimp.lists.setListMember(
          process.env.MAILCHIMP_LIST_ID,
          md5(user?.data?.email),
          {
            status: 'subscribed'
          }
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
