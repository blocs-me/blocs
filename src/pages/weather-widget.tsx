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
import DummyWeatherPreview from '@/widgets/Weather/DummyWeatherPreview'

const faqs = [
  {
    question: 'What is the Weather Widget?',
    answer: 'A live weather widget you can embed in any Notion page. It shows current conditions, temperature, and an optional multi-day forecast for any city you choose.'
  },
  {
    question: 'Where does the weather data come from?',
    answer: 'Weather data comes from Open-Meteo, a free and open-source weather API. No API key is needed. Data refreshes every 15 minutes automatically.'
  },
  {
    question: 'Can I show a forecast?',
    answer: 'Yes. Switch to forecast mode in the dashboard to show a 3-7 day forecast alongside current conditions. Each day shows the weather icon, high, and low temperatures.'
  },
  {
    question: 'Does it auto-detect my location?',
    answer: 'You can click "Use my current location" in the dashboard to auto-detect your city via browser geolocation. You can also search for any city manually.'
  },
  {
    question: 'Can I use Fahrenheit?',
    answer: 'Yes. Toggle between Celsius and Fahrenheit in the dashboard settings.'
  },
  {
    question: 'How do I add it to Notion?',
    answer: 'From the Blocs dashboard, set your location and preferences, then click "Copy Link". In Notion, type /embed, press Enter, and paste the URL.'
  },
  {
    question: 'Does it require an account?',
    answer: "The Weather Widget is a Blocs Pro feature. You need a Blocs Pro account to configure and embed it. It's a one-time $17 payment for lifetime access to all widgets."
  }
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Blocs Weather Widget',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  url: 'https://blocs.me/weather-widget',
  offers: {
    '@type': 'Offer',
    price: '17',
    priceCurrency: 'USD'
  },
  description: 'Embeddable live weather widget for Notion. Current conditions, multi-day forecast, Celsius or Fahrenheit, light and dark themes.'
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

export default function WeatherWidgetPage() {
  return (
    <>
      <Box bg="background">
        <Head>
          <title>Weather Widget for Notion — Blocs Pro</title>
          <meta
            name="description"
            content="Embed live weather in your Notion workspace. Current conditions, multi-day forecast, any city. Celsius or Fahrenheit, light and dark themes. Part of Blocs Pro."
          />
          <link rel="canonical" href="https://blocs.me/weather-widget" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://blocs.me/weather-widget" />
          <meta property="og:title" content="Weather Widget for Notion — Blocs Pro" />
          <meta
            property="og:description"
            content="Embed live weather in your Notion workspace. Current conditions, multi-day forecast, any city. Celsius or Fahrenheit."
          />
          <meta property="og:image" content="https://blocs.me/blocs-social-banner.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="Weather Widget for Notion — Blocs Pro" />
          <meta
            property="twitter:description"
            content="Embed live weather in Notion. Current conditions, forecast, and custom themes."
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
              Weather Widget for{' '}
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
              Live weather conditions right inside your workspace. Current temperature, forecast, and conditions for any city.
            </Text>

            <Flex
              gap="sm"
              flexDirection={['column', , 'row']}
              alignItems="center"
              mb="md"
            >
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+Unlock+Weather"
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

            <Box
              width="100%"
              maxWidth="420px"
              borderRadius="md"
              overflow="hidden"
              border="2px solid"
              borderColor="primary.accent-1"
            >
              <DummyWeatherPreview />
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
                description="One-time $17 payment gives you lifetime access to all widgets, including the Weather widget."
              />
              <StepCard
                number="2"
                title="Set Your Location"
                description="Search for any city or use your current location. Choose display mode, units, and theme."
              />
              <StepCard
                number="3"
                title="Embed in Notion"
                description="Copy the widget link and paste it into any Notion page with /embed. Live weather, always up to date."
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
              Weather at a Glance
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
              Three display modes to fit any workspace layout.
            </Text>
            <Flex
              justifyContent="center"
              gap="sm"
              flexDirection={['column', , , 'row']}
              maxWidth="800px"
              width="100%"
            >
              <BenefitCard
                title="Current Conditions"
                description="Large temperature display with weather icon, location, and optional details like humidity, wind, and feels-like."
              />
              <BenefitCard
                title="Multi-Day Forecast"
                description="See 3-7 days ahead with daily highs, lows, and weather icons. Plan your week at a glance."
              />
              <BenefitCard
                title="Compact Mode"
                description="Ultra-minimal — just the temperature and icon. Perfect for embedding alongside other widgets."
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
                Ready to embed live weather?
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
                Get Blocs Pro for $17 — one-time payment, lifetime access to the Weather widget and all other widgets.
              </Text>
              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <Button
                  className="plausible-event-name=CTA+See+Pricing+Weather"
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
