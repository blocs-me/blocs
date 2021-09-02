import Text from "@/design-system/Text"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Skeleton from "@/helpers/Skeleton"

import {
  POMODORO_INTERVAL_MODE,
  POMODORO_LONG_BREAK_MODE,
  POMODORO_SHORT_BREAK_MODE,
} from "../pomodoroPresetModes"
import { usePomodoroStore } from "../usePomodoroStore"
import useTimer from "./useTimer"

const TimerDigits = ({ clock, loading, label, labelColor, presetMode }) => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      width="100%"
      css={{ transform: "translate(-50%, -25%)" }}
    >
      <Flex justifyContent="center" pb="xs">
        {!loading && (
          <>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="primary.accent-3"
              lineHeight={0}
              textAlign="right"
              css={{ width: "fit-content" }}
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
          </>
        )}
        {loading && <Skeleton width="100px" height="20px" borderRadius="lg" />}
      </Flex>
      <Text
        fontSize="xs"
        fontWeight="300"
        color="primary.accent-2"
        textAlign="center"
        mb="0"
        mt="xs"
      >
        {!loading && (
          <>
            <Box
              as="span"
              size="15px"
              display="inline-block"
              borderRadius="xs"
              mr="xxs"
              bg="var(--bg)"
              css={{ verticalAlign: "middle" }}
              style={{ "--bg": labelColor }}
            />
            <span css={{ verticalAlign: "middle", marginTop: "-2px" }}>
              {presetMode === POMODORO_INTERVAL_MODE && label}
              {[POMODORO_LONG_BREAK_MODE, POMODORO_SHORT_BREAK_MODE].includes(
                presetMode
              ) && "break"}
            </span>
          </>
        )}
        {loading && (
          <>
            <Skeleton
              as="span"
              height="10px"
              width="30px"
              display="inline-block"
              borderRadius="lg"
              mr="xxs"
              bg="var(--bg)"
              css={{ verticalAlign: "middle" }}
              style={{ "--bg": labelColor }}
            />
          </>
        )}
      </Text>
    </Box>
  )
}
export default TimerDigits
