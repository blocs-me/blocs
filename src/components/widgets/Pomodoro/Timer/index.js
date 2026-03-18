import { useState, useEffect } from 'react'
import Flex from '@/helpers/Flex'
import { usePomodoroDispatch } from '../usePomodoroStore'
import { showPomodoroActiveSessionMenu } from '../pomodoroActions'
import { useWidgetAuthStore } from '@/hooks/useWidgetAuth'
import DefaultTimer from './DefaultTimer'

const Timer = ({ loading }) => {
  const dispatch = usePomodoroDispatch()
  const { isLoggedIn } = useWidgetAuthStore() || {}
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = (e) => {
    e?.stopPropagation()
    if (isLoggedIn) {
      dispatch(showPomodoroActiveSessionMenu(true))
    }
  }

  if (!mounted) return null

  return (
    <Flex
      width="70%"
      minWidth="200px"
      height="auto"
      css={{ position: 'relative', cursor: 'pointer', 'user-select': 'none' }}
      onClick={(e) => handleClick(e)}
      justifyContent="center"
    >
      <DefaultTimer loading={loading} />
    </Flex>
  )
}

export default Timer
