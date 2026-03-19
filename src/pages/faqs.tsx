import Head from 'next/head'
import Nav from '@/design-system/Nav'
import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import PageGutters from '@/helpers/PageGutters'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import Link from 'next/link'

const FAQItem = ({ question, answer }: { question: string; answer: React.ReactNode }) => (
  <Box
    as="details"
    borderBottom="solid 1px"
    borderColor="primary.accent-1"
    py="sm"
    css={{
      '&[open] summary': { fontWeight: 600 },
      'summary': { cursor: 'pointer', listStyle: 'none' },
      'summary::-webkit-details-marker': { display: 'none' }
    }}
  >
    <Box as="summary">
      <Text fontSize="sm" fontWeight={500} color="foreground" m={0}>
        {question}
      </Text>
    </Box>
    <Text fontSize="sm" color="primary.accent-4" mt="xs" mb={0} lineHeight={1.6}>
      {answer}
    </Text>
  </Box>
)

const faqs = [
  {
    question: 'Is Blocs free to use?',
    answer: 'Yes! Every Blocs widget (Pomodoro Timer, Water Tracker, Habit Tracker) is free to embed in Notion with no sign-up required. Blocs Pro unlocks additional features like custom presets, analytics, and theme customization.'
  },
  {
    question: 'How do I add a widget to my Notion page?',
    answer: 'Copy the widget URL from the widget page (e.g. /pomodoro-timer), then in Notion type /embed, press Enter, paste the URL, and click "Embed link". The widget will appear directly in your page.'
  },
  {
    question: 'What widgets does Blocs offer?',
    answer: 'Blocs currently offers three widgets: a Pomodoro Timer for focused work sessions, a Water Tracker to monitor daily water intake, and a Habit Tracker for building daily habits. All are designed to work inside Notion.'
  },
  {
    question: 'What is Blocs Pro?',
    answer: 'Blocs Pro is the paid plan that unlocks premium features across all widgets: custom timer presets with personalized durations and labels, focus analytics and streak tracking, theme customization, and more.'
  },
  {
    question: 'Why charge for Blocs?',
    answer: 'Running Blocs costs real money: servers, databases, and development time. The free tier covers the core experience. Blocs Pro supports ongoing development and lets us keep improving the widgets without ads or selling your data.'
  },
  {
    question: 'Does the Pomodoro timer work offline?',
    answer: 'Yes. Once the widget is loaded, the timer runs entirely in your browser and does not require an internet connection to count down.'
  },
  {
    question: 'Can I customize the Pomodoro timer durations?',
    answer: 'The free version uses standard Pomodoro intervals (25-minute focus, 5-minute short break, 15-minute long break). With Blocs Pro, you can create custom presets with any duration and save multiple configurations.'
  },
  {
    question: 'Can I track my focus time and habits over time?',
    answer: 'With Blocs Pro, you get built-in analytics that track your daily and weekly focus time, water intake, and habit streaks with charts and statistics.'
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel anytime from your Blocs dashboard under account settings. Your Pro features will remain active until the end of your billing period.'
  },
  {
    question: 'I found a bug or have a feature request. How do I get in touch?',
    answer: 'Email us at support@blocs.me. We read every message and typically respond within 24 hours.'
  }
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof faq.answer === 'string' ? faq.answer : ''
    }
  }))
}

export default function FAQsPage() {
  return (
    <BlocsThemeProvider>
      <Head>
        <title>FAQs — Free Notion Widgets | Blocs</title>
        <meta
          name="description"
          content="Frequently asked questions about Blocs: free Notion widgets for Pomodoro timing, water tracking, and habit tracking."
        />
        <link rel="canonical" href="https://blocs.me/faqs" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blocs.me/faqs" />
        <meta property="og:title" content="FAQs — Free Notion Widgets | Blocs" />
        <meta
          property="og:description"
          content="Frequently asked questions about Blocs: free Notion widgets for Pomodoro timing, water tracking, and habit tracking."
        />
        <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <Nav />

      <PageGutters>
        <Box py="lg" maxWidth="700px" mx="auto">
          <Text
            as="h1"
            fontSize="lg"
            fontWeight="bold"
            color="foreground"
            mb="md"
            mt={0}
            textAlign="center"
          >
            Frequently Asked Questions
          </Text>
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
          <Box mt="lg" textAlign="center">
            <Text fontSize="sm" color="primary.accent-4" mb="xs">
              Still have questions?
            </Text>
            <Text fontSize="sm" color="foreground" m={0}>
              Email us at{' '}
              <Box
                as="a"
                href="mailto:support@blocs.me"
                color="brand.accent-1"
                css={{ textDecoration: 'underline' }}
              >
                support@blocs.me
              </Box>
            </Text>
          </Box>
        </Box>
      </PageGutters>

      <Footer />
    </BlocsThemeProvider>
  )
}
