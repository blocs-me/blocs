/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext, useRef } from "react"
import TimerSvg from "./TimerSvg"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Text from "@/design-system/Text"
import { usePomodoroStore } from "../usePomodoroStore"
import useTimer from "./useTimer"

const Timer = () => {
  const { clock, percentProgressed } = useTimer()

  return (
    <Flex width="80%" height="auto" css={{ position: "relative" }}>
      <TimerSvg progress={percentProgressed} />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="100%"
        css={{ transform: "translate(-50%, -25%)" }}
      >
        <Flex justifyContent="center" mb="xs">
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="primary.accent-3"
            lineHeight={0}
            textAlign="right"
            css={{ width: "2ch" }}
            m={0}
          >
            {clock.minutes}
          </Text>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="primary.accent-3"
            lineHeight={0}
            textAlign="center"
            css={{ width: "1ch" }}
            m={0}
          >
            :
          </Text>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="primary.accent-3"
            lineHeight={0}
            textAlign="left"
            css={{ width: "2ch" }}
            m={0}
          >
            {clock.seconds}
          </Text>
        </Flex>
        <Text
          fontSize="xs"
          fontWeight="300"
          color="primary.accent-2"
          textAlign="center"
          m="0"
        >
          <Box
            as="span"
            size="7px"
            display="inline-block"
            borderRadius="xs"
            mr="xxs"
            bg="blue"
          />
          work
        </Text>
      </Box>
    </Flex>
  )
}

export default Timer
