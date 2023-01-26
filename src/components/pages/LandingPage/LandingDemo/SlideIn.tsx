import Box from '@/helpers/Box'
import { WithChildren } from '@/utils/tsUtils'
import { animate } from 'motion'
import { useEffect, useRef } from 'react'

const SlideIn = ({
  children,
  duration = 1,
  delay = 0,
  setNext,
  className
}: WithChildren<{
  duration?: number
  delay?: number
  setNext?: () => void
  className?: string
}>) => {
  const ref = useRef<HTMLDivElement>()
  const anim = useRef<any>()

  useEffect(() => {
    const container = ref.current

    if (!anim.current) {
      anim.current = animate(
        container,
        {
          opacity: [0, 1],
          y: [10, 0]
        },
        {
          duration,
          delay
        }
      )
    }

    anim.current?.finished?.then(() => {
      anim.current = null
      setNext?.()
    })

    return () => {
      anim?.current?.cancel()
    }
  }, [delay, duration]) // eslint-disable-line

  return (
    <Box opacity={0} ref={ref} className={className}>
      {children}
    </Box>
  )
}

export default SlideIn
