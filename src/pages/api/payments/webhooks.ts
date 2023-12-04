import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import {
  handle200Response,
  handle400Response,
  handle500Response
} from '../../../lambda-functions/helpers/handleResponses'
import { queryGuard } from '../../../lambda-functions/helpers/faunadb/queryGuard'
import upsertBlocsUser from '@/lambda/middlewares/upsertBlocsUser'
import { buffer } from 'micro'

import Cors from 'micro-cors'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import getBlocsUserByEmail from '@/lambda/middlewares/getBlocsUserByEmail'
import stripeProductIds from '@/constants/stripeProductIds'

const cors = Cors({
  allowMethods: ['POST', 'HEAD']
})

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
  typescript: true
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  if (method !== 'POST') {
    return handle400Response(res)
  }

  const signature = req.headers['stripe-signature']
  const bodyReq = await buffer(req)

  let data
  let eventType
  let event

  console.log('start analysing')

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(
      bodyReq.toString(),
      signature,
      webhookSecret
    )
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`)
    return res.status(400).json({ success: false, error: err.message })
  }

  console.log(`✅ Success: ${event.id}`)

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
  } catch (err) {
    console.error(err)
    res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (req.method === 'POST') {
    const paymentInfo = event.data.object

    if (
      (event?.type === 'checkout.session.completed' ||
        event?.type === 'checkout.session.async_payment_succeeded') &&
      paymentInfo?.payment_status === 'paid'
    ) {
      const customerEmail = paymentInfo.customer_details?.email
      const stripeCustomerId = paymentInfo?.customer
      const checkoutSessionId = paymentInfo?.id
      const blocsUser = await getBlocsUserByEmail(customerEmail)
      const updatedPurchaseHistory = Array.from(
        new Set([
          ...(blocsUser?.data?.purchaseHistory || []),
          checkoutSessionId
        ])
      )

      const products = Object.entries(paymentInfo.metadata)
        .filter(([__, val]) => val === 'true')
        .map(([key]) => stripeProductIds[key])

      const purchasedProducts = Array.from(
        new Set([...(blocsUser?.data?.purchasedProducts || []), ...products])
      )

      try {
        await upsertBlocsUser(customerEmail, {
          email: customerEmail,
          purchaseHistory: updatedPurchaseHistory,
          purchasedProducts,
          stripeCustomerId
        })
        handle200Response(res, {
          received: true
        })
      } catch (err) {
        console.error(err)
        return handle500Response(res)
      }
    }

    handle200Response(res, {
      received: true
    })
  }

  handle200Response(res, {
    received: true
  })
}

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const sig = req.headers['stripe-signature']

//   const buf = await buffer(req)

//   let event

//   try {
//     event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
//   } catch (err) {
//     console.error(err)
//     res.status(400).send(`Webhook Error: ${err.message}`)
//   }

//   if (req.method === 'POST') {
//     const paymentInfo = event.data.object

//     if (
//       (event?.type === 'checkout.session.completed' ||
//         event?.type === 'checkout.session.async_payment_succeeded') &&
//       paymentInfo?.payment_status === 'paid'
//     ) {
//       const customerEmail = paymentInfo.customer_details?.email
//       const stripeCustomerId = paymentInfo?.customer
//       const checkoutSessionId = paymentInfo?.id
//       const blocsUser = await getBlocsUserByEmail(customerEmail)
//       const updatedPurchaseHistory = Array.from(
//         new Set([
//           ...(blocsUser?.data?.purchaseHistory || []),
//           checkoutSessionId
//         ])
//       )

//       const products = Object.entries(paymentInfo.metadata)
//         .filter(([__, val]) => val === 'true')
//         .map(([key]) => stripeProductIds[key])

//       const purchasedProducts = Array.from(
//         new Set([...(blocsUser?.data?.purchasedProducts || []), ...products])
//       )

//       try {
//         await upsertBlocsUser(customerEmail, {
//           email: customerEmail,
//           purchaseHistory: updatedPurchaseHistory,
//           purchasedProducts,
//           stripeCustomerId
//         })
//         handle200Response(res, {
//           received: true
//         })
//       } catch (err) {
//         console.error(err)
//         return handle500Response(res)
//       }
//     }

//     handle200Response(res, {
//       received: true
//     })
//   }

//   handle200Response(res, {
//     received: true
//   })
// }

export default cors(handler)
