import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import faunaClient from '@/lambda/faunaClient'
import { validateWaterTrackerQueryParams } from '@/lambda/lib/restValidator/jsonValidator'

type AnalyticsData = {
  data: {
    waterConsumed: number
    isoDateString: number
    lastUpdatedAt: number
  }
}

const getWaterTrackerAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const isValidParams = validateWaterTrackerQueryParams(req.query)

  if (!isValidParams || !Number.isInteger(Number(req.query.date))) {
    return res.status(400).json({
      error: {
        message: "Looks like there's something wrong with the request"
      }
    })
  }

  const { role, widgetToken, isoDateString, date } = req.query

  const faunaIndex =
    role === 'friend' ? 'widget_by_shareable_token' : 'widget_by_token'

  const widget = await faunaClient
    .query(q.Get(q.Match(q.Index(faunaIndex), widgetToken)))
    .then((data) => data)
    .catch(() => null)

  if (!widget) {
    return res.status(404).json({
      status: 404,
      error: {
        message: 'The requested widget was not found.'
      }
    })
  }

  const currentAnalyticsData = await faunaClient
    .query(
      q.Get(
        q.Match(
          q.Index('water_tracker_analytics_by_iso_date_str'),
          isoDateString,
          widget.ref
        )
      )
    )
    .then((data) => data as AnalyticsData)
    .catch(() => null)

  try {
    if (!currentAnalyticsData) {
      const madeData = await faunaClient
        .query(
          q.Create(q.Collection('water_tracker_analytics'), {
            data: {
              waterConsumed: 0,
              isoDateString: isoDateString,
              lastUpdatedAt: Number(date),
              widgetRef: widget.ref
            }
          })
        )
        .then((data) => data as AnalyticsData)

      return res.status(200).json({
        data: {
          waterConsumed: madeData.data.waterConsumed,
          isoDateString: madeData.data.isoDateString,
          lastUpdatedAt: madeData.data.lastUpdatedAt
        }
      })
    }

    res.status(200).json({
      status: 200,
      data: {
        waterConsumed: currentAnalyticsData.data.waterConsumed,
        isoDateString: currentAnalyticsData.data.isoDateString,
        lastUpdatedAt: currentAnalyticsData.data.lastUpdatedAt
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: {
        message: 'Something went wrong on the server.'
      }
    })
  }
}

export default getWaterTrackerAnalytics
