import Flex from '@/helpers/Flex'
import Icon from '@/helpers/Icon'
import { useTheme } from '@emotion/react'
import { useRouter } from 'next/router'
import Hamburger from 'src/icons/hamburger'
import { Theme } from 'src/styles/theme'

const WidgetMenuButton = ({ href = '/', isOpen = false }) => {
  const theme = useTheme() as Theme
  const router = useRouter()

  const handleClick = () => {
    // Only forward auth-related params, not catch-all route params (path, slug)
    const { token, role } = router.query
    const query: Record<string, string | string[]> = {}
    if (token) query.token = token as string
    if (role) query.role = role as string
    router.push({ pathname: href, query })
  }

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
      onClick={handleClick}
    >
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
  )
}

export default WidgetMenuButton
