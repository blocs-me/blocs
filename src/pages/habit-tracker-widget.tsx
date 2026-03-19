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

const WIDGET_URL = 'https://blocs.me/habit-tracker'

const faqs = [
  {
    question: 'How does the Habit Tracker work?',
    answer: 'Create a list of daily habits, then check them off each day. The tracker records your streaks — how many consecutive days you complete all your habits — so you can see your consistency over time.'
  },
  {
    question: 'How do I add this to my Notion page?',
    answer: 'Click "Copy Widget URL" above, then open your Notion page and type /embed. Press Enter, paste the URL, and click "Embed link". The tracker will appear directly in your page.'
  },
  {
    question: 'Is the Habit Tracker free?',
    answer: 'Yes, the core Habit Tracker is completely free to use and embed in Notion. No sign-up required. Focus Pro unlocks additional features like custom habits, streak analytics, and theme customization.'
  },
  {
    question: 'How many habits can I track?',
    answer: 'With Focus Pro, you can create as many habits as you like. The free demo version comes with sample habits to try out the interface.'
  },
  {
    question: 'What are streaks?',
    answer: 'A streak counts how many consecutive days you complete your habits. The tracker shows both your current streak and your best streak ever, giving you motivation to keep going.'
  },
  {
    question: 'Can I share my habits with someone?',
    answer: 'With Focus Pro, you can generate a shareable link that lets friends or accountability partners view your habit progress in read-only mode.'
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs Habit Tracker',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/habit-tracker-widget',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description: 'Free habit tracker widget for Notion. Build daily habits, track streaks, and stay consistent.'
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

export default function HabitTrackerWidgetPage() {
  return (
    <BlocsThemeProvider>
      <Box bg="background">
        <Head>
          <title>Free Habit Tracker for Notion — Blocs</title>
          <meta
            name="description"
            content="Embed a free habit tracker in your Notion workspace. Build daily habits, track streaks, and stay consistent. No sign-up required."
          />
          <link rel="canonical" href="https://blocs.me/habit-tracker-widget" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/habit-tracker-widget" />
          <meta property="og:title" content="Free Habit Tracker for Notion — Blocs" />
          <meta
            property="og:description"
            content="Embed a free habit tracker in your Notion workspace. Build daily habits, track streaks, and stay consistent. No sign-up required."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Free Habit Tracker for Notion — Blocs" />
          <meta
            property="twitter:description"
            content="Embed a free habit tracker in your Notion workspace. Build daily habits, track streaks, and stay consistent. No sign-up required."
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
              Free Habit Tracker for{' '}
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
              Build daily habits with a simple checklist inside your Notion workspace. Track streaks and stay consistent. No sign-up required.
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
              maxWidth="500px"
              css={{
                aspectRatio: '1.2',
                border: '2px solid',
                borderColor: 'var(--colors-primary-accent-1)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <iframe
                src="/habit-tracker"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Blocs Habit Tracker"
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
                title="Build Your Habits"
                description="Check off habits daily and watch your streak grow over time."
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

        {/* Why Track Habits */}
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
              Why Track Your Habits?
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
              Research shows it takes an average of 66 days to form a new habit. A daily tracker
              embedded where you already work removes friction and makes consistency visible.
            </Text>
            <Flex
              justifyContent="center"
              gap="sm"
              flexDirection={['column', , , 'row']}
            >
              <BenefitCard
                title="Stay Consistent"
                description="A daily checklist keeps your habits front and center so nothing slips through the cracks."
              />
              <BenefitCard
                title="Streak Motivation"
                description="Watching your streak grow creates momentum. Breaking it feels costly — in a good way."
              />
              <BenefitCard
                title="Accountability"
                description="Share your tracker with a friend or partner to add a layer of social accountability."
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
                Want more from your Habit Tracker?
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
                Focus Pro unlocks custom habits, streak analytics, theme customization,
                and more — starting at $6/month.
              </Text>
              <Link href="/pricing">
                <Button
                  as="a"
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
