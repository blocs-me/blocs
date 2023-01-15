import stripePriceIds from '@/constants/stripePriceIds'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: stripePriceIds.lifetime,
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/sign-in?payment_success=true`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
        automatic_tax: { enabled: true }
      })
      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
