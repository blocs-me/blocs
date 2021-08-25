import faunaClient from "@/lambda/faunaClient"
import { validatePomodoroPreset } from "@/lambda/lib/jsonValidator"
import { query as q } from "faunadb"

const deletePomodoroPreset = async (req, res) => {
  const { user, body: preset } = req

  // TO DO : Get User

  const isValid = validatePomodoroPreset(preset)

  if (!isValid) {
    console.error(validatePomodoroPreset.errors)
    return res.status(400).json({
      error:
        "Request has incorrect format. Contact moniet@blocs.me if this error persists.",
    })
  }

  try {
    // TO DO : validate whether preset belongs to user
    //  ^^^^^

    const userId = "303985067693179406"
    const userRef = q.Ref(q.Collection("users"), userId)
    const userPresets = await faunaClient.query(
      q.Call(q.Function("get_pomodoro_presets_by_user_ref"), userRef)
    )

    console.log("user presets", userPresets)

    const canDelete = userPresets?.data?.length > 1

    if (!canDelete) {
      const error = new Error(
        "Cannot delete,you  need at least than one pomodoro preset"
      )

      throw error
    }

    const deletedPreset = await faunaClient.query(
      q.Call(q.Function("delete_pomodoro_preset"), [preset?.id, userRef])
    )

    if (deletedPreset?.error) {
      const errorObject = new Error(deletedPreset.error)
      throw errorObject
    }

    res.status(200).json({ data: deletedPreset?.data })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Uh oh ! We were not able to delete your pomodoro preset.",
    })
  }
}

export default deletePomodoroPreset
;("")
