import { getGoalBounds } from './goalBounds'

describe('getGoalBounds', () => {
  it('returns the 1–10 liter range with a liter label for liters', () => {
    expect(getGoalBounds('liter')).toEqual({
      min: 1,
      max: 10,
      label: 'Goal (liters)'
    })
  })

  it('returns the equivalent range converted to ounces with an ounce label', () => {
    // 1 liter ≈ 34 oz, 10 liters ≈ 338 oz
    expect(getGoalBounds('ounce')).toEqual({
      min: 34,
      max: 338,
      label: 'Goal (ounces)'
    })
  })
})

export {}
