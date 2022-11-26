import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import Link from 'next/link'
import Hamburger from 'src/icons/hamburger'

const WidgetMenuButton = ({ href = '/' }) => {
  return (
    <Flex
      size="40px"
      bg="primary.accent-2"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
    >
      <Link href={href}>
        <Icon fill="foreground" width="15px" height="15px" display="flex">
          <Hamburger isOpen={false} />
        </Icon>
      </Link>
    </Flex>
  )
}

export default WidgetMenuButton
