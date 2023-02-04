import Button from '@/design-system/Button'
import Nav from '@/design-system/Nav'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import useUser from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AccountDeletionPage = () => {
  const router = useRouter()
  const supabase = useSupabaseClient()

  useEffect(() => {
    supabase.auth.refreshSession()
    supabase.auth.signOut()
  }, [!!supabase.auth]) // eslint-disable-line

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
        maxWidth="500px"
      >
        <Text variant="mediumBold" textAlign="center">
          Sorry to see you go! 😭
        </Text>
        <Text variant="pSmall" textAlign="center" mt="xs" lineHeight="sm">
          Your account and all associated data (e.g. widget analytics, purchase
          and payment info) has been deleted and is no longer recoverable.
        </Text>
        <Text variant="pSmall" textAlign="center" mt="xxs">
          Please note : if you choose to sign in again at a later point through
          the same email your data will no longer be available.
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
