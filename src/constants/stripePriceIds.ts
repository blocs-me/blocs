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
    lifestylePro: 'price_1QfLmMHyXnRceQpOB0P4UvLC',
    waterTracker: 'price_1OMb5VHyXnRceQpOTTGbZrx6',
    habitTracker: 'price_1OMb3cHyXnRceQpOicKpzH3B',
    pomodoro: 'price_1OMb2tHyXnRceQpOmevQ6u9x'
  },
  monthly: {
    lifestylePro: 'price_1QfLkcHyXnRceQpOb4fMdxCj',
    waterTracker: 'price_1OLAJNHyXnRceQpO9llRMycu',
    habitTracker: 'price_1OLAL6HyXnRceQpODDgZY1Zx',
    pomodoro: 'price_1OLALsHyXnRceQpO2Bi2KpUq'
  }
}

const stripePriceIds =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'local' ? local : prod

export default stripePriceIds
