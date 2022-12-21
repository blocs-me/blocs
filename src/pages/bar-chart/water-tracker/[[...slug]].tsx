import { ColorModeProvider } from '@/hooks/useColorMode'
import WidgetPage from '@/widgets/WidgetPage'

import useUrlHash from '../../../hooks/useUrlHash/index'
import WaterTrackerBarChart from '../../../components/widgets/WaterTrackerAnalytics/index'
import { AnalyticsBarChartProvider } from '@/widgets/AnalyticsBarChart/useAnalyticsBarChart'
import { useInitUrlHash } from '../../../hooks/useUrlHash/useUrlHash'

const Page = () => {
  const { hash, URLHashProvider } = useInitUrlHash()

  return (
    <ColorModeProvider>
      <URLHashProvider hash={hash}>
        <WidgetPage>
          <AnalyticsBarChartProvider>
            <WaterTrackerBarChart />
          </AnalyticsBarChartProvider>
        </WidgetPage>
      </URLHashProvider>
    </ColorModeProvider>
  )
}

export default Page
