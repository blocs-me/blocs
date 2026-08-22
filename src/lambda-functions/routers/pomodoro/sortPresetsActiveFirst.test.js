import sortPresetsActiveFirst from './sortPresetsActiveFirst'

describe('sortPresetsActiveFirst', () => {
  it('moves the active preset (defaultPreset: true) to the front', () => {
    const presets = [
      { id: 'a', defaultPreset: false },
      { id: 'b', defaultPreset: true },
      { id: 'c', defaultPreset: false }
    ]

    expect(sortPresetsActiveFirst(presets).map((p) => p.id)).toEqual([
      'b',
      'a',
      'c'
    ])
  })

  it('preserves the original order when no preset is active', () => {
    const presets = [
      { id: 'a', defaultPreset: false },
      { id: 'b', defaultPreset: false }
    ]

    expect(sortPresetsActiveFirst(presets).map((p) => p.id)).toEqual([
      'a',
      'b'
    ])
  })

  it('does not mutate the input array', () => {
    const presets = [
      { id: 'a', defaultPreset: false },
      { id: 'b', defaultPreset: true }
    ]

    sortPresetsActiveFirst(presets)

    expect(presets.map((p) => p.id)).toEqual(['a', 'b'])
  })

  it('handles an empty or undefined list', () => {
    expect(sortPresetsActiveFirst([])).toEqual([])
    expect(sortPresetsActiveFirst()).toEqual([])
  })
})
