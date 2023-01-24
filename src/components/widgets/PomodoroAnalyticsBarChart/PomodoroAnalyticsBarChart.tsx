import { getCurrentISOString } from '@/utils/dateUtils/getCurrentISOString'
import AnalyticsBarChart from '../AnalyticsBarChart'
import { useAnalyticsBarChartStore } from '../AnalyticsBarChart/useAnalyticsBarChart'
import usePomodoroAnalytics from './usePomodoroAnalytics'
import usePomodoroPresets from './usePomodoroPresets'
import Tooltip from './Tooltip'
import { lazy } from 'react'
import usePomodoroAuth from './usePomodoroAuth'
import useUrlHash from '@/hooks/useUrlHash'
import { UrlHash } from '../WaterTracker/types'
import getAnalyticsBarChartDefaultValue from '../AnalyticsBarChart/useAnalyticsBarChartDefaultValue'
import useAnalyticsBarChartDefaultValue from '../AnalyticsBarChart/useAnalyticsBarChartDefaultValue'

const renderTooltip = (d) => <Tooltip {...d} />

const PomodoroAnalyticsBarChart = () => {
  usePomodoroPresets() // fetches presets to display on the tooltip
  const { data: analytics } = usePomodoroAnalytics()
  const { auth } = usePomodoroAuth()
  const { role } = useUrlHash<UrlHash>()
  const showPremiumOverlay = auth && !auth?.isPremium && role === 'friend'
  const fallback = useAnalyticsBarChartDefaultValue()

  return (
    <AnalyticsBarChart
      isOverlayEscapable
      data={analytics?.length > 1 ? analytics : fallback}
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
