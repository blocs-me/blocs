import Button from '@/design-system/Button'
import Nav from '@/design-system/Nav'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import { useRouter } from 'next/router'

const AccountDeletionPage = () => {
  const router = useRouter()

  return (
    <Flex
      width="100vw"
      minHeight="100vh"
      position="relative"
      bg="background"
      pt="80px"
    >
      <Nav />
      <Flex
        m="auto"
        flexDirection="column"
        bg="primary.accent-2"
        borderRadius="md"
        py="md"
        px="lg"
      >
        <Text variant="mediumBold" textAlign="center">
          Sorry to see you go! 😭
        </Text>
        <Text variant="pSmall" textAlign="center" mt="xxs">
          Your account is scheduled for deletion and will take 2-3 weeks
        </Text>

        <Button
          mt="md"
          variant="success"
          borderRadius="md"
          onClick={() => router.push('/')}
        >
          Go to homepage
        </Button>
      </Flex>
    </Flex>
  )
}

export default AccountDeletionPage
