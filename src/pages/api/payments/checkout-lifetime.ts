import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import stripePriceIds from '@/constants/stripePriceIds'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const priceId = stripePriceIds.lifetime.lifetimeAccess
  if (!priceId) {
    return res.status(500).json({ error: 'Lifetime price not configured' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_creation: 'always',
      allow_promotion_codes: true,
      success_url: `${req.headers.origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pricing?canceled=true`,
      automatic_tax: { enabled: true },
      invoice_creation: { enabled: true },
      payment_intent_data: { setup_future_usage: 'on_session' }
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('checkout-lifetime error:', err.message)
    res.status(err.statusCode || 500).json({ error: err.message })
  }
}

export default handler
