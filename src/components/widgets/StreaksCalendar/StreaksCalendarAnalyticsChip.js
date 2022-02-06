import Text from "@/design-system/Text"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"

const Container = ({
  width = "auto",
  p = "xxs",
  height = "auto",
  flexDirection = "column",
  alignItems = "center",
  justifyContent = "center",
  children,
}) => (
  <Flex
    border="solid 1px"
    borderColor="primary.accent-1"
    borderRadius="md"
    p={p}
    width={width}
    height={height}
    flexDirection={flexDirection}
    alignItems={alignItems}
    justifyContent={justifyContent}
  >
    {children}
  </Flex>
)

const TitleAndSummary = ({
  title,
  summary,
  pl,
  pt,
  textAlign = ["center", , "left"],
}) => {
  return (
    <Box pl={pl} pt={pt}>
      <Text
        m={0}
        fontSize="xxs"
        color="primary.accent-4"
        lineHeight={1}
        textAlign={textAlign}
      >
        {title}
      </Text>
      <Text
        m={0}
        textAlign={textAlign}
        fontSize="xxs"
        fontWeight="300"
        color="primary.accent-2"
        lineHeight={1.25}
        whiteSpace={"nowrap"}
      >
        {summary}
      </Text>
    </Box>
  )
}

const StreaksCalendarAnalyticsChip = {
  Container,
  TitleAndSummary,
}

export default StreaksCalendarAnalyticsChip
