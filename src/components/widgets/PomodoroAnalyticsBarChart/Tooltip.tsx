import Flex from '@/helpers/Flex'
import usePomodoroPresets from './usePomodoroPresets'
import Text from '@/design-system/Text'
import { useMemo } from 'react'
import { msToHours } from '@/utils/math'

const Item = ({ labelColor, timeSpent, title }) => (
  <Flex justifyContent="space-between" alignItems="center" width="100%">
    <Flex alignItems="center" mr="md">
      <Flex
        size="15px"
        bg={labelColor || 'primary.accent-4'}
        borderRadius="5px"
        mr="xs"
      />
      <Text as="div" color="foreground" fontSize="xs" fontWeight={200}>
        {title || 'Deleted'}
      </Text>
    </Flex>
    <Text color="primary.accent-4" fontSize="xs" fontWeight={200} mb={0}>
      {msToHours(timeSpent).toFixed(1)} hrs
    </Text>
  </Flex>
)

const Tooltip = (props) => {
  const { data: presets } = usePomodoroPresets()

  const presetColors = useMemo(
    () =>
      presets?.data?.reduce((acc, cv) => {
        acc[cv.id] = {
          color: cv.labelColor,
          title: cv.label
        }
        return acc
      }, {}),
    [presets]
  )

  if (!props?.data?.length)
    return (
      <Flex color="foreground">
        <Text color="primary.accent-4" fontSize="xs" fontWeight={200} mb={0}>
          0 hrs
        </Text>
      </Flex>
    )

  return (
    <Flex flexDirection="column" justifyContent="start">
      {props.data?.map(([presetId, timeSpent]) => (
        <Item
          key={presetId}
          labelColor={presetColors[presetId]?.color}
          timeSpent={timeSpent}
          title={presetColors[presetId]?.title}
        />
      ))}
    </Flex>
  )
}

export default Tooltip
