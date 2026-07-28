import { ounceToLiter } from '@/utils/math'
import { WaterUnit } from './goalBounds'

// Progress is tracked internally in liters and only converted to ounces for
// display. In liter mode each tap adds 1 liter; in ounce mode each tap should
// add exactly 1 displayed ounce, which is its (fractional) liter equivalent.
export const getProgressStep = (units: WaterUnit): number =>
  units === 'ounce' ? ounceToLiter(1, false) : 1
