import { useMemo } from 'react'

const getLocationHash = <T = any>() => {
  const hash = global?.window?.location.hash

  const entries = (() => {
    if (!hash) return {}
    const hashEntries = hash.split('&').map((keyVal) => keyVal?.split('='))
    return Object.fromEntries(hashEntries)
  })()

  return entries as T
}

export default getLocationHash
