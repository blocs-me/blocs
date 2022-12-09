import faunaClient from '@/lambda/faunaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

const getHabitTrackerAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken, role, isoDateString } = req.query

  const widgetIndexKey =
    role === 'friend' ? 'widget_by_shareable_token' : 'widget_by_token'

  const widget = await faunaClient
    .query(q.Get(q.Match(q.Index(widgetIndexKey, widgetToken))))
    .then((data) => data)
    .catch((error) => {
      console.error(error)
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

  const existingAnalyticsDoc = await faunaClient
    .query(
      q.Get(
        q.Match(
          q.Index('habit_trackers_analytics_by_iso_date_str'),
          isoDateString,
          widget.ref
        )
      )
    )
    .then((data) => data)
    .catch((error) => {
      console.error(error)
      return null
    })

  if (existingAnalyticsDoc) {
    res.status(200).json({
      data: {
        percentDone: existingAnalyticsDoc?.data?.percentDone,
        habitsDone: existingAnalyticsDoc?.data?.habitsDone
      }
    })

    return null
  }

  try {
    const newData = await faunaClient
      .query(
        q.Create(q.Collection('habit_tracker_analytics'), {
          data: {
            habitsDone: [],
            percentDone: 0,
            isoDateString,
            widgetRef: widget.ref
          }
        })
      )
      .then((data) => data as { data: any })
      .catch((err) => {
        console.error(err)
        return null
      })

    if (!newData) {
      const error = new Error('Could not create habit tracker analytics')
      throw error
    }

    res.status(200).json({
      status: 200,
      data: {
        percentDone: newData?.data?.percentDone,
        habitsDone: newData?.data?.habitsDone
      }
    })
  } catch (error) {}
}

export default getHabitTrackerAnalytics
