/** @jsxImportSource @emotion/react */
import Link from "next/link"
import Icon from "@/helpers/Icon"
import Stack from "@/helpers/Stack"
import Box from "@/helpers/Box"
import Text from "@/design-system/Text"

const WidgetMenuItem = ({ href, icon, title }) => {
  return (
    <Box as="li" hoverColor="secondary" css={{ cursor: " pointer" }}>
      <Link href={href}>
        <a css={{ display: "flex", alignItems: "center" }}>
          <Icon size="20px" stroke="primary.accent-3" mr="sm" display="flex">
            {icon}
          </Icon>
          <Text fontSize="md" fontWeight="400" color="primary.accent-3" mb={0}>
            {title}
          </Text>
        </a>
      </Link>
    </Box>
  )
}

const WidgetMenu = ({ menuItems = [], gap = "xs" }) => {
  return (
    <Stack mt={gap} as="ul">
      {menuItems.map((item, id) => (
        <WidgetMenuItem key={id} {...item} />
      ))}
    </Stack>
  )
}

export default WidgetMenu
