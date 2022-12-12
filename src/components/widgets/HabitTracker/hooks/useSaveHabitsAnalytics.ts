import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { HABITS_ANALYTICS_PATH, HABITS_PATH } from '@/utils/endpoints'
import { putReq } from '@/utils/fetchingUtils'
import useFetchHabitsAnalytics from './useFetchHabitsAnalytics'
import useNotifications from '@/design-system/Notifications/useNotifications'
import { getCurrentISOString } from '../../../../utils/dateUtils/getCurrentISOString'

const useSaveHabits = () => {
  const { token, role } = useUrlHash<any>()
  const path = `${HABITS_ANALYTICS_PATH}?widgetToken=${token}&role=${role}`
  const { mutate, data: habitAnalytics } = useFetchHabitsAnalytics()
  const notifs = useNotifications()
  const isoDateString = getCurrentISOString()

  const putHabits = (habitIds: string[]) =>
    putReq(path, {
      body: {
        habitIds,
        isoDateString
      }
    })

  const saveHabits = async (newHabitId: string) => {
    const checkedValues = habitAnalytics?.data?.habitsDone || []

    const newHabitIds = (() => {
      const index = checkedValues.indexOf(newHabitId)
      if (checkedValues.includes(newHabitId)) {
        return [
          ...checkedValues.slice(0, index),
          ...checkedValues.slice(index + 1)
        ]
      }

      return [...checkedValues, newHabitId]
    })()

    try {
      await mutate(putHabits(newHabitIds), {
        optimisticData: {
          data: {
            ...(habitAnalytics?.data || {}),
            habitsDone: newHabitIds
          }
        },
        revalidate: false,
        rollbackOnError: true,
        populateCache: true
      })
    } catch (err) {
      console.error(err)
      notifs.createError("Uh oh! We couldn't save your data")
    }
  }

  return saveHabits
}

export default useSaveHabits
