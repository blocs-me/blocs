import Flex from '@/helpers/Flex'
import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import WidgetLinkWrapper from '../WidgetLinkWrapper'
import { useCreateToken } from '../useCreateToken'
import useUser from '@/hooks/useUser'
import { useState, ComponentType, useEffect } from 'react'
import ClipboardModal from '../ClipboardModal'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import useClipboard from '@/hooks/useClipboard'
import TextInput from '@/design-system/TextInput'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import NumberInput from '@/design-system/NumberInput'
import Button from '@/design-system/Button'
import Text from '@/design-system/Text'
import { useForm } from 'react-hook-form'
import useUrlHash from '@/hooks/useUrlHash'
import useWaterTrackerSettings from '../../../widgets/WaterTracker/hooks/useWaterTrackerSettings'
import usePatchWaterTrackerSettings from '@/widgets/WaterTracker/hooks/usePatchSettings'
import Box from '@/helpers/Box'

const withProviders = (Component: ComponentType) => {
  return () => {
    const { token, publicToken, data } = useCreateToken('WATER_TRACKER', true) // TODO: add optional fetch param based on premium status

    return (
      <URLHashProvider
        hash={{ token, shareableToken: publicToken, role: 'blocs-user' }}
      >
        <Component />
      </URLHashProvider>
    )
  }
}

const WaterTrackerDashboard = () => {
  const { user } = useUser()
  const { token, shareableToken: publicToken } = useUrlHash() as {
    token?: string
    shareableToken: string
  }

  const [openClipboardModal, setOpenClipboardModal] = useState(false)
  const clipboard = useClipboard()
  const [url, setUrl] = useState('')
  const [publicUrl, setPublicUrl] = useState('')

  const { data: settings } = useWaterTrackerSettings()
  const { patchGoal, loadingGoal } = usePatchWaterTrackerSettings()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    reValidateMode: 'onChange'
  })

  useEffect(() => {
    reset({ goal: settings?.data?.goal })
  }, [settings, reset])

  const onSubmit = handleSubmit((formData) => {
    patchGoal(formData.goal)
  })

  const links = (() => {
    const baseUrl = global?.window?.origin
    const waterTrackerUrl = `${baseUrl}/water-tracker?token=${token}&role=blocs-user`
    const waterTrackerPublicUrl = `${baseUrl}/water-tracker?token=${publicToken}&role=friend`
    const barChartUrl = `${baseUrl}/bar-chart/water-tracker?token=${token}&role=blocs-user`
    const barChartPublicUrl = `${baseUrl}/bar-chart/water-tracker?token=${publicToken}&role=friend`

    return {
      waterTrackerUrl,
      waterTrackerPublicUrl,
      barChartUrl,
      barChartPublicUrl
    }
  })()

  return (
    <>
      <Flex width="100%" height="100%" flexDirection="column">
        <Flex p="md">
          <WidgetLinkWrapper
            isLoading={!token}
            onClick={() => {
              setUrl(links.waterTrackerUrl)
              setPublicUrl(links.waterTrackerPublicUrl)
              clipboard(links.waterTrackerUrl)
              setOpenClipboardModal(true)
            }}
          >
            <Flex>
              <DummyWaterTracker goal={settings?.data?.goal || 2} />
            </Flex>
          </WidgetLinkWrapper>
          <Flex mr="md" />
          <WidgetLinkWrapper
            isLoading={!token}
            onClick={() => {
              setUrl(links.barChartUrl)
              setPublicUrl(links.barChartUrl)
              clipboard(links.barChartUrl)
              setOpenClipboardModal(true)
            }}
          >
            <DummyAnalyticsBarChart units="L" />
          </WidgetLinkWrapper>
        </Flex>

        <Box
          width="100%"
          p="md"
          borderTop="solid 1px"
          borderColor="primary.accent-2"
        >
          <Flex
            maxWidth="400px"
            as="form"
            flexDirection="column"
            onSubmit={onSubmit}
            boxShadow="md"
            p="sm"
            borderRadius="md"
            border="solid 2px"
            borderColor="primary.accent-2"
          >
            <Text variant="h4" color="foreground">
              Set Your Daily Goal Here
            </Text>
            <NumberInput
              label="Goal (in Liters)"
              ariaLabel="Set Daily Goal"
              {...register('goal', {
                required: true,
                valueAsNumber: true
              })}
              min={1}
              max={10}
              error={errors.goal ? 'Goal must be between {min} & {max}' : false}
            />
            <Button
              variant="success"
              mt="sm"
              loading={loadingGoal}
              disabled={loadingGoal}
            >
              Save Habit
            </Button>
          </Flex>
        </Box>
        <ClipboardModal
          isOpen={openClipboardModal}
          url={url}
          shareableUrl={publicUrl}
          hideModal={() => setOpenClipboardModal(false)}
        />
      </Flex>
    </>
  )
}

export default withProviders(WaterTrackerDashboard)
