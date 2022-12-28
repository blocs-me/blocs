import useNotifications from '@/design-system/Notifications/useNotifications'
import { useState } from 'react'
import getAccessToken from '@/utils/getAccessToken'
import useFetch from '@/hooks/useFetch'
import { TEMP_ACCESS_TOKEN_PATH } from '@/utils/endpoints'

export const useCreateToken = (widgetType, shouldFetch = false) => {
  const [token, setToken] = useState('')
  const [publicToken, setPublicToken] = useState('')
  const notifs = useNotifications()
  const { access_token } = getAccessToken() || {}

  const onSuccess = (res) => {
    const { token, shareableToken } = res?.data || {}
    setToken(token)
    setPublicToken(shareableToken)
  }

  const onError = () =>
    notifs.createError('Uh oh ! We were not able to create your widget link')

  const { loading, fetcher: fetchToken } = useFetch(TEMP_ACCESS_TOKEN_PATH, {
    shouldCache: false,
    shouldFetch,
    method: 'POST',
    onSuccess,
    onError,
    body: {
      access_token,
      widgetType
    }
  })

  return {
    isLoading: loading,
    publicToken,
    token,
    fetchToken
  }
}
