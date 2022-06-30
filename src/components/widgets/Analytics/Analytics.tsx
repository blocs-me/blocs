import { useSelect } from '@/design-system/Select'
import Flex from '@/helpers/Flex'
import daysOfTheWeek from '@/constants/daysOfTheWeek'
import AnalyticsSettings from './AnalyticsControls'
import AnalyticsDataSummary from './AnalyticsDataSummaryItem'
import AnalyticsLayout from './AnalyticsLayout'
import AnalyticsHeader from './AnalyticsHeader'
import AnalyticsBarChart from './AnalyticsBarChart'
import { BarChartProps } from '@/design-system/BarChart'
import AnalyticsFooter from './AnalyticsFooter'

const getXAxisValue = ({ date }) => daysOfTheWeek[new Date(date).getDay()]
const getYAxisValue = ({ value, unit }) => `${value} ${unit}`

const options = [
  { id: 1, label: 'option 1', value: 'option 1' },
  { id: 2, label: 'option 2', value: 'option 2' }
]

const timeSettings = [
  {
    id: 2,
    label: 'daily',
    value: 'daily'
  },
  {
    id: 1,
    label: 'weekly',
    value: 'weekly'
  },
  {
    id: 3,
    label: 'monthly',
    value: 'monthly'
  }
]

const Analytics = () => {
  const dummyData: BarChartProps['data'] = Array(7)
    .fill('-')
    .map((_, i) => ({
      id: i,
      value: Math.round(Math.max(1, Math.random() * 6)),
      unit: 'hrs',
      date: new Date(
        `2021-01-${i + 1 < 10 ? `0${i + 1}` : i + 1}`
      ).toISOString()
    }))

  const [selected, selectedProps] = useSelect(options[0], options)
  const [selectedTimeSetting, timeSettingProps] = useSelect(
    timeSettings[0],
    timeSettings
  )

  return (
    <AnalyticsLayout>
      <AnalyticsHeader>
        <AnalyticsHeader.SelectHabit selectProps={selectedProps} />
        <AnalyticsHeader.SelectTime selectProps={timeSettingProps} />
      </AnalyticsHeader>
      <AnalyticsBarChart
        data={dummyData}
        getXAxisValue={getXAxisValue}
        getYAxisValue={getYAxisValue}
      />
      <AnalyticsFooter>
        <AnalyticsFooter.DataSummary total="10 hrs" goal={'20 hrs / week'} />
        <AnalyticsFooter.ChartControls />
      </AnalyticsFooter>
    </AnalyticsLayout>
  )
}

export default Analytics
