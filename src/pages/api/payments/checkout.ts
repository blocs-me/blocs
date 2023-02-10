import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { handle400Response } from '../../../lambda-functions/helpers/handleResponses'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import stripePriceIds from '@/constants/stripePriceIds'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

type Products = { price: string; quantity: number }[]

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
      console.error(
        new Error('[Bad Request] stripe line_item data provided is invalid')
      )
      return handle400Response(res)
    }

    const {
      email: customer_email,
      stripeCustomerId,
      purchaseHistory
    } = blocsUser?.data

    if (purchaseHistory?.length) {
      let purchasedPriceIds = !purchaseHistory?.length
        ? []
        : await Promise.all(
            purchaseHistory.map((cs) =>
              stripe.checkout.sessions.listLineItems(cs).then((v) => v.data)
            )
          ).then((res) => res.flat().map((d) => d.price.id))

      if (products.some((prod) => purchasedPriceIds.includes(prod.price))) {
        console.error(new Error('Cannot buy a widget more than once'))
        return handle400Response(res)
      }
    }

    const boughtProduct = (key) =>
      products.find((p) => p.price === stripePriceIds[key]) ? 'true' : 'false'

    const isUnlimitedAccess = products.find(
      (p) =>
        p.price === stripePriceIds.unlimitedAccess.dollars ||
        p.price === stripePriceIds.unlimitedAccess.euros
    )

    if (isUnlimitedAccess && products.length > 1) {
      return handle400Response(res)
    }

    const paymentOptions: Partial<Stripe.Checkout.SessionCreateParams> =
      (() => {
        if (stripeCustomerId) return { customer: stripeCustomerId } // would happen on second purchase for signed in user
        if (customer_email)
          return { customer_email, customer_creation: 'always' } // for signed in user
      })()

    try {
      const session = await stripe.checkout.sessions.create({
        ...paymentOptions,
        customer_update: {
          address: 'auto'
        },
        line_items: products,
        mode: isUnlimitedAccess ? 'subscription' : 'payment',
        success_url: `${req.headers.origin}/dashboard/pomodoro?payment_success=true`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
        automatic_tax: { enabled: true },
        metadata: {
          habitTracker: boughtProduct('habitTracker'),
          waterTracker: boughtProduct('waterTracker'),
          pomodoro: boughtProduct('pomodoro'),
          lifetimeAccess: boughtProduct('lifetimeAccess')
        }
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

export default handler
