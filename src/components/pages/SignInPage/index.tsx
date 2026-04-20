import nextSeoConfig from '@/constants/next-seo.config'
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
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BlocsLogo } from 'src/icons/blocs-logo'
import { isEmail } from 'validator'
import useSignInRedirectLink from '../../widgets/HabitTracker/hooks/useSignInRedirectLink'
import Icon from '@/helpers/Icon'
import Email from '../../../icons/email.svg'

const SignInPage = () => {
  const emailRedirectLink = useSignInRedirectLink()

  const {
    register,
    formState: { errors },
    getValues,
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

  const isReturningUser = storage.getItem('prevLoggedIn') === 'yes'
  const isFromLanding = router.query.from === 'landing'

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
        'We could not send a sign-in link. You can only request one link per minute.',
        15000
      )
    } else {
      setLinkSent(true)
    }

    setIsLoading(false)
  })

  useEffect(() => {
    if (user?.aud === 'authenticated') {
      router.push('/dashboard')
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
      <NextSeo
        {...nextSeoConfig}
        title="Sign In — Blocs"
        description="Sign in to your Blocs account to customize your Notion widgets. No password required — we'll send you a magic link."
        canonical="https://blocs.me/sign-in"
      />
      <Nav />
      <Flex width="100%" height="100vh" py="xl" px="md" justifyContent="center">
        <Flex flexDirection="column" width="400px" alignItems="center">
          <Link href="/">
            <Box size="40px" mb="md">
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
            {isFromLanding ? 'Start embedding Notion widgets' : 'Sign in to Blocs'}
          </Text>
          <Text fontSize="md" color="primary.accent-4" textAlign="center" m={0}>
            {isFromLanding
              ? 'Enter your email to get started. We\'ll send a magic link — no password needed.'
              : isReturningUser
                ? 'Welcome back! Enter your email for a sign-in link.'
                : 'Enter your email and we\'ll send you a sign-in link. No password needed.'}
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
              className="plausible-event-name=Sign+In+Submit"
              px="xxs"
              py="xs"
              borderRadius="md"
              width="100%"
              bg="brand.accent-1"
              fontSize="sm"
              type="submit"
              color="neutral.white"
              mt="sm"
              loading={isLoading}
            >
              Continue
            </Button>
          </form>

          {linkSent && (
            <Flex
              width="100%"
              p="sm"
              borderRadius="md"
              bg="primary.accent-2"
              mt="md"
              flexDirection="column"
              alignItems="center"
            >
              <Icon fill="primary.accent-4" width="40px" height="40px" mb="xs">
                <Email />
              </Icon>
              <Text
                fontSize="sm"
                fontWeight="bold"
                color="foreground"
                textAlign="center"
                mb="xxs"
              >
                Check your inbox
              </Text>
              <Text
                fontSize="sm"
                color="primary.accent-4"
                textAlign="center"
                mb={0}
                lineHeight={1.5}
              >
                We sent a sign-in link to{' '}
                <strong>{getValues('email')}</strong>.
                Click the link to sign in — it expires in 1 hour.
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
