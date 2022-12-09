import useFetch from '@/hooks/useFetch'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { SHAREABLE_TOKEN_PATH } from 'src/utils/endpoints'
import { UrlHash } from '../components/widgets/WaterTracker/types'

const getEndpoint = (widgetType, widgetToken) =>
  `${SHAREABLE_TOKEN_PATH}?widgetType=${widgetType}&widgetToken=${widgetToken}`

const useFetchShareableLink = (
  widgetType: 'WATER_TRACKER' | 'HABIT_TRACKER' | 'POMODORO'
) => {
  const hash = useUrlHash<UrlHash>()
  console.log('hash', hash)
  const path = getEndpoint(widgetType, hash['token'])

  const { data, fetcher, loading, error } = useFetch(path, {
    method: 'POST',
    shouldFetch: false
  })

  return {
    fetcher,
    token: data?.shareableToken,
    loading,
    error
  }
}

export default useFetchShareableLink
