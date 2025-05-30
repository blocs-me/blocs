import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { handle400Response } from '../../../lambda-functions/helpers/handleResponses'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
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

    console.log('products', products)

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
    } = blocsUser

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

    const paymentOptions: Partial<Stripe.Checkout.SessionCreateParams> =
      (() => {
        if (stripeCustomerId) return { customer: stripeCustomerId } // would happen on second purchase for signed in user
        if (customer_email) return { customer_email } // for signed in user
      })()

    try {
      const session = await stripe.checkout.sessions.create({
        ...paymentOptions,
        line_items: products,
        mode: 'subscription',
        success_url: `${req.headers.origin}/dashboard/pomodoro?payment_success=true`,
        cancel_url: `${req.headers.origin}/pricing?canceled=true`,
        automatic_tax: { enabled: true },
        client_reference_id: blocsUser.id
      })

      res.status(200).json(session)
    } catch (err) {
      console.error(err.message)
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
