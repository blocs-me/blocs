import { validateHabitSchema } from '@/lambda/lib/restValidator/jsonValidator'
import { NextApiRequest, NextApiResponse } from 'next'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { HabitItem } from '../../../global-types/habit-tracker'
import { getPercent } from '../../../utils/math/getPercent'
import canPerformAction from '../../helpers/faunadb/canPerformAction'

const deleteHabit = async (req: NextApiRequest, res: NextApiResponse) => {
  const isValid = validateHabitSchema(req.body)

  if (!isValid) {
    res.status(400).json({
      status: 400,
      error: {
        message: 'The provided data is incorrect'
      }
    })
  }

  const habit = req.body
  const { widgetToken, isoDateString } = req.query

  const widgetIndexKey = 'widget_by_token'

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

  const prevHabits = JSON.parse(JSON.stringify(widget.data.habits))
  const shouldDelete = widget.data.habits.find(
    (curHabit: HabitItem) => curHabit.id === habit.id
  )

  if (!shouldDelete) {
    return res.status(401).json({
      status: 401,
      error: {
        message: 'You do not have access to make this change'
      }
    })
  }

  const newHabits = prevHabits.filter(
    (curHabit: HabitItem) => curHabit.id !== habit.id
  )

  const todayAnalytics = await faunaClient
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

  let newPercentDone = 0

  if (todayAnalytics) {
    const prevHabitsDone = todayAnalytics.data.habitsDone
    const newHabitsDone = prevHabitsDone.filter(
      (habitId) => habitId !== habit.id
    )
    newPercentDone = getPercent(newHabitsDone.length, newHabits.length, 'floor')

    await faunaClient
      .query(
        q.Update(todayAnalytics.ref, {
          data: {
            habitsDone: newHabitsDone,
            percentDone: newPercentDone
          }
        })
      )
      .catch((err) => {
        console.error(err)
        res.status(500).json({
          status: 500,
          error: { message: 'Something went wrong on the server' }
        })
      })
  }

  const currentStreak =
    newPercentDone === 100 &&
    isoDateString !== widget.data.currentStreakUpdatedAt
      ? widget.data.currentStreak + 1
      : widget.data.currentStreak
  const currentStreakUpdatedAt =
    newPercentDone === 100 &&
    isoDateString !== widget.data.currentStreakUpdatedAt
      ? isoDateString
      : widget.data.currentStreakUpdatedAt

  try {
    await faunaClient.query(
      q.Update(widget.ref, {
        data: {
          habits: newHabits,
          currentStreak,
          currentStreakUpdatedAt
        }
      })
    )

    res.status(200).json({})
  } catch (err) {
    res.status(200).json({
      status: 500,
      error: {
        message: 'Something went wrong went trying to save your habit'
      }
    })
  }
}

export default deleteHabit
