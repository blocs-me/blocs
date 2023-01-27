import useFetchHabitsAnalytics from './useFetchHabitsAnalytics'
import { getPercent } from '../../../../utils/math/getPercent'

const useHabitStreakProgress = () => {
  const { data: analytics } = useFetchHabitsAnalytics()
  const bestStreak = analytics?.data?.bestStreak
  const currentStreak = analytics?.data?.currentStreak

  const streakProgress = (() => {
    if (currentStreak < bestStreak)
      return getPercent(currentStreak, bestStreak, 'floor')

    if (currentStreak < 7) return getPercent(currentStreak, 7, 'floor')
    if (currentStreak < 14) return getPercent(currentStreak, 14, 'floor')
    if (currentStreak < 30) return getPercent(currentStreak, 30, 'floor')

    if (currentStreak >= 30) {
      let count = 50

      while (currentStreak >= count) {
        count = count + 50
      }

      return count
    }
  })()

  return streakProgress
}

export default useHabitStreakProgress
