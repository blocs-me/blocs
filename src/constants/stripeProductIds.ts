import { ProductTitles } from '../global-types/stripe'
export type ProductIds = {
  [P in ProductTitles]?: string
}

const production = {
  lifetimeAccess: 'prod_NAsBHn5G2gY7YR',
  waterTracker: 'prod_NAsIXOtxrA0jDS',
  habitTracker: 'prod_NAsGMR57WW9rFj',
  pomodoro: 'prod_NAsEG9NZW2CWGI'
} as ProductIds

const local = {
  lifetimeAccess: 'prod_NAvjZe37uqV8lm',
  waterTracker: 'prod_NAxFsXZbbI5Nug',
  pomodoro: 'prod_NAwqtwT4Ze0n3S',
  habitTracker: 'prod_NAwpIE4Kv2yyZR'
} as ProductIds

const stripeProductIds: Partial<ProductIds> =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'local' ? local : production

export default stripeProductIds
