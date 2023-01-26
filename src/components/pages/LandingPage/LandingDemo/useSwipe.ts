import { animate } from 'motion'
import { useCallback } from 'react'

const useSwipe = () => {
  const swipe = useCallback(
    (container: HTMLDivElement, moveX: any[], duration: number, delay = 0) =>
      animate(
        container,
        {
          x: moveX
        },
        {
          delay,
          duration
        }
      ),
    []
  )

  return swipe
}

export default useSwipe
