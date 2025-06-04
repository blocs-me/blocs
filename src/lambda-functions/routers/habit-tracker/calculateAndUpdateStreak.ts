import { IHabitTrackerWidget } from '../../../global-types/habit-tracker'
import { getCurrentISOString } from '../../../utils/dateUtils/getCurrentISOString'
import supabase from '@/lambda/helpers/supabase'
import { IWidgetAccessToken } from '@/gtypes/widget-access-token'
import { mapWidgetAccessTokenToType } from '@/lambda/helpers/supabase/mapDbToType'

export const handleUpdate = async (
  newData: Partial<IWidgetAccessToken>,
  widget: IWidgetAccessToken
) => {
  // if (!widget && newData) {
  //   return {
  //     bestStreak: widget.bestStreak,
  //     currentStreak: widget.currentStreak,
  //     currentStreakUpdatedAt: widget.currentStreakUpdatedAt
  //   }
  // }
  try {
    const { data: updated } = await supabase
      .from('widget_access_tokens')
      .update({
        best_streak: newData.bestStreak || 0,
        best_streak_updated_at: newData.bestStreakUpdatedAt,
        current_streak: newData.currentStreak,
        current_streak_updated_at: newData.currentStreakUpdatedAt
      })
      .eq('id', widget.id)
      .select()
      .single()

    const mappedWidget = mapWidgetAccessTokenToType(updated)
    return mappedWidget as IWidgetAccessToken
  } catch (error) {
    console.error(error)
    return null
  }
}

export const calculateStreak = async (
  percentDone: number,
  widget: IWidgetAccessToken,
  isoDateString: string
): Promise<Partial<IWidgetAccessToken> | null> => {
  const bestStreak = widget.bestStreak
  const currentStreak = widget.currentStreak || 0
  const currentStreakUpdatedAt = widget.currentStreakUpdatedAt || isoDateString

  if (currentStreak === 0 && bestStreak === 0 && percentDone !== 100)
    return {
      bestStreak,
      currentStreak,
      currentStreakUpdatedAt
    }

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
