import CaretButton from '@/design-system/CaretButton'
import Text from '@/design-system/Text'
import WidgetMenuButton from '@/design-system/WidgetMenuButton'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Stack from '@/helpers/Stack'
import Bowl from './Bowl'
import { useState } from 'react'
import TweenNum from './TweenNum'

const GOAL = 3 // TODO: replace with fetched values

const MainPage = () => {
  const [progress, setProgress] = useState(0)
  const handleIncrease = () => progress !== GOAL && setProgress(progress + 1)
  const handleDecrease = () => progress && setProgress(progress - 1)

  return (
    <Flex
      m="auto"
      borderRadius="lg"
      bg="background"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      p="sm"
      width="350px"
      height="auto"
      boxShadow="widgetLayout"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mb="sm"
      >
        <Stack ml="xs" display="flex">
          <CaretButton orientation="bottom" onClick={() => handleDecrease()} />
          <CaretButton orientation="top" onClick={() => handleIncrease()} />
        </Stack>

        <Box position="absolute" left="50%" transform="translateX(-50%)">
          <Text
            as="h1"
            textAlign="center"
            color="foreground"
            fontSize="sm"
            m={0}
            lineHeight="1"
          >
            <TweenNum speed={0.02} num={progress} />{' '}
            {progress === 1 ? 'Liter' : 'Liters'}
          </Text>
          <Text color="primary.accent-4" fontWeight="200" fontSize="xs" m={0}>
            <TweenNum speed={0.7} num={Math.ceil((progress / GOAL) * 100)} />%
            of your goal
          </Text>
        </Box>
        <WidgetMenuButton href="/water-tracker/menu" />
      </Flex>

      <Bowl goal={GOAL} progress={progress} />
    </Flex>
  )
}

export default MainPage
