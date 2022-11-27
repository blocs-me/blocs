import { useState, useEffect } from 'react'
import storage from '@/utils/storage'
import Box from '@/helpers/Box'
import useDidMount from '@/hooks/useDidMount'
import Text from '../Text'
import Icon from '@/helpers/Icon'
import Cross from '../../../icons/cross.svg'
import Confetti from 'react-dom-confetti'

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: '116',
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
}

const SmallBanner = ({ cacheKey, children, hasConfetti = false, ...rest }) => {
  const [confetti, setConfetti] = useState(false)
  const bannerHidden = storage.getItem(cacheKey) === 'true'
  const mounted = useDidMount()
  const [hide, setHide] = useState(false)
  const handleClick = () => {
    storage.setItem(cacheKey, 'true')
    setHide(true)
  }

  useEffect(() => {
    if (hasConfetti && !bannerHidden) {
      setTimeout(() => {
        setConfetti(true)
      }, 500)
    }
  }, []) // eslint-disable-line

  if (bannerHidden || !mounted || hide) return null

  return (
    <Box
      width="100%"
      p="sm"
      bg="highlight"
      borderRadius="md"
      {...rest}
      mx="auto"
      position="relative"
    >
      <Text
        fontSize="sm"
        color="background"
        p={0}
        m={0}
        pr="30px"
        textAlign="center"
      >
        {children}
      </Text>
      <Box
        as="button"
        position="absolute"
        top="50%"
        bg="rgba(255,255,255, 0.1)"
        css={{
          ':hover': {
            background: 'rgba(255,255,255,0.12)',
            transition: 'backgorund 0.3s ease'
          }
        }}
        transform="translateY(-50%)"
        right="0"
        px="xs"
        height="100%"
        onClick={() => handleClick()}
      >
        <Icon fill="background" width="15px">
          <Cross />
        </Icon>
      </Box>
      <Confetti config={confettiConfig} active={confetti} />
    </Box>
  )
}

export default SmallBanner
