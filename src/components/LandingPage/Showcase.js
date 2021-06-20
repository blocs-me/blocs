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

const getNotionAuthURL = () => encodeURI("")

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

const ShowCaseItem = ({ Component1, Component2, passProps, title = "" }) => (
  <Flex
    flexDirection={["column", "column", "", "", "row"]}
    css={{ transform: "scale(0.7)" }}
  >
    <Component1 {...passProps} />
    {Component2 && (
      <>
        <Box pl={[0, 0, "", "", "md"]}>
          <Component2 {...passProps} />
        </Box>
      </>
    )}
  </Flex>
)

const PomodoroShowcase = () => (
  <ShowCaseItem Component1={Pomodoro} Component2={Analytics} title="POMODORO" />
)
const HabitTrackerShowcase = () => (
  <ShowCaseItem
    Component1={HabitTracker}
    Component2={Streaks}
    title="HABIT TRACKER"
  />
)
const WaterTrackerShowcase = () => (
  <ShowCaseItem
    Component1={WaterTracker}
    passProps={{ startingVolume: 2 }}
    title="WATER TRACKER"
  />
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
              {<Component />}
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
    >
      <Box mx="auto" width="100%" position="relative">
        {mappedItems(showcaseIndex)}
      </Box>
      <Flex px="xs" width="100%" alignItems="center" position="relative">
        <Icon width="90px" as="button" p={0} m={0} onClick={() => togglePlay()}>
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
