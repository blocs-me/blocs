import { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import PageLayout from '@/helpers/PageLayout'
import useMediaQuery from '@/hooks/useMediaQuery'
import globalContext from '@/contexts/GlobalContextProvider/globalContext'
import Box from '@/helpers/Box'
import Nav from '@/design-system/Nav'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import TextInput from '@/design-system/TextInput'
import Button from '@/design-system/Button'
import Avatar from '@/design-system/Avatar'
import Linkedin from 'src/icons/linkedin.svg'
import Link from 'next/link'
import Icon from '@/helpers/Icon'
import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Quote from '../../../icons/quote.svg'
import storage from '@/utils/storage'

const SocialIcons = ({
  href,
  children
}: {
  href: string
  children: ReactNode
}) => {
  return (
    <Link href={href} passHref>
      <Icon as="a" stroke="primary.accent-4">
        {children}
      </Icon>
    </Link>
  )
}

const LandingPage = () => {
  const isLandscape = useMediaQuery('(orientation: landscape)')
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()
  const supabase = useSupabaseClient()
  const user = useUser()
  const [invitedAt, setInvitedAt] = useState(0)
  const [disableSignUp, setDisableSignUp] = useState(false)
  const [signUpError, setSignUpError] = useState(false)

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
        emailRedirectTo: 'https://blocs-dev.vercel.app/dashboard/sign-in'
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
    <Box bg="background">
      <PageLayout>
        <Head>
          <title>blocs | notion widgets for habit building</title>
          <meta
            name="description"
            content="Blocs notion widgets help you build habits with amazing insights to understand yourself better. Track all your habits in one place !"
          />
          <link name="canonical" href="https://blocs.me" />

          <title>blocs | notion widgets for habit building</title>
          <meta
            name="title"
            content="blocs | notion widgets for habit building"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.blocs.me/" />
          <meta
            property="og:title"
            content="blocs | notion widgets for habit building"
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
            content="blocs | notion widgets for habit building"
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

        <Box minHeight="100vh" height="100%" width="100%" pt="80px">
          <Nav />
          <Flex height="calc(100vh - 80px)">
            <Flex flex={1} flexDirection="column" justifyContent="center">
              <Box position="relative">
                <Text
                  as="h1"
                  fontSize={['lg', , , 'xl']}
                  fontWeight="bold"
                  color="foreground"
                  css={{ zIndex: 1, position: 'relative' }}
                  // maxWidth="500px"
                >
                  Build better habits
                  <wbr /> on Notion with our <wbr />
                  beautiful{' '}
                  <Box as="span" color="brand.accent-1" display="inline-block">
                    Widgets
                  </Box>
                </Text>
              </Box>
              {!user && !invitedAt && (
                <Flex maxWidth="400px" mt="sm" as="form" onSubmit={onSubmit}>
                  <TextInput
                    ariaLabel="Email input for signing up"
                    placeholder="Enter Your Email"
                    {...register('email', {
                      required: true,
                      validate: (v: string) => isEmail(v)
                    })}
                    error={errors?.email ? 'Please provide a valid email' : ''}
                    css={{ borderRadius: '10px 0 0 10px', height: '60px' }}
                  />
                  <Button
                    bg="foreground"
                    color="background"
                    borderRadius="0 10px 10px 0"
                    fontSize="sm"
                    fontWeight={200}
                    width={['fit-content', '150px', , '200px']}
                    px="sm"
                    disabled={disableSignUp}
                  >
                    Get Started
                  </Button>
                </Flex>
              )}
              {user && !invitedAt && (
                <Button
                  bg="foreground"
                  color="background"
                  px="md"
                  py="sm"
                  borderRadius="sm"
                >
                  Go to dashboard
                </Button>
              )}
              {!!invitedAt && !user && (
                <Box
                  p="sm"
                  // boxShadow="default"
                  bg="primary.accent-2"
                  borderRadius="md"
                  css={{ textAlign: 'center' }}
                  border="solid 1px"
                  borderColor="primary.accent-3"
                >
                  <Text fontSize="sm" fontWeight="bold" color="foreground">
                    Hooray! We&#39;ve sent and invite to your email
                  </Text>
                  <Text
                    fontSize="md"
                    fontWeight="200"
                    color="foreground"
                    mb={0}
                  >
                    Click on it the invite to login to blocs
                  </Text>
                </Box>
              )}

              <Flex mt="lg" css={{ gap: '1rem' }}>
                <Avatar src="/moniet.png" alt="Blocs Founder Profile Picture" />
                <Flex flexDirection="column">
                  <Text
                    fontSize="sm"
                    color="foreground"
                    letterSpacing="sm"
                    lineHeight={1}
                  >
                    Moniet Sawhney
                    <br />
                    <Box as="small" color="primary.accent-4">
                      Founder
                    </Box>
                  </Text>
                  <Flex></Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex flex={1}></Flex>
          </Flex>
        </Box>
      </PageLayout>
    </Box>
  )
}

export default LandingPage
