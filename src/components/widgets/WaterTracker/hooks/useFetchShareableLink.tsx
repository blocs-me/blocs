import useFetch from '@/hooks/useFetch'
import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { SHAREABLE_TOKEN_PATH } from 'src/utils/endpoints'
import { UrlHash } from '../types'

const getEndpoint = (widgetType, widgetToken) =>
  `${SHAREABLE_TOKEN_PATH}?widgetType=${widgetType}&widgetToken=${widgetToken}`

const useFetchShareableLink = () => {
  const hash = useUrlHash<UrlHash>()

  console.log(hash)
  const { data, fetcher, loading, error } = useFetch(
    getEndpoint('WATER_TRACKER', hash['#token']),
    {
      method: 'POST',
      shouldFetch: false
    }
  )

  return {
    fetcher,
    token: data?.shareableToken,
    loading,
    error
  }
}

export default useFetchShareableLink
