import useFetch from "@/hooks/useFetch"
import { useWidgetAuthStore } from "@/hooks/useWidgetAuth"
import { POMODORO_PRESETS_PATH, WIDGET_LOGIN_PATH } from "@/utils/endpoints"
import { mutate } from "swr"

const usePresetApi = (presetData, presets, options = {}) => {
  const { onSuccess, onError } = options
  const { token } = useWidgetAuthStore() || {}

  const mutatePost = (res = {}) => {
    onSuccess?.()
    const { data: newPreset } = res

    mutate(POMODORO_PRESETS_PATH, {
      data: [...presets?.data, newPreset],
    })
  }

  const mutateDelete = (res = {}) => {
    onSuccess?.()
    const { data: deletedPreset } = res || {}
    deletedPreset &&
      mutate(POMODORO_PRESETS_PATH, {
        data: (() => {
          const presetIndex = presets?.data?.findIndex(
            (preset) => preset.id === deletedPreset.id
          )

          if (presetIndex > -1) {
            const newPresets = [
              ...presets.data.slice(0, presetIndex),
              ...presets.data.slice(presetIndex + 1),
            ]

            return newPresets
          }

          return presets?.data
        })(),
      })
  }

  const mutatePatch = (res = {}) => {
    onSuccess?.()
    const { data: updatedPreset } = res || {}
    updatedPreset &&
      mutate(POMODORO_PRESETS_PATH, {
        data: (() => {
          const presetIndex = presets?.data?.findIndex(
            (preset) => preset.id === updatedPreset.id
          )
          if (presetIndex > -1) {
            return [
              ...presets?.data?.slice(0, presetIndex),
              updatedPreset,
              ...presets?.data?.slice(presetIndex + 1),
            ]
          }
          return presets?.data
        })(),
      })
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    credentials: "same-origin",
  }

  const {
    fetcher: postPreset,
    loading: postPresetLoading,
    error: postPresetError,
    data: postPresetData,
  } = useFetch(POMODORO_PRESETS_PATH, {
    shouldFetch: false,
    body: presetData,
    shouldCache: false,
    method: "POST",
    headers,
    onSuccess: mutatePost,
    onError,
  })

  const {
    fetcher: patchPreset,
    loading: patchPresetLoading,
    error: patchPresetError,
    data: patchPresetData,
  } = useFetch(POMODORO_PRESETS_PATH, {
    shouldFetch: false,
    shouldCache: false,
    body: presetData,
    method: "PATCH",
    onSuccess: mutatePatch,
    onError,
    headers,
  })

  const {
    fetcher: deletePreset,
    loading: deletePresetLoading,
    error: deletePresetError,
    data: deletePresetData,
  } = useFetch(POMODORO_PRESETS_PATH, {
    shouldFetch: false,
    body: presetData,
    shouldCache: false,
    method: "DELETE",
    headers,
    onSuccess: mutateDelete,
    onError,
  })

  const loading = postPresetLoading || patchPresetLoading || deletePresetLoading
  const error = postPresetError || patchPresetError || deletePresetError
  const data = postPresetData || patchPresetData || deletePresetData

  return {
    postPreset,
    patchPreset,
    deletePreset,
    data,
    postPresetData,
    patchPresetData,
    deletePresetData,
    error,
    loading,
  }
}

export default usePresetApi
