const { default: storage } = require("@/utils/storage")
const { useState, useEffect } = require("react")
const { default: useDidMount } = require("./useDidMount")

const useFetchCache = (endpoint) => {
  const [data, setData] = useState({})
  const mounted = useDidMount()

  const cachedData = storage.getItem(endpoint)

  useEffect(() => {
    if (cachedData) {
      setData(JSON.parse(cachedData || JSON.stringify({})))
    }
  }, [mounted, cachedData])

  return data
}

export default useFetchCache
