import { ReactNode, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import PageLayout from '@/helpers/PageLayout'
import useMediaQuery from '@/hooks/useMediaQuery'
import Box from '@/helpers/Box'
import Nav from '@/design-system/Nav'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import TextInput from '@/design-system/TextInput'
import Button from '@/design-system/Button'
import Avatar from '@/design-system/Avatar'
import Linkedin from '../../../icons/linkedin.svg'
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
import Twitter from '../../../icons/twitter.svg'
import WidgetExplainerSection from './WidgetExplainerSection'
import PomodoroSection from './PomodoroSection'
import WaterTrackerSection from './WaterTrackerSection'
import HabitTrackerSection from './HabitTrackerSection'
import Image from 'next/image'
import SharingFeatureSection from './SharingFeatureSection'
import DSLink from '@/design-system/Link'
import HeartAnim from './LandingDemo/animations/HeartAnim'
import float from '@/keyframes/float'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'

const M = ({ children }) => (
  <Box as="span" color="brand.accent-1">
    {children}
  </Box>
)

const SocialIcons = ({
  href,
  children
}: {
  href: string
  children: ReactNode
}) => {
  return (
    <Link href={href} passHref>
      <a rel="noreferrer">
        <Flex
          bg="background"
          boxShadow="default"
          borderRadius="sm"
          p="5px"
          size="25px"
          center
        >
          <Icon fill="foreground" size="12px" display="flex">
            {children}
          </Icon>
        </Flex>
      </a>
    </Link>
  )
}

const LandingPage = () => {
  const emailRedirectLink = useSignInRedirectLink()
  const isLandscape = useMediaQuery('(orientation: landscape)')
  const {
    handleSubmit,
    register,
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
            <title>blocs | notion widgets for habit tracking</title>
            <meta
              name="description"
              content="Blocs notion widgets help you build habits with amazing insights to understand yourself better. Track all your habits in one place !"
            />
            <link rel="canonical" href="https://blocs.me" />

            <title>blocs | notion widgets for habit tracking</title>
            <meta
              name="title"
              content="blocs | notion widgets for habit tracking"
            />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.blocs.me/" />
            <meta
              property="og:title"
              content="blocs | notion widgets for habit tracking"
            />
            <meta
              property="og:description"
              content="Blocs notion widgets help you build habits with amazing insights to understand yourself better. Track all your habits in one place !"
            />
            <meta
              property="og:image"
              content="https://www.blocs.me/blocs-social-banner.png"
            />
            <meta property="og:site_name" content="blocs" />

            {/* twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@_moniet" />
            <meta name="twitter:creator" content="@_moniet" />
            <meta property="twitter:url" content="https://www.blocs.me/" />
            <meta
              property="twitter:title"
              content="blocs | notion widgets for habit tracking"
            />
            <meta
              property="twitter:description"
              content="Blocs notion widgets help you build habits with amazing insights to understand yourself better. Track all your habits in one place !"
            />
            <meta
              property="twitter:image"
              content="https://www.blocs.me/blocs-social-banner.png"
            />
          </Head>

          <Box position="absolute" left="0" top="0" width="100vw">
            <Nav />
          </Box>
          <Box minHeight="100vh" height="100%" width="100%" mt="80px">
            <Flex
              minHeight="calc(100vh - 80px)"
              height="100%"
              flexDirection={['column', , , , , 'row']}
              gap="md"
              pb="lg"
            >
              <Flex
                flex={1}
                flexDirection="column"
                justifyContent="start"
                alignItems={['center', , , , , 'start']}
                pt="lg"
              >
                <Box position="relative" maxWidth="500px">
                  <Text
                    as="h1"
                    fontSize={['lg', , , 'xl']}
                    fontWeight="bold"
                    color="foreground"
                    textAlign={['center', , , , , 'left']}
                    css={{ zIndex: 1, position: 'relative' }}
                  >
                    Build better habits
                    <wbr /> on Notion with our <wbr />
                    beautiful{' '}
                    <Box
                      as="span"
                      color="brand.accent-1"
                      display="inline-block"
                    >
                      Widgets
                    </Box>
                  </Text>
                </Box>
                {!user && !invitedAt && (
                  <Flex
                    maxWidth="400px"
                    mt="sm"
                    as="form"
                    onSubmit={onSubmit}
                    // height="fit-content"
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
                    css={{ textAlign: 'center' }}
                    border="solid 2px"
                    borderColor="primary.accent-1"
                    boxShadow="sm"
                  >
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      color="foreground"
                      mb={'xs'}
                    >
                      Hooray! 🥳 We&#39;ve sent an invite to your email
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

                <Flex mt="lg" css={{ gap: '1rem' }}>
                  <Avatar
                    src="/moniet.png"
                    alt="Blocs Founder Profile Picture"
                  />
                  <Flex flexDirection="column">
                    <Text
                      fontSize="sm"
                      color="foreground"
                      letterSpacing="sm"
                      lineHeight={1}
                      mb="xs"
                    >
                      Moniet Sawhney
                      <br />
                      <Box as="small" color="primary.accent-4">
                        Founder
                      </Box>
                    </Text>
                    <Flex gap="sm">
                      <SocialIcons href="https://linkedin.com/in/Moniet">
                        <Linkedin />
                      </SocialIcons>
                      <SocialIcons href="https://twitter.com/__moniet">
                        <Twitter />
                      </SocialIcons>
                      <SocialIcons href="mailto:moniet@blocs.me">
                        <Email />
                      </SocialIcons>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex flex={1} justifyContent={['center']}>
                <LandingDemo />
              </Flex>
            </Flex>
            <Box as="hr" border="solid 1px" borderColor="primary.accent-1" />
            <Flex justifyContent={'center'} mb="md" mt="lg">
              <Flex
                flexDirection="column"
                alignItems={'center'}
                width="min(100%, 500px)"
              >
                <Text
                  as="h2"
                  color="foreground"
                  fontSize="lg"
                  mb={'xs'}
                  textAlign="center"
                >
                  All your productivity tools in one place
                </Text>
                <Text
                  color="primary.accent-4"
                  fontSize="sm"
                  textAlign={'center'}
                  fontWeight={200}
                  letterSpacing="sm"
                  px="md"
                >
                  Habit tracker, pomodoros, water tracker apps and so much to
                  come, all inside <b>Notion!</b>
                </Text>
              </Flex>
            </Flex>

            <SharingFeatureSection />
            <PomodoroSection />
            <WaterTrackerSection />
            <HabitTrackerSection />

            <Flex width="100%" center py="lg">
              <Box
                position="relative"
                css={{
                  animation: `${float} 1s ease-in-out alternate infinite`
                }}
              >
                <Link
                  href="https://www.notion.so/widgets-demo-cdf30a30ba704d5b8a55dc7a196d3e7b"
                  passHref
                >
                  <Button
                    bg="foreground"
                    color="background"
                    borderRadius="sm"
                    px="md"
                    py="sm"
                    fontSize="md"
                    as="a"
                  >
                    Widget Demo
                  </Button>
                </Link>
              </Box>
            </Flex>

            <Box pt="lg" />
            <Box width="100%" height="2px" bg="primary.accent-1" />
            <Box pt="lg" />
            <Flex flexDirection="column">
              <Text variant="h4" textAlign={'center'} color="foreground">
                And tons more coming soon!
              </Text>
              <Text
                variant="p"
                width={['100%', , , '400px', '500px', '600px']}
                m="0 auto"
                textAlign="center"
              >
                From special calendars to goal setters, we have a bunch ideas to
                take notion widgets and your habits to a whole new level!
              </Text>
              <Box mt="sm" />
              <Text
                variant="p"
                width={['100%', , , '400px', '500px', '600px']}
                m="0 auto"
                textAlign="center"
              >
                Take a look at our{' '}
                <DSLink
                  href="https://www.notion.so/81a847e283ca4d3583651d7d0d55f692?v=50566259b00a4cadafee442e81b23305"
                  passHref
                  inline
                  underline
                  rel="noopener"
                >
                  roadmap
                </DSLink>{' '}
                to see what we’re working on.
              </Text>
            </Flex>
          </Box>
          <Box pt="xl" />
        </PageLayout>
      </Box>
    </BlocsThemeProvider>
  )
}

export default LandingPage
