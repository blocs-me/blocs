import { validateHabitSchema } from '@/lambda/lib/restValidator/jsonValidator'
import { NextApiRequest, NextApiResponse } from 'next'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'
import { IHabitTrackerWidget } from '../../../global-types/habit-tracker'
import { handle200Response } from '../../helpers/handleResponses'
import canPerformAction from '../../helpers/faunadb/canPerformAction'

const createHabit = async (req: NextApiRequest, res: NextApiResponse) => {
  const isValid = validateHabitSchema(req.body)

  if (!isValid) {
    res.status(400).json({
      status: 400,
      error: {
        message: '[Bad Request] Provided data is incorrect'
      }
    })
  }
  const habit = req.body
  const { widgetToken, isoDateString } = req.query

  const widgetIndexKey = 'widget_by_token'

  const widget: IHabitTrackerWidget = await faunaClient
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

  const yesterdayISOStr = (() => {
    const yesterday = new Date(isoDateString as any)
    yesterday.setDate(yesterday.getDate() - 1)
    return getCurrentISOString(yesterday)
  })()

  // reset streak + date so it can be updated again
  const currentStreak =
    isoDateString === widget.data.currentStreakUpdatedAt
      ? Math.max(0, widget.data.currentStreak - 1)
      : widget.data.currentStreak
  const currentStreakUpdatedAt =
    isoDateString === widget.data.currentStreakUpdatedAt
      ? yesterdayISOStr
      : widget.data.currentStreakUpdatedAt

  const prevHabits = widget?.data?.habits || []

  try {
    await faunaClient.query(
      q.Update(widget.ref, {
        data: {
          currentStreak,
          currentStreakUpdatedAt,
          habits: [
            ...prevHabits,
            {
              id: q.NewId(),
              title: habit.title
            }
          ]
        }
      })
    )

    handle200Response(res)
  } catch (err) {
    console.error(err)
    res.status(200).json({
      status: 500,
      error: {
        message: 'Something went wrong went trying to save your habit'
      }
    })
  }
}

export default createHabit
