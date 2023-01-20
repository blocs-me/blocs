import styled from '@emotion/styled'
import { useMediaQuery } from 'beautiful-react-hooks'
import { ReactNode, useEffect, useRef } from 'react'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'

const Wrapper = styled.div`
  position: relative;

  .star {
    pointer-events: none;
  }

  .star-svg-wrapper {
    z-index: 1;
    transform-origin: center center;
  }
`

let starSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57.738 57.738">
  <path fill="var(--path-fill)" class="star-path" d="M3080.1,5799.2s12.826-1.28,20.043-8.5,8.826-20.372,8.826-20.372,2.626,13.154,9.843,20.372,19.026,8.5,19.026,8.5-11.808,1.134-19.026,8.352-9.843,20.518-9.843,20.518-1.609-13.3-8.826-20.518S3080.1,5799.2,3080.1,5799.2Z" transform="translate(-3080.101 -5770.331)" />
</svg>
`

const animateStar = (star, wrapper, time = 800) => {
  const scale = [{ transform: 'scale(0.5)' }, { transform: 'scale(1)' }]

  const rotate = [{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }]

  const timing = {
    duration: time,
    fill: 'forwards'
  }

  wrapper.animate(rotate, timing)
  star.animate(scale, timing)
}

const createStarMover = (MIN_SIZE, MAX_SIZE) => (star) => {
  const starSize = Math.floor(Math.max(Math.random() * MAX_SIZE, MIN_SIZE))
  star.style.width = `${starSize}px`
  star.style.height = `${starSize}px`
  star.style.top = `${Math.floor(Math.random() * 70)}%`
  star.style.left = `${Math.floor(Math.random() * 100)}%`
}

const createStar = (i) => {
  const star = document.createElement('div')
  const wrapper = document.createElement('div')

  star.style.position = 'absolute'
  star.style.fill = 'blue'
  star.classList.add('star')

  wrapper.classList.add('star-svg-wrapper')
  wrapper.innerHTML = starSVG

  star.appendChild(wrapper)

  return [star, wrapper]
}

const generateSparkles = (
  div: Element,
  { numOfStars, duration = 800, minSize = 10, maxSize = 20 }
) => {
  const MIN_INTERVAL = duration
  const MAX_INTERVAL = 3013
  const intervals = []

  for (let i = 0; i < numOfStars; i++) {
    const interval = i * (duration + i * 10)
    const [star, wrapper] = createStar(i)

    div.appendChild(star)
    const moveStar = createStarMover(minSize, maxSize)

    intervals.push(
      setInterval(() => {
        moveStar(star)
        animateStar(star, wrapper, duration)
      }, interval)
    )
  }

  return () => {
    intervals.forEach((int) => clearInterval(int))
  }
}

const Sparkles = ({
  children,
  minSize = 10,
  maxSize = 20,
  numOfStars = 5,
  duration = 600,
  className
}: {
  children: ReactNode
  minSize?: number
  maxSize?: number
  numOfStars?: number
  duration?: number
  className?: string
}) => {
  const container = useRef()
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isDarkMode = useIsTrueDarkMode()

  useEffect(() => {
    const stop =
      !reducedMotion &&
      generateSparkles(container?.current, {
        numOfStars,
        duration,
        minSize,
        maxSize
      })

    return () => {
      stop()
    }
  }, [reducedMotion, minSize, maxSize, numOfStars, duration])

  return (
    <Wrapper
      className={className}
      style={
        {
          '--path-fill': isDarkMode ? '#debd05' : '#f0dc00'
        } as any
      }
      ref={container}
    >
      {children}
    </Wrapper>
  )
}

export default Sparkles
