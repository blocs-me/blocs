import Button from '@/design-system/Button'
import Footer from '@/design-system/Footer'
import Nav from '@/design-system/Nav'
import useNotifications from '@/design-system/Notifications/useNotifications'
import Text from '@/design-system/Text'
import TextInput from '@/design-system/TextInput'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import storage from '@/utils/storage'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BlocsLogo } from 'src/icons/blocs-logo'
import { isEmail } from 'validator'
import useSignInRedirectLink from '../../widgets/HabitTracker/hooks/useSignInRedirectLink'

const SignInPage = () => {
  const emailRedirectLink = useSignInRedirectLink()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const [linkSent, setLinkSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = useSupabaseClient()
  const notif = useNotifications()
  const user = useUser()
  const router = useRouter()
  const [lastSignedInAt, setLastSignedInAt] = useState(
    storage.getItem('lastSignedInAt')
  )

  const shouldPreventSignIn = lastSignedInAt
    ? (new Date().getTime() - new Date(lastSignedInAt).getTime()) /
        (1000 * 60) <
      1
    : false

  const handleSignIn = handleSubmit(async ({ email }) => {
    setIsLoading(true)
    storage.setItem('lastSignedInAt', new Date().toISOString())
    setLastSignedInAt(new Date().toISOString())

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: emailRedirectLink
      }
    })

    if (error) {
      console.error(error)
      notif.createError(
        'Uh oh! we were not able to create your sign in link.',
        8000
      )
    } else {
      setLinkSent(true)
    }

    setIsLoading(false)
  })

  useEffect(() => {
    if (user?.aud === 'authenticated') {
      router.push('/dashboard/pomodoro')
    }
  }, [user?.aud, router])

  return (
    <Flex
      flexDirection="column"
      maxWidth="100vw"
      minHeight="100vh"
      height="100%"
      bg="background"
    >
      <Nav />
      <Flex width="100%" height="100vh" py="xl" px="md" justifyContent="center">
        <Flex flexDirection="column" width="400px" alignItems="center">
          <Link href="/" passHref>
            <Box size="40px" mb="md" as="a">
              <BlocsLogo />
            </Box>
          </Link>

          <Text
            as="h1"
            color="foreground"
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
            mb="xs"
          >
            Sign In
          </Text>
          <Text fontSize="md" color="primary.accent-4" textAlign="center">
            {storage.getItem('prevLoggedIn') === 'yes'
              ? 'Welcome Back!'
              : 'No password is required to sign in !'}
          </Text>
          <Box mt="sm" />
          <form onSubmit={handleSignIn} css={{ width: '100%' }}>
            <TextInput
              css={{ width: '100%' }}
              ariaLabel="Email Input for Sign Up or Sign In"
              placeholder="Enter your email"
              {...register('email', {
                required: true,
                validate: (str: string) => isEmail(str)
              })}
              error={errors?.email ? 'Please enter a valid email' : ''}
            />
            <Button
              px="xxs"
              py="xs"
              borderRadius="md"
              width="100%"
              bg="brand.accent-1"
              fontSize="sm"
              type="submit"
              color="neutral.white"
              mt="sm"
              disabled={linkSent || shouldPreventSignIn}
              loading={isLoading}
            >
              Continue
            </Button>
          </form>

          {(linkSent || shouldPreventSignIn) && (
            <Flex
              width="100%"
              p="sm"
              borderRadius="md"
              bg="primary.accent-2"
              mt="md"
            >
              <Text
                fontSize="sm"
                color="primary.accent-4"
                textAlign={'center'}
                mb={0}
              >
                We&#39;ve emailed you a magic link for a password free sign in.
                ✨
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  )
}

export default SignInPage
