import { ProductTitles } from '../global-types/stripe'
export type ProductIds = {
  [P in ProductTitles]?: string
}

const production = {
  lifestylePro: 'prod_NAsBHn5G2gY7YR',
  lifetimeAccess: 'prod_NIfHOoMMB6Nc86',
  waterTracker: 'prod_NAsIXOtxrA0jDS',
  habitTracker: 'prod_NAsGMR57WW9rFj',
  pomodoro: 'prod_NAsEG9NZW2CWGI'
} as ProductIds

const local = {
  lifestylePro: 'prod_P6TblgdGT0w0Jc',
  lifetimeAccess: 'prod_NAvjZe37uqV8lm',
  waterTracker: 'prod_P6Te1GFTjvKM0A',
  pomodoro: 'prod_P6TceTHzQiRF8e',
  habitTracker: 'prod_P6Tf1HsdBkXNRV'
} as ProductIds

const stripeProductIds: Partial<ProductIds> =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'local' ? local : production

export default stripeProductIds
