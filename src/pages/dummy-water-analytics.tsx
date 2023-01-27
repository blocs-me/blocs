import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import WidgetPage from '@/widgets/WidgetPage'

const DummyPomodoroAnalytics = () => {
  return (
    <WidgetPage p="sm" bg="background">
      <DummyAnalyticsBarChart
        units="L"
        width="100%"
        height="100%"
        maxHeight="500px"
        minHeight="300px"
        minWidth="300px"
        maxWidth="700px"
      />
    </WidgetPage>
  )
}

export default DummyPomodoroAnalytics
