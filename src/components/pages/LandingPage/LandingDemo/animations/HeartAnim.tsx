import Box from '@/helpers/Box'
import Icon from '@/helpers/Icon'
import { keyframes } from '@emotion/react'
import { useState, useEffect, useMemo, useRef } from 'react'
import Heart from '../../../../../icons/heart.svg'

const pulse = keyframes`
    from {
      transform: scale(1)
    } to {
      transform: scale(0.8)
    }

`

const anim = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  } to {
    opacity: 1;
    transform: scale(1);
  }
`

const HeartAnim = ({ size }: { size: string }) => {
  const ref = useRef(null)

  const resetPosition = () => {
    ref.current.style.opacity = 1
  }

  useEffect(() => {
    resetPosition()
  }, [])

  return (
    <Box
      css={{
        animation: `${pulse} 0.5s ease 1s infinite alternate`
      }}
    >
      <Box
        ref={ref}
        opacity={0}
        css={{
          transform: 'scale(0)',
          animation: `${anim} 1s ease 0.5s forwards`,
          pointerEvents: 'none'
        }}
      >
        <Icon fill="danger.medium" size={size}>
          <Heart />
        </Icon>
      </Box>
    </Box>
  )
}

export default HeartAnim
