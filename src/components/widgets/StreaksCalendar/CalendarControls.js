const { default: Box } = require("@/helpers/Box")
const { default: Flex } = require("@/helpers/Flex")
const { default: styled } = require("@emotion/styled")
import Button from "@/design-system/Button"
import Text from "@/design-system/Text"
import Grid from "@/helpers/Grid"
import Icon from "@/helpers/Icon"
import Stack from "@/helpers/Stack"
import { useTheme } from "@emotion/react"
import ArrowIcon from "../../../icons/arrow.svg"

const ControlButton = ({ onClick, sx }) => {
  const theme = useTheme()

  return (
    <Box
      as="button"
      size={["20px", , "30px"]}
      background={"bg.default"}
      borderRadius={["sm", , "md"]}
      border="solid 1px"
      borderColor="primary.accent-1"
      onClick={() => onClick()}
      css={{
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: theme["shadows"]["sm"],
        },
      }}
    >
      <Icon
        css={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          ...sx,
        }}
        fill="primary.accent-4"
        height="9px"
      >
        <ArrowIcon />
      </Icon>
    </Box>
  )
}
const CalendarControls = ({ nextMonth, prevMonth, currentDate, setToday }) => {
  const locale = "en-GB"
  const monthAndYear = currentDate
    .toLocaleString(locale, {
      year: "numeric",
      month: "short",
    })
    .split(" ")
    .join(", ")

  return (
    <Grid
      width="100%"
      gridTemplateColumns="repeat(3,1fr)"
      justifyContent="center"
      alignItems="center"
    >
      <Stack ml="sm">
        <ControlButton
          onClick={prevMonth}
          sx={{ transform: "rotate(-0.5turn)" }}
        />
        <ControlButton onClick={nextMonth} />
      </Stack>
      <Text
        textAlign="center"
        fontSize={["xxs", , "xs"]}
        color="primary.accent-2"
        p={0}
        m={0}
      >
        {monthAndYear}
      </Text>
      <Button
        css={{ justifySelf: "end" }}
        bg="primary.accent-1"
        borderRadius="lg"
        fontSize={["xxs", , "xs"]}
        py="xxs"
        px="xs"
        onClick={() => setToday()}
      >
        Today
      </Button>
    </Grid>
  )
}

export default CalendarControls
