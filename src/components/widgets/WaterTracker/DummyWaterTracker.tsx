import Flex from '@/helpers/Flex'
import Bowl from './Bowl'
import CaretButton from '@/design-system/CaretButton'
import TweenNum from './TweenNum'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import { IBox } from '@/helpers/Box/Box.types'

type Props = {
  goal?: number
  progress?: number
  onClickUp?: () => void
  onClickDown?: () => void
}

const DummyWaterTracker = ({
  goal = 3,
  progress = 0,
  onClickUp = () => {},
  onClickDown = () => {},
  ...rest
}: Props & IBox) => {
  return (
    <Flex
      width="400px"
      bg="background"
      boxShadow="default"
      css={{ aspectRatio: '0.85' }}
      borderRadius="lg"
      p="sm"
      position="relative"
      flexDirection="column"
      {...rest}
    >
      <Flex mb="sm" width="100%" alignItems="center">
        <Flex>
          <CaretButton orientation="bottom" onClick={onClickDown} />
          <Flex pl="xs" />
          <CaretButton orientation="top" onClick={onClickUp} />
        </Flex>

        <Box
          position="absolute"
          left="50%"
          css={{ transform: 'translateX(-50%)' }}
        >
          <Text
            as="h1"
            textAlign="center"
            color="foreground"
            fontSize="sm"
            m={0}
            lineHeight="1"
            textTransform="capitalize"
            css={{ 'user-select': 'none' }}
          >
            <TweenNum speed={0.02} num={progress} />{' '}
            {progress === 1 ? `liter` : `liters`}
          </Text>
          <Text
            color="primary.accent-4"
            fontWeight="200"
            fontSize="xs"
            m={0}
            css={{ 'user-select': 'none' }}
          >
            {Math.min(100, Math.round((progress / goal) * 100)) || 0}% of your
            goal
          </Text>
        </Box>
      </Flex>
      <Bowl progress={progress} goal={goal} />
    </Flex>
  )
}

export default DummyWaterTracker
