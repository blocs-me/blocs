import useNotifications from '@/design-system/Notifications/useNotifications'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { WATER_TRACKER_ANALYTICS_PATH } from '@/utils/endpoints'
import { UrlHash } from '../types'
import { getCurrentISOString } from '../../../../utils/dateUtils/getCurrentISOString'

const useSaveAnalytics = () => {
  const hash = useUrlHash() as UrlHash
  const path = `${WATER_TRACKER_ANALYTICS_PATH}?widgetToken=${hash['token']}`
  const notifs = useNotifications()

  const postAnalytics = async (waterConsumed: number) => {
    const now = new Date()
    const date = now.getTime()
    const isoDateString = getCurrentISOString()

    try {
      await fetch(path, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date,
          isoDateString,
          waterConsumed
        })
      })
    } catch (err) {
      console.error(err)
      notifs.createError(
        "Uh oh ☹️ We couldn't save your data ! Let us know is this continues"
      )
    }
  }

  return postAnalytics
}

export default useSaveAnalytics
