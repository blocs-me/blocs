import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Button from '@/design-system/Button'
import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import AnalyticsBarChart from '@/widgets/AnalyticsBarChart'
import useWaterTrackerAnalyticsRange from '@/widgets/WaterTrackerAnalytics/useWaterTrackerAnalyticsRange'
import useWaterTrackerAuth from '@/widgets/WaterTrackerAnalytics/useWaterTrackerAuth'
import useAnalyticsBarChartDefaultValue from '@/widgets/AnalyticsBarChart/useAnalyticsBarChartDefaultValue'
import { AnalyticsBarChartProvider } from '@/widgets/AnalyticsBarChart/useAnalyticsBarChart'
import { useCreateToken } from '../useCreateToken'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import useWaterTrackerSettings from '@/widgets/WaterTracker/hooks/useWaterTrackerSettings'
import usePatchWaterTrackerSettings from '@/widgets/WaterTracker/hooks/usePatchSettings'
import useBlocsUser from '@/hooks/useBlocsUser'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import { ComponentType, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import NumberInput from '@/design-system/NumberInput'

const renderWaterTooltip = (d: any) => (
  <Box color="foreground" css={{ fontWeight: 200 }}>
    <div>{d.value} {d.value === 1 ? 'Liter' : 'Liters'}</div>
  </Box>
)

const WaterTrackerAnalytics = () => {
  const { data: analytics } = useWaterTrackerAnalyticsRange()
  const { auth } = useWaterTrackerAuth()
  const fallback = useAnalyticsBarChartDefaultValue()

  return (
    <AnalyticsBarChart
      menuPage="/bar-chart/water-tracker/menu"
      mainPage="/bar-chart/water-tracker"
      minY={5}
      data={analytics?.data?.length ? analytics.data : fallback}
      units="L"
      renderTooltip={renderWaterTooltip}
      disableControls={!auth?.isPremium}
      showPremiumOverlay={auth && !auth?.isPremium}
      hideMenu
    />
  )
}

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
  const { patchGoal, loadingGoal } = usePatchWaterTrackerSettings()
  const { purchases, isUserOnFreeTrial } = useBlocsUser()
  const ownsWaterTracker =
    purchases?.waterTracker || purchases?.lifetimeAccess || purchases?.lifestylePro || isUserOnFreeTrial

  const { token, isLoading } = useCreateToken('WATER_TRACKER', ownsWaterTracker)

  const baseUrl = typeof window !== 'undefined' ? window.origin : ''
  const widgetUrl = token ? `${baseUrl}/water-tracker?token=${token}&role=blocs-user` : ''
  const analyticsUrl = token ? `${baseUrl}/bar-chart/water-tracker?token=${token}&role=blocs-user` : ''

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ reValidateMode: 'onChange' })

  useEffect(() => {
    reset({ goal: settings?.data?.goal })
  }, [settings, reset])

  const onSubmit = handleSubmit((formData) => {
    patchGoal(formData.goal)
  })

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
        <Flex justifyContent="center" alignItems="start" css={{ gap: '2rem' }} flexWrap="wrap">
          <DummyWaterTracker
            goal={settings?.data?.goal || 3}
            width="350px"
          />
          <Flex
            as="form"
            flexDirection="column"
            onSubmit={onSubmit}
            p="md"
            borderRadius="md"
            border="solid 1px"
            borderColor="primary.accent-2"
            width="min(100%, 280px)"
          >
            <Text fontSize="sm" fontWeight={700} color="foreground" m={0} mb="sm">
              Daily Goal
            </Text>
            <NumberInput
              label="Goal (litres)"
              ariaLabel="Set Daily Goal"
              {...register('goal', {
                required: true,
                valueAsNumber: true
              })}
              min={1}
              max={10}
              error={errors.goal ? 'Goal must be between 1 & 10' : false}
            />
            <Button
              variant="success"
              mt="sm"
              loading={loadingGoal}
              disabled={loadingGoal}
              borderRadius="md"
              py="xs"
              fontSize="xs"
            >
              Save Goal
            </Button>
          </Flex>
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
          <Box width={['100%', '500px', '600px']} height="500px">
            <AnalyticsBarChartProvider>
              <WaterTrackerAnalytics />
            </AnalyticsBarChartProvider>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default withProviders(WaterTrackerDashboard)
