import Text from "@/design-system/Text"
import Flex from "@/helpers/Flex"
import Icon from "@/helpers/Icon"
import { useTheme } from "@emotion/react"
import { useMediaQuery } from "beautiful-react-hooks"
import { useMemo } from "react"
import StreakIcon from "./icons/fire.svg"

const CalendarCell = ({ day, isToday, isCurrentMonth, hasStreak, size }) => {
  const isMobile = useMediaQuery("(max-width: 415px)")
  const theme = useTheme()

  const background = useMemo(() => {
    if (isToday) return "success"
    return "none"
  }, [isToday])

  const color = useMemo(() => {
    if (isToday) return "bg.default"
    if (!isCurrentMonth) return "primary.accent-2"
    return "primary.accent-4"
  }, [isToday, isCurrentMonth])

  return (
    <Flex
      borderRadius={["sm", , "md"]}
      // borderWidth={["0px", , "1px"]}
      // borderStyle={["none", , "solid"]}
      // borderColor="primary.accent-1"
      bg={background}
      alignItems="center"
      justifyContent="center"
      size={size}
      flexShrink={0}
    >
      {!hasStreak && (
        <Text fontSize={"xxs"} fontWeight={500} color={color} as="div">
          {day}
        </Text>
      )}
      {hasStreak && (
        <Icon fill={"danger"} size={isMobile ? "15px" : "20px"}>
          <StreakIcon />
        </Icon>
      )}
    </Flex>
  )
}

export default CalendarCell
