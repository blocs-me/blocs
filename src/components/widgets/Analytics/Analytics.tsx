import Select, { useSelect } from '@/design-system/Select'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import Stack from '@/helpers/Stack'
import { useRef } from 'react'
import daysOfTheWeek from '@/constants/daysOfTheWeek'
import BarChart, { BarGraphData } from '@/design-system/BarChart'
import Box from '@/helpers/Box'

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
  const dummyData: BarGraphData[] = Array(7)
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
  const opts = useRef(options)

  return (
    <Box
      bg="bg.default"
      boxShadow="default"
      width="100%"
      minWidth="280px"
      maxWidth="600px"
      borderRadius="lg"
      mx="sm"
      p="sm"
    >
      <Stack pt="xs">
        <Flex justifyContent="space-between">
          <Flex flexDirection="column">
            <Text as="div" fontSize={['xs', 'xs', 'sm']}>
              <Select {...selectedProps}>
                <Select.Dropdown {...selectedProps} />
              </Select>
            </Text>
          </Flex>
          <Text as="div" fontSize={['xs', 'xs', 'xs']}>
            <Select {...timeSettingProps}>
              <Select.Dropdown {...timeSettingProps} />
            </Select>
          </Text>
        </Flex>
        <div>
          <Box bg="bg.mute" px="sm" py="xs" borderRadius="lg">
            <BarChart
              data={dummyData}
              paddingX={3}
              getXAxisValue={getXAxisValue}
              getYAxisValue={getYAxisValue}
            />
          </Box>
        </div>
      </Stack>
    </Box>
  )
}

export default Analytics
