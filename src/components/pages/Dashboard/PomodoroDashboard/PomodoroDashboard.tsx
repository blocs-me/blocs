import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import { DummyPomodoroInner } from '@/widgets/Pomodoro/DummyPomodoro'
import PomodoroAnalyticsBarChart from '@/widgets/PomodoroAnalyticsBarChart'
import { useCreateToken } from '../useCreateToken'
import { useEffect, useMemo, useState } from 'react'
import { usePomodoroDispatch } from '@/widgets/Pomodoro/usePomodoroStore'
import { setCurrentPomodoroPreset } from '@/widgets/Pomodoro/pomodoroActions'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import { AnalyticsBarChartProvider } from '@/widgets/AnalyticsBarChart/useAnalyticsBarChart'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import Modal from '@/design-system/Modal'
import TextInput from '@/design-system/TextInput'
import NumberInput from '@/design-system/NumberInput'
const ColorInput = require('@/design-system/ColorInput').default as any
import { useForm } from 'react-hook-form'
import { usePomodoroStore } from '@/widgets/Pomodoro/usePomodoroStore'
import usePresetApi from '@/widgets/Pomodoro/PomodoroPresets/usePresetApi'
import useNotifications from '@/design-system/Notifications/useNotifications'
import msToMins from '@/utils/msToMins'
import minsAsms from '@/utils/minsAsms'
import useSWR from 'swr'
import fetchWithToken from 'src/services/fetchWithToken'
import { POMODORO_PRESETS_PATH } from '@/utils/endpoints'
import useBlocsUser from '@/hooks/useBlocsUser'

const PresetEditModal = ({ isOpen, onClose, token }) => {
  const { currentPreset = {} } = usePomodoroStore()
  const pomodoroDispatch = usePomodoroDispatch()
  const notifs = useNotifications()

  const { data: presets } = useSWR(
    token ? [POMODORO_PRESETS_PATH, token] : null,
    fetchWithToken,
    { revalidateOnFocus: false }
  )

  const latestPreset = presets?.data?.[0] || currentPreset

  const defaultValues = useMemo(() => ({
    label: latestPreset?.label || 'work',
    labelColor: latestPreset?.labelColor || '#e00079',
    pomodoroInterval: msToMins(latestPreset?.pomodoroInterval) || 25,
    shortBreakInterval: msToMins(latestPreset?.shortBreakInterval) || 5,
    longBreakInterval: msToMins(latestPreset?.longBreakInterval) || 15
  }), [latestPreset])

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    if (isOpen) reset(defaultValues)
  }, [isOpen, defaultValues, reset])

  const formData = watch()
  const [saving, setSaving] = useState(false)

  const requestBody = {
    ...formData,
    id: latestPreset?.id || null,
    pomodoroInterval: minsAsms(formData?.pomodoroInterval),
    shortBreakInterval: minsAsms(formData?.shortBreakInterval),
    longBreakInterval: minsAsms(formData?.longBreakInterval)
  }

  const { patchPreset, postPreset } = usePresetApi(requestBody, presets?.data, {
    onError: () => notifs.createError('Could not save preset')
  })

  const onSubmit = handleSubmit(async () => {
    setSaving(true)
    try {
      if (latestPreset?.id) {
        await patchPreset()
      } else {
        await postPreset()
      }
      pomodoroDispatch(setCurrentPomodoroPreset(requestBody))
      notifs.createSuccess('Preset saved')
      onClose()
    } catch {
      notifs.createError('Could not save preset')
    }
    setSaving(false)
  })

  return (
    <Modal visible={isOpen} hideModal={onClose}>
      <Box p="xs">
        <Text fontSize="md" fontWeight={700} color="foreground" m={0} mb="md">
          Customize Pomodoro
        </Text>
        <Flex flexDirection="column" css={{ gap: '0.75rem' }}>
          <TextInput
            label="Label"
            placeholder="e.g. work, study"
            ariaLabel="Preset label"
            {...register('label', { required: true })}
          />
          {/* @ts-ignore — ColorInput is untyped JS forwardRef */}
          <ColorInput
            label="Color"
            htmlFor="labelColor"
            ariaLabel="Preset color"
            defaultValue={formData?.labelColor}
            {...register('labelColor', { required: true })}
          />
          <NumberInput
            label="Pomodoro (min)"
            min={1}
            max={120}
            error={errors.pomodoroInterval ? 'Must be 1-120 minutes' : ''}
            {...register('pomodoroInterval', {
              required: true,
              valueAsNumber: true,
              min: 1,
              max: 120
            })}
          />
          <NumberInput
            label="Short break (min)"
            min={0}
            max={120}
            {...register('shortBreakInterval', {
              required: true,
              valueAsNumber: true
            })}
          />
          <NumberInput
            label="Long break (min)"
            min={0}
            max={120}
            {...register('longBreakInterval', {
              required: true,
              valueAsNumber: true
            })}
          />
          <Button
            variant="success"
            width="100%"
            py="xs"
            borderRadius="md"
            onClick={onSubmit}
            loading={saving}
            disabled={saving}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </Modal>
  )
}

const PomodoroDashboard = () => {
  const { purchases, isUserOnFreeTrial } = useBlocsUser()
  const ownsPomodoro =
    purchases.lifetimeAccess || purchases.pomodoro || purchases.lifestylePro || isUserOnFreeTrial
  const { token, isLoading } = useCreateToken('POMODORO', ownsPomodoro)
  const [showPresetModal, setShowPresetModal] = useState(false)

  const baseUrl = typeof window !== 'undefined' ? window.origin : ''
  const widgetUrl = token ? `${baseUrl}/pomodoro?token=${token}&role=blocs-user` : ''
  const analyticsUrl = token ? `${baseUrl}/bar-chart/pomodoro?token=${token}&role=blocs-user` : ''

  return (
    <URLHashProvider hash={{ token, role: 'blocs-user' }}>
      <Flex flexDirection="column" css={{ gap: '2rem' }}>
        <Flex flexDirection="column">
          <Flex alignItems="center" justifyContent="space-between" mb="sm">
            <Flex alignItems="center" css={{ gap: '12px' }}>
              <Text as="h2" fontSize="md" fontWeight={700} color="foreground" m={0}>
                Pomodoro Timer
              </Text>
              <HowToEmbedButton />
            </Flex>
            <Flex css={{ gap: '8px' }} alignItems="center">
              <Button
                px="sm"
                py="xs"
                borderRadius="md"
                fontSize="xs"
                fontWeight={600}
                border="solid 1px"
                borderColor="foreground"
                color="foreground"
                onClick={() => setTimeout(() => setShowPresetModal(true), 0)}
              >
                Customize
              </Button>
              <CopyLinkButton url={widgetUrl} disabled={isLoading} />
            </Flex>
          </Flex>
          <Flex justifyContent="center">
            <DummyPomodoroInner hideGear />
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
                <PomodoroAnalyticsBarChart hideMenu />
              </AnalyticsBarChartProvider>
            </Box>
          </Flex>
        </Flex>

        <PresetEditModal
          isOpen={showPresetModal}
          onClose={() => setShowPresetModal(false)}
          token={token}
        />
      </Flex>
    </URLHashProvider>
  )
}

export default PomodoroDashboard
