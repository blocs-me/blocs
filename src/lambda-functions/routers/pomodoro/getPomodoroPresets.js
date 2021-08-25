import faunaClient from "@/lambda/faunaClient"
import { Call, query as q, Select } from "faunadb"

const defaultPresetData = {
  longBreakInterval: 600000,
  shortBreakInterval: 300000,
  pomodoroInterval: 1500000,
  label: "work",
  labelColor: "#00d1e0",
  defaultPreset: true,
}

const getPomodoroPresets = async (req, res, rest) => {
  const { userRef, userId } = rest

  try {
    const userPresets = await faunaClient.query(
      q.Call(q.Function("get_pomodoro_presets_by_user_ref"), userRef)
    )

    if (userPresets?.data?.length === 0) {
      const preset = await faunaClient.query(
        q.Create(q.Collection("pomodoro_presets"), {
          data: {
            ...defaultPresetData,
            id: q.NewId(),
            userId,
          },
        })
      )
      userPresets?.data?.push({
        ...(preset?.data || {}),
        userId: null,
      })
    }

    const remappedPresets = userPresets?.data.map((preset) => {
      delete preset.userId
      return preset
    })

    res.status(200).json({
      data: remappedPresets || [],
    })
  } catch (err) {
    res.status(502).json({ error: "something went wrong" })
    throw err
  }
}

export default getPomodoroPresets
