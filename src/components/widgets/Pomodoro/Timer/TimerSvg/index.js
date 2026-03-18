import useColorMode from '@/hooks/useColorMode'
import useDarkMode from '@/hooks/useDarkMode'
import DarkModeTimer from './DarkModeTimer'
import LightModeTimer from './LightModeTimer'

const TimerSvg = ({ progress = 50, presetMode }) => {
  const { colorMode } = useColorMode()
  const isDarkMode = useDarkMode()
  const isTrueDarkMode =
    (isDarkMode && colorMode === 'auto') || colorMode === 'dark'

  return isTrueDarkMode ? (
    <DarkModeTimer progress={progress} presetMode={presetMode} />
  ) : (
    <LightModeTimer progress={progress} presetMode={presetMode} />
  )
}

export default TimerSvg
