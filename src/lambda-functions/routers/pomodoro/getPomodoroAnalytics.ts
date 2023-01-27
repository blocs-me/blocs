import faunaClient from '@/lambda/faunaClient'
import { queryGuard } from '@/lambda/helpers/faunadb/queryGuard'
import {
  handle200Response,
  handle400Response,
  handle404Response
} from '@/lambda/helpers/handleResponses'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { AsFaunaReturn } from 'src/global-types/fauna'
import { IWaterTrackerWidget } from 'src/global-types/water-tracker'
import { validatePomodoroAnalyticsByRange } from '@/lambda/lib/restValidator/jsonValidator'

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

  const widgetIndex =
    role === 'blocs-user' ? 'widget_by_token' : 'widget_by_shareable_token'

  const widget = await queryGuard<AsFaunaReturn<IWaterTrackerWidget>>(() =>
    faunaClient.query(q.Get(q.Match(q.Index(widgetIndex), widgetToken)))
  )

  if (!widget) {
    return handle404Response(res, 'Widget not found')
  }

  const pomodoroAnalytics = (await queryGuard(() =>
    faunaClient.query(
      q.Call(
        q.Function('get_pomodoro_analytics_by_date_range'),
        widget.ref,
        from,
        to
      )
    )
  )) as {
    data: any[]
  }

  handle200Response(res, {
    data: pomodoroAnalytics?.data || []
  })
}

export default getPomodoroAnalytics
