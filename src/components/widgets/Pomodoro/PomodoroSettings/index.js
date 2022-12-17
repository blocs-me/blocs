/** @jsxImportSource @emotion/react */
import { useRef, useEffect, useMemo } from 'react'
import { useTheme } from '@emotion/react'
import { interpolate } from 'popmotion'
import { useForm } from 'react-hook-form'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import MenuHeader from '../Typography/MenuHeader'
import Gear from '../../../../icons/gear.svg'
import Text from '@/design-system/Text'
import TinyInput from '@/design-system/TinyInput'
import { usePomodoroDispatch, usePomodoroStore } from '../usePomodoroStore'
import ScrollProvider from '@/design-system/ScrollProvider'
import FadeProvider from '@/design-system/FadeProvider'
import Switch from '@/design-system/Switch'
import Slider from '@/design-system/Slider'
import {
  setPomodoroSessionSettings,
  setPomodoroPreferences
} from '../pomodoroActions'
import useNotifications from '@/design-system/Notifications/useNotifications'
import usePreviousValue from '@/hooks/usePreviousValue'

const Header = ({ children }) => (
  <Box
    bg="bg.light"
    borderBottom="solid 1px"
    borderBottomColor="primary.accent-1"
  >
    <Text
      color="primary.accent-4"
      fontWeight="500"
      py="xs"
      px="sm"
      fontSize="sm"
      m={0}
    >
      {children}
    </Text>
  </Box>
)

const MenuItem = ({ children, lastItem }) => (
  <Flex
    borderBottom={lastItem ? 'none' : 'solid 1px'}
    borderBottomColor="primary.accent-1"
    py="xs"
    px="sm"
    justifyContent="space-between"
    alignItems="center"
    color="primary.accent-3"
  >
    {children}
  </Flex>
)

const Para = ({ children }) => (
  <Text m={0} fontWeight={300} fontSize="xs" color="foreground">
    {children}
  </Text>
)

const PomodoroSettings = () => {
  const { sessionSettings, preferences } = usePomodoroStore()
  const notifs = useNotifications()
  const dispatch = usePomodoroDispatch()
  const alarmAudio = useMemo(() => new Audio('/sound-effects/chime.mp3'), [])
  const numCheckRegex = /\d./
  const preferencesDefault = useMemo(() => {
    return preferences
  }, [])
  const { register, handleSubmit, setValue, watch, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      preferences: preferencesDefault
    }
  })

  const handleLongBreakInput = (value) => {
    if (numCheckRegex.test(value)) {
      setValue('preferences', value)
    }
  }

  const handleAudioLoop = () => {
    const currentTime = alarmAudio.currentTime

    if (currentTime > 2500) {
      alarmAudio.pause()
      alarmAudio.play()
    }

    requestAnimationFrame(handleAudioLoop)
  }

  const playAudio = () => {
    if (alarmAudio?.readyState) {
      alarmAudio.currentTime = 0
      alarmAudio.loop = true
      alarmAudio.pause()
      alarmAudio.play()
    }
  }

  const stopAudio = () => {
    if (!alarmAudio?.ended) {
      alarmAudio.loop = false
    }
  }

  const setAlarmVolumeIRL = (value) => {
    if (value >= 0) {
      const volume = value * 0.01
      alarmAudio.volume = volume
    }
  }

  useEffect(() => {
    alarmAudio.volume = preferencesDefault.alarmVolume / 100

    return () => {
      handleSubmit(() => {
        localStorage.setItem(
          'pomodoroPreferences',
          JSON.stringify(getValues().preferences)
        )
        dispatch(setPomodoroPreferences(getValues().preferences))
      })()
    }
  }, [
    alarmAudio,
    dispatch,
    getValues,
    handleSubmit,
    preferencesDefault.alarmVolume
  ])

  const deepFocus = watch('preferences.deepFocus')
  const autoSetTheme = watch('preferences.autoSetTheme')
  const autoStartPomodoro = watch('preferences.autoStartPomodoro')
  const autoStartBreak = watch('preferences.autoStartBreak')
  const deepFocusPrev = usePreviousValue(deepFocus)
  const autoSetThemePrev = usePreviousValue(autoSetTheme)
  const autoStartPomodoroPrev = usePreviousValue(autoStartPomodoro)
  const autoStartBreakPrev = usePreviousValue(autoStartBreak)

  useEffect(() => {
    if (deepFocus && !deepFocusPrev)
      notifs.createInfo('deep focus mode hides all UI except for the clock')
  }, [deepFocus, deepFocusPrev, notifs])

  useEffect(() => {
    if (autoSetTheme && !autoSetThemePrev)
      notifs.createInfo('sets theme based on your device')
  }, [autoSetTheme, autoSetThemePrev, notifs])

  useEffect(() => {
    if (autoStartPomodoro && !autoStartPomodoroPrev)
      notifs.createInfo('auto starts pomodoro after a break ends')
  }, [autoStartPomodoro, autoStartPomodoroPrev, notifs])

  useEffect(() => {
    if (autoStartBreak && !autoStartBreakPrev)
      notifs.createInfo('auto starts break after a pomodoro session ends')
  }, [autoStartBreak, autoStartBreakPrev, notifs])

  return (
    <Flex
      flexDirection="column"
      maxHeight="100%"
      width="100%"
      position="relative"
      as="form"
    >
      <MenuHeader icon={<Gear />} title="Settings" />
      <ScrollProvider>
        <section aria-label="Set Pomodoro Time">
          <Header>pomodoro</Header>
          <MenuItem>
            <Flex alignItems="center">
              <Box mr="xs">
                <Para css={{ display: 'inline-block' }}>long break after</Para>
              </Box>
              <Flex>
                <TinyInput
                  width="45px"
                  type="number"
                  min="0"
                  max="20"
                  id="interval"
                  label="pomodoros"
                  {...register('preferences.startLongBreakAfter', {
                    pattern: numCheckRegex
                  })}
                  onChange={handleLongBreakInput}
                />
              </Flex>
            </Flex>
          </MenuItem>
          <MenuItem>
            <Para css={{ display: 'inline-block' }}>auto start pomodoro</Para>
            <Switch
              register={register('preferences.autoStartPomodoro')}
              ariaLabel={'auto start pomodoro'}
            />
          </MenuItem>
          <MenuItem>
            <Para>auto start break</Para>
            <Switch
              register={register('preferences.autoStartBreak')}
              ariaLabel={'auto start break'}
            />
          </MenuItem>
        </section>
        <section aria-label="Set Preferences">
          <Header>preferences</Header>

          <MenuItem>
            <Para>deep focus mode</Para>
            <Switch
              register={register('preferences.deepFocus')}
              ariaLabel="deep focus"
            />
          </MenuItem>
          {/* <MenuItem>
            <Para>auto set theme</Para>
            <Switch
              register={register("preferences.autoSetTheme")}
              ariaLabel="auto set theme"
            />
          </MenuItem> */}
          <MenuItem>
            <Para>alarm volume</Para>
            <Slider
              onMouseDown={playAudio}
              onMouseUp={stopAudio}
              onCancel={stopAudio}
              onMouseLeave={stopAudio}
              onChange={setAlarmVolumeIRL}
              width={100}
              setValue={setValue}
              defaultValue={preferencesDefault.alarmVolume}
              name="preferences.alarmVolume"
            />
          </MenuItem>
        </section>
        <Box height="50px" />
        {/* <FadeProvider position="bottom" /> */}
      </ScrollProvider>
    </Flex>
  )
}

export default PomodoroSettings
