import { supabaseQueryGuard } from '../helpers/supabase/queryGuard'
import supabase from '../helpers/supabase'
import { IWidgetAccessToken } from '../../global-types/widget-access-token'
import { mapWidgetAccessTokenToType } from '../helpers/supabase/mapDbToType'

const getWidgetUser = async (req, res, rest) => {
  const token = rest.bearerToken
  const { role } = req.query

  try {
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized acccess' })
    }

    const field = role === 'friend' ? 'shareable_token' : 'token'

    const widget = await supabaseQueryGuard(() =>
      supabase
        .from('widget_access_tokens')
        .select('*')
        .eq(field, token)
        .maybeSingle()
    )

    const widgetMapped = mapWidgetAccessTokenToType(widget)

    const userId = widgetMapped?.userId || null
    const widgetToken = widgetMapped?.token || null

    if (!userId || !widgetToken) {
      throw new Error('Unauthorized Access')
    }

    rest.userId = userId
    rest.widgetToken = widgetToken
  } catch (error) {
    rest.terminate()
    res.status(401).json({ error: 'Unauthorized' })
  }
}

export default getWidgetUser
