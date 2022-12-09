import faunaClient from '@/lambda/faunaClient'
import { validateHabitTrackerAnalytics } from '@/lambda/lib/restValidator/jsonValidator'
import { query as q } from 'faunadb'
import { HabitItem } from 'src/global-types/habit-tracker'
import { getPercent } from '../../../utils/math/getPercent'

const saveHabitTrackerAnalytics = async (req, res) => {
  const isValid = validateHabitTrackerAnalytics(req.body)

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
  const habitsBelongsToUser = allHabits.every((habit) =>
    habitIds.includes(habit.id)
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
    const prevDoneHabits = existingAnalyticsDoc.data.completedHabits.filter(
      (id: string) => !!allHabits.find((habit: HabitItem) => habit.id === id)
    )

    const percentDone = getPercent(
      prevDoneHabits.length + 1,
      allHabits.length,
      'toFixedTwo'
    )

    const habitsDone = [...prevDoneHabits, ...habitIds]

    const updatedData = await faunaClient
      .query(
        q.Update(existingAnalyticsDoc.ref, {
          habitsDone,
          percentDone
        })
      )
      .then((data) => data as { data: any })
      .catch((err) => {
        console.error(err)
        return null
      })

    const yesterdayISOStr = (() => {
      const date = new Date(isoDateString)
      date.setDate(date.getDate() - 1)
      return date.toISOString().split('T')[0]
    })()

    if (
      percentDone === 100 &&
      widget.data.streakLastUpdated === yesterdayISOStr
    ) {
      const currentStreak = widget.data.currentStreak + 1

      await faunaClient.query(
        q.Update(widget.ref, {
          data: {
            streakLastUpdated: isoDateString,
            currentStreak,
            bestStreak:
              currentStreak > widget.data.bestStreak
                ? currentStreak
                : widget.data.bestStreak
          }
        })
      )
    }

    if (percentDone < 100 && widget.data.streakLastUpdated === isoDateString) {
      const currentStreak = widget.data.currentStreak - 1

      await faunaClient.query(
        q.Update(widget.ref, {
          data: {
            streakLastUpdated: isoDateString, 
            currentStreak,
            bestStreak:
              currentStreak < widget.data.bestStreak
                ? currentStreak
                : widget.data.bestStreak - 1
          }
        })
      )
    }

    res.status(200).json({
      status: 200,
      data: {
        percentDone: updatedData?.data?.percentDone,
        habitsDone: updatedData?.data?.habitsDone
      }
    })
  }

  try {
    const percentDone = getPercent(1, allHabits.length, 'round')
    const habitsDone = habitIds

    const newAnalyticsData = await faunaClient
      .query(
        q.Create(q.Collection('habit_tracker_analytics'), {
          data: {
            habitsDone,
            percentDone,
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
