import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'
import AnalyticsBarChart from '../AnalyticsBarChart'
import { useAnalyticsBarChartStore } from '../AnalyticsBarChart/useAnalyticsBarChart'
import usePomodoroAnalytics from './usePomodoroAnalytics'
import usePomodoroPresets from './usePomodoroPresets'
import Tooltip from './Tooltip'
import Box from '@/helpers/Box'
import Loader from '@/design-system/Loader'
import { lazy, Suspense, useState } from 'react'
import usePomodoroAuth from './usePomodoroAuth'
import useUrlHash from '@/hooks/useUrlHash'
import { UrlHash } from '../WaterTracker/types'
import Flex from '@/helpers/Flex'

const PremiumOverlay = lazy(() => import('@/pages/Dashboard/PremiumOverlay'))
const renderTooltip = (d) => <Tooltip {...d} />

const PomodoroAnalyticsBarChart = () => {
  const { data: analytics } = usePomodoroAnalytics()
  const { page } = useAnalyticsBarChartStore()
  usePomodoroPresets()
  const { auth } = usePomodoroAuth()
  const { role } = useUrlHash<UrlHash>()
  const showPremiumOverlay = auth && !auth?.isPremium && role === 'friend'

  const getFallback = () => {
    const from = new Date()
    const to = new Date()

    from.setDate(from.getDate() - from.getDay() + 1)
    from.setDate(from.getDate() + page * 7)

    from.setDate(from.getDate() - from.getDay() + 1)
    to.setDate(to.getDate() + (page + 1) * 7 - 2)

    const result = [
      {
        id: 1,
        date: getCurrentISOString(from),
        value: 0
      },
      {
        id: 2,
        date: getCurrentISOString(to),
        value: 0
      }
    ]

    if (analytics?.length === 1) {
      const date = analytics[0].date
      const index = result.findIndex((d) => d.date === date)

      if (index > -1) {
        result.splice(index, 1, analytics[0])
      } else {
        result.splice(1, 0, analytics[0])
      }
    }

    return result
  }

  return (
    <AnalyticsBarChart
      data={analytics?.length > 1 ? analytics : getFallback()}
      mainPage="/bar-chart/pomodoro"
      menuPage="/bar-chart/pomodoro/menu"
      units="hr"
      minY={5}
      renderTooltip={renderTooltip}
      showPremiumOverlay={showPremiumOverlay}
      disableControls={!auth?.isPremium}
    />
  )
}

export default PomodoroAnalyticsBarChart
