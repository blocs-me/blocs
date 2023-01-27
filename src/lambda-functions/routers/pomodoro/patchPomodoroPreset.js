import faunaClient from '@/lambda/faunaClient'
import { validatePomodoroPreset } from '@/lambda/lib/restValidator/jsonValidator'
import { query as q } from 'faunadb'

const patchPomodoroPreset = async (req, res, rest) => {
  const { body: preset } = req
  const { userRef } = rest

  const isValid = validatePomodoroPreset(preset)
  if (!isValid) {
    res.status(400).json({
      error: validatePomodoroPreset.errors
    })

    return null
  }

  try {
    const updatedPreset = await faunaClient.query(
      q.Call(q.Function('update_pomodoro_preset'), [
        preset?.id,
        userRef,
        { data: preset }
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
      .json({ error: err?.message || 'Uh oh !, something went wrong' })
  }
}

export default patchPomodoroPreset
