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
import DummyQuotePreview from '@/widgets/Quote/DummyQuotePreview'

const faqs = [
  {
    question: 'What is the Quote of the Day Widget?',
    answer: 'An embeddable widget that displays a daily inspirational quote in your Notion workspace. Choose from curated categories or add your own custom quotes.'
  },
  {
    question: 'Where do the quotes come from?',
    answer: 'Blocs includes 100 curated quotes across five categories: motivation, productivity, wisdom, creativity, and mindfulness. You can also add your own custom quotes.'
  },
  {
    question: 'How does the daily quote change?',
    answer: 'In daily mode, the quote changes once per day and is the same for everyone on the same day. In random mode, you get a new quote each time you load the page or click refresh.'
  },
  {
    question: 'Can I use my own quotes?',
    answer: 'Yes. Switch to custom mode and add as many of your own quotes as you like. Add the quote text and author, and the widget will rotate through them.'
  },
  {
    question: 'Can I customize the appearance?',
    answer: 'Yes. Choose light or dark theme, font size (small, medium, large), text alignment, and custom colors for the quote and author text.'
  },
  {
    question: 'How do I add it to Notion?',
    answer: 'From the Blocs dashboard, configure your quote widget, then click "Copy Link". In Notion, type /embed, press Enter, and paste the URL.'
  },
  {
    question: 'Does it require an account?',
    answer: 'The Quote Widget is a Blocs Pro feature. You need a Blocs Pro account to configure and embed it. It\u0027s a one-time $17 payment for lifetime access to all widgets.'
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs Quote of the Day Widget',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/quote-widget',
  offers: {
    '@type': 'Offer',
    price: '17',
    priceCurrency: 'USD'
  },
  description: 'Embeddable quote of the day widget for Notion. Daily or random quotes from curated categories, custom quotes, and full style customization.'
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

export default function QuoteWidgetPage() {
  return (
    <>
      <Box bg="background">
        <Head>
          <title>Quote of the Day Widget for Notion — Blocs Pro</title>
          <meta
            name="description"
            content="Embed a daily inspirational quote in your Notion workspace. Curated categories, custom quotes, and full style customization. Part of Blocs Pro."
          />
          <link rel="canonical" href="https://blocs.me/quote-widget" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/quote-widget" />
          <meta property="og:title" content="Quote of the Day Widget for Notion — Blocs Pro" />
          <meta
            property="og:description"
            content="Embed a daily inspirational quote in your Notion workspace. Curated categories, custom quotes, and full style customization."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Quote of the Day Widget for Notion — Blocs Pro" />
          <meta
            property="twitter:description"
            content="Embed a daily quote in Notion. Curated categories, custom quotes, and full customization."
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
              Quote of the Day for{' '}
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
              Start each day with inspiration. Embed a daily quote from curated categories or your own collection.
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
                  className="plausible-event-name=CTA+Unlock+Quote"
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
              maxWidth="500px"
              borderRadius="md"
              overflow="hidden"
              border="2px solid"
              borderColor="primary.accent-1"
            >
              <DummyQuotePreview />
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
                description="One-time $17 payment gives you lifetime access to all widgets, including the Quote widget."
              />
              <StepCard
                number="2"
                title="Choose Your Quotes"
                description="Pick categories, set the display mode (daily or random), or add your own custom quotes."
              />
              <StepCard
                number="3"
                title="Embed in Notion"
                description="Copy the widget link and paste it into any Notion page with /embed. Your daily quote is live."
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
              Daily Inspiration, Your Way
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
              Curated quotes or your own — styled to match your workspace.
            </Text>
            <Flex
              justifyContent="center"
              gap="sm"
              flexDirection={['column', , , 'row']}
              maxWidth="800px"
              width="100%"
            >
              <BenefitCard
                title="5 Categories"
                description="Motivation, productivity, wisdom, creativity, and mindfulness. Filter to what resonates with you."
              />
              <BenefitCard
                title="Custom Quotes"
                description="Add your own quotes and authors. The widget rotates through your personal collection."
              />
              <BenefitCard
                title="Fully Customizable"
                description="Light or dark theme, three font sizes, text alignment, and custom colors for quote and author."
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
                Ready to embed daily quotes?
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
                Get Blocs Pro for $17 — one-time payment, lifetime access to the Quote widget and all other widgets.
              </Text>
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+See+Pricing+Quote"
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
