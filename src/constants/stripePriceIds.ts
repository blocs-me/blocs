import type { ProductTitles } from '@/gtypes/stripe'

type PriceIds = {
  [P in ProductTitles]?: string
}
const local: PriceIds = {
  lifetimeAccess: 'price_1MQZs3HyXnRceQpOUY4FjNnR',
  waterTracker: 'price_1MQbKkHyXnRceQpOX9mZZL7N',
  habitTracker: 'price_1MQaw6HyXnRceQpOYLPoWdAS',
  pomodoro: 'price_1MQawTHyXnRceQpOILT0ITBq'
}

const prod: PriceIds = {
  lifetimeAccess: '',
  waterTracker: '',
  habitTracker: '',
  pomodoro: ''
}

const stripePriceIds = process.env.VERCEL_ENV === 'production' ? prod : local

export default stripePriceIds
