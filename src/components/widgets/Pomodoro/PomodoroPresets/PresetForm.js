import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import TextInput from "@/design-system/TextInput"
import Box from "@/helpers/Box"
import Stack from "@/helpers/Stack"
import ScrollProvider from "@/design-system/ScrollProvider"
import ColorInput from "@/design-system/ColorInput"
import Button from "@/design-system/Button"
import NumberInput from "@/design-system/NumberInput"
import Loader from "@/design-system/Loader"
import usePresetApi from "./usePresetApi"
import { usePomodoroStore } from "../usePomodoroStore"
import minsAsms from "@/utils/minsAsms"
import msToMins from "@/utils/msToMins"
import WidgetModal from "@/widgets/WidgetModal.js"
import PresetFormLoadingState from "./PresetFormLoadingState"
import PresetFormSuccessState from "./PresetFormSuccessState"
import { usersList } from "@notionhq/client/build/src/api-endpoints"
import useNotifications from "@/design-system/Notifications/useNotifications"

const PresetForm = ({
  hideForm = () => {
    console.log("empty function")
  },
  formAction,
  presets,
  open,
}) => {
  const { currentPreset = {} } = usePomodoroStore()

  const defaultValues = useMemo(() => {
    if (formAction === "EDIT") {
      return {
        ...currentPreset,
        pomodoroInterval: msToMins(currentPreset?.pomodoroInterval) || null,
        shortBreakInterval: msToMins(currentPreset?.shortBreakInterval) || null,
        longBreakInterval: msToMins(currentPreset?.longBreakInterval) || null,
      }
    }

    return {
      labelColor: "#e00079",
    }
  }, [formAction, currentPreset])

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues,
  })

  const formData = watch()

  const createForm = formAction !== "CREATE"

  const requestBody = {
    ...formData,
    id: createForm ? currentPreset?.id : null,
    pomodoroInterval: minsAsms(formData?.pomodoroInterval),
    shortBreakInterval: minsAsms(formData?.shortBreakInterval),
    longBreakInterval: minsAsms(formData?.longBreakInterval),
  }

  const notifs = useNotifications()

  const handleError = (res) => {
    const message = res?.error
    if (message) notifs.createError(message)
  }

  const {
    loading,
    error,
    postPreset,
    patchPreset,
    data: apiResponse,
  } = usePresetApi(requestBody, presets, {
    onSuccess: reset,
    onError: handleError,
  })

  const handleApiReq = (data) => {
    if (formAction === "CREATE") postPreset(data)
    if (formAction === "EDIT") patchPreset(data)
  }

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit(handleApiReq)()
  }

  const framerKey = `preset-form-modal`

  return (
    <WidgetModal open={open} framerKey={framerKey} hideModal={hideForm}>
      {apiResponse && (
        <PresetFormSuccessState
          formAction={formAction}
          preset={apiResponse}
          hideForm={hideForm}
        />
      )}
      <ScrollProvider height="100%" width="100%">
        <Box p="sm">
          {!apiResponse && (
            <Stack
              display="flex"
              flexDirection="column"
              mt="calc(1rem + 8px)"
              alignItems="center"
              role="form"
            >
              {loading && <PresetFormLoadingState />}
              {!loading && (
                <>
                  <TextInput
                    placeholder="e.g : 'chores'"
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
                    label="pomodoro"
                    min={5}
                    max={120}
                    error={
                      errors.pomodoroInterval
                        ? "pomodoro must be >= 5 minutes"
                        : ""
                    }
                    {...register("pomodoroInterval", {
                      required: true,
                      valueAsNumber: true,
                      min: 5,
                      setValueAs: (v) => minsAsms(v),
                    })}
                    placeholder="e.g : 25 mins"
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
                      setValueAs: (v) => minsAsms(v),
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
                </>
              )}
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
          )}
        </Box>
      </ScrollProvider>
    </WidgetModal>
  )
}

export default PresetForm
