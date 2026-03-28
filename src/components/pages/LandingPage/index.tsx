import Head from 'next/head'
import PageLayout from '@/helpers/PageLayout'
import Box from '@/helpers/Box'
import Nav from '@/design-system/Nav'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import PomodoroSection from './PomodoroSection'
import WaterTrackerSection from './WaterTrackerSection'
import HabitTrackerSection from './HabitTrackerSection'
import CountdownSection from './CountdownSection'
import ProgressBarSection from './ProgressBarSection'
import ClockSection from './ClockSection'
import CalendarSection from './CalendarSection'
import QuoteSection from './QuoteSection'
import WeatherSection from './WeatherSection'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === 'yes'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Blocs',
  url: 'https://blocs.me'
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Blocs',
  url: 'https://blocs.me',
  logo: 'https://blocs.me/blocs-social-banner.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@blocs.me',
    contactType: 'customer support'
  }
}

const LandingPage = () => {
  const user = useUser()
  const router = useRouter()

  const isSignedIn = user?.aud === 'authenticated'

  return (
    <BlocsThemeProvider>
      <Box bg="background" height="fit-content">
        <PageLayout>
          <Head>
            <title>Free Notion Widgets for Focus & Habits | Blocs</title>
            <meta
              name="description"
              content="Free Notion widgets for focus and productivity. Embed a Pomodoro timer, Habit Tracker, and Water Tracker directly in your workspace. No sign-up required."
            />
            <link rel="canonical" href="https://blocs.me" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://blocs.me/" />
            <meta
              property="og:title"
              content="Free Notion Widgets for Focus & Habits | Blocs"
            />
            <meta
              property="og:description"
              content="Free Notion widgets for focus and productivity. Embed a Pomodoro timer, Habit Tracker, and Water Tracker directly in your workspace. No sign-up required."
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
              content="Free Notion Widgets for Focus & Habits | Blocs"
            />
            <meta
              property="twitter:description"
              content="Free Notion widgets for focus and productivity. Embed a Pomodoro timer, Habit Tracker, and Water Tracker directly in your workspace. No sign-up required."
            />
            <meta
              property="twitter:image"
              content="https://blocs.me/blocs-social-banner.png"
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
                    Embed a Pomodoro timer, habit tracker, water tracker, countdown timer, and progress bar directly in your Notion workspace.
                  </Text>
                </Box>
                {isSignedIn ? (
                  <Button
                    variant="outlined"
                    maxWidth={['300px']}
                    width="100%"
                    height={'50px'}
                    borderRadius="sm"
                    hoverBg="foreground"
                    hoverColor="background"
                    mt="sm"
                    onClick={() => router.push('/dashboard/pomodoro')}
                  >
                    Go to dashboard
                  </Button>
                ) : (
                  <Flex
                    gap="sm"
                    mt="sm"
                    flexDirection={['column', , 'row']}
                    alignItems="center"
                  >
                    <Link href="/pomodoro-timer" style={{ textDecoration: 'none' }}>
                      <Button
                        className="plausible-event-name=CTA+Try+Pomodoro"
                        bg="brand.accent-1"
                        color="background"
                        borderRadius="sm"
                        fontSize="sm"
                        fontWeight="bold"
                        height="50px"
                        minWidth="200px"
                        css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                      >
                        Try the Pomodoro Timer
                      </Button>
                    </Link>
                    <Link href="/water-tracker-widget" style={{ textDecoration: 'none' }}>
                      <Button
                        className="plausible-event-name=CTA+Try+Water+Tracker"
                        variant="outlined"
                        borderRadius="sm"
                        fontSize="sm"
                        fontWeight="bold"
                        height="50px"
                        minWidth="200px"
                        css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                      >
                        Try the Water Tracker
                      </Button>
                    </Link>
                  </Flex>
                )}
                {!isSignedIn && (
                  <Box
                    as="a"
                    href="#widgets"
                    mt="sm"
                    color="primary.accent-4"
                    css={{
                      fontSize: '12px',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                  >
                    Or explore all widgets
                  </Box>
                )}
              </Flex>

            </Flex>

            <Box id="widgets">
              <PomodoroSection />
              <WaterTrackerSection />
              <HabitTrackerSection />
              <CountdownSection />
              <ProgressBarSection />
              <ClockSection />
              <CalendarSection />
              <QuoteSection />
              <WeatherSection />
            </Box>
          </Box>
        </PageLayout>
      </Box>
    </BlocsThemeProvider>
  )
}

export default LandingPage
