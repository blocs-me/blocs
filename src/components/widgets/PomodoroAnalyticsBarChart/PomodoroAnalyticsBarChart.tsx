import AnalyticsBarChart from '../AnalyticsBarChart'
import usePomodoroAnalytics from './usePomodoroAnalytics'
import usePomodoroPresets from './usePomodoroPresets'
import Tooltip from './Tooltip'
import usePomodoroAuth from './usePomodoroAuth'
import useUrlHash from '@/hooks/useUrlHash'
import { UrlHash } from '../WaterTracker/types'
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
      data={analytics?.length ? analytics : fallback}
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
