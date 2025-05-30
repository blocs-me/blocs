import { validateHabitTrackerAnalytics } from '@/lambda/lib/restValidator/jsonValidator'
import { getPercent } from '../../../utils/math/getPercent'
import { calculateStreak, handleUpdate } from './calculateAndUpdateStreak'
import canPerformAction from '../../helpers/supabase/canPerformAction'
import supabase from '@/lambda/helpers/supabase'
import { HabitItem } from '@/gtypes/habit-tracker'
import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next'
import { mapWidgetAccessTokenToType } from '@/lambda/helpers/supabase/mapDbToType'

const saveHabitTrackerAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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

  const widgetIndexKey = role === 'blocs-user' ? 'token' : null

  if (!widgetIndexKey) {
    res.status(400).json({
      status: 400,
      error: {
        message: '[Bad Request] Provided data is incorrect'
      }
    })
  }

  const { data: widget } = await supabase
    .from('widget_access_tokens')
    .select('*')
    .eq(widgetIndexKey, widgetToken)
    .maybeSingle()

  if (!widget) {
    res.status(404).json({
      error: {
        message: 'Widget was not found'
      }
    })
    return null
  }

  const hasPermission = await canPerformAction(
    widget.user_id,
    'habitTracker',
    res
  )
  if (!hasPermission) return null

  const { data: existingAnalyticsDoc } = await supabase
    .from('habit_tracker_analytics')
    .select('*')
    .eq('iso_date_string', isoDateString)
    .eq('widget_id', widget.id)
    .maybeSingle()

  const allHabits = (widget.habits as unknown as HabitItem[]) || []
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

    const mappedWidget = mapWidgetAccessTokenToType(widget)
    const updatedStreaks = await calculateStreak(
      percentDone,
      mappedWidget,
      isoDateString
    )

    const streaks = await handleUpdate(updatedStreaks, widget)

    const { data: updatedData, error } = await supabase
      .from('habit_tracker_analytics')
      .update({
        habits_done: habitsDone,
        percent_done: percentDone
      })
      .eq('id', existingAnalyticsDoc.id)
      .select()
      .single()

    if (error) {
      console.error(error)
      return null
    }

    return res.status(200).json({
      status: 200,
      data: {
        percentDone: updatedData?.percent_done,
        habitsDone: updatedData?.habits_done,
        bestStreak: streaks?.bestStreak,
        currentStreak: streaks?.currentStreak
      }
    })
  }

  try {
    const percentDone = getPercent(1, allHabits.length, 'floor')
    const habitsDone = habitIds

    const { data: newAnalyticsData, error } = await supabase
      .from('habit_tracker_analytics')
      .insert({
        habits_done: habitsDone,
        percent_done: percentDone,
        iso_date_string: isoDateString,
        widget_id: widget.id,
        created_at: new Date(isoDateString)
      })
      .select()
      .single()

    if (error) {
      console.error(error)
      return null
    }

    res.status(200).json({
      status: 200,
      data: {
        percentDone: newAnalyticsData?.percent_done,
        habitsDone: newAnalyticsData?.habits_done
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
