import Head from 'next/head'
import Nav from '@/design-system/Nav'
import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import PageGutters from '@/helpers/PageGutters'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import Link from 'next/link'
import { StepCard, BenefitCard, FAQItem } from '@/pages/WidgetMarketingPage/shared'
import DummyCountdownPreview from '@/widgets/Countdown/DummyCountdownPreview'

const faqs = [
  {
    question: 'What is the Countdown Timer?',
    answer: 'A live countdown timer you can embed in any Notion page. Set a target date and it counts down in real time, showing years, months, weeks, days, hours, minutes, and seconds.'
  },
  {
    question: 'Can I count up after a date passes?',
    answer: 'Yes. Enable count-up mode and the timer will keep ticking after the target date, showing how much time has elapsed since then.'
  },
  {
    question: 'How do I add the countdown to Notion?',
    answer: 'From the Blocs dashboard, configure your countdown, then click "Copy Link". In Notion, type /embed, press Enter, and paste the URL.'
  },
  {
    question: 'Can I customize the appearance?',
    answer: 'Yes. Choose light or dark theme, pick custom colors for numbers and labels, toggle which time units to show, and set a title. All customization is included with Blocs Pro.'
  },
  {
    question: 'Which units can I display?',
    answer: 'You can show any combination of years, months, weeks, days, hours, minutes, and seconds. The timer auto-detects the best units if you don\'t specify.'
  },
  {
    question: 'Does it require an account?',
    answer: 'The Countdown Timer is a Blocs Pro feature. You need a Blocs Pro account to configure and embed it. It\'s a one-time $17 payment for lifetime access to all widgets.'
  },
  {
    question: 'Does the timer work offline?',
    answer: 'Once the widget is loaded in Notion, it runs entirely in your browser and does not require an internet connection.'
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs Countdown Timer',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/countdown-timer',
  offers: {
    '@type': 'Offer',
    price: '17',
    priceCurrency: 'USD'
  },
  description: 'Embeddable countdown timer widget for Notion. Track deadlines, launches, and events with a live countdown in your workspace.'
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

export default function CountdownTimerPage() {
  return (
    <BlocsThemeProvider>
      <Box bg="background">
        <Head>
          <title>Countdown Timer for Notion — Blocs Pro</title>
          <meta
            name="description"
            content="Embed a live countdown timer in your Notion workspace. Track deadlines, launches, and events. Customizable themes, colors, and units. Part of Blocs Pro."
          />
          <link rel="canonical" href="https://blocs.me/countdown-timer" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/countdown-timer" />
          <meta property="og:title" content="Countdown Timer for Notion — Blocs Pro" />
          <meta
            property="og:description"
            content="Embed a live countdown timer in your Notion workspace. Track deadlines, launches, and events. Customizable themes, colors, and units. Part of Blocs Pro."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Countdown Timer for Notion — Blocs Pro" />
          <meta
            property="twitter:description"
            content="Embed a live countdown timer in your Notion workspace. Track deadlines, launches, and events."
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </Head>
        <Nav />

        {/* Hero */}
        <PageGutters>
          <Flex
            flexDirection="column"
            alignItems="center"
            pt="100px"
            pb="lg"
          >
            <Text
              as="h1"
              fontSize={['lg', , , 'xl']}
              fontWeight="bold"
              color="foreground"
              textAlign="center"
              m={0}
              mb="xs"
            >
              Countdown Timer for{' '}
              <Box as="span" color="brand.accent-1">Notion</Box>
            </Text>
            <Text
              as="h2"
              fontSize={['sm', , , 'md']}
              fontWeight={400}
              color="primary.accent-4"
              textAlign="center"
              m={0}
              mb="md"
              lineHeight={1.5}
              maxWidth="600px"
            >
              Track deadlines, product launches, and events with a live countdown embedded in your workspace.
            </Text>

            {/* CTA */}
            <Flex
              gap="sm"
              flexDirection={['column', , 'row']}
              alignItems="center"
              mb="md"
            >
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+Unlock+Countdown"
                  bg="brand.accent-1"
                  color="background"
                  borderRadius="sm"
                  fontSize="sm"
                  fontWeight="bold"
                  height="50px"
                  minWidth="200px"
                  css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg> */}
                  Embed Now with Blocs Pro
                </Button>
              </Link>
            </Flex>

            {/* Live preview */}
            <Box
              width="100%"
              maxWidth="480px"
              borderRadius="md"
              overflow="hidden"
              border="2px solid"
              borderColor="primary.accent-1"
            >
              <DummyCountdownPreview />
            </Box>
          </Flex>
        </PageGutters>

        {/* How It Works */}
        <Box bg="primary.accent-2" py="lg">
          <PageGutters>
            <Text
              as="h2"
              fontSize="lg"
              fontWeight="bold"
              color="foreground"
              textAlign="center"
              m={0}
              mb="md"
            >
              How It Works
            </Text>
            <Flex
              justifyContent="center"
              gap="md"
              flexDirection={['column', , , 'row']}
              alignItems={['center', , , 'start']}
            >
              <StepCard
                number="1"
                title="Get Blocs Pro"
                description="One-time $17 payment gives you lifetime access to all widgets, including the Countdown Timer."
              />
              <StepCard
                number="2"
                title="Configure Your Timer"
                description="Set target date, timezone, theme, colors, and which units to display from your dashboard."
              />
              <StepCard
                number="3"
                title="Embed in Notion"
                description="Copy the widget link and paste it into any Notion page with /embed. Your countdown is live."
              />
            </Flex>
          </PageGutters>
        </Box>

        {/* Features */}
        <PageGutters>
          <Flex
            flexDirection="column"
            alignItems="center"
            py="lg"
          >
            <Text
              as="h2"
              fontSize="lg"
              fontWeight="bold"
              color="foreground"
              textAlign="center"
              m={0}
              mb="xs"
            >
              Built for Notion Power Users
            </Text>
            <Text
              fontSize="sm"
              color="primary.accent-4"
              textAlign="center"
              m={0}
              mb="md"
              lineHeight={1.5}
              maxWidth="500px"
            >
              Everything you need to track time in your workspace.
            </Text>
            <Flex
              justifyContent="center"
              gap="sm"
              flexDirection={['column', , , 'row']}
              maxWidth="800px"
              width="100%"
            >
              <BenefitCard
                title="Fully Customizable"
                description="Pick your theme, colors, title, and exactly which time units to show. Make it yours."
              />
              <BenefitCard
                title="Count Up or Down"
                description="Track upcoming deadlines or measure time since a past event. One toggle switches between modes."
              />
              <BenefitCard
                title="Timezone Aware"
                description="Set the target timezone so your countdown is accurate no matter where you or your team are."
              />
            </Flex>
          </Flex>
        </PageGutters>

        {/* FAQ */}
        <PageGutters>
          <Box py="lg" maxWidth="700px" mx="auto">
            <Text
              as="h2"
              fontSize="lg"
              fontWeight="bold"
              color="foreground"
              textAlign="center"
              m={0}
              mb="md"
            >
              Frequently Asked Questions
            </Text>
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </Box>
        </PageGutters>

        {/* Pro CTA */}
        <Box bg="primary.accent-2" py="lg">
          <PageGutters>
            <Flex flexDirection="column" alignItems="center">
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="foreground"
                textAlign="center"
                m={0}
                mb="xs"
              >
                Ready to embed your countdown?
              </Text>
              <Text
                fontSize="sm"
                color="primary.accent-4"
                textAlign="center"
                m={0}
                mb="sm"
                lineHeight={1.5}
                maxWidth="500px"
              >
                Get Blocs Pro for $17 — one-time payment, lifetime access to the Countdown Timer and all other widgets.
              </Text>
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+See+Pricing+Countdown"
                  bg="brand.accent-1"
                  color="background"
                  borderRadius="sm"
                  fontSize="sm"
                  fontWeight="bold"
                  minWidth="200px"
                  height="50px"
                  css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                >
                  Get Blocs Pro
                </Button>
              </Link>
            </Flex>
          </PageGutters>
        </Box>

        <Footer />
      </Box>
    </BlocsThemeProvider>
  )
}
