import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { IHabitTrackerWidget } from '../../../global-types/habit-tracker'
import { getCurrentISOString } from '../../../utils/dateUtils/getCurrentISOString'

export const calculateAndUpdateStreak = async (
  percentDone: number,
  widget: IHabitTrackerWidget,
  isoDateString: string
) => {
  const bestStreak = widget.data.bestStreak
  const currentStreak = widget.data.currentStreak
  const currentStreakUpdatedAt = widget.data.currentStreakUpdatedAt

  if (currentStreak === 0 && bestStreak === 0 && percentDone !== 100)
    return widget

  const yesterdayISOStr = (() => {
    const yesterday = new Date(isoDateString)
    yesterday.setDate(yesterday.getDate() - 1)
    return getCurrentISOString(yesterday)
  })()

  const handleUpdate = async (newData: {
    currentStreak: number
    bestStreak?: number
    currentStreakUpdatedAt?: string
    bestStreakUpdatedAt?: string
  }) => {
    try {
      const updated = await faunaClient.query(
        q.Update(widget.ref, {
          data: {
            ...newData
          }
        })
      )

      return updated as IHabitTrackerWidget
    } catch (error) {
      console.error(error)
      return null
    }
  }

  if (percentDone < 100 && currentStreakUpdatedAt === isoDateString) {
    return await handleUpdate({
      currentStreak: currentStreak > 0 ? currentStreak - 1 : 0,
      currentStreakUpdatedAt: yesterdayISOStr // prevents subtraction more than one time
    })
  }

  if (
    // When we beat the best streak and break the cur. streak then we set the new best streak and reset the currentStreak
    percentDone < 100 && // <- would happen on get request so percentDone === 0
    !!currentStreakUpdatedAt &&
    currentStreakUpdatedAt !== yesterdayISOStr &&
    currentStreak > 0
  ) {
    const newBestStreak =
      currentStreak > bestStreak ? currentStreak : bestStreak

    return await handleUpdate({
      currentStreak: 0,
      bestStreak: newBestStreak,
      bestStreakUpdatedAt: isoDateString,
      currentStreakUpdatedAt: isoDateString
    })
  }

  if (percentDone === 0 && currentStreakUpdatedAt !== yesterdayISOStr) {
    // when user breaks current streak <- happens on get request
    return await handleUpdate({
      currentStreak: 0,
      currentStreakUpdatedAt: isoDateString
    })
  }

  if (percentDone === 100 && isoDateString !== currentStreakUpdatedAt) {
    return await handleUpdate({
      currentStreak: currentStreak + 1,
      currentStreakUpdatedAt: isoDateString
    })
  }

  return widget
}
