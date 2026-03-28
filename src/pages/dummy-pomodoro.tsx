import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import {
  setDocumentTimelineStart,
  setStartedAt
} from '@/widgets/Pomodoro/pomodoroActions'
import {
  PomodoroProvider,
  usePomodoroDispatch
} from '@/widgets/Pomodoro/usePomodoroStore'
import WidgetPage from '@/widgets/WidgetPage'
import { useEffect } from 'react'

const Realistic = () => {
  const pomodoroDispatch = usePomodoroDispatch()

  useEffect(() => {
    pomodoroDispatch(setDocumentTimelineStart(document.timeline.currentTime))
    pomodoroDispatch(setStartedAt(Date.now()))
  }, [])

  return <div />
}

const PomodoroDummy = () => {
  return (
    <WidgetPage p="sm" bg="bg.notion">
      <PomodoroProvider>
        <DummyPomodoro
          height="auto"
          width="100%"
          maxWidth="385px"
          minWidth="300px"
        />
        <Realistic />
      </PomodoroProvider>
    </WidgetPage>
  )
}

export default PomodoroDummy
