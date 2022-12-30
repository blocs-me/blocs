import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '@/design-system/TextInput'
import Box from '@/helpers/Box'
import Stack from '@/helpers/Stack'
import ScrollProvider from '@/design-system/ScrollProvider'
import ColorInput from '@/design-system/ColorInput'
import Button from '@/design-system/Button'
import NumberInput from '@/design-system/NumberInput'
import Loader from '@/design-system/Loader'
import { usePomodoroStore } from '@/widgets/Pomodoro/usePomodoroStore'
import minsAsms from '@/utils/minsAsms'
import msToMins from '@/utils/msToMins'
import Modal from '@/design-system/Modal'
import useNotifications from '@/design-system/Notifications/useNotifications'
import FadeProvider from '@/design-system/FadeProvider'
import usePresetApi from '@/widgets/Pomodoro/PomodoroPresets/usePresetApi'
import PresetFormSuccessState from '@/widgets/Pomodoro/PomodoroPresets/PresetFormSuccessState'
import PresetFormLoadingState from '@/widgets/Pomodoro/PomodoroPresets/PresetFormLoadingState'

const PresetForm = ({ hideForm = () => {}, formAction, presets, open }) => {
  console.log('open', open)
  const { currentPreset = {} } = usePomodoroStore()

  const defaultValues = useMemo(() => {
    if (formAction === 'EDIT') {
      return {
        ...currentPreset,
        pomodoroInterval: msToMins(currentPreset?.pomodoroInterval) || null,
        shortBreakInterval: msToMins(currentPreset?.shortBreakInterval) || null,
        longBreakInterval: msToMins(currentPreset?.longBreakInterval) || null
      }
    }

    return {
      labelColor: '#e00079'
    }
  }, [formAction, currentPreset])

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm({
    defaultValues
  })

  const formData = watch()

  const createForm = formAction !== 'CREATE'

  const requestBody = {
    ...formData,
    id: createForm ? currentPreset?.id : null,
    pomodoroInterval: minsAsms(formData?.pomodoroInterval),
    shortBreakInterval: minsAsms(formData?.shortBreakInterval),
    longBreakInterval: minsAsms(formData?.longBreakInterval)
  }

  const notifs = useNotifications()

  const handleError = (res) => {
    const message = 'Uh oh ! something went wrong'
    notifs.createError(message)
  }

  const [loading, setLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)

  const { postPreset, patchPreset } = usePresetApi(requestBody, presets, {
    onSuccess: reset,
    onError: handleError
  })

  const handleApiReq = (data) => {
    setLoading(true)

    if (formAction === 'CREATE')
      postPreset(data)
        .then((d) => setApiResponse(d))
        .catch(handleError)
        .finally(() => setLoading(false))

    if (formAction === 'EDIT')
      patchPreset(data)
        .then((d) => setApiResponse(d))
        .catch(handleError)
        .finally(() => setLoading(false))
  }

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit(handleApiReq)()
  }

  const framerKey = `preset-form-modal`

  useEffect(() => {
    setLoading(false)
    setApiResponse(null)
  }, [])

  return (
    <Box p="xs" position="relative">
      {apiResponse && (
        <PresetFormSuccessState
          formAction={formAction}
          preset={apiResponse}
          hideForm={hideForm}
        />
      )}
      <ScrollProvider
        width="100%"
        maxHeight={apiResponse ? 0 : '600px'}
        position="relative"
        borderRadius="md"
      >
        <Box p="sm">
          {!apiResponse && (
            <Stack
              display="flex"
              flexDirection="column"
              mt="calc(1rem + 8px)"
              alignItems="center"
              role="form"
              width="100%"
            >
              {loading && <PresetFormLoadingState />}
              {!loading && (
                <>
                  <TextInput
                    // css={{ height: '30px', width: '100%' }}
                    htmlFor='"label'
                    placeholder="e.g : 'chores'"
                    label="label"
                    ariaLabel="label name for pomodoro session"
                    {...register('label', {
                      required: true
                    })}
                  />

                  <ColorInput
                    defaultValue={formData?.labelColor}
                    label="color"
                    htmlFor="labelColor"
                    ariaLabel="set color to be associated with pomodoro label"
                    {...register('labelColor', {
                      required: true
                    })}
                  />
                  <NumberInput
                    label="pomodoro"
                    min={5}
                    max={120}
                    error={
                      errors.pomodoroInterval
                        ? 'pomodoro must be >= 5 minutes and <= 120'
                        : ''
                    }
                    {...register('pomodoroInterval', {
                      required: true,
                      valueAsNumber: true,
                      min: 5,
                      max: 120,
                      setValueAs: (v) => minsAsms(v)
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
                        : ''
                    }
                    {...register('longBreakInterval', {
                      required: true,
                      valueAsNumber: true,
                      setValueAs: (v) => minsAsms(v),
                      validate: (value) =>
                        value > formData?.shortBreakInterval || value === 0
                    })}
                    placeholder="e.g : 15 mins"
                  />
                  <NumberInput
                    label="short break"
                    min={0}
                    max={120}
                    placeholder="e.g : 5 mins "
                    {...register('shortBreakInterval', {
                      valueAsNumber: true,
                      required: true,
                      setValueAs: (v) => minsAsms(v)
                    })}
                  />
                </>
              )}
              {!loading && (
                <Button
                  onClick={(e) => handleClick(e)}
                  width="100%"
                  borderRadius="md"
                  bg="success.medium"
                  py="xs"
                  height="50px"
                  color="neutral.white"
                  fontSize="sm"
                  fontWeight="300"
                  letterSpacing="sm"
                >
                  {formAction === 'CREATE' && 'Create'}
                  {formAction === 'EDIT' && 'Edit'}
                </Button>
              )}
              {loading && <Loader width="30px" height="30px" />}
              <Box />
            </Stack>
          )}
        </Box>
      </ScrollProvider>
      {!apiResponse && <FadeProvider position="bottom" />}
    </Box>
  )
}

export default PresetForm
