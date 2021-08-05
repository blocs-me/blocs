/** @jsxImportSource @emotion/react */
import { useRef, useEffect, useMemo } from "react"
import { useTheme } from "@emotion/react"
import { interpolate } from "popmotion"
import { useForm } from "react-hook-form"
import Flex from "@/helpers/Flex"
import Box from "@/helpers/Box"
import MenuHeader from "../Typography/MenuHeader"
import Clock from "../../../../icons/clock.svg"
import Text from "@/design-system/Text"
import TinyInput from "@/design-system/TinyInput"
import { usePomodoroDispatch, usePomodoroStore } from "../usePomodoroStore"
import ScrollProvider from "@/design-system/ScrollProvider"
import FadeProvider from "@/design-system/FadeProvider"
import Switch from "@/design-system/Switch"
import Slider from "@/design-system/Slider"
import {
  setPomodoroSessionSettings,
  setPomodoroPreferences,
} from "../pomodoroActions"

const Header = ({ children }) => (
  <Box
    bg="bg.light"
    borderBottom="solid 1px"
    borderBottomColor="primary.accent-1"
  >
    <Text fontWeight="500" py="xs" px="sm" fontSize="sm" m={0}>
      {children}
    </Text>
  </Box>
)

const MenuItem = ({ children, lastItem }) => (
  <Flex
    borderBottom={lastItem ? "none" : "solid 1px"}
    borderBottomColor="primary.accent-1"
    py="xs"
    px="sm"
    justifyContent="space-between"
    alignItems="center"
  >
    {children}
  </Flex>
)

const Para = ({ children }) => (
  <Text m={0} fontWeight={300} fontSize="xs">
    {children}
  </Text>
)

const PomodoroSettings = () => {
  const { sessionSettings } = usePomodoroStore()
  const dispatch = usePomodoroDispatch()
  const numCheckRegex = /\d./
  const sessionSettingsDefault = useMemo(() => sessionSettings, [])
  const { register, formState, handleSubmit, setValue, watch, getValues } =
    useForm({
      mode: "onChange",
      defaultValues: {
        sessionSettings: sessionSettingsDefault,
      },
    })

  useEffect(() => {
    return () => {
      dispatch(setPomodoroSessionSettings(getValues().sessionSettings))
      dispatch(setPomodoroPreferences(getValues().preferences))
    }
  }, [])

  return (
    <Flex
      flexDirection="column"
      maxHeight="100%"
      width="100%"
      position="relative"
      as="form"
    >
      <MenuHeader icon={<Clock />} title="settings" />
      <ScrollProvider>
        <section aria-label="Set Pomodoro Time">
          <Header>Set time</Header>
          <MenuItem>
            <Para>pomodoro</Para>
            <TinyInput
              type="text"
              id="interval"
              label="mins"
              name="sessionSettings.interval"
              pattern={numCheckRegex}
              register={register}
            />
          </MenuItem>
          <MenuItem>
            <Para>long break</Para>
            <TinyInput
              type="text"
              id="longBreak"
              name="sessionSettings.longBreakInterval"
              label="mins"
              pattern={numCheckRegex}
              register={register}
            />
          </MenuItem>
          <MenuItem>
            <Para>short break</Para>
            <TinyInput
              type="text"
              id="shortBreak"
              name="sessionSettings.shortBreakInterval"
              label="mins"
              register={register}
              pattern={numCheckRegex}
            />
          </MenuItem>
        </section>
        <section aria-label="Set Preferences">
          <Header>Preferences</Header>
          <MenuItem>
            <Para>auto start pomodoro</Para>
            <Switch
              checked={formState.autoStartPomodoro}
              register={register("preferences.autoStartPomodoro")}
              ariaLabel={"auto start pomodoro"}
            />
          </MenuItem>
          <MenuItem>
            <Para>auto start break</Para>
            <Switch
              checked={formState.autoStartPomodoro}
              register={register("preferences.autoStartBreak")}
              ariaLabel={"auto start break"}
            />
          </MenuItem>
          <MenuItem>
            <Para>deep focus mode</Para>
            <Switch
              checked={formState.autoStartPomodoro}
              register={register("preferences.deepFocus")}
              ariaLabel={"deep focus"}
            />
          </MenuItem>
          <MenuItem>
            <Para>alarm volume</Para>
            <Slider
              width={100}
              setValue={setValue}
              name="preferences.alarmVolume"
            />
          </MenuItem>
        </section>
        <Box height="50px" />
        <FadeProvider position="bottom" />
      </ScrollProvider>
    </Flex>
  )
}

export default PomodoroSettings
