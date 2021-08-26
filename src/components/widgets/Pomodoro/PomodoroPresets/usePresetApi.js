import useFetch from "@/hooks/useFetch"
import { useWidgetAuthStore } from "@/hooks/useWidgetAuth"
import { POMODORO_PRESETS_PATH, WIDGET_LOGIN_PATH } from "@/utils/endpoints"
import { mutate } from "swr"

const usePresetApi = (presetData, presets, options = {}) => {
  const { onSuccess, onError } = options
  const { token } = useWidgetAuthStore() || {}

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
    onError,
  })

  const loading = postPresetLoading || patchPresetLoading || deletePresetLoading
  const error = postPresetError || patchPresetError || deletePresetError
  const data = postPresetData || patchPresetData || deletePresetData

  const createPreset = async () => {
    await mutate(
      [POMODORO_PRESETS_PATH, token],
      (data) => ({ ...data, data: [...data?.data, presetData] }),
      false
    )
    await postPreset()
    await mutate([POMODORO_PRESETS_PATH, token])
  }

  const updatePreset = async () => {
    await mutate(
      [POMODORO_PRESETS_PATH, token],
      (presets) => {
        const presetIndex = presets?.data?.findIndex(
          (preset) => preset.id === presetData.id
        )
        if (presetIndex > -1) {
          return {
            ...presets,
            data: [
              ...presets?.data?.slice(0, presetIndex),
              presetData,
              ...presets?.data?.slice(presetIndex + 1),
            ],
          }
        }

        return presets
      },
      false
    )

    await patchPreset()
    await mutate([POMODORO_PRESETS_PATH, token])
  }

  const deleteAPreset = async () => {
    await mutate(
      [POMODORO_PRESETS_PATH, token],
      (presets) => {
        const presetIndex = presets?.data?.findIndex(
          (preset) => preset.id === presetData.id
        )

        if (presetIndex > -1) {
          const newPresets = [
            ...presets.data.slice(0, presetIndex),
            ...presets.data.slice(presetIndex + 1),
          ]

          return {
            ...presets,
            data: newPresets,
          }
        }

        return presets?.data
      },
      false
    )

    await deletePreset()
    await mutate(POMODORO_PRESETS_PATH)
  }

  return {
    postPreset: createPreset,
    patchPreset: updatePreset,
    deletePreset: deleteAPreset,
    data,
    postPresetData,
    patchPresetData,
    deletePresetData,
    error,
    loading,
  }
}

export default usePresetApi
