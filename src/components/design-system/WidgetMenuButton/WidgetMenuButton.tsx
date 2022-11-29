import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import { useTheme } from '@emotion/react'
import Link from 'next/link'
import Hamburger from 'src/icons/hamburger'
import { Theme } from 'src/styles/theme'

const WidgetMenuButton = ({ href = '/', isOpen = false }) => {
  const theme = useTheme() as Theme
  return (
    <Flex
      size="40px"
      bg="primary.accent-2"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      css={{
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
        ':hover': { boxShadow: theme.shadows.default }
      }}
    >
      <Link href={href} css={{ width: '100%', height: '100%' }} passHref>
        <Flex as="a" size="100%">
          <Icon
            m="auto"
            fill="foreground"
            width="15px"
            height="15px"
            display="flex"
          >
            <Hamburger isOpen={isOpen} />
          </Icon>
        </Flex>
      </Link>
    </Flex>
  )
}

export default WidgetMenuButton
