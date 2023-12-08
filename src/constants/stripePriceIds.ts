import type { ProductTitles } from '@/gtypes/stripe'

type PriceIds = {
  yearly: {
    [P in ProductTitles]?: string
  }
  monthly: {
    [P in ProductTitles]?: string
  }
}

const local: PriceIds = {
  yearly: {
    lifestylePro: 'price_1OIGmDHyXnRceQpOsEpkUZH3',
    waterTracker: 'price_1OIGh6HyXnRceQpOF27tQbtb',
    habitTracker: 'price_1OIGhoHyXnRceQpOb6fh4AHk',
    pomodoro: 'price_1OIGfSHyXnRceQpOhdyIfrEL'
  },
  monthly: {
    lifestylePro: 'price_1OIGeVHyXnRceQpOdUUaWd4a',
    waterTracker: 'price_1OIGh6HyXnRceQpO84gfblUT',
    habitTracker: 'price_1OIGhoHyXnRceQpOdYBXmAqg',
    pomodoro: 'price_1OIGfSHyXnRceQpOqxt6LKQA'
  }
}

const prod: PriceIds = {
  yearly: {
    lifestylePro: 'price_1OLARVHyXnRceQpOwQpQjjwS',
    waterTracker: 'price_1OLAJfHyXnRceQpOK1gisVYa',
    habitTracker: 'price_1OLALIHyXnRceQpOoEV6tc1j',
    pomodoro: 'price_1OLAM2HyXnRceQpOaSlvURg5'
  },
  monthly: {
    lifestylePro: 'price_1OLARHHyXnRceQpOvNcZVRnf',
    waterTracker: 'price_1OLAJNHyXnRceQpO9llRMycu',
    habitTracker: 'price_1OLAL6HyXnRceQpODDgZY1Zx',
    pomodoro: 'price_1OLALsHyXnRceQpO2Bi2KpUq'
  }
}

const stripePriceIds =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'local' ? local : prod

export default stripePriceIds
