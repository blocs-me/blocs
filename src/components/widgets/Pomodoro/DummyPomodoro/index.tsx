import Box from '@/helpers/Box'
import { IBox } from '@/helpers/Box/Box.types'
import Flex from '@/helpers/Flex'
import { Play } from 'src/icons/play'
import { Refresh } from 'src/icons/refresh'
import CircleButton from '../PomodoroMainPage/CircleButton'
import Timer from '../Timer'
import ModeTabBar from '../ModeTabBar'
import { PomodoroProvider } from '../usePomodoroStore'

const DummyPomodoro = (props: IBox & { role?: string }) => {
  return (
    <PomodoroProvider>
      <Box
        height="400px"
        bg="background"
        boxShadow="default"
        css={{ aspectRatio: '0.85' }}
        borderRadius="lg"
        p="sm"
        position="relative"
        {...props}
      >
        <Flex
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          id="pomodoro-container"
        >
          <ModeTabBar />
          <Timer loading={false} />
          <Flex justifyContent="center" mt="sm">
            <CircleButton
              ariaLabel={'Start Pomodoro'}
              icon={<Play />}
              onClick={() => {}}
            />
            <Box ml="sm" />
            <CircleButton
              ariaLabel={'Reset Pomodoro'}
              icon={<Refresh />}
              onClick={() => {}}
            />
          </Flex>
        </Flex>
      </Box>
    </PomodoroProvider>
  )
}

export default DummyPomodoro
