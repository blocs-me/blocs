import supabase from '@/lambda/helpers/supabase'
import { supabaseQueryGuard } from '@/lambda/helpers/supabase/queryGuard'
import { validatePomodoroPreset } from '@/lambda/lib/restValidator/jsonValidator'

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

  const { userId } = rest

  try {
    const { data: userPresets } = await supabase
      .from('pomodoro_presets')
      .select('*')
      .eq('user_id', userId)

    const canDelete = userPresets?.length > 1

    if (!canDelete) {
      const error = new Error(
        'Cannot delete, you need at least one pomodoro preset'
      )

      throw error
    }

    const curPreset = await supabaseQueryGuard(() =>
      supabase
        .from('pomodoro_presets')
        .select('*')
        .eq('id', preset?.id)
        .single()
    )

    if (!curPreset) {
      const err = new Error('Preset not found')
      console.error(err)

      throw err
    }

    const { data: deletedPreset, error: deletedPresetError } = await supabase
      .from('pomodoro_presets')
      .delete()
      .eq('id', preset?.id)
      .select()
      .single()

    if (deletedPresetError) {
      const errorObject = new Error(deletedPresetError.message)
      throw errorObject
    }

    res.status(200).json({ data: deletedPreset })
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
