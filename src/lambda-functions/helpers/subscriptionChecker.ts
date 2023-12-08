import { ProductIds } from '@/constants/stripeProductIds'

type Purchases<T = ProductIds> = {
  [key in keyof T]?: boolean
}

export const isLifestylePro = (products: Purchases<ProductIds>) => {
  return products.lifetimeAccess || products.lifestylePro
}

export const isLifestyleBasic = (products: Purchases<ProductIds>) => {
  return products.habitTracker || products.waterTracker || products.pomodoro
}

export const isLifestylePlan = (products: Purchases<ProductIds>) => {
  return isLifestyleBasic(products) || isLifestylePro(products)
}
