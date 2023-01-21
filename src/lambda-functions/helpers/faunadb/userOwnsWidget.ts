import getBlocsUserById from './getBlocsUserById'
import isTrialValid from '../isTrialValid'
import stripeProductIds from '@/constants/stripeProductIds'
import { ProductTitles } from '../../../global-types/stripe'

const userOwnsWidget = async (userId: string, widgetKey: ProductTitles) => {
  const blocsUser = await getBlocsUserById(userId)

  if (!blocsUser) return false

  const userOwnsWidget = blocsUser?.data?.purchasedProducts?.includes(
    stripeProductIds[widgetKey]
  )

  return userOwnsWidget || isTrialValid(blocsUser)
}

export default userOwnsWidget
