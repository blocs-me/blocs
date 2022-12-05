import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { WATER_TRACKER_SETTINGS_PATH } from '@/utils/endpoints'
import { IWaterTrackerWidget } from 'src/global-types/water-tracker'
import { UrlHash } from '../types'

type Response = {
  data: IWaterTrackerWidget['settings'] & { avatarUrl: string }
}

const useWaterTrackerSettings = () => {
  const hash = useUrlHash() as UrlHash
  const token = hash?.['token']
  const path = `${WATER_TRACKER_SETTINGS_PATH}?widgetType=WATER_TRACKER&widgetToken=${token}&role=${hash.role}`

  const swr = useSWR<Response>(path, fetcher)
  return swr
}

export default useWaterTrackerSettings
