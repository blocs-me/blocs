import { validateHabitSchema } from '@/lambda/lib/restValidator/jsonValidator'
import { NextApiRequest, NextApiResponse } from 'next'
import { HabitItem } from '../../../global-types/habit-tracker'
import { getPercent } from '../../../utils/math/getPercent'
import canPerformAction from '../../helpers/supabase/canPerformAction'
import supabase from '@/lambda/helpers/supabase'
import {
  mapHabitAnalyticsToType,
  mapWidgetAccessTokenToType
} from '@/lambda/helpers/supabase/mapDbToType'

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

  const { data: widget } = await supabase
    .from('widget_access_tokens')
    .select('*')
    .eq('token', widgetToken)
    .maybeSingle()

  if (!widget) {
    res.status(404).json({
      error: {
        message: 'Widget was not found'
      }
    })
    return null
  }

  const widgetData = mapWidgetAccessTokenToType(widget)

  const hasPermission = await canPerformAction(
    widgetData.userId,
    'habitTracker',
    res
  )
  if (!hasPermission) return null

  const prevHabits = JSON.parse(JSON.stringify(widgetData.habits))
  const shouldDelete = (widgetData.habits as unknown as HabitItem[]).find(
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

  const { data: todayAnalytics } = await supabase
    .from('habit_trackers_analytics')
    .select('*')
    .eq('iso_date_string', isoDateString)
    .eq('widget_id', widgetData.id)
    .maybeSingle()

  const todayAnalyticsData = mapHabitAnalyticsToType(todayAnalytics)

  let newPercentDone = 0

  if (todayAnalytics) {
    const prevHabitsDone = todayAnalyticsData.habitsDone as string[]
    const newHabitsDone = prevHabitsDone.filter(
      (habitId) => habitId !== habit.id
    )
    newPercentDone = getPercent(newHabitsDone.length, newHabits.length, 'floor')

    try {
      await supabase
        .from('habit_trackers_analytics')
        .update({
          habits_done: newHabitsDone,
          percent_done: newPercentDone
        })
        .eq('id', todayAnalytics.id)
    } catch (err) {
      console.error(err)
      res.status(500).json({
        status: 500,
        error: { message: 'Something went wrong on the server' }
      })
    }
  }

  const currentStreak =
    newPercentDone === 100 &&
    isoDateString !== widgetData.currentStreakUpdatedAt
      ? widgetData.currentStreak + 1
      : widgetData.currentStreak
  const currentStreakUpdatedAt =
    newPercentDone === 100 &&
    isoDateString !== widgetData.currentStreakUpdatedAt
      ? isoDateString
      : widgetData.currentStreakUpdatedAt

  try {
    await supabase
      .from('widget_access_tokens')
      .update({
        habits: newHabits,
        current_streak: currentStreak,
        current_streak_updated_at: currentStreakUpdatedAt
      })
      .eq('id', widgetData.id)

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
