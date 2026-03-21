import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import Icon from '@/helpers/Icon'
import { DummyPomodoroInner } from '@/widgets/Pomodoro/DummyPomodoro'
import PomodoroAnalyticsBarChart from '@/widgets/PomodoroAnalyticsBarChart'
import { useCreateToken } from '../useCreateToken'
import { useEffect, useMemo, useState } from 'react'
import { usePomodoroDispatch, usePomodoroStore } from '@/widgets/Pomodoro/usePomodoroStore'
import { setCurrentPomodoroPreset } from '@/widgets/Pomodoro/pomodoroActions'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import { AnalyticsBarChartProvider, useAnalyticsBarChartDispatch } from '@/widgets/AnalyticsBarChart/useAnalyticsBarChart'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import Modal from '@/design-system/Modal'
import usePresetApi from '@/widgets/Pomodoro/PomodoroPresets/usePresetApi'
import useNotifications from '@/design-system/Notifications/useNotifications'
import msToMins from '@/utils/msToMins'
import minsAsms from '@/utils/minsAsms'
import useSWR from 'swr'
import fetchWithToken from 'src/services/fetchWithToken'
import { POMODORO_PRESETS_PATH } from '@/utils/endpoints'
import useBlocsUser from '@/hooks/useBlocsUser'
import Stopwatch from 'src/icons/stopwatch'
import { Cup } from 'src/icons/cup'

const DurationRow = ({ icon, label, minutes, onChange }) => (
  <Flex alignItems="center" py="xs" px="sm" width="100%" css={{ gap: '10px' }}>
    <Icon fill="foreground" size="18px" as="span" display="flex" css={{ flexShrink: 0 }}>
      {icon}
    </Icon>
    <Text as="span" fontSize="xs" fontWeight="500" color="foreground" m={0} css={{ flex: 1 }}>
      {label}
    </Text>
    <Flex alignItems="center" css={{ gap: '4px', flexShrink: 0 }}>
      <Box
        as="input"
        type="number"
        min={1}
        max={120}
        value={minutes}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(Math.max(1, Math.min(120, Number(e.target.value))))
        }
        color="foreground"
        css={{
          width: '48px',
          textAlign: 'center',
          border: '1px solid',
          borderColor: 'inherit',
          borderRadius: '4px',
          padding: '4px',
          fontSize: '12px',
          background: 'transparent',
          outline: 'none'
        }}
      />
      <Text as="span" fontSize="xxs" color="primary.accent-4" m={0}>min</Text>
    </Flex>
  </Flex>
)

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

  const [pomo, setPomo] = useState(msToMins(latestPreset?.pomodoroInterval) || 25)
  const [shortBreak, setShortBreak] = useState(msToMins(latestPreset?.shortBreakInterval) || 5)
  const [longBreak, setLongBreak] = useState(msToMins(latestPreset?.longBreakInterval) || 15)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen && latestPreset) {
      setPomo(msToMins(latestPreset.pomodoroInterval) || 25)
      setShortBreak(msToMins(latestPreset.shortBreakInterval) || 5)
      setLongBreak(msToMins(latestPreset.longBreakInterval) || 15)
    }
  }, [isOpen]) // eslint-disable-line

  const requestBody = useMemo(() => ({
    label: latestPreset?.label || 'work',
    labelColor: latestPreset?.labelColor || '#e00079',
    id: latestPreset?.id || null,
    pomodoroInterval: minsAsms(pomo),
    shortBreakInterval: minsAsms(shortBreak),
    longBreakInterval: minsAsms(longBreak)
  }), [pomo, shortBreak, longBreak, latestPreset])

  const { patchPreset, postPreset } = usePresetApi(requestBody, presets?.data, {
    onError: () => notifs.createError('Could not save preset')
  })

  const handleSave = async () => {
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
  }

  return (
    <Modal visible={isOpen} hideModal={onClose}>
      <Box p="xs">
        <Text fontSize="md" fontWeight={700} color="foreground" m={0} mb="sm">
          Customize Durations
        </Text>
        <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
          Durations
        </Text>
        <DurationRow icon={<Stopwatch />} label={latestPreset?.label || 'Pomodoro'} minutes={pomo} onChange={setPomo} />
        <DurationRow icon={<Cup />} label="Short break" minutes={shortBreak} onChange={setShortBreak} />
        <DurationRow icon={<Cup />} label="Long break" minutes={longBreak} onChange={setLongBreak} />
        <Box height="1px" bg="primary.accent-2" my="xs" mx="sm" />
        <Box px="sm">
          <Button
            variant="success"
            width="100%"
            py="xs"
            borderRadius="md"
            onClick={handleSave}
            loading={saving}
            disabled={saving}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

// Forces weekly view on mount so x-axis labels always show in dashboard context
const WeeklyViewEnforcer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAnalyticsBarChartDispatch()
  useEffect(() => {
    dispatch({ type: 'SET_TIME_FORMAT', payload: 'weekly' })
  }, []) // eslint-disable-line
  return <>{children}</>
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
            <Box width={['100%', '500px', '600px']} height="500px">
              <AnalyticsBarChartProvider>
                <WeeklyViewEnforcer>
                  <PomodoroAnalyticsBarChart hideMenu />
                </WeeklyViewEnforcer>
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
