import { useWidgetAuthStore } from '@/hooks/useWidgetAuth'
import { POMODORO_ANALYTICS_PATH } from '@/utils/endpoints'
import { postReq } from '@/utils/fetchingUtils'
import { PomodoroAnalayticsBody } from 'src/global-types/pomodoro'
import useNotifications from '../../../design-system/Notifications/useNotifications'
import usePomodoroAuth from '../../PomodoroAnalyticsBarChart/usePomodoroAuth'

export const useSavePomodoroAnalytics = () => {
  const { token } = useWidgetAuthStore() || {}
  const path = `${POMODORO_ANALYTICS_PATH}?token=${token}`
  const notifs = useNotifications()
  const { auth } = usePomodoroAuth()

  const saveAnalayticsData = async (body: PomodoroAnalayticsBody) => {
    if (!auth?.isPremium) return null

    try {
      await postReq(path, {
        body
      })

      notifs.createSuccess(
        'Saved your session' +
          ['🎉', '🙌', '🥳', '📊'][Math.floor(Math.random() * 4)]
      )
    } catch (err) {
      console.error(err)
      notifs.createError("uh oh ! we could't save your analytics data ☹️")
    }
  }

  return saveAnalayticsData
}
