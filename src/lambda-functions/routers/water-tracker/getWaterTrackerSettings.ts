import { NextApiRequest, NextApiResponse } from 'next'
import canPerformAction from '@/lambda/helpers/supabase/canPerformAction'
import supabase from '@/lambda/helpers/supabase'

const getWaterTrackerSettings = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken, role } = req.query

  const field = role === 'friend' ? 'shareable_token' : 'token'

  try {
    const widget = await supabase
      .from('widget_access_tokens')
      .select('*')
      .eq(field, widgetToken)
      .maybeSingle()

    if (!widget)
      return res.status(404).json({
        status: 404,
        error: {
          message: 'Widget not found'
        }
      })

    const hasPermission = await canPerformAction(
      widget.data.user_id,
      'waterTracker',
      res
    )
    if (!hasPermission) return null

    const isAdmin = widgetToken === widget?.data?.token

    const userAvatar =
      isAdmin &&
      (await (async () => {
        if (isAdmin) {
          const { data: user } = await supabase
            .from('users')
            .select('avatar_url')
            .eq('id', widget?.data?.user_id)
            .maybeSingle()

          return {
            avatarUrl: user?.avatar_url
          }
        }

        return {}
      })())

    res.status(200).json({
      status: 200,
      data: {
        ...(userAvatar || {}),
        ...(widget?.data.settings || {})
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: {
        message: 'Something went wrong'
      }
    })
  }
}

export default getWaterTrackerSettings
