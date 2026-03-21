import { useState } from 'react'
import Box from '@/helpers/Box'
import { IBox } from '@/helpers/Box/Box.types'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import { Play } from 'src/icons/play'
import { Pause } from 'src/icons/pause'
import { Refresh } from 'src/icons/refresh'
import Gear from 'src/icons/gear'
import CircleButton from '../PomodoroMainPage/CircleButton'
import Timer from '../Timer'
import ModeTabBar from '../ModeTabBar'
import PomodoroSettingsPopover from '../PomodoroSettingsPopover'
import { PomodoroProvider, usePomodoroStore, usePomodoroDispatch } from '../usePomodoroStore'
import {
  setDocumentTimelineStart,
  setStartedAt,
  setPausedAt
} from '../pomodoroActions'

const DummyPomodoroInner = ({ hideGear = false, ...props }: IBox & { role?: string; hideGear?: boolean }) => {
  const {
    session: { startedAt, pausedAt }
  } = usePomodoroStore()
  const dispatch = usePomodoroDispatch()
  const [showSettings, setShowSettings] = useState(false)
  const [hovering, setHovering] = useState(false)

  const handlePlayPause = () => {
    if (startedAt) {
      dispatch(setPausedAt(Date.now() - startedAt))
      dispatch(setStartedAt(null))
      return
    }
    dispatch(setDocumentTimelineStart(document.timeline.currentTime))
    dispatch(setStartedAt(Date.now()))
  }

  const handleReset = () => {
    dispatch(setPausedAt(null))
    dispatch(setStartedAt(null))
  }

  return (
    <Box
      height="400px"
      bg="background"
      boxShadow="default"
      css={{ aspectRatio: '0.85' }}
      borderRadius="lg"
      p="sm"
      position="relative"
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
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
            ariaLabel={startedAt ? 'Pause Pomodoro' : 'Start Pomodoro'}
            icon={startedAt ? <Pause /> : <Play />}
            onClick={handlePlayPause}
          />
          <Box ml="sm" />
          <CircleButton
            ariaLabel="Reset Pomodoro"
            icon={<Refresh />}
            onClick={handleReset}
          />
        </Flex>
      </Flex>

      {/* Gear icon */}
      {!hideGear && <Box
        position="absolute"
        top="sm"
        right="sm"
        css={{
          opacity: hovering ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <Flex
          as="button"
          borderRadius="md"
          alignItems="center"
          justifyContent="center"
          bg="primary.accent-2"
          p="xs"
          size="40px"
          overflow="hidden"
          onClick={() => setShowSettings(!showSettings)}
          css={{
            cursor: 'pointer',
            border: 'none',
            '&:hover': { opacity: 0.8 }
          }}
        >
          <Icon
            m="auto"
            fill="foreground"
            width="15px"
            height="15px"
            display="flex"
          >
            <Gear />
          </Icon>
        </Flex>
        {showSettings && (
          <PomodoroSettingsPopover onClose={() => setShowSettings(false)} />
        )}
      </Box>}
    </Box>
  )
}

const DummyPomodoro = (props: IBox & { role?: string }) => {
  return (
    <PomodoroProvider>
      <DummyPomodoroInner {...props} />
    </PomodoroProvider>
  )
}

export { DummyPomodoroInner }
export default DummyPomodoro
