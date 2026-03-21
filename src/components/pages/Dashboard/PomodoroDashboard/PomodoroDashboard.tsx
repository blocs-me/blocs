import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import { DummyPomodoroInner } from '@/widgets/Pomodoro/DummyPomodoro'
import AnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import { useCreateToken } from '../useCreateToken'
import { useEffect } from 'react'
import { useWidgetAuthDispatch } from '@/hooks/useWidgetAuth'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'

const PomodoroDashboard = () => {
  const { token, isLoading } = useCreateToken('POMODORO', true)
  const dispatch = useWidgetAuthDispatch()

  useEffect(() => {
    if (token) {
      dispatch({ type: 'SET_TOKEN', token })
    }
  }, [token, dispatch])

  const baseUrl = typeof window !== 'undefined' ? window.origin : ''
  const widgetUrl = token ? `${baseUrl}/pomodoro?token=${token}&role=blocs-user` : ''
  const analyticsUrl = token ? `${baseUrl}/bar-chart/pomodoro?token=${token}&role=blocs-user` : ''

  return (
    <Flex flexDirection="column" css={{ gap: '2rem' }}>
      <Flex flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between" mb="sm">
          <Flex alignItems="center" css={{ gap: '12px' }}>
            <Text as="h2" fontSize="md" fontWeight={700} color="foreground" m={0}>
              Pomodoro Timer
            </Text>
            <HowToEmbedButton />
          </Flex>
          <CopyLinkButton url={widgetUrl} disabled={isLoading} />
        </Flex>
        <Flex justifyContent="center">
          <DummyPomodoroInner />
        </Flex>
      </Flex>

      <Flex flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between" mb="sm">
          <Text as="h2" fontSize="md" fontWeight={700} color="foreground" m={0}>
            Analytics
          </Text>
          <CopyLinkButton url={analyticsUrl} disabled={isLoading} />
        </Flex>
        <Flex justifyContent="center">
          <AnalyticsBarChart
            units="hr"
            height={['300px', '350px', '400px']}
            width={['100%', '500px', '600px']}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PomodoroDashboard
