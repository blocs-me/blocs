export type ProductIds = {
  lifetimeAccess: string
  waterTracker: string
  habitTracker: string
  pomodoro: string
}

const production = {} as ProductIds //TODO: update product ids
const local = {
  lifetimeAccess: 'prod_NAvjZe37uqV8lm',
  waterTracker: 'prod_NAxFsXZbbI5Nug',
  pomodoro: 'prod_NAwqtwT4Ze0n3S',
  habitTracker: 'prod_NAwpIE4Kv2yyZR'
}

const stripeProductIds: Partial<ProductIds> =
  process.env.VERCEL_ENV === 'production' ? production : local

export default stripeProductIds
