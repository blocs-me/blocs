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
    fetchWithToken,
    {
      errorRetryCount: 5,
      shouldRetryOnError: true
    }
  )

  const purchases: Purchases = (() => {
    const result = {}
    const allProductIds = Object.entries(stripeProductIds)

    user?.data?.purchasedProducts?.forEach((productId) => {
      const [key, val] = allProductIds.find(([__, id]) => id === productId) || [
        '',
        ''
      ]
      if (key && val) {
        result[key] = true
      }
    })

    return result
  })()

  const isUserOnFreeTrial = useMemo(() => {
    const freeTrialStartedAt = user?.data?.freeTrialStartedAt
    if (!freeTrialStartedAt) return false

    const fourteenDays = 1000 * 60 * 60 * 24 * 14
    const freeTrialDaysLeft = Math.max(
      0,
      14 -
        daysBetween(
          new Date(),
          new Date(
            user?.data?.freeTrialStartedAt ||
              new Date().getTime() - fourteenDays
          )
        )
    )

    if (freeTrialDaysLeft > 0) {
      return true
    }

    return false
  }, [user?.data?.freeTrialStartedAt])

  return {
    user,
    purchases,
    isUserOnFreeTrial,
    ...rest
  }
}

export default useBlocsUser
