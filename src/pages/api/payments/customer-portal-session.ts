import { NextRequest } from 'next/server'
import { NextApiResponse, NextApiRequest } from 'next'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const blocsUser = await getBlocsUser(req, res)
    const customerId = blocsUser.data.stripeCustomerId

    console.log({ customerId })

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.origin}/dashboard/user-settings`
    })

    res.redirect(session.url)
  }
}

export default handler
