export type ProductIds = {
  lifetimeAccess: string
  waterTracker: string
  habitTracker: string
  pomodoro: string
}

const production = {} as ProductIds
const local = {
  lifetimeAccess: 'prod_NAvjZe37uqV8lm'
}

const stripeProductIds: Partial<ProductIds> =
  process.env.VERCEL_ENV === 'production' ? production : local

export default stripeProductIds
