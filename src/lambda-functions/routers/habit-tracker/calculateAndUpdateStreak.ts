import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { IHabitTrackerWidget } from '../../../global-types/habit-tracker'
import { getCurrentISOString } from '../../../utils/dateUtils/getCurrentISOString'

export const handleUpdate = async (
  newData: Partial<IHabitTrackerWidget['data']>,
  widget: IHabitTrackerWidget
) => {
  if (!widget && newData) {
    return {
      data: {
        bestStreak: widget.data.bestStreak,
        currentStreak: widget.data.currentStreak,
        currentStreakUpdatedAt: widget.data.currentStreakUpdatedAt
      }
    }
  }

  try {
    const updated = await faunaClient.query(
      q.Update(widget.ref, {
        data: { ...newData } // ⚠️ need to destructure otherwise data will not save
      })
    )

    return updated as IHabitTrackerWidget
  } catch (error) {
    console.error(error)
    return null
  }
}

export const calculateStreak = async (
  percentDone: number,
  widget: IHabitTrackerWidget,
  isoDateString: string
): Promise<Partial<IHabitTrackerWidget['data']> | null> => {
  const bestStreak = widget.data.bestStreak
  const currentStreak = widget.data.currentStreak
  const currentStreakUpdatedAt = widget.data.currentStreakUpdatedAt

  if (currentStreak === 0 && bestStreak === 0 && percentDone !== 100)
    return widget?.data

  const yesterdayISOStr = (() => {
    const yesterday = new Date(isoDateString)
    yesterday.setDate(yesterday.getDate() - 1)
    return getCurrentISOString(yesterday)
  })()

  if (percentDone < 100 && currentStreakUpdatedAt === isoDateString) {
    return {
      currentStreak: Math.max(0, currentStreak > 0 ? currentStreak - 1 : 0),
      currentStreakUpdatedAt: yesterdayISOStr // prevents subtraction more than one time
    }
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

    return {
      currentStreak: 0,
      bestStreak: newBestStreak,
      bestStreakUpdatedAt: isoDateString,
      currentStreakUpdatedAt: isoDateString
    }
  }

  if (percentDone === 0 && currentStreakUpdatedAt !== yesterdayISOStr) {
    // when user breaks current streak <- happens on get request
    return {
      currentStreak: 0,
      currentStreakUpdatedAt: isoDateString
    }
  }

  if (percentDone === 100 && isoDateString !== currentStreakUpdatedAt) {
    return {
      currentStreak: currentStreak + 1,
      currentStreakUpdatedAt: isoDateString
    }
  }

  return null
}
