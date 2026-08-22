import supabase from '@/lambda/helpers/supabase'
import {
  mapPomodoroPresetToType,
  mapTypeToPomodoroPreset
} from '@/lambda/helpers/supabase/mapDbToType'
import { validatePomodoroPreset } from '@/lambda/lib/restValidator/jsonValidator'

const patchPomodoroPreset = async (req, res, rest) => {
  const { body: preset } = req
  const { userId } = rest

  const isValid = validatePomodoroPreset(preset)
  if (!isValid) {
    res.status(400).json({
      error: validatePomodoroPreset.errors
    })

    return null
  }

  try {
    // The embed loads the active preset (default_preset === true) first, so
    // marking one preset active must clear the flag on the user's others to
    // keep exactly one active. This is how a preset selection is persisted
    // across the Notion iframe boundary (localStorage is partitioned there).
    const activating = preset.defaultPreset === true
    if (activating) {
      await supabase
        .from('pomodoro_presets')
        .update({ default_preset: false })
        .eq('user_id', userId)
        .neq('id', preset?.id)
    }

    const updatePayload = {
      long_break_interval: preset.longBreakInterval,
      short_break_interval: preset.shortBreakInterval,
      pomodoro_interval: preset.pomodoroInterval,
      label: preset.label,
      label_color: preset.labelColor
    }
    if (activating) updatePayload.default_preset = true

    const { data: updatedPreset, error: updatedPresetError } = await supabase
      .from('pomodoro_presets')
      .update(updatePayload)
      .eq('id', preset?.id)
      .eq('user_id', userId)
      .select()
      .single()

    if (updatedPresetError) {
      const errorObject = new Error(updatedPresetError.message)
      throw errorObject
    }
    const remappedPreset = mapPomodoroPresetToType(updatedPreset)
    res.status(200).json({ data: remappedPreset })
  } catch (err) {
    res
      .status(500)
      .json({ error: err?.message || 'Uh oh !, something went wrong' })
  }
}

export default patchPomodoroPreset
