import Text from "@/design-system/Text"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import themeGet from "@styled-system/theme-get"

const PricingCard = ({
  borderColor = "primary.accent-4",
  title,
  summary,
  price,
  priceSummary,
  rotate = 0,
  height = "auto",
  className,
}) => {
  const theme = useTheme()

  return (
    <Flex
      borderRadius="md"
      border="solid 1px"
      height={height}
      p="sm"
      borderColor={borderColor}
      boxShadow={`5px 5px 0 ${themeGet(`colors.${borderColor}`)({ theme })}`}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      css={{ textAlign: "center " }}
      transform={[0, , , , `rotate(${rotate}deg)`]}
      bg="background"
      flex="1"
      // width={["auto", , , "min(100%, 230px)"]}
      {...(className ? { className } : {})}
    >
      <Text fontSize="md" fontWeight="700" as="h3" m="  0" p="0">
        {title}
      </Text>
      <Text fontSize="xs" color="secondary" m={0} lineHeight={1.25}>
        {summary}
      </Text>
      <Text fontSize="xxl" fontWeight="bold" m={0} p={0}>
        ${price}
      </Text>
      <Text fontSize="sm" fontWeight={300} m={0} p={0} lineHeight={1.25}>
        {priceSummary}
      </Text>
    </Flex>
  )
}

export default PricingCard
