import { validateWidgetTokenReq } from '@/lambda/lib/restValidator/jsonValidator'
import crypto from 'crypto'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'
import { mapWidgetAccessTokenToType } from '@/lambda/helpers/supabase/mapDbToType'
import supabase from '@/lambda/helpers/supabase'
import { supabaseQueryGuard } from '@/lambda/helpers/supabase/queryGuard'

const createWidgetAccessToken = async (req, res) => {
  try {
    const isValid = validateWidgetTokenReq(req.body)

    if (!isValid) {
      const error = validateWidgetTokenReq.errors
      console.error(error)
      return res.status(400).json({ error })
    }

    // req
    const widgetType = req.body.widgetType

    const blocsUser = await getBlocsUser(req, res)

    if (!blocsUser?.id) {
      await supabase.auth.admin.signOut()
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const blocsUserId = blocsUser?.id

    const { data: widget, error } = await supabase
      .from('widget_access_tokens')
      .select('*')
      .eq('user_id', blocsUserId)
      .eq('widget_type', widgetType)
      .maybeSingle()

    const widgetMapped = mapWidgetAccessTokenToType(widget)

    const shouldCreateToken = !widgetMapped
    const shouldCreatePublicToken = widgetMapped && !widgetMapped.shareableToken
    let publicToken = widgetMapped?.shareableToken

    if (shouldCreatePublicToken) {
      publicToken = crypto.randomUUID()

      await supabaseQueryGuard(() =>
        supabase
          .from('widget_access_tokens')
          .update({ shareable_token: publicToken })
          .eq('token', widgetMapped.token)
      )
    }

    if (shouldCreateToken) {
      const { data: newWidgetTokenData, error } = await supabase
        .from('widget_access_tokens')
        .insert({
          user_id: blocsUserId,
          token: crypto.randomUUID(),
          shareable_token: crypto.randomUUID(),
          settings: widgetType === 'WATER_TRACKER' ? { goal: 2 } : null,
          widget_type: widgetType
        })
        .select()
        .single()

      if (error) throw error

      const token = newWidgetTokenData.token
      const shareableToken = newWidgetTokenData.shareable_token

      return res.status(200).json({
        data: {
          token,
          shareableToken
        }
      })
    }

    res.status(200).json({
      data: {
        token: widgetMapped.token,
        shareableToken: publicToken
      }
    })
  } catch (error) {
    console.error(error || 'Internal Server Error')
    res.status(500).json({ error: error?.message || 'Interval Server Error' })
  }
}

export default createWidgetAccessToken
