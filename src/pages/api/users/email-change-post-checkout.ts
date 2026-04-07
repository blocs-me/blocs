import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { isEmail } from 'validator'
import { handle400Response, handle200Response, handle500Response } from '@/lambda/helpers/handleResponses'
import getBlocsUserByEmail from '@/lambda/middlewares/getBlocsUserByEmail'
import supabaseAdmin from '@/lambda/helpers/supabaseAdmin'
import supabase from '@/lambda/helpers/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16'
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { sessionId, newEmail } = req.body

  if (!sessionId || !newEmail || !isEmail(newEmail)) {
    return handle400Response(res)
  }

  try {
    // Verify the Stripe session is real and paid
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (!session || session.payment_status !== 'paid') {
      return handle400Response(res)
    }

    const originalEmail = session.customer_details?.email
    if (!originalEmail) {
      return handle400Response(res)
    }

    // Find the user created by the webhook
    const user = await getBlocsUserByEmail(originalEmail)
    if (!user) {
      return res.status(404).json({ error: 'Account not found. Please wait a moment and try again.' })
    }

    // Check if new email is already taken
    const existingUser = await getBlocsUserByEmail(newEmail)
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists.' })
    }

    // Update email in Supabase Auth
    if (user.supabaseUserId) {
      const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(user.supabaseUserId, {
        email: newEmail,
        email_confirm: true
      })
      if (authError) {
        console.error('Failed to update auth email:', authError.message)
        return handle500Response(res)
      }
    }

    // Update email in users table
    const { error: dbError } = await supabase
      .from('users')
      .update({ email: newEmail })
      .eq('id', user.id)

    if (dbError) {
      console.error('Failed to update user email:', dbError.message)
      return handle500Response(res)
    }

    // Send magic link to the new email
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: newEmail,
      options: {
        emailRedirectTo: 'https://blocs.me/dashboard/pomodoro'
      }
    })

    if (otpError) {
      console.error('Failed to send magic link to new email:', otpError.message)
    }

    handle200Response(res, { email: newEmail })
  } catch (err) {
    console.error('email-change-post-checkout error:', err.message)
    return handle500Response(res)
  }
}

export default handler
