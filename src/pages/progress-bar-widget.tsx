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
import DummyProgressBarPreview from '@/widgets/ProgressBar/DummyProgressBarPreview'

const faqs = [
  {
    question: 'What is the Progress Bar widget?',
    answer: 'A visual progress tracker you can embed in any Notion page. Track goals manually with +/- buttons, visualize progress through a date range, or display ambient time awareness for the current year, month, week, or day.'
  },
  {
    question: 'What visualization styles are available?',
    answer: 'You can choose from three styles: a horizontal bar, a circular ring (donut), or a semicircle gauge. All styles work across all three tracking modes.'
  },
  {
    question: 'How does manual tracking work?',
    answer: 'You set a title, a total target, a starting value, and an increment step. Inside the embedded widget, you tap + or - to update your progress. The value is saved in the browser and persists across page reloads.'
  },
  {
    question: 'What is date range mode?',
    answer: 'Set a start date and end date and the bar automatically fills based on how much time has elapsed. Useful for project sprints, school terms, or any time-boxed goal.'
  },
  {
    question: 'What is calendar mode?',
    answer: 'Shows how far through the current year, month, week, or day you are. Toggle each on or off. A good ambient reminder of time passing.'
  },
  {
    question: 'Does it require an account?',
    answer: 'The Progress Bar is a Blocs Pro feature. You need a Blocs Pro account ($17 one-time) to configure and embed it. It\'s part of lifetime access to all widgets.'
  },
  {
    question: 'Does it sync across devices?',
    answer: 'Manual mode stores progress in your browser\'s local storage — it persists on the same device and browser. Date range and calendar modes are purely calculated and work everywhere.'
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs Progress Bar',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/progress-bar-widget',
  offers: {
    '@type': 'Offer',
    price: '17',
    priceCurrency: 'USD'
  },
  description: 'Embeddable progress bar widget for Notion. Track goals, deadlines, and time with bar, ring, or gauge visualizations.'
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
}

export default function ProgressBarWidgetPage() {
  return (
    <>
      <Box bg="background">
        <Head>
          <title>Progress Bar Widget for Notion — Blocs Pro</title>
          <meta
            name="description"
            content="Embed a customizable progress bar in your Notion workspace. Track goals, deadlines, and time with bar, ring, or gauge visualizations. Part of Blocs Pro."
          />
          <link rel="canonical" href="https://blocs.me/progress-bar-widget" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/progress-bar-widget" />
          <meta property="og:title" content="Progress Bar Widget for Notion — Blocs Pro" />
          <meta
            property="og:description"
            content="Embed a customizable progress bar in your Notion workspace. Track goals, deadlines, and time."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Progress Bar Widget for Notion — Blocs Pro" />
          <meta property="twitter:description" content="Embed a customizable progress bar in your Notion workspace." />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </Head>
        <Nav />

        {/* Hero */}
        <PageGutters>
          <Flex flexDirection="column" alignItems="center" pt="100px" pb="lg">
            <Text
              as="h1"
              fontSize={['lg', , , 'xl']}
              fontWeight="bold"
              color="foreground"
              textAlign="center"
              m={0}
              mb="xs"
            >
              Progress Bar for{' '}
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
              Track any goal visually — manually, by date range, or as ambient time awareness. Bar, ring, or gauge. Embedded in your workspace.
            </Text>

            <Flex gap="sm" flexDirection={['column', , 'row']} alignItems="center" mb="md">
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+Unlock+Progress+Bar"
                  bg="brand.accent-1"
                  color="background"
                  borderRadius="sm"
                  fontSize="sm"
                  fontWeight="bold"
                  height="50px"
                  minWidth="200px"
                  css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                >
                  Embed Now with Blocs Pro
                </Button>
              </Link>
            </Flex>

            {/* Live previews — show all 3 styles */}
            <Flex
              gap="md"
              flexDirection={['column', , , 'row']}
              alignItems="center"
              width="100%"
              maxWidth="700px"
            >
              {(['bar', 'ring', 'gauge'] as const).map((style) => (
                <Box
                  key={style}
                  flex="1"
                  borderRadius="md"
                  overflow="hidden"
                  border="2px solid"
                  borderColor="primary.accent-1"
                  minWidth="180px"
                >
                  <DummyProgressBarPreview style={style} />
                </Box>
              ))}
            </Flex>
          </Flex>
        </PageGutters>

        {/* How It Works */}
        <Box bg="primary.accent-2" py="lg">
          <PageGutters>
            <Text as="h2" fontSize="lg" fontWeight="bold" color="foreground" textAlign="center" m={0} mb="md">
              How It Works
            </Text>
            <Flex justifyContent="center" gap="md" flexDirection={['column', , , 'row']} alignItems={['center', , , 'start']}>
              <StepCard
                number="1"
                title="Get Blocs Pro"
                description="One-time $17 payment gives you lifetime access to all widgets, including the Progress Bar."
              />
              <StepCard
                number="2"
                title="Configure Your Bar"
                description="Choose a mode (manual, date range, or calendar), pick a style, set your colors and title."
              />
              <StepCard
                number="3"
                title="Embed in Notion"
                description="Copy the widget link and paste it into any Notion page with /embed. Your progress bar is live."
              />
            </Flex>
          </PageGutters>
        </Box>

        {/* Features */}
        <PageGutters>
          <Flex flexDirection="column" alignItems="center" py="lg">
            <Text as="h2" fontSize="lg" fontWeight="bold" color="foreground" textAlign="center" m={0} mb="xs">
              Three Ways to Track Progress
            </Text>
            <Text fontSize="sm" color="primary.accent-4" textAlign="center" m={0} mb="md" lineHeight={1.5} maxWidth="500px">
              One widget, three modes. Use what fits your goal.
            </Text>
            <Flex justifyContent="center" gap="sm" flexDirection={['column', , , 'row']} maxWidth="800px" width="100%">
              <BenefitCard
                title="Manual Tracking"
                description="Set a total, then tap + or - inside the widget to update your count. Great for books read, workouts done, or any custom goal."
              />
              <BenefitCard
                title="Date Range"
                description="Set a start and end date. The bar fills automatically as time passes. Perfect for sprints, deadlines, and project timelines."
              />
              <BenefitCard
                title="Calendar Awareness"
                description="See how far through the current year, month, week, or day you are. A quiet reminder to make the most of the time you have."
              />
            </Flex>
          </Flex>
        </PageGutters>

        {/* FAQ */}
        <PageGutters>
          <Box py="lg" maxWidth="700px" mx="auto">
            <Text as="h2" fontSize="lg" fontWeight="bold" color="foreground" textAlign="center" m={0} mb="md">
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
              <Text fontSize="lg" fontWeight="bold" color="foreground" textAlign="center" m={0} mb="xs">
                Ready to visualize your progress?
              </Text>
              <Text fontSize="sm" color="primary.accent-4" textAlign="center" m={0} mb="sm" lineHeight={1.5} maxWidth="500px">
                Get Blocs Pro for $17 — lifetime access to the Progress Bar and all other widgets.
              </Text>
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+See+Pricing+Progress+Bar"
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
