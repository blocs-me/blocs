import supabase from '@/lambda/helpers/supabase'
import { IPomodoroPreset } from '@/gtypes/pomodoro-preset'
import { mapPomodoroPresetToType } from '@/lambda/helpers/supabase/mapDbToType'

const defaultPresetData = {
  longBreakInterval: 600000,
  shortBreakInterval: 300000,
  pomodoroInterval: 1500000,
  label: 'work',
  labelColor: '#00d1e0',
  defaultPreset: true
}

const getPomodoroPresets = async (req, res, rest) => {
  const { userId } = rest
  const { filter } = req.query

  try {
    const { data: userPresets } = await supabase
      .from('pomodoro_presets')
      .select('*')
      .eq('user_id', userId)

    const presets = userPresets?.map((preset) =>
      mapPomodoroPresetToType(preset)
    )

    if (userPresets?.length === 0) {
      const newPreset = await supabase
        .from('pomodoro_presets')
        .insert({
          long_break_interval: defaultPresetData.longBreakInterval,
          short_break_interval: defaultPresetData.shortBreakInterval,
          pomodoro_interval: defaultPresetData.pomodoroInterval,
          label: defaultPresetData.label,
          label_color: defaultPresetData.labelColor,
          default_preset: defaultPresetData.defaultPreset,
          user_id: userId
        })
        .select()
        .single()

      presets?.push({
        ...(mapPomodoroPresetToType(newPreset) || {}),
        userId: null
      })
    }

    const remappedPresets = presets.map((preset) => {
      delete preset.userId
      return preset
    })

    const data =
      filter === 'none'
        ? remappedPresets
        : remappedPresets.filter((preset) => !preset?.isDeleted)

    res.status(200).json({
      data: data || []
    })
  } catch (err) {
    res.status(502).json({ error: 'something went wrong' })
    throw err
  }
}

export default getPomodoroPresets
