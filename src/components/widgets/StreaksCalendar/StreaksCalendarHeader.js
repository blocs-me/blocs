import Text from "@/design-system/Text"

const { default: Flex } = require("@/helpers/Flex")

const StreaksCalendarHeader = ({
  icon = "📖",
  goal = { title: "Study", frequency: "Weekly", day: "Every Sat" },
}) => {
  return (
    <Flex>
      <Flex
        size="32px"
        alignItems="center"
        justifyContent="center"
        css={{ fontSize: "32px" }}
        mr="xs"
        aria-label="icon"
      >
        <span role="img">{icon}</span>
      </Flex>
      <Flex flexDirection="column">
        <Text
          as="h1"
          fontSize="xs"
          fontWeight="600"
          color="primary.accent-3"
          lineHeight={1.25}
          m={0}
          p={0}
        >
          {goal.title}
        </Text>
        <Text
          fontSize="xxs"
          fontWeight="400"
          color="primary.accent-2"
          lineHeight={1.25}
          m={0}
          p={0}
        >
          {goal.frequency} • {goal.day}
        </Text>
      </Flex>
    </Flex>
  )
}

export default StreaksCalendarHeader
