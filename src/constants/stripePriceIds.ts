type PriceIds = {
  lifetime: string
  waterTracker: string
  habitTracker: string
  pomodoro: string
}

const local: PriceIds = {
  lifetime: 'price_1MQZs3HyXnRceQpOUY4FjNnR',
  waterTracker: 'price_1MQbKkHyXnRceQpOX9mZZL7N',
  habitTracker: 'price_1MQaw6HyXnRceQpOYLPoWdAS',
  pomodoro: 'price_1MQawTHyXnRceQpOILT0ITBq'
}

const prod: PriceIds = {
  lifetime: '',
  waterTracker: '',
  habitTracker: '',
  pomodoro: ''
}

const stripePriceIds = process.env.VERCEL_ENV === 'production' ? prod : local

export default stripePriceIds
