import faunaClient from "@/lambda/faunaClient"
import { validatePomodoroPreset } from "@/lambda/lib/jsonValidator"
import { query as q } from "faunadb"

const patchPomodoroPreset = async (req, res) => {
  const { user, body: preset } = req

  const isValid = validatePomodoroPreset(preset)
  if (!isValid) {
    res.status(400).json({
      error: validatePomodoroPreset.errors,
    })

    return null
  }

  try {
    const userId = "303985067693179406"
    const userRef = q.Ref(q.Collection("users"), userId)

    const updatedPreset = await faunaClient.query(
      q.Call(q.Function("update_pomodoro_preset"), [
        preset?.id,
        userRef,
        { data: preset },
      ])
    )

    if (updatedPreset?.error) {
      const errorObject = new Error(updatedPreset.error)
      throw errorObject
    }

    res.status(200).json({ data: updatedPreset?.data })
  } catch (err) {
    res
      .status(500)
      .json({ error: err?.message || "Uh oh !, something went wrong" })
  }
}

export default patchPomodoroPreset
