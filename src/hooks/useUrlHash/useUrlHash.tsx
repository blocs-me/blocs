import { createContext, useLayoutEffect, useState } from 'react'
import getLocationHash from './getUrlHash'
import { useContext } from 'react'

const context = createContext({})

export const URLHashProvider = ({ children, hash }) => {
  return <context.Provider value={hash}>{children}</context.Provider>
}

export function useInitUrlHash<T = any>() {
  const [hash, setHash] = useState<T>({} as T)

  useLayoutEffect(() => {
    setHash(getLocationHash())
  }, [])

  return { hash, URLHashProvider }
}

const useUrlHash = <T extends {}>() => {
  const hash = useContext(context)
  return hash as T
}

export default useUrlHash
