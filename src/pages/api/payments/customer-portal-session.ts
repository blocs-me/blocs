import { NextApiResponse, NextApiRequest } from 'next'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
  typescript: true
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const blocsUser = await getBlocsUser(req, res)
    const customerId = blocsUser.stripeCustomerId

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.origin}/dashboard/settings`
    })

    res.status(200).json({ url: session.url })
  }
}

export default handler
