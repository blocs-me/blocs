import useFetch from '@/hooks/useFetch'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { SHAREABLE_TOKEN_PATH } from 'src/utils/endpoints'

const getEndpoint = (widgetType, widgetToken) =>
  `${SHAREABLE_TOKEN_PATH}?widgetType=${widgetType}&widgetToken=${widgetToken}`

const useFetchShareableLink = (
  widgetType: 'WATER_TRACKER' | 'HABIT_TRACKER' | 'POMODORO'
) => {
  const { token } = useUrlHash<{ token: string }>()
  const path = getEndpoint(widgetType, token)

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
