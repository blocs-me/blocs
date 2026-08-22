// Order presets so the user's active preset (default_preset === true) leads the
// list. The embedded widget always loads presets.data[0], so the active preset
// must come first for a Notion embed to show the user's chosen times rather than
// an arbitrarily-ordered default. Array.prototype.sort is stable, so the relative
// order of the remaining presets is preserved.
const sortPresetsActiveFirst = (presets = []) =>
  [...presets].sort((a, b) => {
    const aActive = a?.defaultPreset ? 1 : 0
    const bActive = b?.defaultPreset ? 1 : 0
    return bActive - aActive
  })

export default sortPresetsActiveFirst
