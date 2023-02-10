import type { ProductTitles } from '@/gtypes/stripe'

type PriceIds = {
  [P in ProductTitles | 'legacyLifetimeAccess']?: {
    [K in 'dollars' | 'euros']: string
  }
}

const local: PriceIds = {
  lifetimeAccess: {
    euros: 'price_1MZiiLHyXnRceQpOEgCe4oC8',
    dollars: 'price_1MQdeMHyXnRceQpOE2YYC6VP'
  },
  waterTracker: {
    euros: 'price_1MQbKkHyXnRceQpOX9mZZL7N',
    dollars: 'price_1MZt1GHyXnRceQpOaRyI9iLi'
  },
  habitTracker: {
    euros: 'price_1MQaw6HyXnRceQpOYLPoWdAS',
    dollars: 'price_1MZijWHyXnRceQpOYxlsHUCi'
  },
  pomodoro: {
    euros: 'price_1MQawTHyXnRceQpOILT0ITBq',
    dollars: 'price_1MZryuHyXnRceQpO03FvIJ6X'
  },
  unlimitedAccess: {
    euros: 'price_1MZig7HyXnRceQpOa53IeyCb',
    dollars: 'price_1MY5p3HyXnRceQpOPn3jrwnl'
  }
}

const prod: PriceIds = {
  lifetimeAccess: {
    euros: 'price_1MXMgYHyXnRceQpOw5BY6Xxw',
    dollars: 'price_1MQWR6HyXnRceQpOpEBmf9Te'
  },
  legacyLifetimeAccess: {
    // needed to add this for the validation for preventing 2nd time purchase of the same product
    dollars: 'price_1MQWR6HyXnRceQpOpEBmf9Te',
    euros: ''
  },
  waterTracker: {
    euros: 'price_1MQWXtHyXnRceQpOyPLvj3gW',
    dollars: 'price_1MZt3YHyXnRceQpOyT4nzgGl'
  },
  habitTracker: {
    euros: 'price_1MQWVtHyXnRceQpOcvXB73Mv',
    dollars: 'price_1MZs59HyXnRceQpOTyDWMY3I'
  },
  pomodoro: {
    euros: 'price_1MQWTjHyXnRceQpOMxQBvlW3',
    dollars: 'price_1MZs5wHyXnRceQpODjEQdjC3'
  },
  unlimitedAccess: {
    euros: 'price_1MZig7HyXnRceQpOa53IeyCb',
    dollars: 'price_1MY5p3HyXnRceQpOPn3jrwnl'
  }
}

const stripePriceIds =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'local' ? local : prod

export default stripePriceIds
