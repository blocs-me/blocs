import useFetch from "@/hooks/useFetch"
import { POMODORO_PRESETS_PATH } from "@/utils/endpoints"
import { mutate } from "swr"
import { setCurrentPomodoroPreset } from "../pomodoroActions"
import { usePomodoroDispatch } from "../usePomodoroStore"

const usePresetApi = (presetData) => {
  const dispatch = usePomodoroDispatch()

  const mutatePost = (res = {}) => {
    const { data: newPreset } = res?.data || {}
    newPreset &&
      mutate(POMODORO_PRESETS_PATH, (presets) => [...presets, newPreset])
  }

  const mutateDelete = (res = {}) => {
    const { data: deletedPreset } = res?.data || {}
    deletedPreset &&
      mutate(POMODORO_PRESETS_PATH, (presets) => {
        const presetIndex = presets.findIndex(
          (preset) => preset.id === deletedPreset.id
        )

        if (presetIndex > -1) {
          const newPresets = [
            ...presets.slice(0, presetIndex),
            ...presets.slice(presetIndex + 1),
          ]

          dispatch(setCurrentPomodoroPreset(newPresets[0]))
          return newPresets
        }

        return presets
      })
  }

  const mutatePatch = (res = {}) => {
    const { data: updatedPreset } = res?.data || {}
    updatedPreset &&
      mutate(POMODORO_PRESETS_PATH, (presets) => {
        const presetIndex = presets.findIndex(
          (preset) => preset.id === updatedPreset.id
        )

        if (presetIndex > -1) {
          return [
            ...presets.slice(0, presetIndex),
            updatedPreset,
            ...presets.slice(presetIndex + 1),
          ]
        }

        return presets
      })
  }

  const {
    fetcher: postPreset,
    loading: postPresetLoading,
    error: postPresetError,
    data: postPresetData,
  } = useFetch(POMODORO_PRESETS_PATH, {
    shouldFetch: false,
    body: presetData,
    method: "POST",
    headers: {
      credentials: "same-origin",
    },
    onSuccess: mutatePost,
  })

  const {
    fetcher: patchPreset,
    loading: patchPresetLoading,
    error: patchPresetError,
    data: patchPresetData,
  } = useFetch(POMODORO_PRESETS_PATH, {
    shouldFetch: false,
    body: presetData,
    method: "PATCH",
    onSuccess: mutatePatch,
    headers: {
      credentials: "same-origin",
    },
  })

  const {
    fetcher: deletePreset,
    loading: deletePresetLoading,
    error: deletePresetError,
    data: deletePresetData,
  } = useFetch(POMODORO_PRESETS_PATH, {
    shouldFetch: false,
    body: { id: presetData.id },
    method: "DELETE",
    headers: {
      credentials: "same-origin",
    },
    onSuccess: mutateDelete,
  })

  const loading = postPresetLoading || patchPresetLoading || deletePresetLoading
  const error = postPresetError || patchPresetError || deletePresetError

  return {
    postPreset,
    patchPreset,
    deletePreset,
    postPresetData,
    patchPresetData,
    deletePresetData,
    error,
    loading,
  }
}

export default usePresetApi
