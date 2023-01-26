import Box from '@/helpers/Box'
import { WithChildren } from '@/utils/tsUtils'
import { timeline } from 'motion'
import { useEffect, useRef, useState } from 'react'

const SwipeAnim = ({
  children,
  duration = 1,
  delayStart = 0,
  delayEnd = 0,
  setNext,
  pauseAtEnd = false
}: WithChildren<{
  duration?: number
  delayStart?: number
  delayEnd?: number
  setNext?: () => void
  pauseAtEnd?: boolean
}>) => {
  const ref = useRef<HTMLDivElement>()
  const anim1 = useRef<any>()

  useEffect(() => {
    const container = ref?.current

    const sequence = [
      [
        container,
        {
          x: ['0%', '100%']
        },
        {
          duration
        }
      ],
      [
        container,
        {
          x: ['100%', '0%']
        },
        {
          duration,
          delay: delayEnd
        }
      ]
    ]

    anim1.current = timeline(sequence as any)

    anim1.current.finished.then(() => {})

    return () => {
      anim1?.current?.pause()

      setTimeout(() => {
        anim1?.current?.cancel()
      }, 10)
    }
  }, [delayEnd, delayStart, duration])

  useEffect(() => {
    let time

    if (pauseAtEnd) {
      anim1?.current?.pause()
    } else {
      anim1.current?.play()
      time = setTimeout(() => {
        setNext?.()
      }, 5000)
    }

    return () => {
      clearTimeout(time)
    }
  }, [pauseAtEnd])

  return (
    <Box overflow="hidden" position="relative">
      {children}

      <Box
        bg="background"
        position="absolute"
        top={0}
        left={0}
        size="100%"
        opacity={pauseAtEnd ? 0 : 1}
        css={{ transition: 'opacity 0.1s ease' }}
        ref={ref}
      />
    </Box>
  )
}

export default SwipeAnim
