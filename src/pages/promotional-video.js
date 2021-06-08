/** @jsxImportSource @emotion/react */

import { css, Global, keyframes } from "@emotion/react"
import { motion } from "framer-motion"
import { animate } from "popmotion"
import { useEffect, useState } from "react"
import Analytics from "../components/Analytics"
import Box from "../components/Box"
import Flex from "../components/Flex"
import HabitTracker from "../components/HabitTracker"
import Pomodoro from "../components/Pomodoro"
import Streaks from "../components/Streaks"
import Text from "../components/Text"
import WaterTracker from "../components/WaterTracker"
import Notion from "../icons/notion.svg"

const typeAnim = keyframes`
 100% {
   width: 100%;
 }
`

const fadeAnim = keyframes`
  100% {
    opacity: 0;
  }
`

const slideOut = keyframes`
  100% {
    opacity: 0;
    transform: translate(25px);
  }
`

const fadeIn = keyframes`
  0% {
      transform: translateY(25px);
      opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`

const slideUp = (translateY) => keyframes`
  100% {
    transform: translateY(${translateY});
  }
`

const Mark = ({ children }) => (
  <Text as="span" color="secondary">
    {children}
  </Text>
)

const TypeAnim = ({
  duration,
  steps,
  children,
  delay = "0s",
  textProps = {},
}) => (
  <Box
    css={{
      animation: `${typeAnim} ${duration} steps(${steps}) ${delay} forwards`,
    }}
    width="0%"
    overflow="hidden"
  >
    <Text
      color="primary.light"
      fontWeight="300"
      {...textProps}
      css={{ whiteSpace: "nowrap" }}
    >
      {children}
    </Text>
  </Box>
)

const Center = ({ children }) => (
  <Box
    position="absolute"
    top="50%"
    left="50%"
    css={{ transform: "translate(-50%, -50%)" }}
  >
    {children}
  </Box>
)

const HabitTrackerAnim = () => {
  return (
    <Center>
      <div css={{ animation: `${fadeAnim} 1.5s ease 4s forwards` }}>
        <Flex
          flexDirection="column"
          css={{ animation: `${fadeIn} 1.5s ease forwards`, opacity: 0 }}
        >
          <Text fontWeight="bold" fontSize="md" letterSpacing="sm">
            HABIT TRACKER
          </Text>
          <Flex>
            {/* <Box css={{ transform: "translateY(32px)" }}> */}
            <HabitTracker />
            {/* </Box> */}
            <Box pl="md" />
            <Streaks />
          </Flex>
          <Box mt="md">
            <TypeAnim duration="2s" steps="43" p={0} m={0}>
              get <Mark>inspired</Mark> by maintaining your{" "}
              <Mark>🔥 streaks</Mark>
            </TypeAnim>
          </Box>
        </Flex>
      </div>
    </Center>
  )
}

const PomorodoAnim = () => {
  return (
    <Center>
      <div css={{ animation: `${fadeAnim} 1.5s ease 3.5s forwards` }}>
        <Flex
          flexDirection="column"
          css={{ animation: `${fadeIn} 1.5s ease forwards`, opacity: 0 }}
        >
          <Text fontWeight="bold" fontSize="md" letterSpacing="sm">
            POMODORO
          </Text>
          <Flex>
            {/* <Box css={{ transform: "translateY(32px)" }}> */}
            <Pomodoro />
            {/* </Box> */}
            <Box pl="md" />
            <Analytics />
          </Flex>
          <Box mt="md">
            <TypeAnim duration="2s" steps="40" p={0} m={0}>
              <Mark>improve</Mark> with amazing <Mark>📊 insights</Mark> on your
              activity
            </TypeAnim>
          </Box>
        </Flex>
      </div>
    </Center>
  )
}

const WaterTrackerAnim = () => {
  const [volume, setVolume] = useState(1)

  useState(() => {
    setTimeout(() => setVolume(0), 500)
  }, [])

  return (
    <Center>
      <div css={{ animation: `${fadeAnim} 1s ease 4.5s forwards` }}>
        <Flex
          flexDirection="column"
          css={{ animation: `${fadeIn} 1.5s ease forwards`, opacity: 0 }}
        >
          <Text fontWeight="bold" fontSize="md" letterSpacing="sm">
            WATER TRACKER
          </Text>
          <Flex>
            <WaterTracker startingVolume={volume} />
            <Box pl="md" />
            <Analytics
              title="water intake"
              yAxis={["0 L", "1 L", "2 L", "3 L", "4 L"]}
              total="8 L"
            />
          </Flex>
          <Box mt="md">
            <TypeAnim duration="2s" steps="44" p={0} m={0}>
              a super <Mark>fun</Mark> way to keep yourself{" "}
              <Mark>💧 hydrated</Mark>
            </TypeAnim>
          </Box>
        </Flex>
      </div>
    </Center>
  )
}

const Intro = () => (
  <>
    <Center>
      <div css={{ animation: `${fadeAnim} 1s ease 4.5s forwards` }}>
        <div
          css={{ animation: `${slideUp("-100px")} 0.5s ease 2.5s forwards` }}
        >
          <Flex
            justifyContent="center"
            overflow="hidden"
            width="0%"
            css={{ animation: `${typeAnim} 1.5s steps(23) forwards` }}
            flexDirection="column"
          >
            <Text
              fontWeight="bold"
              as="h1"
              css={{
                whiteSpace: "nowrap",
              }}
              pt="xxs"
            >
              Build better habits inside{" "}
              <Box
                as="span"
                bg="primary.lightest"
                px="sm"
                py="sm"
                borderRadius="md"
              >
                <Notion
                  css={{ verticalAlign: "middle", transform: "scale(0.8)" }}
                />
                <Text fontSize="lg" as="span">
                  Notion
                </Text>
              </Box>
            </Text>
          </Flex>
        </div>
      </div>
    </Center>
    <Center>
      <div
        css={{
          animation: `${slideUp("0px")} 0.5s ease 2.5s forwards`,
          transform: "translateY(50px)",
        }}
      >
        <div css={{ animation: `${fadeAnim} 1s ease 4.5s forwards` }}>
          <Flex
            justifyContent="center"
            overflow="hidden"
            width="0%"
            css={{ animation: `${typeAnim} 1.5s steps(26) 2.5s forwards` }}
            flexDirection="column"
          >
            <Text
              fontWeight="bold"
              as="h1"
              css={{
                whiteSpace: "nowrap",
              }}
            >
              with our beautiful{" "}
              <Text as="span" color="secondary">
                widgets
              </Text>
            </Text>
          </Flex>
        </div>
      </div>
    </Center>
  </>
)

const BlocksLogoAnim = () => {
  return (
    <>
      <motion.div
        animate={{ y: [0, 0, 0, -100] }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{
            rotate: [0, 30, 0],
            opacity: [0, 1],
            scale: [0, 3, 2],
          }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 0,
            damping: 50,
          }}
        >
          <svg width="69.851" height="83.07" viewBox="0 0 69.851 83.07">
            <g
              id="Group_147"
              data-name="Group 147"
              transform="translate(0 118.981)"
            >
              <path
                id="Path_75"
                data-name="Path 75"
                d="M1.792-76.767H26.113v-24.321H1.792Z"
                transform="translate(0 -4.972)"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3.584"
                fill-rule="evenodd"
              />
              <path
                id="Path_76"
                data-name="Path 76"
                d="M56.514-117.189l-23.491,6.294L39.318-87.4,62.809-93.7Z"
                transform="translate(-9.644)"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3.584"
                fill-rule="evenodd"
              />
              <path
                id="Path_77"
                data-name="Path 77"
                d="M39.115-63.154H14.8l0,24.321H39.113Z"
                transform="translate(-4.014 -16.685)"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3.584"
                fill-rule="evenodd"
              />
              <path
                id="Path_78"
                data-name="Path 78"
                d="M39.455-21.8,62.947-15.5l6.295-23.492L45.75-45.287Z"
                transform="translate(-11.63 -22.202)"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3.584"
                fill-rule="evenodd"
              />
              <path
                id="Path_79"
                data-name="Path 79"
                d="M62.477-55.3H86.8V-79.625H62.477Z"
                transform="translate(-18.738 -11.599)"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3.584"
                fill-rule="evenodd"
              />
              <text
                id="b"
                transform="translate(7.956 -88.116)"
                fill="#fff"
                font-size="17"
                font-family="Helvetica-Bold, Helvetica"
                font-weight="700"
              >
                <tspan x="0" y="0">
                  b
                </tspan>
              </text>
              <text
                id="l"
                transform="translate(36.91 -97.442) rotate(-15.009)"
                fill="#fff"
                font-size="15"
                font-family="Helvetica-Bold, Helvetica"
                font-weight="700"
              >
                <tspan x="0" y="0">
                  l
                </tspan>
              </text>
              <text
                id="s"
                transform="translate(18.332 -64.552) rotate(0.009)"
                fill="#fff"
                font-size="16"
                font-family="Helvetica-Bold, Helvetica"
                font-weight="700"
              >
                <tspan x="0" y="0">
                  s
                </tspan>
              </text>
              <text
                id="c"
                transform="matrix(0.966, 0.259, -0.259, 0.966, 35.865, -49.328)"
                fill="#fff"
                font-size="15"
                font-family="Helvetica-Bold, Helvetica"
                font-weight="700"
              >
                <tspan x="0" y="0">
                  c
                </tspan>
              </text>
              <text
                id="o"
                transform="translate(50.202 -74.951)"
                fill="#fff"
                font-size="17"
                font-family="Helvetica-Bold, Helvetica"
                font-weight="700"
              >
                <tspan x="0" y="0">
                  o
                </tspan>
              </text>
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </>
  )
}

const Outro = () => {
  return (
    <>
      <Center>
        <BlocksLogoAnim />
      </Center>
      <Center>
        <TypeAnim
          steps={20}
          duration="1s"
          delay="2s"
          textProps={{
            fontSize: "lg",
            color: "primary.default",
            fontWeight: "bold",
            px: "sm",
            mt: "lg",
          }}
        >
          build better habits with <Mark>blocs</Mark>{" "}
          <motion.div
            css={{ display: "inline-block" }}
            animate={{ scale: [1, 1.2, 0.9, 1.25, 1] }}
            transition={{ duration: 0.5, delay: 4 }}
          >
            💜
          </motion.div>
        </TypeAnim>
      </Center>
    </>
  )
}

const PromotionalVideo = () => {
  const [showIntro, setShowIntro] = useState(true)
  const [showPom, setShowPom] = useState(false)
  const [showHabit, setShowHabit] = useState(false)
  const [showWaterTracker, setShowWaterTracker] = useState(false)
  const [showOutro, setShowOutro] = useState(false)

  useEffect(() => {
    const pomInterval = setTimeout(() => setShowPom(true), 5500)
    const habitInterval = setTimeout(() => setShowHabit(true), 11000)
    const waterInterval = setTimeout(() => setShowWaterTracker(true), 17000)
    const outroInterval = setTimeout(() => setShowOutro(true), 22000)

    return () => {
      clearTimeout(introInterval)
      clearTimeout(pomInterval)
      clearTimeout(habitInterval)
      clearTimeout(waterInterval)
      clearTimeout(outroInterval)
    }
  }, [])

  const startAnimation = () => {
    // setShowIntro(false)
    // setShowIntro(true)
  }

  return (
    <Box width="100vw" height="100vh" onClick={() => startAnimation()}>
      <Global
        styles={css`
          html {
            cursor: url("./cursor.png");
          }
        `}
      />
      {showIntro && <Intro onAnimationEnd={() => setShowIntro(false)} />}
      {showPom && <PomorodoAnim />}
      {showHabit && <HabitTrackerAnim />}
      {showWaterTracker && <WaterTrackerAnim />}
      {showOutro && <Outro />}
    </Box>
  )
}

export default PromotionalVideo
