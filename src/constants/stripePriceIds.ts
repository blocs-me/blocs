import type { ProductTitles } from '@/gtypes/stripe'

type PriceIds = {
  [P in ProductTitles]?: string
} & {
  legacyLifetimeAccess?: string
}

const local: PriceIds = {
  lifetimeAccess: 'price_1MQZs3HyXnRceQpOUY4FjNnR',
  waterTracker: 'price_1MQbKkHyXnRceQpOX9mZZL7N',
  habitTracker: 'price_1MQaw6HyXnRceQpOYLPoWdAS',
  pomodoro: 'price_1MQawTHyXnRceQpOILT0ITBq',
  unlimitedAccess: 'price_1MY5p3HyXnRceQpOPn3jrwnl'
}

const prod: PriceIds = {
  lifetimeAccess: 'price_1MXMgYHyXnRceQpOw5BY6Xxw',
  legacyLifetimeAccess: 'price_1MQWR6HyXnRceQpOpEBmf9Te', // needed to add this for the validation for preventing 2nd time purchase of the same product
  waterTracker: 'price_1MQWXtHyXnRceQpOyPLvj3gW',
  habitTracker: 'price_1MQWVtHyXnRceQpOcvXB73Mv',
  pomodoro: 'price_1MQWTjHyXnRceQpOMxQBvlW3',
  unlimitedAccess: 'price_1MY3x1HyXnRceQpOJBTIK4Ph'
}

const stripePriceIds =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'local' ? local : prod

export default stripePriceIds
