import { useMemo } from 'react'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { WATER_TRACKER_ANALYTICS_PATH } from '@/utils/endpoints'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import { UrlHash } from '../types'

type Response = {
  data: {
    waterConsumed: number
    isoDateString: string
    lastUpdatedAt: string
  }
}

const useWaterLatestTrackerAnalytics = () => {
  const today = new Date()
  const isoDateString = today.toISOString().split('T')[0]
  const epochTime = today.getTime()
  const hash = useUrlHash() as UrlHash
  const token = hash['token']
  const path = useMemo(
    () =>
      `${WATER_TRACKER_ANALYTICS_PATH}?widgetToken=${token}&role=${hash.role}&isoDateString=${isoDateString}&date=${epochTime}`,
    [isoDateString, hash]
  )

  const swrResponse = useSWR<Response>(path, fetcher)

  return swrResponse
}

export default useWaterLatestTrackerAnalytics
