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
  const { sessionSettings, preferences } = usePomodoroStore()
  const dispatch = usePomodoroDispatch()
  const numCheckRegex = /\d./
  const sessionSettingsDefault = useMemo(() => {
    return sessionSettings
  }, [])
  const preferencesDefault = useMemo(() => {
    return preferences
  }, [])
  const { register, formState, handleSubmit, setValue, watch, getValues } =
    useForm({
      mode: "onChange",
      defaultValues: {
        sessionSettings: sessionSettingsDefault,
        preferences: preferencesDefault,
      },
    })

  useEffect(() => {
    return () => {
      handleSubmit(() => {
        localStorage.setItem(
          "pomodoroPreferences",
          JSON.stringify(getValues().preferences)
        )
        dispatch(setPomodoroSessionSettings(getValues().sessionSettings))
        dispatch(setPomodoroPreferences(getValues().preferences))
      })()
    }
  }, [])

  const handleLongBreakInput = (value) => {
    if (numCheckRegex.test(value)) {
      setValue("preferences", value)
    }
  }

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
          <Header>pomodoro</Header>
          <MenuItem>
            <Flex alignItems="center">
              <Box mr="xs">
                <Para css={{ display: "inline-block" }}>long break after</Para>
              </Box>
              <Flex>
                <TinyInput
                  type="number"
                  min="0"
                  max="20"
                  id="interval"
                  label="sessions"
                  {...register("preferences.startLongBreakAfter", {
                    pattern: numCheckRegex,
                  })}
                  onChange={handleLongBreakInput}
                />
              </Flex>
            </Flex>
          </MenuItem>
          <MenuItem>
            <Para css={{ display: "inline-block" }}>auto start session</Para>
            <Switch
              register={register("preferences.autoStartPomodoro")}
              ariaLabel={"auto start pomodoro"}
            />
          </MenuItem>
          <MenuItem>
            <Para>auto start break</Para>
            <Switch
              register={register("preferences.autoStartBreak")}
              ariaLabel={"auto start break"}
            />
          </MenuItem>
        </section>
        <section aria-label="Set Preferences">
          <Header>preferences</Header>

          <MenuItem>
            <Para>deep focus mode</Para>
            <Switch
              checked={formState.deepFocus}
              register={register("preferences.deepFocus")}
              ariaLabel={"deep focus"}
            />
          </MenuItem>
          <MenuItem>
            <Para>auto set theme</Para>
            <Switch
              checked={formState.autoSetTheme}
              register={register("preferences.autoSetTheme")}
              ariaLabel={"auto set theme"}
            />
          </MenuItem>
          <MenuItem>
            <Para>alarm volume</Para>
            <Slider
              width={100}
              setValue={setValue}
              defaultValue={preferencesDefault.alarmVolume}
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
