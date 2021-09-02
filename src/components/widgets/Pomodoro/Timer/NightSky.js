import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import { keyframes } from "@emotion/react"
import { domAnimation, LazyMotion, m, useAnimation } from "framer-motion"
import { memo, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { $ } from "src/lib/JSelectors"
import { usePomodoroStore } from "../usePomodoroStore"
import useTimer from "./useTimer"
const { default: TimerDigits } = require("./TimerDigits")

const twinkle = keyframes`
  0% {
    transform: scale(1);
  } 100% {
    transform: scale(0.7);
  }
`

const generateStars = (NUM_STARS) => {
  const container = $("#widget-layout")

  if (!container) return []

  const { width, height } = container.getBoundingClientRect() || {}
  const PADDING = 10

  const getRandomCoords = () => {
    const x = Math.random() * (width - PADDING + 0.31)
    const y = Math.random() * (height - PADDING + 0.31)

    return {
      x,
      y,
    }
  }

  const getRandomSize = () => Math.round(Math.max(1, Math.random() * 3))

  const stars = Array(NUM_STARS)
    .fill("-")
    .map(() => ({
      coords: getRandomCoords(),
      size: getRandomSize(),
    }))

  return stars
}

const Stars = memo(({ stars }) =>
  createPortal(
    <>
      {stars.map(({ coords, size }, i) => (
        <Box
          key={i}
          zIndex="0"
          position="absolute"
          top={`${coords.y}px`}
          left={`${coords.x}px`}
          size={`${size}px`}
          bg="#FFF253"
          borderRadius="50%"
          css={{
            filter: `grayscale(${Math.max(50, Math.random() * 100)}%)`,
            animation:
              i % 3 === 0
                ? `${twinkle} 1.2s linear alternate infinite`
                : "none",
            boxShadow:
              i % 7 === 0
                ? "0 0 2px 4px rgba(100, 84, 33, 0.1)"
                : "0 0 1px 2px rgba(100, 84, 33, 0.15)",
          }}
        />
      ))}
    </>,
    $("#widget-underlay")
  )
)

const shootingStarsAnim = {
  default: {
    x: -1000,
    y: 1000,
    opacity: [0, 1],
    transform: {
      scaleX: [0.5, 1, 0],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: Math.max(3, Math.random() * 5 + 5),
      repeatDelay: Math.random() * 5 + 10,
    },
  },
}

const ShootingStars = memo(({ stars, controls }) =>
  createPortal(
    <>
      {stars.map(({ coords }, i) => (
        <LazyMotion key={i} features={domAnimation}>
          <m.div
            animate={controls}
            variants={shootingStarsAnim}
            style={{ position: "absolute", top: coords.x, left: coords.y }}
          >
            <Box
              key={i}
              zIndex="0"
              width="50px"
              height="2px"
              bg="#FFF253"
              borderRadius="50%"
              css={{
                transform: "rotate(-45deg)",
              }}
            />
          </m.div>
        </LazyMotion>
      ))}
    </>,
    $("#widget-underlay")
  )
)

const TimerProvider = ({ Component }) => {
  const { clock } = useTimer()
  const { presetMode, currentPreset } = usePomodoroStore()

  return <Component clock={clock} presetMode={presetMode} {...currentPreset} />
}

const NightSkyTimer = () => {
  const stars = useMemo(() => generateStars(50), [])
  const shootingStars = useMemo(() => generateStars(15), [])
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      x: -1000,
      y: 1000,
      opacity: [0, 1],
      transform: {
        scaleX: [0.5, 1, 0],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: Math.max(3, Math.random() * 5),
        repeatDelay: Math.random() * 5 + 10,
      },
    }))
  }, [controls])

  return (
    <>
      <Stars stars={stars} />
      <ShootingStars stars={shootingStars} controls={controls} />
      <Flex
        // p="md"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="lg"
        width="170px"
        height="110px"
        m="auto"
        css={{ backdropFilter: "blur(3px);" }}
      />
      <TimerProvider Component={TimerDigits} />
    </>
  )
}

export default NightSkyTimer
