import Flex from "@/helpers/Flex"
import Icon from "@/helpers/Icon"
import Text from "@/design-system/Text"

const MenuHeader = ({ icon: i = () => <div />, title = "enter title" }) => (
  <Flex p="sm" alignItems="center" justifyContent="start">
    <Icon size="22px" stroke="primary.accent-4" mr="xs" display="flex" css={{ verticalAlign: "center"}}>
      {i}
    </Icon>
    <Text color="primary.accent-4" fontWeight="500" m={0}>
      {title}
    </Text>
  </Flex>
)

export default MenuHeader
