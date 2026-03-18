import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import PageLayout from '@/helpers/PageLayout'
import Box from '@/helpers/Box'
import Nav from '@/design-system/Nav'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import TextInput from '@/design-system/TextInput'
import Button from '@/design-system/Button'
import Link from 'next/link'
import Icon from '@/helpers/Icon'
import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import storage from '@/utils/storage'
import { useRouter } from 'next/router'
import useSignInRedirectLink from '../../widgets/HabitTracker/hooks/useSignInRedirectLink'
import LandingDemo from './LandingDemo'
import Email from '../../../icons/email.svg'
import PomodoroSection from './PomodoroSection'
import WaterTrackerSection from './WaterTrackerSection'
import HabitTrackerSection from './HabitTrackerSection'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import Footer from '@/design-system/Footer'

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === 'yes'

const LandingPage = () => {
  const emailRedirectLink = useSignInRedirectLink()
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors }
  } = useForm()
  const supabase = useSupabaseClient()
  const user = useUser()
  const [disableSignUp, setDisableSignUp] = useState(false)
  const [signUpError, setSignUpError] = useState(false)
  const router = useRouter()

  const goToDashboard = () => router.push('/dashboard/pomodoro')

  const [invitedAt, setInvitedAt] = useState(0)
  useEffect(() => {
    const cachedInvite = storage.getItem('invited')

    if (cachedInvite) {
      const timeDiff =
        new Date().getDate() - new Date(Number(cachedInvite)).getDate()
      const tenMins = 1000 * 60 * 10
      if (tenMins < timeDiff) setInvitedAt(Number(cachedInvite))
    }
  }, [])

  const onSubmit = handleSubmit(async (formState) => {
    setDisableSignUp(true)
    const { data, error } = await supabase.auth.signInWithOtp({
      email: formState.email,
      options: {
        emailRedirectTo: emailRedirectLink
      }
    })

    if (error) {
      setSignUpError(true)
    } else {
      setInvitedAt(new Date().getTime())
      storage.setItem('invited', new Date().getTime())
    }

    setDisableSignUp(false)
  })

  return (
    <BlocsThemeProvider>
      <Box bg="background" height="fit-content">
        <PageLayout>
          <Head>
            <title>Blocs — Notion Widgets for Focus & Habits</title>
            <meta
              name="description"
              content="Stay focused inside Notion with Pomodoro, Habit Tracker, and Water Tracker widgets. Embed directly into your workspace."
            />
            <link rel="canonical" href="https://blocs.me" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://blocs.me/" />
            <meta
              property="og:title"
              content="Blocs — Notion Widgets for Focus & Habits"
            />
            <meta
              property="og:description"
              content="Stay focused inside Notion with Pomodoro, Habit Tracker, and Water Tracker widgets. Embed directly into your workspace."
            />
            <meta
              property="og:image"
              content="https://blocs.me/blocs-social-banner.png"
            />
            <meta property="og:site_name" content="Blocs" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://blocs.me/" />
            <meta
              property="twitter:title"
              content="Blocs — Notion Widgets for Focus & Habits"
            />
            <meta
              property="twitter:description"
              content="Stay focused inside Notion with Pomodoro, Habit Tracker, and Water Tracker widgets. Embed directly into your workspace."
            />
            <meta
              property="twitter:image"
              content="https://blocs.me/blocs-social-banner.png"
            />
          </Head>
          <Box minHeight="100vh" height="100%" width="100%" mt="80px">
            <Nav />
            {isMaintenance && (
              <Box
                width="100%"
                bg="primary.accent-2"
                px="1rem"
                py="0.8rem"
                borderRadius="md"
                boxShadow="md"
                css={{ transform: 'translateY(1rem)' }}
              >
                <Box
                  p="0.2rem 0.6rem"
                  borderRadius="10px"
                  width="fit-content"
                  mx="auto"
                  right="2rem"
                  bottom="2rem"
                >
                  <Text
                    fontSize="xs"
                    textAlign={'center'}
                    mb="0"
                    color="primary.accent-4"
                  >
                    🚧&nbsp;&nbsp;We&#39;re down for maintenance today for a few
                    hours, we&#39;ll be back up soon!
                  </Text>
                </Box>
              </Box>
            )}
            <Flex
              minHeight="calc(100vh - 80px)"
              height="100%"
              flexDirection={'column'}
              gap="md"
              pb="lg"
            >
              <Flex
                flex={1}
                flexDirection="column"
                justifyContent="start"
                alignItems={'center'}
                pt="lg"
              >
                <Box position="relative" maxWidth="800px">
                  <Text
                    as="h1"
                    fontSize={['lg', , , 'xxl']}
                    fontWeight="bold"
                    color="foreground"
                    textAlign={'center'}
                    css={{ zIndex: 1, position: 'relative' }}
                  >
                    Notion Widgets for{' '}
                    <Box
                      as="span"
                      color="brand.accent-1"
                      display="inline-block"
                    >
                      Focus & Habits
                    </Box>
                  </Text>
                  <Text
                    as="h2"
                    fontSize={['sm', , , 'md']}
                    fontWeight={400}
                    color="primary.accent-4"
                    textAlign={'center'}
                    mt="xs"
                    lineHeight={1.5}
                  >
                    Stay focused inside Notion with Pomodoro, Habit Tracker, and Water Tracker widgets
                  </Text>
                </Box>
                {!user && !invitedAt && (
                  <Flex
                    maxWidth="400px"
                    mt="sm"
                    as="form"
                    onSubmit={onSubmit}
                  >
                    <div>
                      <TextInput
                        ariaLabel="Email input for signing up"
                        placeholder="Enter Your Email"
                        {...register('email', {
                          required: true,
                          validate: (v: string) => isEmail(v)
                        })}
                        error={
                          errors?.email ? 'Please provide a valid email' : ''
                        }
                        css={{ borderRadius: '10px 0 0 10px', height: '60px' }}
                      />
                    </div>
                    <Button
                      bg="foreground"
                      color="background"
                      borderRadius="0 10px 10px 0"
                      fontSize="sm"
                      fontWeight={200}
                      width={['fit-content', , , '150px']}
                      px="sm"
                      disabled={disableSignUp}
                      height={'60px'}
                    >
                      Get Started
                    </Button>
                  </Flex>
                )}
                {user?.aud === 'authenticated' && (
                  <Button
                    variant="outlined"
                    maxWidth={['300px']}
                    width="100%"
                    height={'50px'}
                    borderRadius="sm"
                    hoverBg="foreground"
                    hoverColor="background"
                    onClick={() => goToDashboard()}
                  >
                    Go to dashboard
                  </Button>
                )}
                {!!invitedAt && !user && (
                  <Box
                    p="md"
                    bg="background"
                    borderRadius="md"
                    css={{ textAlign: 'center', maxWidth: '600px' }}
                    border="solid 2px"
                    borderColor="primary.accent-1"
                    boxShadow="sm"
                  >
                    <Icon
                      as="span"
                      display="inline-flex"
                      fill="foreground"
                      width="120px"
                      mb={'sm'}
                    >
                      <Email />
                    </Icon>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      color="foreground"
                      mb={'xs'}
                    >
                      Hooray! 🥳 We&#39;ve sent an invite to your email{' '}
                      {getValues('email')}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="200"
                      color="primary.accent-4"
                      mb={0}
                    >
                      Click on the invite to sign in to blocs
                    </Text>
                  </Box>
                )}
              </Flex>

              <Flex flex={1} justifyContent={['center']}>
                <LandingDemo />
              </Flex>
            </Flex>

            <PomodoroSection />
            <WaterTrackerSection />
            <HabitTrackerSection />
          </Box>
        </PageLayout>
        <Footer />
      </Box>
    </BlocsThemeProvider>
  )
}

export default LandingPage
