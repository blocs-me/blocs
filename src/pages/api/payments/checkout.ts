import stripePriceIds from '@/constants/stripePriceIds'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import Cors from 'micro-cors'
import { isEmail } from 'validator'
import { handle400Response } from '../../../lambda-functions/helpers/handleResponses'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'

// user is logged in
// checkout session starts + email / cust_id is passed

const prodOrigin = ['https://blocs.me', 'https://checkout.stripe.com']
const localOrigin = [
  'localhost:3000',
  'https://checkout.stripe.com',
  'https://blocs-dev.vercel.app'
]

const cors = Cors({
  allowedMethods: ['POST', 'HEAD'],
  origin: process.env.VERCEL_ENV === 'production' ? prodOrigin : localOrigin
})

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

type Products = { amount: string; quantity: number }[]

const validateProducts = (products: Products) => {
  const isQuantityValid = products.every((prod) => prod.quantity === 1)

  return [isQuantityValid].every(Boolean)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { products } = req.body as {
      products: Products
      customer_email?: string
      stripeCustomerId?: string
    }

    const blocsUser = await getBlocsUser(req, res)
    if (!blocsUser) return null

    const areProductsValid = validateProducts(products)
    if (!areProductsValid) {
      return handle400Response(res)
    }

    const { email: customer_email, stripeCustomerId } = blocsUser?.data

    const paymentOptions: Partial<Stripe.Checkout.SessionCreateParams> =
      (() => {
        if (stripeCustomerId) return { customer: stripeCustomerId } // would happen on second purchase for signed in user
        if (customer_email)
          return { customer_email, customer_creation: 'always' } // for signed in user
      })()

    try {
      const session = await stripe.checkout.sessions.create({
        ...paymentOptions,
        line_items: products,
        mode: 'payment',
        success_url: `${req.headers.origin}/dashboard/pomodoro?payment_success=true`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
        automatic_tax: { enabled: true }
      })

      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default cors(handler)
