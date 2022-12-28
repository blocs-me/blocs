import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'

const CircleButton = ({ onClick, icon }) => {
  return (
    <Flex
      as="button"
      borderRadius="50%"
      bg="background"
      boxShadow="neumorphicDefault"
      color="foreground"
      p={0}
      width="50px"
      height="50px"
      overflow="hidden"
      onClick={(e) => onClick(e)}
      alignItems="center"
      justifyContent="center"
    >
      <Icon stroke="foreground" size="20px" m="auto" display="flex">
        {icon}
      </Icon>
    </Flex>
  )
}

export default CircleButton
