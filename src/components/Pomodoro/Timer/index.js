/** @jsxImportSource @emotion/react */

import { useTheme } from "@emotion/react"
import Box from "../../Box"
import Flex from "../../Flex"
import Text from "../../Text"
import TimerSvg from "./TimerSvg"

const formatMillisecondsForClock = (ms) => {
  const minutes = Math.floor(ms / (1000 * 60))
  const seconds = Math.floor((ms / (1000 * 60) - minutes) * 60)

  return {
    mins: `${minutes < 10 ? "0" + minutes : minutes}`,
    secs: `${seconds < 10 ? "0" + seconds : seconds}`,
  }
}

const Timer = ({ progressInMilliseconds, progress }) => (
  <Flex width="80%" height="auto" css={{ position: "relative" }}>
    <TimerSvg progress={progress} />
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
          color="primary.default"
          lineHeight={0}
          textAlign="right"
          css={{ width: "2ch" }}
          m={0}
        >
          {formatMillisecondsForClock(progressInMilliseconds).mins}
        </Text>
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="primary.default"
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
          color="primary.default"
          lineHeight={0}
          textAlign="left"
          css={{ width: "2ch" }}
          m={0}
        >
          {formatMillisecondsForClock(progressInMilliseconds).secs}
        </Text>
      </Flex>
      <Text
        fontSize="xs"
        fontWeight="300"
        color="primary.light"
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

export default Timer
