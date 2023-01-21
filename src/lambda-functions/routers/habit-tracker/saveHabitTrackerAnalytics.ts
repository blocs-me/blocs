import faunaClient from '@/lambda/faunaClient'
import { validateHabitTrackerAnalytics } from '@/lambda/lib/restValidator/jsonValidator'
import { query as q, query } from 'faunadb'
import { getPercent } from '../../../utils/math/getPercent'
import { calculateAndUpdateStreak } from './calculateAndUpdateStreak'
import canPerformAction from '../../helpers/faunadb/canPerformAction'

const saveHabitTrackerAnalytics = async (req, res) => {
  const isValid = validateHabitTrackerAnalytics(req.body)
  const { role } = req.query

  if (!isValid) {
    res.status(400).json({
      status: 400,
      error: {
        message: '[Bad Request] Provided data is incorrect'
      }
    })

    console.error('[Bad Request] Provided data is incorrect')

    return null
  }

  const { widgetToken } = req.query
  const { habitIds, isoDateString } = req.body

  const widgetIndexKey = role === 'blocs-user' ? 'widget_by_token' : null

  const widget = await faunaClient
    .query(q.Get(q.Match(q.Index(widgetIndexKey), widgetToken)))
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

  const hasPermission = await canPerformAction(
    widget.data.userId,
    'habitTracker',
    res
  )
  if (!hasPermission) return null

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

  const allHabits = widget.data.habits
  const habitsBelongsToUser = habitIds.every((habitId) =>
    allHabits.find((realHabit) => realHabit.id === habitId)
  )

  if (!habitsBelongsToUser) {
    return res.status(401).json({
      status: 401,
      error: {
        message: 'You do not have access to make this change'
      }
    })
  }

  if (existingAnalyticsDoc) {
    const percentDone = getPercent(habitIds.length, allHabits.length, 'floor')

    const habitsDone = habitIds

    const streaks = await calculateAndUpdateStreak(
      percentDone,
      widget,
      isoDateString
    )
      .then((data) => data)
      .catch((error) => {
        console.error(error)
        return widget
      })

    const updatedData = await faunaClient
      .query(
        q.Update(existingAnalyticsDoc.ref, {
          data: {
            habitsDone,
            percentDone
          }
        })
      )
      .then((data) => data as { data: any })
      .catch((err) => {
        console.error(err)
        return null
      })

    return res.status(200).json({
      status: 200,
      data: {
        percentDone: updatedData?.data?.percentDone,
        habitsDone: updatedData?.data?.habitsDone,
        bestStreak: streaks.data.bestStreak,
        currentStreak: streaks.data.currentStreak
      }
    })
  }

  try {
    const percentDone = getPercent(1, allHabits.length, 'floor')
    const habitsDone = habitIds

    const newAnalyticsData = await faunaClient
      .query(
        q.Create(q.Collection('habit_tracker_analytics'), {
          data: {
            habitsDone,
            percentDone,
            isoDateString,
            widgetRef: widget.ref,
            createdAt: q.Date(isoDateString)
          }
        })
      )
      .then((data) => data as { data: any })
      .catch((err) => {
        console.error(err)
        return null
      })

    res.status(200).json({
      status: 200,
      data: {
        percentDone: newAnalyticsData?.data?.percentDone,
        habitsDone: newAnalyticsData?.data?.habitsDone
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: 500,
      error: {
        message: 'Internal server error'
      }
    })
  }
}

export default saveHabitTrackerAnalytics
