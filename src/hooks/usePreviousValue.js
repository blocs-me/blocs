import { useEffect, useRef } from "react"

const usePreviousValue = (value) => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePreviousValue
