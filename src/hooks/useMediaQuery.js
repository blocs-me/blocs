import { useState, useEffect } from "react"

const useMediaQuery = (mediaQuery) => {
  const [mediaMatches, setMediaMatches] = useState(false)

  const handleMediaQueryChange = (ev) => {
    setMediaMatches(ev.matches)
  }

  useEffect(() => {
    const mql = window.matchMedia(mediaQuery)
    mql.addEventListener("change", handleMediaQueryChange)

    setMediaMatches(mql.matches)

    return () => {
      mql.removeEventListener("change", handleMediaQueryChange)
    }
  }, [mediaQuery])

  return mediaMatches
}

export default useMediaQuery
