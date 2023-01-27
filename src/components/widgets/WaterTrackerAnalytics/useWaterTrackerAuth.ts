import useUrlHash from '@/hooks/useUrlHash'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import { UrlHash } from '../WaterTracker/types'

type Auth = {
  data: {
    isPremium: boolean
  }
}

const useWaterTrackerAuth = () => {
  const { role, token } = useUrlHash() as UrlHash

  const endpoint = `/api/widget/water-tracker/auth?role=${role}&widgetToken=${token}`
  const { data: auth, ...rest } = useSWR<Auth>(token ? endpoint : null, fetcher)

  return {
    auth: auth?.data,
    ...rest
  }
}

export default useWaterTrackerAuth
