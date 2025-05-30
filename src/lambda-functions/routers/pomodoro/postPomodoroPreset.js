import supabase from '@/lambda/helpers/supabase'
import { mapTypeToPomodoroPreset } from '@/lambda/helpers/supabase/mapDbToType'
import { validatePomodoroPreset } from '@/lambda/lib/restValidator/jsonValidator'

const postPomodoroPreset = async (req, res, rest) => {
  const preset = req.body
  const isValid = validatePomodoroPreset(preset)

  const { userId } = rest

  if (!isValid) {
    console.error(validatePomodoroPreset.errors)
    res.status(400).json({
      error: 'Form data is invalid. Contact moniet@blocs.me if this persists.'
    })

    return null
  }

  try {
    const { data: preset_data } = await supabase
      .from('pomodoro_presets')
      .insert({
        long_break_interval: preset.longBreakInterval,
        short_break_interval: preset.shortBreakInterval,
        pomodoro_interval: preset.pomodoroInterval,
        label: preset.label,
        label_color: preset.labelColor,
        default_preset: preset.defaultPreset,
        user_id: userId
      })
      .select()
      .single()

    res.status(200).json({ data: preset_data })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: 'Something went wrong when trying to create your preset'
    })
  }
}

export default postPomodoroPreset
