import { literToOunce } from '@/utils/math/literToOunce'

// The daily goal is stored in the user's chosen display unit. The bowl supports
// a 1–10 liter range, so ounce bounds are just that range converted to ounces.
const MIN_LITERS = 1
const MAX_LITERS = 10

export type WaterUnit = 'liter' | 'ounce'

export type GoalBounds = {
  min: number
  max: number
  label: string
}

export const getGoalBounds = (units: WaterUnit): GoalBounds => {
  if (units === 'ounce') {
    return {
      min: literToOunce(MIN_LITERS),
      max: literToOunce(MAX_LITERS),
      label: 'Goal (ounces)'
    }
  }

  return {
    min: MIN_LITERS,
    max: MAX_LITERS,
    label: 'Goal (liters)'
  }
}
