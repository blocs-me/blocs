import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { WATER_TRACKER_SETTINGS_PATH } from '@/utils/endpoints'
import { IWaterTrackerWidget } from 'src/global-types/water-tracker'

type Response = {
  data: IWaterTrackerWidget['settings']
}

const useWaterTrackerSettings = () => {
  const hash = useUrlHash()
  const token = hash?.['#token']
  const path = `${WATER_TRACKER_SETTINGS_PATH}?widgetType=WATER_TRACKER&widgetToken=${token}`

  const swr = useSWR<Response>(path, fetcher)
  return swr
}

export default useWaterTrackerSettings
