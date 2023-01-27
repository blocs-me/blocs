import { NextApiRequest, NextApiResponse } from 'next'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { queryGuard } from '../../helpers/faunadb/queryGuard'
import { IWaterTrackerWidget } from '../../../global-types/water-tracker'
import { AsFaunaReturn } from '../../../global-types/fauna'
import {
  handle404Response,
  handle200Response
} from '../../helpers/handleResponses'
import { validateWaterAnalyticsByRange } from '@/lambda/lib/restValidator/jsonValidator'
import { handle400Response } from '../../helpers/handleResponses'

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

  const widgetIndex =
    role === 'blocs-user' ? 'widget_by_token' : 'widget_by_shareable_token'

  const widget = await queryGuard<AsFaunaReturn<IWaterTrackerWidget>>(() =>
    faunaClient.query(q.Get(q.Match(q.Index(widgetIndex), widgetToken)))
  )

  if (!widget) {
    return handle404Response(res, 'Widget not found')
  }

  const waterAnalytics = await queryGuard<FaunaWaterAnalytics>(() =>
    faunaClient.query(
      q.Call(q.Function('get_water_tracker_analytics'), widget.ref, from, to)
    )
  )

  handle200Response(res, {
    data: waterAnalytics?.data || []
  })
}

export default getWaterTrackerAnalyticsRange
