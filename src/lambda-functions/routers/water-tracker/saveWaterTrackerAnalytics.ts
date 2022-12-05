import faunaClient from '@/lambda/faunaClient'
import { validateWaterTrackerAnalytics } from '@/lambda/lib/restValidator/jsonValidator'
import { ounceToLiter } from '@/utils/math'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

type Request = {
  date: number
  isoDateString: string
  waterConsumed: number
}

type AnalyticsSchema = {
  lastUpdatedAt: number
  isoDateString: string
  widgetId: string
  waterConsumed: number
}

const saveWaterTrackerAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken } = req.query
  const isValid = validateWaterTrackerAnalytics(req.body)

  if (!isValid) {
    return res.status(400).json({
      error: {
        message: 'Request format is incorrect'
      }
    })
  }

  const data = req.body as Request

  const widget = await faunaClient
    .query(q.Get(q.Match(q.Index('widget_by_token'), widgetToken)))
    .then((data) => data)
    .catch((err) => {
      console.error(err)
      return null
    })

  if (!widget) {
    res.status(404).json({
      error: {
        message: 'Widget was not found'
      }
    })
    return null
  }

  const existingData = await faunaClient
    .query(
      q.Get(
        q.Match(
          q.Index('water_tracker_analytics_by_iso_date_str'),
          data.isoDateString,
          widget.ref
        )
      )
    )
    .then((data) => data)
    .catch((err) => {
      console.error(err)
      return null
    })

  if (existingData) {
    const updatedData = (await faunaClient
      .query(
        q.Update(existingData.ref, {
          data: {
            lastUpdatedAt: data.date,
            waterConsumed: data.waterConsumed
          }
        })
      )
      .then((data) => data)
      .catch((err) => {
        console.error(err)
      })) as {
      data: AnalyticsSchema
    }

    res.status(200).json({
      status: 200,
      data: {
        waterConsumed: updatedData?.data.waterConsumed,
        lastUpdatedAt: updatedData?.data.lastUpdatedAt
      }
    })

    return null
  }

  try {
    await faunaClient.query(
      q.Create(q.Collection('water_tracker_analytics'), {
        data: {
          waterConsumed: data.waterConsumed,
          lastUpdatedAt: data.date,
          isoDateString: data.isoDateString,
          widgetRef: widget.ref
        }
      })
    )
  } catch (err) {
    console.error(err)

    res.status(500).json({
      status: 500,
      error: {
        message: 'Internal server error'
      }
    })
  }
}

export default saveWaterTrackerAnalytics
