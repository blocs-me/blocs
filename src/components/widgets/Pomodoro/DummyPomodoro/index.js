import Button from "@/design-system/Button"
import Text from "@/design-system/Text"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Timer from "../Timer"
import TimerSvg from "../Timer/TimerSvg"

const { default: WidgetLayout } = require("@/helpers/WidgetLayout")

const DummyPomodoro = () => {
  const clock = {
    minutes: "12",
    seconds: "30",
  }

  return (
    <WidgetLayout onMenuClick={() => {}}>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex
          width="80%"
          height="auto"
          css={{
            position: "relative",
            cursor: "pointer",
            "user-select": "none",
          }}
          onClick={(e) => {}}
        >
          <TimerSvg progress={50} />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width="100%"
            css={{ transform: "translate(-50%, -25%)" }}
          >
            <Flex justifyContent="center" pb="xs">
              <>
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
              </>
            </Flex>
            <Text
              fontSize="xs"
              fontWeight="300"
              color="primary.accent-2"
              textAlign="center"
              mb="0"
              mt="xs"
            >
              <Box
                as="span"
                size="15px"
                display="inline-block"
                borderRadius="xs"
                mr="xxs"
                css={{ verticalAlign: "middle" }}
                bg="success"
              />
              <span css={{ verticalAlign: "middle", marginTop: "-2px" }}>
                work
              </span>
            </Text>
          </Box>
        </Flex>
        <Flex
          justifyContent="center"
          overflow="hidden"
          mt="sm"
          height="var(--height, 40px)"
        >
          <Button
            onClick={(ev) => ev?.stopPropagation()}
            width="100px"
            variant="round"
            height="40px"
            fontSize="xs"
            letterSpacing="sm"
            aria-label="Start or stop timer"
            bg="primary.accent-3"
          >
            {"start"}
          </Button>
        </Flex>
      </Flex>
    </WidgetLayout>
  )
}

export default DummyPomodoro
