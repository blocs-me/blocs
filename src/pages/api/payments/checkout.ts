import stripePriceIds from '@/constants/stripePriceIds'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import Cors from 'micro-cors'

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

const validateProducts = (products: { amount: string; quantity: number }[]) => {
  const isQuantityValid = products.every((prod) => prod.quantity === 1)

  return [isQuantityValid].every(Boolean)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { products } = req.body

    const areProductsValid = validateProducts(products)

    if (!areProductsValid) {
      throw new Error('Product line items are not valid')
    }

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: products,
        mode: 'payment',
        success_url: `${req.headers.origin}/sign-in?payment_success=true`,
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
