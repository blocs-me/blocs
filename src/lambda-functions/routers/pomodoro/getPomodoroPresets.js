import faunaClient from "@/lambda/faunaClient"
import { Call, query as q, Select } from "faunadb"

const getPomodoroPresets = async (req, res) => {
  // const { blocsUser } = req.body

  try {
    const userPresets = await faunaClient.query(
      q.Map(
        q.Call(
          q.Function("get_pomodoro_presets_by_user_ref"),
          q.Ref(q.Collection("users"), "303985067693179406")
        ),

        q.Lambda("preset", {
          id: q.Select(["id"], q.Var("preset")),
          longBreakInterval: q.Select(["longBreakInterval"], q.Var("preset")),
          shortBreakInterval: q.Select(["shortBreakInterval"], q.Var("preset")),
          pomodoroInterval: q.Select(["pomodoroInterval"], q.Var("preset")),
          label: q.Select(["label"], q.Var("preset")),
          labelColor: q.Select(["labelColor"], q.Var("preset")),
        })
      )
    )

    res.status(200).json({
      data: userPresets?.data || [],
    })
  } catch (err) {
    res.status(502).json({ error: "something went wrong" })
    throw err
  }
}

export default getPomodoroPresets
