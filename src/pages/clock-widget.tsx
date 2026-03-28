import Head from 'next/head'
import Nav from '@/design-system/Nav'
import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import PageGutters from '@/helpers/PageGutters'
import Link from 'next/link'
import { StepCard, BenefitCard, FAQItem } from '@/pages/WidgetMarketingPage/shared'
import DummyClockPreview from '@/widgets/Clock/DummyClockPreview'

const faqs = [
  {
    question: 'What is the Clock Widget?',
    answer: 'A live clock you can embed in any Notion page. It shows the current time in your chosen timezone, with customizable styles and colors. It also has a timer mode for quick countdowns and stopwatch use.'
  },
  {
    question: 'What display styles are available?',
    answer: 'Three styles: Digital (monospace display), Flip (animated flip-clock cards), and Minimal (clean, large text). All styles support light and dark themes.'
  },
  {
    question: 'Can I show multiple timezones?',
    answer: 'Yes. Embed multiple clock widgets, each set to a different timezone. Great for remote teams working across time zones.'
  },
  {
    question: 'How does the timer mode work?',
    answer: 'Set a duration and start a countdown, or use stopwatch mode to count up. The timer has start, pause, and reset controls right inside the widget.'
  },
  {
    question: 'How do I add the clock to Notion?',
    answer: 'From the Blocs dashboard, configure your clock, then click "Copy Link". In Notion, type /embed, press Enter, and paste the URL.'
  },
  {
    question: 'Does it require an account?',
    answer: 'The Clock Widget is a Blocs Pro feature. You need a Blocs Pro account to configure and embed it. It\'s a one-time $17 payment for lifetime access to all widgets.'
  },
  {
    question: 'Does the clock update in real time?',
    answer: 'Yes. The clock updates every second. It runs entirely in your browser and does not require a server connection after loading.'
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs Clock Widget',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/clock-widget',
  offers: {
    '@type': 'Offer',
    price: '17',
    priceCurrency: 'USD'
  },
  description: 'Embeddable clock and timer widget for Notion. Digital, flip, and minimal styles with customizable themes and colors.'
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

export default function ClockWidgetPage() {
  return (
    <>
      <Box bg="background">
        <Head>
          <title>Clock Widget for Notion — Blocs Pro</title>
          <meta
            name="description"
            content="Embed a live clock or timer in your Notion workspace. Digital, flip clock, and minimal styles. Customizable themes, colors, and timezones. Part of Blocs Pro."
          />
          <link rel="canonical" href="https://blocs.me/clock-widget" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/clock-widget" />
          <meta property="og:title" content="Clock Widget for Notion — Blocs Pro" />
          <meta
            property="og:description"
            content="Embed a live clock or timer in your Notion workspace. Digital, flip clock, and minimal styles. Customizable themes, colors, and timezones."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Clock Widget for Notion — Blocs Pro" />
          <meta
            property="twitter:description"
            content="Embed a live clock or timer in your Notion workspace. Digital, flip clock, and minimal styles."
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
              Clock Widget for{' '}
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
              A live clock and timer for your workspace. Digital, flip, or minimal — pick your style and embed it anywhere.
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
                  className="plausible-event-name=CTA+Unlock+Clock"
                  bg="brand.accent-1"
                  color="background"
                  borderRadius="sm"
                  fontSize="sm"
                  fontWeight="bold"
                  height="50px"
                  minWidth="200px"
                  css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                >
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
              <DummyClockPreview style="flip" />
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
                description="One-time $17 payment gives you lifetime access to all widgets, including the Clock & Timer."
              />
              <StepCard
                number="2"
                title="Configure Your Clock"
                description="Choose a style, set your timezone, pick colors and theme from your dashboard."
              />
              <StepCard
                number="3"
                title="Embed in Notion"
                description="Copy the widget link and paste it into any Notion page with /embed. Your clock is live."
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
              Three Styles, Endless Customization
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
              Pick the look that fits your workspace.
            </Text>
            <Flex
              justifyContent="center"
              gap="sm"
              flexDirection={['column', , , 'row']}
              maxWidth="800px"
              width="100%"
            >
              <BenefitCard
                title="Flip Clock"
                description="Animated flip-card digits that change with a satisfying CSS transition. The classic look."
              />
              <BenefitCard
                title="Digital"
                description="Clean monospace display with colon separators. Familiar and easy to read at any size."
              />
              <BenefitCard
                title="Minimal"
                description="Large, light text centered on the page. No decoration — just the time."
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
                Ready to embed your clock?
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
                Get Blocs Pro for $17 — one-time payment, lifetime access to the Clock Widget and all other widgets.
              </Text>
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+See+Pricing+Clock"
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
    </>
  )
}
