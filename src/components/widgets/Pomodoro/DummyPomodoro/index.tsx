import Box from '@/helpers/Box'
import { IBox } from '@/helpers/Box/Box.types'
import Flex from '@/helpers/Flex'
import { Play } from 'src/icons/play'
import { Refresh } from 'src/icons/refresh'
import CircleButton from '../PomodoroMainPage/CircleButton'
import Timer from '../Timer'
import { PomodoroProvider } from '../usePomodoroStore'

const DummyPomodoro = (props: IBox) => {
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
          <Timer loading={false} />
          <Flex justifyContent="center" mt="sm">
            <CircleButton icon={<Play />} onClick={() => {}} />
            <Box ml="sm" />
            <CircleButton icon={<Refresh />} onClick={() => {}} />
          </Flex>
        </Flex>
      </Box>
    </PomodoroProvider>
  )
}

export default DummyPomodoro
