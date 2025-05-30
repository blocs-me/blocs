import { NextApiRequest, NextApiResponse } from 'next'
import {
  handle404Response,
  handle200Response,
  handle500Response
} from '../../helpers/handleResponses'
import { validateWaterAnalyticsByRange } from '@/lambda/lib/restValidator/jsonValidator'
import { handle400Response } from '../../helpers/handleResponses'
import supabase from '@/lambda/helpers/supabase'
import { supabaseQueryGuard } from '@/lambda/helpers/supabase/queryGuard'
import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'

type FaunaWaterAnalytics = {
  data: {
    waterConsumed: number
    createdAt: number
  }[]
}

const getWaterTrackerAnalyticsRange = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const isValid = validateWaterAnalyticsByRange(req.query)

  if (!isValid) {
    console.error('[Bad Request]')
    return handle400Response(res)
  }

  const { from, to, widgetToken, role } = req.query

  const field = role === 'blocs-user' ? 'token' : 'shareable_token'

  const widget = await supabaseQueryGuard(() =>
    supabase
      .from('widget_access_tokens')
      .select('*')
      .eq(field, widgetToken)
      .maybeSingle()
  )

  if (!widget) {
    return handle404Response(res, 'Widget not found')
  }

  const { data: waterAnalytics, error: waterAnalyticsError } = await supabase
    .from('water_tracker_analytics')
    .select('created_at, water_consumed, id')
    .eq('widget_id', widget.id)
    .gte('created_at', from)
    .lte('created_at', to)
    .order('created_at', { ascending: true })

  if (waterAnalyticsError) {
    console.error(waterAnalyticsError)
    return handle500Response(res, 'Error fetching water analytics')
  }

  const entries = waterAnalytics?.map((entry) => {
    return {
      date: getCurrentISOString(entry.created_at),
      id: entry.id,
      value: entry.water_consumed
    }
  })

  handle200Response(res, {
    data: entries || []
  })
}

export default getWaterTrackerAnalyticsRange
