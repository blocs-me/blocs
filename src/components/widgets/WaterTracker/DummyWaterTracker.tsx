import { useEffect, useRef, useState } from 'react'
import Flex from '@/helpers/Flex'
import Bowl from './Bowl'
import CaretButton from '@/design-system/CaretButton'
import TweenNum from './TweenNum'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Icon from '@/helpers/Icon'
import Gear from 'src/icons/gear'
import { IBox } from '@/helpers/Box/Box.types'
import useColorMode from '@/hooks/useColorMode'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'

type Props = {
  goal?: number
  progress?: number
  onClickUp?: () => void
  onClickDown?: () => void
  role?: string
}

const FreeWaterSettingsPopover = ({ onClose }: { onClose: () => void }) => {
  const { colorMode, setTheme, setBackground } = useColorMode()
  const ref = useRef<HTMLDivElement>(null)
  const [showSignInCTA, setShowSignInCTA] = useState(false)

  const handleThemeChange = (mode: string) => {
    setTheme(mode)
    setBackground(mode)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <Box
      ref={ref}
      position="absolute"
      top="48px"
      right="0"
      width="220px"
      bg="background"
      borderRadius="md"
      boxShadow="lg"
      p="sm"
      zIndex={100}
      border="1px solid"
      borderColor="primary.accent-1"
    >
      <Text fontSize="xxs" fontWeight={600} color="primary.accent-4" m={0} mb="xs" css={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
        Settings
      </Text>

      <Text m={0} fontSize="xs" fontWeight={400} color="foreground" mb="xxs">
        Theme
      </Text>
      <Flex css={{ gap: '4px' }} mb="xs">
        {['light', 'dark', 'auto'].map(mode => (
          <Box
            key={mode}
            as="button"
            flex="1"
            py="4px"
            borderRadius="sm"
            bg={colorMode === mode ? 'brand.accent-1' : 'primary.accent-2'}
            color={colorMode === mode ? 'neutral.white' : 'foreground'}
            css={{
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: colorMode === mode ? 600 : 400,
              transition: 'all 0.15s ease'
            }}
            onClick={() => handleThemeChange(mode)}
          >
            {mode === 'auto' ? 'System' : mode === 'dark' ? 'Dark' : 'Light'}
          </Box>
        ))}
      </Flex>

      <Box height="1px" bg="primary.accent-1" my="xs" />

      {!showSignInCTA ? (
        <Box
          as="button"
          width="100%"
          css={{
            display: 'block',
            textAlign: 'left',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '6px',
            padding: '8px'
          }}
          onClick={() => setShowSignInCTA(true)}
        >
          <Text fontSize="xxs" fontWeight={600} color="foreground" m={0}>
            Customize Goal
          </Text>
          <Text fontSize="10px" color="primary.accent-4" m={0} mt="2px">
            Set a custom daily water goal
          </Text>
        </Box>
      ) : (
        <Box p="xs" borderRadius="md" bg="primary.accent-2">
          <Text fontSize="xs" fontWeight={600} color="foreground" m={0} mb="xxs">
            Custom water goals
          </Text>
          <Text fontSize="xxs" color="primary.accent-4" m={0} mb="xs" lineHeight={1.4}>
            Sign in to Blocs to set a custom daily goal, track analytics, and more. It&apos;s free.
          </Text>
          <Box
            as="a"
            href="https://blocs.me/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            bg="brand.accent-1"
            color="neutral.white"
            borderRadius="sm"
            css={{
              display: 'block',
              textAlign: 'center',
              textDecoration: 'none',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              '&:hover': { opacity: 0.85 }
            }}
          >
            Sign in to Blocs
          </Box>
        </Box>
      )}
    </Box>
  )
}

const DummyWaterTracker = ({
  goal = 3,
  progress = 0,
  onClickUp = () => {},
  onClickDown = () => {},
  ...rest
}: Props & IBox) => {
  const [isHovering, setIsHovering] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <Flex
      width="400px"
      bg="background"
      boxShadow="default"
      css={{ aspectRatio: '0.85' }}
      borderRadius="lg"
      p="sm"
      position="relative"
      flexDirection="column"
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ '--settings-opacity': isHovering || showSettings ? 1 : 0 } as React.CSSProperties}
      {...rest}
    >
      <Box
        position="absolute"
        top="sm"
        right="sm"
        zIndex={50}
        css={{
          opacity: 'var(--settings-opacity)',
          transition: 'opacity 0.3s ease'
        }}
      >
        <Flex
          as="button"
          borderRadius="md"
          alignItems="center"
          justifyContent="center"
          bg="primary.accent-2"
          p="xs"
          size="40px"
          overflow="hidden"
          onClick={() => setShowSettings(!showSettings)}
          css={{
            border: 'none',
            cursor: 'pointer',
            '&:hover': { boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }
          }}
        >
          <Icon m="auto" fill="foreground" width="15px" height="15px" display="flex">
            <Gear />
          </Icon>
        </Flex>
        {showSettings && (
          <FreeWaterSettingsPopover onClose={() => setShowSettings(false)} />
        )}
      </Box>

      <Flex mb="sm" width="100%" alignItems="center"
        css={{
          opacity: 'var(--settings-opacity)',
          transition: 'opacity 0.3s ease'
        }}
      >
        <Flex>
          <CaretButton
            orientation="bottom"
            onClick={onClickDown}
            aria-label="Decrease water level"
          />
          <Flex pl="xs" />
          <CaretButton
            orientation="top"
            onClick={onClickUp}
            aria-label="Increase water level"
          />
        </Flex>
      </Flex>

      <Box
        position="absolute"
        left="50%"
        top="sm"
        transform="translateX(-50%)"
        css={{ pointerEvents: 'none' }}
      >
        <Text
          as="h1"
          textAlign="center"
          color="foreground"
          fontSize="sm"
          m={0}
          lineHeight="1"
          textTransform="capitalize"
          css={{ 'user-select': 'none' }}
        >
          <TweenNum speed={0.02} num={progress} />{' '}
          {progress === 1 ? `liter` : `liters`}
        </Text>
        <Text
          color="primary.accent-4"
          fontWeight="200"
          fontSize="xs"
          m={0}
          css={{ 'user-select': 'none' }}
        >
          {Math.min(100, Math.round((progress / goal) * 100)) || 0}% of your
          goal
        </Text>
      </Box>

      <Box
        flex="1"
        onClick={onClickUp}
        css={{ cursor: 'pointer' }}
      >
        <Bowl progress={progress} goal={goal} />
      </Box>
    </Flex>
  )
}

export default DummyWaterTracker
