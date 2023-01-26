import { animate } from 'motion'
import { useEffect, useRef } from 'react'

const ScaleIn = ({ children, delay = 0 }) => {
  const ref = useRef<any>()

  useEffect(() => {
    animate(
      ref.current,
      {
        scale: [0.9, 1]
      },
      {
        duration: 0.5,
        delay
      }
    )
  }, [])

  return (
    <div ref={ref} css={{ transform: 'scale(0.9)' }}>
      {children}
    </div>
  )
}

export default ScaleIn
