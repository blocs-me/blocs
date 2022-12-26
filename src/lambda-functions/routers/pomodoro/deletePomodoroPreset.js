import faunaClient from '@/lambda/faunaClient'
import { validatePomodoroPreset } from '@/lambda/lib/restValidator/jsonValidator'
import { query as q } from 'faunadb'
import { queryGuard } from '@/lambda/helpers/faunadb/queryGuard'

const deletePomodoroPreset = async (req, res, rest) => {
  const { user, body: preset } = req

  const isValid = validatePomodoroPreset(preset)

  if (!isValid) {
    console.error(validatePomodoroPreset.errors)
    return res.status(400).json({
      error:
        'Request has incorrect format. Contact moniet@blocs.me if this error persists.'
    })
  }

  const { userRef } = rest

  try {
    const userPresets = await faunaClient.query(
      q.Call(q.Function('get_pomodoro_presets_by_user_ref'), userRef)
    )

    const canDelete = userPresets?.data?.length > 1

    if (!canDelete) {
      const error = new Error(
        'Cannot delete,you  need at least than one pomodoro preset'
      )

      throw error
    }

    const curPreset = await queryGuard(() =>
      faunaClient.query(
        q.Get(q.Match(q.Index('pomodoro_preset_by_id'), preset?.id))
      )
    )

    if (!curPreset) {
      const err = new Error('Preset not found')
      console.error(err)

      throw err
    }

    const deletedPreset = await faunaClient.query(
      q.Update(curPreset.ref, {
        data: {
          isDeleted: true
        }
      })
    )

    if (deletedPreset?.error) {
      const errorObject = new Error(deletedPreset.error)
      throw errorObject
    }

    res.status(200).json({ data: deletedPreset?.data })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
        error?.message ||
        'Uh oh ! We were not able to delete your pomodoro preset.'
    })
  }
}

export default deletePomodoroPreset
