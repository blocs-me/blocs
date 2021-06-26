import { useCallback, useEffect, useLayoutEffect, useState } from "react"

const reqOptions = (data, options) => ({
  method: options.method ?? "GET",
  headers: {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  },
  body: JSON.stringify(data),
})

const fetcher = (path, body, options = {}) =>
  fetch(path, reqOptions(body, options))

const useFetch = (url, options = {}) => {
  const {
    body = {},
    shouldFetch = false,
    shouldCache = true,
    onSuccess = () => {},
    onError = () => {},
  } = options

  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)

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
        onError(res)
      } else {
        const resData = await res.json()
        mounted?.value && setData(resData.data)
        mounted?.value && setLoading(false)

        cacheData(resData)
        onSuccess(resData)
      }
    }
  }

  let mounted = { value: true, fetching: false }

  useEffect(() => {
    const cachedData = shouldCache
      ? JSON.parse(localStorage.getItem(url) || JSON.stringify(""))
      : {}

    !shouldFetch && loading && setLoading(false)

    if (cachedData?.data && !shouldFetch) {
      setData(cachedData.data)
      setLoading(false)
    } else {
      shouldFetch && handleReq(mounted)
    }

    return () => {
      mounted.value = false
    }
  }, [])

  return {
    fetcher: () => handleReq(mounted),
    loading,
    error,
    data,
  }
}

export default useFetch
