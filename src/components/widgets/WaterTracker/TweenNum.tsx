import { usePreviousValue } from 'beautiful-react-hooks'
import { useRef, useEffect, useCallback } from 'react'
import { animate } from 'motion'
import Box from '@/helpers/Box'
import { IBox } from '@/helpers/Box/Box.types'

type Props = {
  num: number
  speed: number
} & IBox

const TweenNum = ({ num, ...rest }: Props) => {
  const ref = useRef<HTMLElement>()
  const prev = usePreviousValue(num)

  const speed = Math.abs(num - prev) / 45

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = num.toString()
      let count = prev

      const countUp = () => {
        let isIncreased = num > prev

        if (isIncreased) {
          count = count + speed

          if (count >= num) {
            ref.current.textContent = num.toString()
            return null
          }
        } else {
          count = count - speed

          if (count <= num) {
            ref.current.textContent = num.toString()
            return null
          }
        }

        ref.current.textContent = count.toFixed(1)

        requestAnimationFrame(countUp)
      }

      if (prev !== undefined && prev !== num) countUp()
    }
  }, [num, prev, speed])

  return <Box as="span" {...rest} ref={ref} />
}

export default TweenNum
