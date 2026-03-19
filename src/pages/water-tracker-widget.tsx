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
import { CopyWidgetButton, StepCard, BenefitCard, FAQItem } from '@/pages/WidgetMarketingPage/shared'

const WIDGET_URL = 'https://blocs.me/water-tracker'

const faqs = [
  {
    question: 'How does the Water Tracker work?',
    answer: 'Set a daily water goal (1-10 liters), then tap the up arrow each time you drink water. The animated bowl fills up as you get closer to your goal. Your progress resets each day.'
  },
  {
    question: 'How do I add this to my Notion page?',
    answer: 'Click "Copy Widget URL" above, then open your Notion page and type /embed. Press Enter, paste the URL, and click "Embed link". The tracker will appear directly in your page.'
  },
  {
    question: 'Is the Water Tracker free?',
    answer: 'Yes, the core Water Tracker is completely free to use and embed in Notion. No sign-up required. Blocs Pro unlocks additional features like weekly/monthly analytics and theme customization.'
  },
  {
    question: 'Can I change my daily water goal?',
    answer: 'With Blocs Pro, you can set a custom daily goal anywhere from 1 to 10 liters. The free version uses a default goal of 3 liters.'
  },
  {
    question: 'Can I see my water intake over time?',
    answer: 'Blocs Pro includes built-in analytics with daily, weekly, and monthly bar charts so you can track your hydration habits over time.'
  },
  {
    question: 'Does the tracker save my progress?',
    answer: 'The free version tracks your current session in the browser. With Blocs Pro, your data is saved to the cloud so your progress persists across devices and sessions.'
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs Water Tracker',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/water-tracker-widget',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description: 'Free water tracker widget for Notion. Set a daily goal, track your intake, and build better hydration habits.'
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

export default function WaterTrackerWidgetPage() {
  return (
    <BlocsThemeProvider>
      <Box bg="background">
        <Head>
          <title>Free Water Tracker for Notion — Blocs</title>
          <meta
            name="description"
            content="Embed a free water tracker in your Notion workspace. Set a daily goal, log each glass, and build better hydration habits with visual progress tracking. No sign-up required."
          />
          <link rel="canonical" href="https://blocs.me/water-tracker-widget" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/water-tracker-widget" />
          <meta property="og:title" content="Free Water Tracker for Notion — Blocs" />
          <meta
            property="og:description"
            content="Embed a free water tracker in your Notion workspace. Set a daily goal, log each glass, and build better hydration habits with visual progress tracking. No sign-up required."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Free Water Tracker for Notion — Blocs" />
          <meta
            property="twitter:description"
            content="Embed a free water tracker in your Notion workspace. Set a daily goal, log each glass, and build better hydration habits with visual progress tracking. No sign-up required."
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
              Free Water Tracker for{' '}
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
              Track your daily water intake right inside Notion. Set a goal, tap to log, and watch your hydration improve. No sign-up required.
            </Text>

            {/* CTAs */}
            <Flex
              gap="sm"
              flexDirection={['column', , 'row']}
              alignItems="center"
              mb="md"
            >
              <CopyWidgetButton url={WIDGET_URL} />
              <Box
                as="a"
                href="#how-to-embed"
                css={{
                  textDecoration: 'none',
                  border: '2px solid',
                  borderColor: 'var(--colors-foreground)',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--colors-foreground)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '200px',
                  height: '50px',
                  '&:hover': { opacity: 0.8 }
                }}
              >
                How to Embed →
              </Box>
            </Flex>

            {/* Widget embed */}
            <Box
              width="100%"
              maxWidth="420px"
              css={{
                aspectRatio: '0.85',
                border: '2px solid',
                borderColor: 'var(--colors-primary-accent-1)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <iframe
                src="/water-tracker"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Blocs Water Tracker"
              />
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
                title="Copy the URL"
                description="Click the button above to copy the widget embed link to your clipboard."
              />
              <StepCard
                number="2"
                title="Paste in Notion"
                description="Type /embed in any Notion page, press Enter, and paste the URL."
              />
              <StepCard
                number="3"
                title="Track Your Water"
                description="Tap the up arrow each time you drink. Watch the bowl fill up as you hit your goal."
              />
            </Flex>
          </PageGutters>
        </Box>

        {/* Embed Guide */}
        <PageGutters>
          <Flex
            id="how-to-embed"
            flexDirection="column"
            alignItems="center"
            py="lg"
            css={{ scrollMarginTop: '100px' }}
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
              Embed in Notion in Seconds
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
              Type <code>/embed</code> in any Notion page, paste the widget URL, and you&#39;re done.
            </Text>
            <Box
              width="100%"
              maxWidth="600px"
              borderRadius="md"
              overflow="hidden"
              boxShadow="lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pomodoro-guide.gif"
                alt="How to embed a Blocs widget in Notion"
                width={600}
                height={338}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </Box>
          </Flex>
        </PageGutters>

        {/* Why Track Water */}
        <Box bg="primary.accent-2" py="lg">
          <PageGutters>
            <Text
              as="h2"
              fontSize="lg"
              fontWeight="bold"
              color="foreground"
              textAlign="center"
              m={0}
              mb="xs"
            >
              Why Track Your Water Intake?
            </Text>
            <Text
              fontSize="sm"
              color="primary.accent-4"
              textAlign="center"
              m={0}
              mb="md"
              lineHeight={1.6}
              maxWidth="650px"
              mx="auto"
            >
              Most people don&#39;t drink enough water. A simple visual reminder in the tool you already
              use every day makes it easy to build the habit without thinking about it.
            </Text>
            <Flex
              justifyContent="center"
              gap="sm"
              flexDirection={['column', , , 'row']}
            >
              <BenefitCard
                title="Stay Hydrated"
                description="A visual goal tracker keeps hydration top-of-mind throughout your workday."
              />
              <BenefitCard
                title="Build the Habit"
                description="Logging each glass creates a daily routine that sticks over time."
              />
              <BenefitCard
                title="See Your Progress"
                description="Weekly and monthly analytics show your hydration trends at a glance."
              />
            </Flex>
          </PageGutters>
        </Box>

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
                Want more from your Water Tracker?
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
                Blocs Pro unlocks custom goals, hydration analytics, theme customization,
                and more — starting at $6/month.
              </Text>
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  bg="brand.accent-1"
                  color="background"
                  borderRadius="sm"
                  fontSize="sm"
                  fontWeight="bold"
                  minWidth="200px"
                  height="50px"
                  css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                >
                  See Pricing
                </Button>
              </Link>
            </Flex>
          </PageGutters>
        </Box>

        <Footer />
      </Box>
    </BlocsThemeProvider>
  );
}
