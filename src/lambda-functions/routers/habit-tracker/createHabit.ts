import { validateHabitSchema } from '@/lambda/lib/restValidator/jsonValidator'
import { NextApiRequest, NextApiResponse } from 'next'
import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'
import { handle200Response } from '../../helpers/handleResponses'
import canPerformAction from '../../helpers/supabase/canPerformAction'
import supabase from '@/lambda/helpers/supabase'
import { mapWidgetAccessTokenToType } from '@/lambda/helpers/supabase/mapDbToType'

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

  const yesterdayISOStr = (() => {
    const yesterday = new Date(isoDateString as any)
    yesterday.setDate(yesterday.getDate() - 1)
    return getCurrentISOString(yesterday)
  })()

  // reset streak + date so it can be updated again
  const currentStreak =
    isoDateString === widgetData.currentStreakUpdatedAt
      ? Math.max(0, widgetData.currentStreak - 1)
      : widgetData.currentStreak
  const currentStreakUpdatedAt =
    isoDateString === widgetData.currentStreakUpdatedAt
      ? yesterdayISOStr
      : widgetData.currentStreakUpdatedAt

  const prevHabits = widgetData?.habits || []

  try {
    await supabase
      .from('widget_access_tokens')
      .update({
        current_streak: currentStreak,
        current_streak_updated_at: currentStreakUpdatedAt,
        habits: [
          ...prevHabits,
          {
            id: crypto.randomUUID(),
            title: habit.title
          }
        ]
      })
      .eq('id', widgetData.id)

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
