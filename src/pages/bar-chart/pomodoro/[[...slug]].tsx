import { ColorModeProvider } from '@/hooks/useColorMode'
import WidgetPage from '@/widgets/WidgetPage'
import WaterTrackerBarChart from '../../../components/widgets/WaterTrackerAnalytics/index'
import { AnalyticsBarChartProvider } from '@/widgets/AnalyticsBarChart/useAnalyticsBarChart'
import { useInitUrlHash } from '../../../hooks/useUrlHash/useUrlHash'
import PomodoroAnalyticsBarChart from '@/widgets/PomodoroAnalyticsBarChart'

const Page = () => {
  const { hash, URLHashProvider } = useInitUrlHash()

  return (
    <ColorModeProvider>
      <URLHashProvider hash={hash}>
        <WidgetPage p="md">
          <AnalyticsBarChartProvider>
            <PomodoroAnalyticsBarChart />
          </AnalyticsBarChartProvider>
        </WidgetPage>
      </URLHashProvider>
    </ColorModeProvider>
  )
}

export default Page
