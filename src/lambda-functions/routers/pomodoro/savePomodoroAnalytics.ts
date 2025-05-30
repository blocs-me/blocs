import { NextApiRequest, NextApiResponse } from 'next'
import {
  IPomdoroWidget,
  PomodoroAnalayticsBody
} from '../../../global-types/pomodoro'
import {
  handle400Response,
  handle404Response,
  handle500Response
} from '../../helpers/handleResponses'
import { validatePomodoroAnalytics } from '@/lambda/lib/restValidator/jsonValidator'
import { handle200Response } from '../../helpers/handleResponses'
import { supabaseQueryGuard } from '@/lambda/helpers/supabase/queryGuard'
import supabase from '@/lambda/helpers/supabase'
import { mapWidgetAccessTokenToType } from '@/lambda/helpers/supabase/mapDbToType'

const savePomodoroAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { token } = req.query
  const pomoSession = req.body as PomodoroAnalayticsBody

  const isValid = validatePomodoroAnalytics(pomoSession)

  if (!isValid) return handle400Response(res)

  const widget = await supabaseQueryGuard(() =>
    supabase
      .from('widget_access_tokens')
      .select('*')
      .eq('token', token)
      .single()
  )

  const remappedWidget = mapWidgetAccessTokenToType(widget)

  if (!remappedWidget) return handle404Response(res)

  const data = {
    preset_id: pomoSession.presetId,
    started_at: pomoSession.startedAt,
    ended_at: pomoSession.endedAt,
    time_spent: pomoSession.timeSpent,
    iso_date_string: pomoSession.isoDateString,
    created_at: new Date(pomoSession.isoDateString),
    widget_id: remappedWidget.id
  }

  try {
    await supabase.from('pomodoro_analytics').insert(data).select().single()

    return handle200Response(res)
  } catch (err) {
    console.error(err)
    handle500Response(res)
  }
}

export default savePomodoroAnalytics
