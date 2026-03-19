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

const WIDGET_URL = 'https://blocs.me/pomodoro'

const faqs = [
  {
    question: 'What is a Pomodoro timer?',
    answer: 'A Pomodoro timer breaks your work into focused 25-minute intervals (called "pomodoros") separated by short breaks. After four pomodoros, you take a longer break. This technique helps maintain concentration and prevents burnout.'
  },
  {
    question: 'How long is a Pomodoro session?',
    answer: 'A standard Pomodoro session is 25 minutes of focused work, followed by a 5-minute short break. After completing four sessions, you take a 15-minute long break.'
  },
  {
    question: 'How do I add this timer to my Notion page?',
    answer: 'Click "Copy Widget URL" above, then open your Notion page and type /embed. Press Enter, paste the URL, and click "Embed link". The timer will appear directly in your page.'
  },
  {
    question: 'Can I customize the timer duration?',
    answer: 'The free version uses standard Pomodoro intervals (25/5/15 minutes). With Focus Pro, you can create custom presets with any duration for each timer mode.'
  },
  {
    question: 'Does the timer work offline?',
    answer: 'Yes. Once the widget is loaded, the timer runs in your browser and does not require an internet connection to count down.'
  },
  {
    question: 'Is this Pomodoro timer free?',
    answer: 'Yes, the core Pomodoro timer is completely free to use and embed in Notion. No sign-up required. Focus Pro unlocks additional features like custom presets, analytics, and theme customization.'
  },
  {
    question: 'Can I track my focus time over multiple days?',
    answer: 'With Focus Pro, you get built-in analytics that track your daily and weekly focus time, including charts and streak tracking. The free version tracks your current session only.'
  },
  {
    question: 'What happens when the timer ends?',
    answer: 'You will hear a sound alert when the timer completes. You can customize the alert sound and volume in the widget settings.'
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs Pomodoro Timer',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/pomodoro-timer',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  description: 'Free Pomodoro timer widget for Notion. 25-minute focus sessions with short and long breaks.'
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

export default function PomodoroTimerPage() {
  return (
    <BlocsThemeProvider>
      <Box bg="background">
        <Head>
          <title>Free Pomodoro Timer for Notion — Blocs</title>
          <meta
            name="description"
            content="Embed a free Pomodoro timer in your Notion workspace. 25-minute focus sessions with short and long breaks to boost productivity. No sign-up required. Works with any Notion page."
          />
          <link rel="canonical" href="https://blocs.me/pomodoro-timer" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/pomodoro-timer" />
          <meta property="og:title" content="Free Pomodoro Timer for Notion — Blocs" />
          <meta
            property="og:description"
            content="Embed a free Pomodoro timer in your Notion workspace. 25-minute focus sessions with short and long breaks to boost productivity. No sign-up required. Works with any Notion page."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Free Pomodoro Timer for Notion — Blocs" />
          <meta
            property="twitter:description"
            content="Embed a free Pomodoro timer in your Notion workspace. 25-minute focus sessions with short and long breaks to boost productivity. No sign-up required. Works with any Notion page."
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
              Free Pomodoro Timer for{' '}
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
              Stay focused with the Pomodoro Technique — embedded directly in your Notion workspace. No sign-up required.
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
                src="/pomodoro"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Blocs Pomodoro Timer"
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
                title="Start Focusing"
                description="Your Pomodoro timer is live. Hit play and focus on your work."
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
                alt="How to embed the Pomodoro timer in Notion"
                width={600}
                height={338}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </Box>
          </Flex>
        </PageGutters>

        {/* Pomodoro Technique */}
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
              The Pomodoro Technique
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
              Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique uses a simple
              cycle of focused work and breaks to improve concentration and prevent burnout. Work for
              25 minutes, take a 5-minute break, and repeat. After four cycles, take a longer 15-minute break.
            </Text>
            <Flex
              justifyContent="center"
              gap="sm"
              flexDirection={['column', , , 'row']}
            >
              <BenefitCard
                title="Reduced Burnout"
                description="Strategic breaks prevent mental fatigue and keep you fresh throughout the day."
              />
              <BenefitCard
                title="Better Focus"
                description="25-minute sessions create urgency and eliminate the temptation to multitask."
              />
              <BenefitCard
                title="Track Your Progress"
                description="See exactly how you spend your time with built-in focus analytics."
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
                Want more from your Pomodoro?
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
                Focus Pro unlocks custom presets, focus analytics, theme customization,
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
