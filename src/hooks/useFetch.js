import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

const reqOptions = (data, options) => ({
  method: options.method ?? 'GET',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  },
  body: JSON.stringify(data)
})

const defaultFetcher = (path, body, options = {}) =>
  fetch(path, reqOptions(body, options))

const useFetch = (url, options = {}) => {
  const {
    body = {},
    shouldFetch = false,
    shouldCache = true,
    onSuccess = () => {},
    onError = () => {},
    fetcher = defaultFetcher
  } = options

  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const controller = useRef(null)

  const cacheData = (data) =>
    shouldCache && localStorage.setItem(url, JSON.stringify(data))

  const handleReq = async (mounted) => {
    if (!loading) {
      mounted?.value && setLoading(true)
      const res = await fetcher(url, body, options)
      if (!res.ok) {
        if (mounted?.value) {
          setLoading(false)
          setError(true)
        }
        const resData = await res.json()
        onError(resData)
        return null
      } else {
        const resData = await res.json()
        mounted?.value && setData(resData.data)
        mounted?.value && setLoading(false)

        cacheData(resData)
        onSuccess(resData)
        return resData
      }
    }
  }

  const mounted = useRef({ value: true })

  useEffect(() => {
    const ref = mounted.current
    ref.value = true

    const cachedData = shouldCache
      ? JSON.parse(localStorage.getItem(url) || JSON.stringify(''))
      : {}

    !shouldFetch && loading && setLoading(false)

    if (cachedData?.data && !shouldFetch) {
      setData(cachedData.data)
      setLoading(false)
    } else {
      shouldFetch && handleReq(ref)
    }

    return () => {
      ref.value = false
    }
  }, [shouldFetch]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    fetcher: () => handleReq(mounted.current),
    loading,
    error,
    data
  }
}

export default useFetch
