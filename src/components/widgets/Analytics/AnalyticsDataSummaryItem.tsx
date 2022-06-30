import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'

const AnalyticsDataSummaryItem = ({ label = 'label', value = 'value' }) => (
  <Flex flexDirection="column" color="primary.accent-4">
    <Text fontSize="xxs" fontWeight={200} lineHeight={1} m={0}>
      {label}
    </Text>
    <Text fontSize="xs" fontWeight={600} m={0}>
      {value}
    </Text>
  </Flex>
)

export default AnalyticsDataSummaryItem
