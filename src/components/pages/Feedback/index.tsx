import Footer from '@/design-system/Footer'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import { useRouter } from 'next/router'
import useBlocsUser from '@/hooks/useBlocsUser'
import { NextSeo } from 'next-seo'
import nextSeoConfig from '@/constants/next-seo.config'
import { useEffect, useState } from 'react'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import FeedbackWidget from '@/pages/Feedback/FeedbackWidget'
import useIsTrueDarkMode from '@/hooks/useIsTrueDarkMode'
import FeedbackNav from './FeedbackNav'
import Box from '@/helpers/Box'
import Loader from '@/design-system/Loader'

const FeedbackPage = () => {
  const router = useRouter()
  const user = useUser()
  const session = useSessionContext()
  const blocsUser = useBlocsUser()
  const isDarkMode = useIsTrueDarkMode()


  const [token, setToken] = useState(null)

  useEffect(() => {
    if (user?.aud !== 'authenticated' && !session.isLoading) {
      router.push('/sign-in')
    }
  }, [router, user, session])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/auth/canny');
        const json = await res.json();
        setToken(json.data.token)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (blocsUser?.user) {
      fetchData();
    }
  }, [blocsUser?.user])

  return (
    <>
      <Flex flexDirection="column" bg="background" maxWidth="100vw">
        <NextSeo
          {...nextSeoConfig}
          title="Feedback | blocs notion widgets | habit tracker"
          description="Feedback board for blocs widgets. Vote on features, report bugs, and suggest new features."
          canonical="https://www.blocs.me/feedback"
        />
        <FeedbackNav />
        <Flex
          width="100%"
          alignItems="center"
          pt="md"
          pb="sm"
          flexDirection="column"
          px="md"
        >
          <div>
            <Text
              as="h1"
              color="foreground"
              mb="sm"
              fontWeight={'bold'}
              fontSize="xl"
              textAlign="center"
            >
              Feature requests and feedback
            </Text>
            <Text
              as="h2"
              mt={0}
              fontSize="sm"
              fontWeight={400}
              letterSpacing={'md'}
              color="primary.accent-4"
              textAlign="center"
              width={['100%', , , '600px', '600px', '800px']}
            >
              We believe that great products are built with the help and insights of their users. That’s why we’ve created this space for you to share your feedback, suggestions, and feature requests. We look forward to hearing your thoughts and bringing your ideas to life.
            </Text>
            <Text
              as="h2"
              mt={0}
              fontSize="sm"
              fontWeight={800}
              letterSpacing={'md'}
              color="primary.accent-4"
              textAlign="center"
              width={['100%', , , '600px', '600px', '800px']}
            >
              You need to be logged in to your blocs account to create or upvote a request.
            </Text>
          </div>
        </Flex>
        <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%" bg="#121212" pb="md" />
        {!token ? (<Flex width="100%" height="500px" alignItems="center" justifyContent="center"><Loader width="20px" height="20px" speed='1s' /></Flex>) : (<FeedbackWidget token={token} />)}
        <Footer />
      </Flex>
    </>
  )
}

export default FeedbackPage
