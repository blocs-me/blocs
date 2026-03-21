import Flex from '@/helpers/Flex'
import { DummyPomodoroInner } from '@/widgets/Pomodoro/DummyPomodoro'
import AnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import Box from '@/helpers/Box'
import WidgetLinkWrapper from '../WidgetLinkWrapper'
import { useState } from 'react'
import ClipboardModal from '../ClipboardModal'
import { useCreateToken } from '../useCreateToken'
import { useRouter } from 'next/router'
import useClipboard from '@/hooks/useClipboard'
import PresetsSection from './PresetSection'
import { useEffect } from 'react'
import { useWidgetAuthDispatch } from '@/hooks/useWidgetAuth'

const PomodoroDashboard = () => {
  const { token, publicToken, isLoading } = useCreateToken('POMODORO', true)
  const { path } = useRouter().query
  const clipboard = useClipboard()
  const [url, setUrl] = useState('')
  const [publicUrl, setPublicUrl] = useState('')

  const dispatch = useWidgetAuthDispatch()

  useEffect(() => {
    dispatch({
      type: 'SET_TOKEN',
      token
    })
  }, [token, dispatch])

  const links = (() => {
    const baseUrl = window?.origin
    const pomoUrl = `${baseUrl}/${path}?token=${token}&role=blocs-user`
    const barChartUrl = `${baseUrl}/bar-chart/${path}?token=${token}&role=blocs-user`
    const barChartPublicUrl = `${baseUrl}/bar-chart/${path}?token=${publicToken}&role=friend`

    return {
      pomoUrl,
      barChartUrl,
      barChartPublicUrl
    }
  })()

  const copyPomodoro = () => {
    clipboard(links.pomoUrl)
    setUrl(links.pomoUrl)
  }

  const copyChart = () => {
    clipboard(links.barChartUrl)
    setUrl(links.barChartUrl)
    setPublicUrl(links.barChartPublicUrl)
  }

  const clear = () => {
    setUrl('')
    setPublicUrl('')
  }

  return (
    <Box width="100%">
      <Flex
        width="100%"
        height="100%"
        flexDirection={['column-reverse', , , , , 'column']}
        justifyContent="start"
      >
        <Flex
          width="100%"
          height="100%"
          alignItems="start"
          justifyContent={['center', , , , , 'start']}
          p={['sm', , , , 'md']}
          gap={['lg', 'lg', , , , , 'md']}
          flexWrap="wrap"
        >
          <WidgetLinkWrapper
            isLoading={isLoading}
            onClick={() => copyPomodoro()}
          >
            <Box position="relative">
              <DummyPomodoroInner />
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                css={{ cursor: 'not-allowed' }}
              />
            </Box>
          </WidgetLinkWrapper>
          <WidgetLinkWrapper isLoading={isLoading} onClick={() => copyChart()}>
            <Box position="relative">
              <AnalyticsBarChart
                units="hr"
                height={['350px', '300px', , '350px', '400px']}
                width={['300px', '350px', , '350px', , '500px']}
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                css={{ cursor: 'not-allowed' }}
              />
            </Box>
          </WidgetLinkWrapper>
        </Flex>
        <Flex width="100%">
          <PresetsSection token={token} />
        </Flex>
      </Flex>
      <ClipboardModal
        isOpen={!!url}
        url={url}
        shareableUrl={publicUrl}
        hideModal={() => clear()}
      />
    </Box>
  )
}

export default PomodoroDashboard
