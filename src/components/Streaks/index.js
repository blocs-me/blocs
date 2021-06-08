/** @jsxImportSource @emotion/react */
import WidgetLayout from "../WidgetLayout"
import Fire from "../../icons/fire.svg"
import Text from "../Text"
import Flex from "../Flex"
import Box from "../Box"
import { useEffect, useState } from "react"

const DonutChart = ({ progress = 25 }) => {
  const circumference = 251.3274
  const [strokeOffset, setStrokeOffset] = useState(circumference)

  useEffect(() => {
    const progressToStrokeOffset =
      circumference - circumference * (progress / 100)
    setStrokeOffset(progressToStrokeOffset)
  }, [])

  return (
    <svg viewBox="0 0 100 100" width="100px" height="100px">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#eaeaea"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#333"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        css={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          transition: "stroke-dashoffset 1s ease-in-out",
        }}
        strokeDasharray={circumference}
        strokeDashoffset={strokeOffset}
      />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontFamily="Karla, sans-serif"
        fontSize="16px"
        fill="#333"
      >
        {progress}%
      </text>
    </svg>
  )
}

const StreakItem = ({
  from = "",
  to = "",
  streak = "",
  progress = 75,
  habit,
}) => (
  <Flex mb="md">
    <DonutChart progress={progress} />
    <Flex
      flexDirection="column"
      pl="sm"
      justifyContent="space-between"
      py="5px"
    >
      <Box>
        <Text
          color="primary.default"
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="sm"
          mb={0}
          lineHeight={1}
        >
          {habit}
        </Text>
        <Text fontSize="xxs" color="primary.default" mb={0}>
          🔥 {streak}
        </Text>
      </Box>
      <Timeline from={from} to={to} />
    </Flex>
    <Box pt="md" />
  </Flex>
)

const Timeline = ({ from = "Jan 1st, 2021", to = "May 1st, 2021" }) => (
  <svg width="77" height="42" viewBox="0 0 77 42">
    <g id="Group_376" transform="translate(-203 -187)">
      <text
        id="Jan_1st_2021"
        transform="translate(251 194)"
        fill="#292929"
        fontSize="8"
        fontFamily="Karla-Regular, Karla"
        letterSpacing="0.08em"
      >
        <tspan x="-26.066" y="0">
          {from}
        </tspan>
      </text>
      <g id="Group_375">
        <path
          id="Path_137"
          d="M3717,1384.479v12.033"
          transform="translate(-3509 -1182.479)"
          fill="none"
          stroke="#292929"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle
          id="Ellipse_16"
          cx="5"
          cy="5"
          r="5"
          transform="translate(203 187)"
        />
        <circle
          id="Ellipse_17"
          cx="5"
          cy="5"
          r="5"
          transform="translate(203 219)"
        />
      </g>
      <text
        id="May_1st_2021"
        transform="translate(252 227)"
        fill="#292929"
        fontSize="8"
        fontFamily="Karla-Regular, Karla"
        letterSpacing="0.08em"
      >
        <tspan x="-27.288" y="0">
          {to}
        </tspan>
      </text>
    </g>
  </svg>
)

const Streaks = () => {
  return (
    <WidgetLayout>
      <Box p="sm" position="relative">
        <Flex alignItems="center">
          <Fire />
          <Box pl="xs" />
          <Text fontSize="sm" fontWeight="bold" mb={0}>
            streaks
          </Text>
        </Flex>
        <Box pt="sm" />
        <Box height="280px" overflowY="scroll">
          <StreakItem
            streak="90 / 120 days"
            progress={75}
            from="Jan 1st, 2021"
            to="May 1st, 2021"
            habit="WORKOUT"
          />
          <StreakItem
            streak="30 / 60 days"
            progress={50}
            from="Jan 1st, 2021"
            to="Feb 1st, 2021"
            habit="SLEEP EARLY"
          />
          <StreakItem
            streak="30 / 60 days"
            progress={50}
            from="Jan 1st, 2021"
            to="Feb 1st, 2021"
            habit="STUDY"
          />
          <StreakItem
            streak="60 / 180 days"
            progress={30}
            from="Jan 1st, 2021"
            to="Jun 1st, 2021"
            habit="GUITAR"
          />
        </Box>
        <Box
          position="absolute"
          bottom="sm"
          left="0"
          width="100%"
          height="50px"
          borderRadius="lg"
          css={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
          }}
        />
      </Box>
    </WidgetLayout>
  )
}

export default Streaks
