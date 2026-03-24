import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import {
  handle200Response,
  handle400Response,
  handle500Response
} from '../../../lambda-functions/helpers/handleResponses'
import updateUserData from '@/lambda/helpers/updateUserData'
import { buffer } from 'micro'

import Cors from 'micro-cors'
import stripeProductIds from '@/constants/stripeProductIds'
import { findCheckoutSession } from '@/lambda/lib/stripe'
import getBlocsUserById from '@/lambda/helpers/supabase/getBlocsUserById'
import getBlocsUserByEmail from '@/lambda/middlewares/getBlocsUserByEmail'
import getBlocsUserByStripeCustomerId from '@/lambda/helpers/supabase/getBlocsUserByStripeId'
import supabase from '@/lambda/helpers/supabase'
import supabaseAdmin from '@/lambda/helpers/supabaseAdmin'

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

function getPurchasedProductsBySubscription(
  itemLines: Stripe.SubscriptionItem[]
): string[] {
  const purchasedProducts = itemLines
    .filter((item) => item.price.product !== null)
    .map((item) => findProductNameById(item.price.product as string))

  return purchasedProducts
}

function getPurchasedProductsByInvoice(
  itemLines: Stripe.InvoiceLineItem[]
): string[] {
  const purchasedProducts = itemLines
    .filter((item) => item.price.product !== null)
    .map((item) => findProductNameById(item.price.product as string))

  return purchasedProducts
}

function getPurchasedProducts(itemLines: Stripe.LineItem[]): string[] {
  const purchasedProducts = itemLines
    .filter((item) => item.price.product !== null)
    .map((item) => findProductNameById(item.price.product as string))

  return purchasedProducts
}

function findProductNameById(productId: string): string | null {
  // Iterate through the local object to find the matching product ID
  for (const [name, id] of Object.entries(stripeProductIds)) {
    if (id === productId) {
      return id // Return the product name if the ID matches
    }
  }
  return null // Return null if no product with the given ID is found
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

  data = event.data
  eventType = event.type

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        const session = await findCheckoutSession(data.object.id)

        const customerId = session?.customer
        const userId = data.object.client_reference_id
        const customerEmail = session?.customer_details?.email
        const products = getPurchasedProducts(session?.line_items?.data)

        if (products.length == 0) break

        let user = await getBlocsUserByStripeCustomerId(customerId as string)

        if (!user && userId) {
          user = await getBlocsUserById(userId)
        }

        // Anonymous checkout (no existing account) — auto-create user
        if (!user && customerEmail) {
          user = await getBlocsUserByEmail(customerEmail)

          if (!user) {
            // Create Supabase auth user
            const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
              email: customerEmail,
              email_confirm: true
            })

            if (authError) {
              console.error('Failed to create auth user:', authError.message)
              throw new Error(`Failed to create auth user: ${authError.message}`)
            }

            // Create users table row
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert({
                email: customerEmail,
                supabase_user_id: authUser.user.id,
                purchased_products: products,
                stripe_customer_id: customerId,
                purchase_history: [session.id]
              })
              .select()
              .single()

            if (insertError) {
              console.error('Failed to insert user row:', insertError.message)
              throw new Error(`Failed to insert user row: ${insertError.message}`)
            }

            // Send magic link so user can log in
            const { error: otpError } = await supabaseAdmin.auth.admin.generateLink({
              type: 'magiclink',
              email: customerEmail,
              options: {
                redirectTo: 'https://blocs.me/dashboard/pomodoro'
              }
            })

            if (otpError) {
              console.error('Failed to send magic link:', otpError.message)
            }

            user = { id: newUser.id, email: customerEmail, purchasedProducts: products, stripeCustomerId: customerId as string } as any
            break
          }
        }

        if (!user) {
          console.error('No user found for checkout session')
          throw new Error('No user found')
        }

        const purchasedProducts = Array.from(
          new Set([...(user?.purchasedProducts || []), ...products])
        )

        await updateUserData(user, {
          stripe_customer_id: customerId,
          purchased_products: purchasedProducts
        })

        break
      }

      case 'customer.created': {
        const stripeObject: Stripe.Customer = event.data
          .object as Stripe.Customer

        let user = await getBlocsUserByStripeCustomerId(stripeObject.id)
        if (user) break

        user = await getBlocsUserByEmail(stripeObject.email)
        if (user) {
          await updateUserData(user, {
            stripe_customer_id: stripeObject.id
          })
        }

        break
      }

      case 'checkout.session.expired': {
        // User didn't complete the transaction
        // You don't need to do anything here, by you can send an email to the user to remind him to complete the transaction, for instance
        break
      }

      case 'customer.subscription.updated': {
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
        // You can update the user data to show a "Cancel soon" badge for instance
        // const subscription = await stripe.subscriptions.retrieve(data.object.id)

        // const user = await Users.findOne({ customerId: subscription.customer })
        // if (!user) break

        // const profile = await Profiles.findOne({ email: user.email })

        // // If subscription is canceled, update the profile
        // if (subscription.canceled_at) {
        //   profile.isCancelled = true
        //   profile.nextBillingStripe = ''
        //   await profile.save()
        // }
        // // If subscription is revoked, update the profile
        // else if (!subscription.canceled_at && profile.isCancelled) {
        //   profile.isCancelled = false
        //   profile.nextBillingStripe = cancellationDate(
        //     subscription.current_period_end
        //   )
        //   await profile.save()
        // }

        break
      }

      case 'customer.subscription.deleted': {
        // The customer subscription stopped
        // ❌ Revoke access to the product
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription

        const subscription = await stripe.subscriptions.retrieve(
          stripeObject.id
        )

        const user = await getBlocsUserByStripeCustomerId(
          subscription.customer as string
        )

        if (!user) {
          console.error('No user found')
          throw new Error('No user found')
        }

        const purchasedProducts = Array.from(
          new Set([...(user?.purchasedProducts || [])])
        )

        const deletedProducts = getPurchasedProductsBySubscription(
          subscription.items.data
        )
        const updatedPurchasedProducts = purchasedProducts.filter(
          (product) => !deletedProducts.includes(product)
        )

        await updateUserData(user, {
          purchased_products: updatedPurchasedProducts
        })

        break
      }

      case 'invoice.paid': {
        // Customer just paid an invoice (for instance, a recurring payment for a subscription)
        // ✅ Grant access to the product
        // const stripeObject: Stripe.Invoice = event.data.object as Stripe.Invoice

        // const purchasedProducts = getPurchasedProductsByInvoice(stripeObject.lines.data)

        // const user = await getBlocsUserByStripeCustomerId(
        //   stripeObject.customer as string
        // )

        // const userProducts = Array.from(
        //   new Set([...(user?.data?.purchasedProducts || [])])
        // )

        // // Check if the user already has access to the product
        // const alreadyHasAccess = purchasedProducts.every((product) =>
        //   userProducts.includes(product)
        // )

        // if (alreadyHasAccess) break

        break
      }

      case 'invoice.payment_failed':
        // A payment failed (for instance the customer does not have a valid payment method)
        // ❌ Revoke access to the product
        // ⏳ OR wait for the customer to pay (more friendly):
        //      - Stripe will automatically email the customer (Smart Retries)
        //      - We will receive a "customer.subscription.deleted" when all retries were made and the subscription has expired

        break

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error(`stripe error: ${e.message} | EVENT TYPE: ${eventType}`)
  }

  handle200Response(res, {
    received: true
  })
}

export default cors(handler)
