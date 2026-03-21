import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import { useCreateToken } from '../useCreateToken'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import useWaterTrackerSettings from '@/widgets/WaterTracker/hooks/useWaterTrackerSettings'
import useBlocsUser from '@/hooks/useBlocsUser'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import { ComponentType } from 'react'

const withProviders = (Component: ComponentType) => {
  return () => {
    const { purchases, isUserOnFreeTrial } = useBlocsUser()
    const ownsWaterTracker =
      purchases?.waterTracker || purchases?.lifetimeAccess || purchases?.lifestylePro || isUserOnFreeTrial

    const { token, publicToken } = useCreateToken('WATER_TRACKER', ownsWaterTracker)

    return (
      <URLHashProvider hash={{ token, shareableToken: publicToken, role: 'blocs-user' }}>
        <Component />
      </URLHashProvider>
    )
  }
}

const WaterTrackerDashboard = () => {
  const { data: settings } = useWaterTrackerSettings()
  const { purchases, isUserOnFreeTrial } = useBlocsUser()
  const ownsWaterTracker =
    purchases?.waterTracker || purchases?.lifetimeAccess || purchases?.lifestylePro || isUserOnFreeTrial

  const { token, isLoading } = useCreateToken('WATER_TRACKER', ownsWaterTracker)

  const baseUrl = typeof window !== 'undefined' ? window.origin : ''
  const widgetUrl = token ? `${baseUrl}/water-tracker?token=${token}&role=blocs-user` : ''
  const analyticsUrl = token ? `${baseUrl}/bar-chart/water-tracker?token=${token}&role=blocs-user` : ''

  return (
    <Flex flexDirection="column" css={{ gap: '2rem' }}>
      <Flex flexDirection="column">
        <Flex alignItems="center" justifyContent="space-between" mb="sm">
          <Flex alignItems="center" css={{ gap: '12px' }}>
            <Text as="h2" fontSize="md" fontWeight={700} color="foreground" m={0}>
              Water Tracker
            </Text>
            <HowToEmbedButton />
          </Flex>
          <CopyLinkButton url={widgetUrl} disabled={isLoading} />
        </Flex>
        <Flex justifyContent="center">
          <DummyWaterTracker
            goal={settings?.data?.goal || 3}
            width="350px"
          />
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
          <DummyAnalyticsBarChart
            width={['100%', '500px', '600px']}
            height={['300px', '350px', '400px']}
            units="L"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default withProviders(WaterTrackerDashboard)
