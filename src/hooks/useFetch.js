import { useCallback, useEffect, useLayoutEffect, useState } from "react"

const reqOptions = (data, options) => ({
  method: options.method || "GET",
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
  const [loading, setLoading] = useState(true)

  const cacheData = (data) =>
    shouldCache && localStorage.setItem(url, JSON.stringify(data))

  const handleReq = useCallback(async () => {
    setLoading(true)
    const res = await fetcher(url, body, options)

    if (res.status !== 200) {
      setLoading(false)
      setError(true)
      onError()
    } else {
      const resData = await res.json()
      setData(resData.data)
      setLoading(false)
      cacheData(resData)
      onSuccess(resData)
    }
  }, [error, body, url, options])

  useEffect(() => {
    const cachedData = shouldCache
      ? JSON.parse(localStorage.getItem(url) || JSON.stringify(""))
      : {}

    !shouldFetch && setLoading(false)

    if (cachedData?.data) {
      setData(cachedData.data)
    } else {
      shouldFetch && handleReq()
    }
  }, [shouldFetch])

  return {
    fetcher: handleReq,
    loading,
    error,
    data,
  }
}

export default useFetch
