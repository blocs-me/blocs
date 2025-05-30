import { NextApiRequest, NextApiResponse } from 'next'
import { calculateStreak, handleUpdate } from './calculateAndUpdateStreak'
import supabase from '@/lambda/helpers/supabase'

const getHabitTrackerAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken, role, isoDateString } = req.query as {
    widgetToken: string
    role: 'friend' | 'blocs-user'
    isoDateString: string
  }

  const widgetIndexKey = role === 'blocs-user' ? 'token' : 'shareable_token'

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

  const { data: existingAnalyticsDoc } = await supabase
    .from('habit_tracker_analytics')
    .select('*')
    .eq('iso_date_string', isoDateString)
    .eq('widget_id', widget.id)
    .maybeSingle()

  if (existingAnalyticsDoc) {
    res.status(200).json({
      data: {
        percentDone: existingAnalyticsDoc?.percent_done,
        habitsDone: existingAnalyticsDoc?.habits_done,
        bestStreak: widget?.best_streak,
        currentStreak: widget?.current_streak
      }
    })

    return null
  }

  try {
    const { data: newData, error } = await supabase
      .from('habit_tracker_analytics')
      .insert({
        habits_done: [],
        percent_done: 0,
        iso_date_string: new Date(isoDateString),
        widget_id: widget.id
      })
      .select()
      .single()

    if (!newData) {
      const error = new Error('Could not create habit tracker analytics')
      throw error
    }

    const newStreaks = await calculateStreak(0, widget, isoDateString)
    const streaks = await handleUpdate(newStreaks, widget)

    res.status(200).json({
      status: 200,
      data: {
        percentDone: newData?.percent_done,
        habitsDone: newData?.habits_done,
        bestStreak: streaks?.bestStreak,
        currentStreak: streaks?.currentStreak
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: 500,
      error: {
        message: 'This is on us ! Something went wrong on our servers'
      }
    })
  }
}

export default getHabitTrackerAnalytics
