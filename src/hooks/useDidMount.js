import { useState } from "react"
import { useEffect } from "react/cjs/react.development"

const useDidMount = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

export default useDidMount
