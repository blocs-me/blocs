import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import Card from "@/design-system/Card"
import TextInput from "@/design-system/TextInput"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Stack from "@/helpers/Stack"
import ScrollProvider from "@/design-system/ScrollProvider"
import ColorInput from "@/design-system/ColorInput"
import FadeProvider from "@/design-system/FadeProvider"
import Button from "@/design-system/Button"
import Text from "@/design-system/Text"
import NumberInput from "@/design-system/NumberInput"
import { useClickOutside } from "@/hooks/useClickOutside"
import slideIn from "@/keyframes/slideIn"
import Loader from "@/design-system/Loader"
import useNotifications from "@/design-system/Notifications/useNotifications"
import { usePreviousValue } from "beautiful-react-hooks"
import usePresetApi from "./usePresetApi"
import { usePomodoroStore } from "../usePomodoroStore"
import minsAsms from "@/utils/minsAsms"
import msToMins from "@/utils/msToMins"

const LabelForm = ({ hideForm = () => {}, formAction }) => {
  const { currentPreset = {} } = usePomodoroStore()

  const defaultValues = (() => {
    if (formAction === "EDIT")
      return {
        ...currentPreset,
        ...{
          shortBreakInterval: msToMins(currentPreset?.shortBreakInterval) || {},
        },
        ...{
          longBreakInterval: msToMins(currentPreset?.longBreakInterval) || {},
        },
      }

    return {
      labelColor: "#e00079",
    }
  })()

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues,
  })
  const container = useRef(null)
  const formData = watch()

  const { loading, error, postPreset, patchPreset } = usePresetApi(formData)

  useClickOutside({
    element: container,
    onClickOutside: hideForm,
  })

  const handleApiReq = (data) => {
    if (formAction === "CREATE") postPreset(data)
    if (formAction === "EDIT") patchPreset(data)
  }

  const handleClick = (e) => {
    e.preventDefault()
    handleSubmit(handleApiReq)()
  }

  return (
    <Box
      position="sticky"
      top="0%"
      left="0%"
      zIndex="modal"
      p="sm"
      width="100%"
      height="100%"
      css={{ animation: `${slideIn} 1s ease forwards` }}
    >
      <Card
        position="relative"
        width="100%"
        height="100%"
        px="xs"
        py="sm"
        ref={container}
      >
        <ScrollProvider height="100%" width="100%">
          <Box p="sm">
            <Stack
              display="flex"
              flexDirection="column"
              mt="calc(1rem + 8px)"
              alignItems="center"
              role="form"
            >
              <TextInput
                placeholder="e.g : 'workout'"
                label="label"
                ariaLabel="label name for pomodoro session"
                {...register("label", {
                  required: true,
                })}
              />
              <ColorInput
                defaultValue={formData?.labelColor}
                label="color"
                htmlFor="labelColor"
                ariaLabel="set color to be associated with pomodoro label"
                {...register("labelColor", {
                  required: true,
                })}
              />

              <NumberInput
                type="number"
                label="long break"
                min={0}
                max={120}
                error={
                  errors.longBreakInterval
                    ? "long break must be greater than short break or be '0'"
                    : ""
                }
                {...register("longBreakInterval", {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) =>
                    value > formData?.shortBreakInterval || value === 0,
                })}
                placeholder="e.g : 15 mins"
              />

              <NumberInput
                type="number"
                label="short break"
                min={0}
                max={120}
                placeholder="e.g : 5 mins "
                {...register("shortBreakInterval", {
                  valueAsNumber: true,
                  required: true,
                  setValueAs: (v) => minsAsms(v),
                })}
              />

              {/* <div /> */}

              {!loading && (
                <Button
                  onClick={(e) => handleClick(e)}
                  width="100%"
                  borderRadius="md"
                  bg="primary.accent-4"
                  py="xs"
                  height="50px"
                  color="primary.accent-1"
                  fontSize="sm"
                  fontWeight="300"
                  letterSpacing="sm"
                >
                  {formAction === "CREATE" && "create"}
                  {formAction === "EDIT" && "edit"}
                </Button>
              )}
              {loading && <Loader width="30px" height="30px" />}
              <Box />
            </Stack>
          </Box>
        </ScrollProvider>
      </Card>
    </Box>
  )
}

export default LabelForm
