import Flex from '@/helpers/Flex'
import { ReactNode } from 'react'
import AnalyticsControls from './AnalyticsControls'
import AnalyticsDataSummaryItem from './AnalyticsDataSummaryItem'

const DataSummary = ({ total, goal }: { total: string; goal: string }) => (
  <Flex gap="sm">
    <AnalyticsDataSummaryItem label="total" value={total} />
    <AnalyticsDataSummaryItem label="goal" value={goal} />
  </Flex>
)

const ChartControls = ({ onClickNext = () => {}, onClickPrev = () => {} }) => (
  <AnalyticsControls
    size="30px"
    gap="sm"
    onClickNext={() => onClickNext()}
    onClickPrev={() => onClickPrev()}
  />
)

const AnalyticsFooter = ({ children }: { children: ReactNode }) => (
  <Flex justifyContent="space-between">{children}</Flex>
)

AnalyticsFooter.DataSummary = DataSummary
AnalyticsFooter.ChartControls = ChartControls

export default AnalyticsFooter
