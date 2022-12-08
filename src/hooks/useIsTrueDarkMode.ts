import useColorMode from '@/hooks/useColorMode'
import useDarkMode from './useDarkMode'

const useIsTrueDarkMode = () => {
  const { colorMode } = useColorMode()
  const isDarkMode = useDarkMode()

  return (colorMode === 'auto' && isDarkMode) || colorMode === 'dark'
}

export default useIsTrueDarkMode
