import { USER_PATH } from '@/utils/endpoints'
import { useUser } from '@supabase/auth-helpers-react'
import fetchWithToken from 'src/services/fetchWithToken'
import useSWR from 'swr'
import { BlocsUserClient } from '../global-types/blocs-user'
import stripeProductIds, { ProductIds } from '@/constants/stripeProductIds'
import { useMemo } from 'react'
import daysBetween from '../utils/dateUtils/daysBetween'

type Purchases<T = ProductIds> = {
  [key in keyof T]?: boolean
}

const useBlocsUser = () => {
  const supabaseUser = useUser()
  const { data: user, ...rest } = useSWR<BlocsUserClient>(
    supabaseUser?.aud === 'authenticated' ? [USER_PATH] : null,
    fetchWithToken
  )

  const purchases: Purchases = useMemo(() => {
    const result = {}
    const allProductIds = Object.entries(stripeProductIds)

    user?.data?.purchasedProducts.forEach((productId) => {
      const index = allProductIds.findIndex(([key, val]) => val === productId)
      if (index > -1) {
        const key = allProductIds[index][0]
        result[key] = true
      }
    })

    return result
  }, [user?.data?.purchasedProducts])

  const isUserOnFreeTrial = useMemo(() => {
    if (user?.data?.purchasedProducts.length) return false

    const freeTrialStartedAt = user?.data?.freeTrialStartedAt
    const freeTrialDaysLeft = freeTrialStartedAt
      ? daysBetween(new Date(), new Date(freeTrialStartedAt))
      : 0

    if (freeTrialDaysLeft <= 14) {
      return true
    }

    return false
  }, [user?.data?.freeTrialStartedAt, user?.data?.purchasedProducts.length])

  return {
    user,
    purchases,
    isUserOnFreeTrial,
    ...rest
  }
}

export default useBlocsUser
