import faunaClient from "@/lambda/faunaClient"
import { validatePomodoroPreset } from "@/lambda/lib/jsonValidator"
import { query as q } from "faunadb"

const postPomodoroPreset = async (req, res, rest) => {
  const preset = req.body
  const isValid = validatePomodoroPreset(preset)

  const { userId } = rest

  if (!isValid) {
    console.log(validatePomodoroPreset.errors)
    res.status(400).json({
      error: "Form data is invalid. Contact moniet@blocs.me if this persists.",
    })

    return null
  }

  try {
    const faundaRes = await faunaClient.query(
      q.Create(q.Collection("pomodoro_presets"), {
        data: {
          ...preset,
          userId,
          id: q.NewId(),
        },
      })
    )
    res.status(200).json({ data: faundaRes?.data })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: "Something went wrong when trying to create your preset",
    })
  }
}

export default postPomodoroPreset
