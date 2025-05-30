import {
  handle200Response,
  handle400Response,
  handle404Response
} from '@/lambda/helpers/handleResponses'
import { NextApiRequest, NextApiResponse } from 'next'
import { validatePomodoroAnalyticsByRange } from '@/lambda/lib/restValidator/jsonValidator'
import { IWidgetAccessToken } from '@/gtypes/widget-access-token'
import { supabaseQueryGuard } from '@/lambda/helpers/supabase/queryGuard'
import supabase from '@/lambda/helpers/supabase'
import {
  mapPomodoroAnalyticsToType,
  mapWidgetAccessTokenToType
} from '@/lambda/helpers/supabase/mapDbToType'

const getPomodoroAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const isValid = validatePomodoroAnalyticsByRange(req.query)

  if (!isValid) {
    console.error('[Bad Request]')
    return handle400Response(res)
  }

  const { from, to, widgetToken, role } = req.query

  const widgetIndex = role === 'blocs-user' ? 'token' : 'shareable_token'

  const widget = await supabaseQueryGuard<IWidgetAccessToken>(() =>
    supabase
      .from('widget_access_tokens')
      .select('*')
      .eq(widgetIndex, widgetToken)
      .single()
  )

  const widgetMapped = mapWidgetAccessTokenToType(widget)

  if (!widgetMapped) {
    return handle404Response(res, 'Widget not found')
  }

  const { data: pomodoroAnalytics } = await supabase
    .from('pomodoro_analytics')
    .select('*')
    .eq('widget_id', widgetMapped.id)
    .gte('created_at', from)
    .lte('created_at', to)

  const remappedPomodoroAnalytics = pomodoroAnalytics?.map((row) =>
    mapPomodoroAnalyticsToType(row)
  )

  // Group by date (ignoring time part)
  const grouped: { [date: string]: any[] } = {}

  for (const row of remappedPomodoroAnalytics || []) {
    const date = row.isoDateString
    if (!grouped[date]) {
      grouped[date] = []
    }
    const entries = [
      row.presetId,
      row.isoDateString,
      row.presetId,
      row.timeSpent
    ]
    grouped[date].push(entries)
  }

  const groupedPomodoroAnalytics = Object.entries(grouped).map(
    ([date, entries]) => [date, entries]
  )

  handle200Response(res, {
    data: groupedPomodoroAnalytics || []
  })
}

export default getPomodoroAnalytics
