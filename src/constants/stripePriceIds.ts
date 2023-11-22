import type { ProductTitles } from '@/gtypes/stripe'

type PriceIds = {
  [P in ProductTitles]?: string
} & {
  legacyLifetimeAccess?: string
  legacyV2lifetimeAccess?: string
  legacyWaterTracker?: string
  legacyHabitTracker?: string
  legacyPomodoro?: string
}

const local: PriceIds = {
  lifetimeAccess: 'price_1MQZs3HyXnRceQpOUY4FjNnR',
  waterTracker: 'price_1MQbKkHyXnRceQpOX9mZZL7N',
  habitTracker: 'price_1MQaw6HyXnRceQpOYLPoWdAS',
  pomodoro: 'price_1MQawTHyXnRceQpOILT0ITBq'
}

const prod: PriceIds = {
  legacyV2lifetimeAccess: 'price_1MXMgYHyXnRceQpOw5BY6Xxw',
  legacyLifetimeAccess: 'price_1MQWR6HyXnRceQpOpEBmf9Te', // needed to add this for the validation for preventing 2nd time purchase of the same product
  legacyWaterTracker: 'price_1MQWXtHyXnRceQpOyPLvj3gW',
  legacyHabitTracker: 'price_1MQWVtHyXnRceQpOcvXB73Mv',
  legacyPomodoro: 'price_1MQWTjHyXnRceQpOMxQBvlW3',
  lifetimeAccess: 'price_1OFN1NHyXnRceQpO7GNmghkK',
  waterTracker: 'price_1OFN82HyXnRceQpO9xbQXXsC',
  habitTracker: 'price_1OFN8YHyXnRceQpOP5ZAwOGF',
  pomodoro: 'price_1OFMfOHyXnRceQpOZNmPwYZt'
}

const stripePriceIds =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'local' ? local : prod

export default stripePriceIds
