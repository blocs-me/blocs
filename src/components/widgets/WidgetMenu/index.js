/** @jsxImportSource @emotion/react */
import Link from "next/link"
import Icon from "@/helpers/Icon"
import Stack from "@/helpers/Stack"
import Box from "@/helpers/Box"
import Text from "@/design-system/Text"

const WidgetMenuItem = ({ href, itemIcon, title, iconProps = {} }) => {
  return (
    <Box as="li" hoverColor="primary.accent-2" css={{ cursor: " pointer" }}>
      <Link href={href}>
        <a css={{ display: "flex", alignItems: "center" }}>
          <Icon
            size="20px"
            stroke="primary.accent-3"
            mr="sm"
            display="flex"
            {...iconProps}
          >
            {itemIcon}
          </Icon>
          <Text
            fontSize="md"
            fontWeight="400"
            color="primary.accent-3"
            lineHeight={1.5}
            mb={0}
          >
            {title}
          </Text>
        </a>
      </Link>
    </Box>
  )
}

const WidgetMenu = ({ menuItems = [], gap = "sm" }) => {
  return (
    <Stack mt={gap} as="ul">
      {menuItems.map((item, id) => (
        <WidgetMenuItem key={id} {...item} />
      ))}
    </Stack>
  )
}

export default WidgetMenu
