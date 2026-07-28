import { getProgressStep } from './progressStep'
import { literToOunce } from '@/utils/math/literToOunce'

describe('getProgressStep', () => {
  it('adds 1 liter per tap in liter mode', () => {
    expect(getProgressStep('liter')).toBe(1)
  })

  it('adds exactly 1 displayed ounce per tap in ounce mode', () => {
    const step = getProgressStep('ounce')
    // The bowl stores liters; the label shows literToOunce(progress). After N
    // taps the displayed value must tick up by exactly 1 ounce each time.
    for (let taps = 1; taps <= 10; taps++) {
      expect(literToOunce(step * taps)).toBe(taps)
    }
  })
})

export {}
