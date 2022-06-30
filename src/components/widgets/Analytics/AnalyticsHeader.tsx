import Select, { SelectProps } from '@/design-system/Select'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import { ReactNode } from 'react'

const SelectHabit = ({ selectProps }: { selectProps: SelectProps }) => (
  <Flex flexDirection="column">
    <Text as="div" fontSize={['xs', 'xs', 'sm']}>
      <Select {...selectProps}>
        <Select.Dropdown {...selectProps} />
      </Select>
    </Text>
  </Flex>
)

const SelectTime = ({ selectProps }: { selectProps: SelectProps }) => (
  <Text as="div" fontSize={['xs', 'xs', 'xs']}>
    <Select {...selectProps}>
      <Select.Dropdown {...selectProps} />
    </Select>
  </Text>
)

const AnalyticsHeader = ({ children }: { children: ReactNode }) => (
  <Flex justifyContent="space-between">{children}</Flex>
)

AnalyticsHeader.SelectHabit = SelectHabit
AnalyticsHeader.SelectTime = SelectTime

export default AnalyticsHeader
