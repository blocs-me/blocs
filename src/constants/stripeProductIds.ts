const production = {}
const local = {
  lifetimeAccess: 'prod_NAvjZe37uqV8lm'
}

const stripeProductIds =
  process.env.VERCEL_ENV === 'production' ? production : local

export default stripeProductIds
