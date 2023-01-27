import Box from '@/helpers/Box'
import { WithChildren } from '@/utils/tsUtils'
import { animate } from 'motion'
import { useEffect, useRef } from 'react'

const SlideIn = ({
  children,
  duration = 1,
  delay = 0,
  setNext,
  className,
  pause = false
}: WithChildren<{
  duration?: number
  delay?: number
  setNext?: () => void
  className?: string
  pause?: boolean
}>) => {
  const ref = useRef<HTMLDivElement>()
  const anim = useRef<any>()

  useEffect(() => {
    const container = ref.current
    if (!pause) {
      if (!anim.current) {
        anim.current = animate(
          container,
          {
            opacity: [0, 1],
            y: [13, 0]
          },
          {
            duration,
            delay
          }
        )
        anim.current?.finished?.then(() => {
          anim.current = null
          setNext?.()
        })
      }
    }

    return () => {
      anim?.current?.cancel()
    }
  }, [delay, duration, pause]) // eslint-disable-line

  return (
    <Box opacity={0} ref={ref} className={className}>
      {children}
    </Box>
  )
}

export default SlideIn
