import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Button from '@/design-system/Button'
import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import { useCreateToken } from '../useCreateToken'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import useWaterTrackerSettings from '@/widgets/WaterTracker/hooks/useWaterTrackerSettings'
import usePatchWaterTrackerSettings from '@/widgets/WaterTracker/hooks/usePatchSettings'
import useBlocsUser from '@/hooks/useBlocsUser'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import useClipboard from '@/hooks/useClipboard'
import { ComponentType, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import NumberInput from '@/design-system/NumberInput'

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
