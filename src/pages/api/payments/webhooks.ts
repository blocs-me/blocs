import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import {
  handle200Response,
  handle500Response
} from '../../../lambda-functions/helpers/handleResponses'
import { queryGuard } from '../../../lambda-functions/helpers/faunadb/queryGuard'
import upsertBlocsUser from '@/lambda/middlewares/upsertBlocsUser'

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2022-11-15'
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (req.method === 'POST') {
    const body = req.body
    const paymentInfo = body?.data?.object
    console.log({ body })

    if (
      event.type === 'checkout.session.completed' &&
      paymentInfo?.payment_status === 'paid'
    ) {
      const customerEmail = paymentInfo.customer_email
      const paymentIntent = paymentInfo.payment_intent

      try {
        await upsertBlocsUser(customerEmail, {
          email: customerEmail,
          purchaseHistory: [paymentIntent]
        })
      } catch (err) {
        console.error(err)
        return handle500Response(res)
      }
    }
  }

  handle200Response(res, {
    received: true
  })
}

export default handler
