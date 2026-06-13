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
import DummyOnMyPlatePreview from '@/widgets/OnMyPlate/DummyOnMyPlatePreview'

const faqs = [
  {
    question: 'What is the "On My Plate" widget?',
    answer: 'A calm, visual widget you can embed in Notion. Add the things you are carrying — tasks, commitments, ideas — and each one appears as a bubble on a plate. As you add more, the plate fills up, giving you an at-a-glance picture of your mental load.'
  },
  {
    question: 'Is this a to-do list or task manager?',
    answer: 'No. There are no deadlines, calendars, due dates, or time blocking. It is intentionally pressure-free — the goal is visibility over how much you are holding, not scheduling or productivity tracking.'
  },
  {
    question: 'How do I add things to my plate?',
    answer: 'From the Blocs dashboard, type each item into the plate settings. Every item becomes a bubble. Remove anything that is no longer on your plate with a single click.'
  },
  {
    question: 'Can I customize how it looks?',
    answer: 'Yes. Choose a plate style (ceramic, matte, or minimal), pick your plate and item colors, switch between light and dark themes, and set your own title. All customization is included with Blocs Pro.'
  },
  {
    question: 'How do I add it to Notion?',
    answer: 'Configure your plate in the Blocs dashboard, click "Copy Link", then in Notion type /embed, press Enter, and paste the URL.'
  },
  {
    question: 'Does it require an account?',
    answer: 'On My Plate is a Blocs Pro feature. You need a Blocs Pro account to configure and embed it. It is a one-time $17 payment for lifetime access to all widgets.'
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs On My Plate',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/whats-on-my-plate',
  offers: {
    '@type': 'Offer',
    price: '17',
    priceCurrency: 'USD'
  },
  description: 'A visual mental-load widget for Notion. Add what you are carrying and watch your plate fill up — no deadlines, no pressure.'
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

export default function WhatsOnMyPlatePage() {
  return (
    <>
      <Box bg="background">
        <Head>
          <title>What’s On My Plate? — A Mental Load Widget for Notion | Blocs Pro</title>
          <meta
            name="description"
            content="A calm, visual widget for Notion that shows everything on your plate. Add tasks, commitments, and ideas as bubbles and see your mental load at a glance — no deadlines or pressure. Part of Blocs Pro."
          />
          <link rel="canonical" href="https://blocs.me/whats-on-my-plate" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/whats-on-my-plate" />
          <meta property="og:title" content="What’s On My Plate? — A Mental Load Widget for Notion" />
          <meta
            property="og:description"
            content="See everything you are carrying at a glance. A pressure-free visual mental-load widget for your Notion workspace. Part of Blocs Pro."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="What’s On My Plate? — A Mental Load Widget for Notion" />
          <meta
            property="twitter:description"
            content="See everything you are carrying at a glance. A pressure-free visual mental-load widget for your Notion workspace."
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
              What’s On My{' '}
              <Box as="span" color="brand.accent-1">Plate?</Box>
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
              A calm, visual snapshot of everything you’re carrying — embedded right in your Notion workspace. No deadlines, no calendars, no pressure.
            </Text>

            {/* CTA */}
            <Flex gap="sm" flexDirection={['column', , 'row']} alignItems="center" mb="md">
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+Unlock+OnMyPlate"
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
              <DummyOnMyPlatePreview />
            </Box>
          </Flex>
        </PageGutters>

        {/* How It Works */}
        <Box bg="primary.accent-2" py="lg">
          <PageGutters>
            <Text as="h2" fontSize="lg" fontWeight="bold" color="foreground" textAlign="center" m={0} mb="md">
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
                description="One-time $17 payment gives you lifetime access to all widgets, including On My Plate."
              />
              <StepCard
                number="2"
                title="Fill Your Plate"
                description="Add the tasks, commitments, and ideas you’re holding. Each one becomes a bubble — pick your plate style and colors."
              />
              <StepCard
                number="3"
                title="Embed in Notion"
                description="Copy the widget link and paste it into any Notion page with /embed. Your plate is live."
              />
            </Flex>
          </PageGutters>
        </Box>

        {/* Features */}
        <PageGutters>
          <Flex flexDirection="column" alignItems="center" py="lg">
            <Text as="h2" fontSize="lg" fontWeight="bold" color="foreground" textAlign="center" m={0} mb="xs">
              Visibility Without the Pressure
            </Text>
            <Text fontSize="sm" color="primary.accent-4" textAlign="center" m={0} mb="md" lineHeight={1.5} maxWidth="500px">
              A productivity widget for people who don’t want another to-do list.
            </Text>
            <Flex justifyContent="center" gap="sm" flexDirection={['column', , , 'row']} maxWidth="800px" width="100%">
              <BenefitCard
                title="See Your Mental Load"
                description="Every commitment becomes a bubble. As your plate fills, you can finally see how much you’re carrying."
              />
              <BenefitCard
                title="No Deadlines, No Guilt"
                description="No due dates, calendars, or time blocking. Just a gentle, honest picture of right now."
              />
              <BenefitCard
                title="Make It Yours"
                description="Choose ceramic, matte, or minimal plates, custom colors, light or dark themes, and your own title."
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
                Ready to see what’s on your plate?
              </Text>
              <Text fontSize="sm" color="primary.accent-4" textAlign="center" m={0} mb="sm" lineHeight={1.5} maxWidth="500px">
                Get Blocs Pro for $17 — one-time payment, lifetime access to On My Plate and all other widgets.
              </Text>
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+See+Pricing+OnMyPlate"
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
