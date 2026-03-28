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
import DummyCalendarPreview from '@/widgets/Calendar/DummyCalendarPreview'

const faqs = [
  {
    question: 'What is the Calendar Widget?',
    answer: 'A visual calendar you can embed in any Notion page. It shows the current month or year with today highlighted, optional date markers, and customizable themes.'
  },
  {
    question: 'How is this different from Notion\'s built-in calendar?',
    answer: 'Notion\'s calendars are tied to databases — they show events from a specific database. The Blocs calendar is a standalone visual calendar that works as a simple embed. No database needed.'
  },
  {
    question: 'Can I mark important dates?',
    answer: 'Yes. Add date markers from the dashboard with custom colors and labels. Marked dates appear as colored dots on the calendar.'
  },
  {
    question: 'Can I switch between month and year views?',
    answer: 'Yes. Choose your default view in the dashboard, and switch between month and year views directly inside the embedded widget.'
  },
  {
    question: 'Does the week start on Monday or Sunday?',
    answer: 'You choose. The dashboard has a start-of-week toggle. You can also enable ISO week numbers.'
  },
  {
    question: 'How do I add it to Notion?',
    answer: 'From the Blocs dashboard, configure your calendar, then click "Copy Link". In Notion, type /embed, press Enter, and paste the URL.'
  },
  {
    question: 'Does it require an account?',
    answer: 'The Calendar Widget is a Blocs Pro feature. You need a Blocs Pro account to configure and embed it. It\'s a one-time $17 payment for lifetime access to all widgets.'
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs Calendar Widget',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/calendar-widget',
  offers: {
    '@type': 'Offer',
    price: '17',
    priceCurrency: 'USD'
  },
  description: 'Embeddable calendar widget for Notion. Visual month and year views with date markers, customizable themes, and timezone support.'
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

export default function CalendarWidgetPage() {
  return (
    <BlocsThemeProvider>
      <Box bg="background">
        <Head>
          <title>Calendar Widget for Notion — Blocs Pro</title>
          <meta
            name="description"
            content="Embed a clean visual calendar in your Notion workspace. Month and year views, date markers, customizable themes. No database required. Part of Blocs Pro."
          />
          <link rel="canonical" href="https://blocs.me/calendar-widget" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/calendar-widget" />
          <meta property="og:title" content="Calendar Widget for Notion — Blocs Pro" />
          <meta
            property="og:description"
            content="Embed a clean visual calendar in your Notion workspace. Month and year views, date markers, customizable themes. No database required."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Calendar Widget for Notion — Blocs Pro" />
          <meta
            property="twitter:description"
            content="Embed a visual calendar in Notion. Month and year views with date markers and custom themes."
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
              Calendar Widget for{' '}
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
              A clean visual calendar for your workspace. See the month at a glance, mark important dates, and embed it anywhere.
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
                  className="plausible-event-name=CTA+Unlock+Calendar"
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
              maxWidth="420px"
              borderRadius="md"
              overflow="hidden"
              border="2px solid"
              borderColor="primary.accent-1"
            >
              <DummyCalendarPreview />
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
                description="One-time $17 payment gives you lifetime access to all widgets, including the Calendar."
              />
              <StepCard
                number="2"
                title="Configure Your Calendar"
                description="Choose month or year view, set your timezone, add date markers, and pick a theme."
              />
              <StepCard
                number="3"
                title="Embed in Notion"
                description="Copy the widget link and paste it into any Notion page with /embed. Your calendar is live."
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
              Your Workspace, At a Glance
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
              A standalone calendar that doesn&apos;t need a database.
            </Text>
            <Flex
              justifyContent="center"
              gap="sm"
              flexDirection={['column', , , 'row']}
              maxWidth="800px"
              width="100%"
            >
              <BenefitCard
                title="Month & Year Views"
                description="See the current month in detail or the full year at a glance. Switch views from inside the widget."
              />
              <BenefitCard
                title="Date Markers"
                description="Highlight deadlines, events, and milestones with colored dots. Add as many as you need."
              />
              <BenefitCard
                title="Fully Customizable"
                description="Light or dark theme, custom accent colors, Monday or Sunday start, optional week numbers."
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
                Ready to embed your calendar?
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
                Get Blocs Pro for $17 — one-time payment, lifetime access to the Calendar and all other widgets.
              </Text>
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+See+Pricing+Calendar"
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
