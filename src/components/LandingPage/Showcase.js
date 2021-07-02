/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion"
import Analytics from "../Analytics"
import Box from "../Box"
import HabitTracker from "../HabitTracker"
import Pomodoro from "../Pomodoro"
import Streaks from "../Streaks"
import WaterTracker from "../WaterTracker"
import Play from "../../icons/play.svg"
import Pause from "../../icons/pause.svg"
import Icon from "../Icon"
import Flex from "../Flex"
import Text from "../Text"
import Stack from "../Stack"
import fadeIn from "../../keyframes/fadeIn"

const SlideIndicator = ({ currentIndex, numberOfItems = 3, setIndex }) => (
  <Stack display="flex" ml="xs">
    {Array(numberOfItems)
      .fill("")
      .map((_, i) => (
        <Box
          as="button"
          key={i}
          onClick={() => setIndex(i)}
          p={0}
          css={{
            transform: `scale(${currentIndex === i ? 1 : 0.85})`,
            transition: "transform 0.2s ease, color 0.2s ease",
          }}
          size="8px"
          borderRadius="50%"
          bg={currentIndex === i ? "secondary" : "primary.lightest"}
        />
      ))}
  </Stack>
)

const showcaseItems = [
  { id: 0, Component: Pomodoro, title: "POMODORO" },
  { id: 1, Component: Analytics, title: "ANALYTICS" },
  { id: 2, Component: HabitTracker, title: "HABIT TRACKER" },
  { id: 3, Component: Streaks, title: "STREAKS" },
  { id: 4, Component: WaterTracker, title: "WATER TRACKER" },
]

const mappedItems = (index) =>
  showcaseItems.map(({ Component, id, title }) => (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      css={{ transform: "translate(-50%, -50%)" }}
      height="100%"
      key={id}
    >
      <AnimatePresence>
        {index === id && (
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0, rotate: 0, x: 800, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, type: "spring" }}
              exit={{ x: -800 }}
              transition={{ duration: 1 }}
            >
              <Text fontSize="md" mb="sm" textAlign="center" fontWeight="bold">
                {title}
              </Text>
              {<Component startingVolume={2} />}
            </m.div>
          </LazyMotion>
        )}
      </AnimatePresence>
    </Box>
  ))

const Showcase = () => {
  const [play, setPlay] = useState(true)
  const [showcaseIndex, setShowcaseIndex] = useState(0)
  const togglePlay = () => setPlay(!play)

  useEffect(() => {
    const timer =
      play &&
      setTimeout(() => {
        showcaseIndex + 1 === showcaseItems.length
          ? setShowcaseIndex(0)
          : setShowcaseIndex(showcaseIndex + 1)
      }, 5000)

    return () => clearInterval(timer)
  }, [showcaseIndex, play])

  const setIndex = (i) => {
    setPlay(false)
    setShowcaseIndex(i)
  }

  return (
    <Flex
      width="100%"
      minHeight="500px"
      height="auto"
      bg="background"
      borderRadius="lg"
      boxShadow="md"
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
      overflow="hidden"
      css={{
        animation: `${fadeIn} 0.5s ease 1.3s forwards`,
        opacity: 0,
      }}
    >
      <Box
        mx="auto"
        width="100%"
        position="relative"
        onClick={() => setPlay(false)}
      >
        {mappedItems(showcaseIndex)}
      </Box>
      <Flex px="xs" width="100%" alignItems="center" position="relative">
        <Icon
          width="90px"
          as="button"
          p={0}
          m={0}
          onClick={() => togglePlay()}
          aria-label="Play or Pause Button"
          aria-pressed={play}
        >
          {!play && <Play />}
          {play && <Pause />}
        </Icon>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          css={{ transform: "translate(-50%, -50%)" }}
        >
          <SlideIndicator
            numberOfItems={showcaseItems.length}
            currentIndex={showcaseIndex}
            setIndex={(i) => setIndex(i)}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Showcase
