import { useMemo } from 'react'

const useRegion = () => {
  const region = useMemo(() => {
    const cookies = document.cookie.split(';')
    const [__, ln] = cookies
      .find((str) => str.trim().startsWith('ln'))
      ?.split('=') || ['', '']

    return ln || 'us'
  }, [])

  return region
}

export default useRegion
