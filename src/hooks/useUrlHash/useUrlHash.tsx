import {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
  ComponentType
} from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { UrlHash } from '@/widgets/WaterTracker/types'
import { useDidMount } from 'beautiful-react-hooks'

const context = createContext({})

export const URLHashProvider = ({ children, hash }) => {
  return <context.Provider value={hash}>{children}</context.Provider>
}

export const withUrlHashProvider = (Component: ComponentType) => {
  return (props: any) => {
    const hash = useInitUrlHash()

    return (
      <URLHashProvider hash={hash}>
        <Component {...props} />
      </URLHashProvider>
    )
  }
}

export function useInitUrlHash<T = any>() {
  const query = useRouter().query as UrlHash
  const [hash, setHash] = useState({} as UrlHash)
  const [shouldReset, setShouldReset] = useState(true)

  useEffect(() => {
    if (shouldReset) {
      setHash(query)

      if (Object.entries(query || {}).length > 0) {
        setShouldReset(false)
      }
    }
  }, [query]) // eslint-disable-line

  return { hash, URLHashProvider }
}

const useUrlHash = <T extends {}>() => {
  const hash = useContext(context)
  return hash as T
}

export default useUrlHash
