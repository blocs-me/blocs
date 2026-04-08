import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Button from '@/design-system/Button'
import { postReq } from '@/utils/fetchingUtils'
import { useState } from 'react'
import { NextSeo } from 'next-seo'
import Nav from '@/design-system/Nav'
import nextSeoConfig from '@/constants/next-seo.config'
import Image from 'next/image'

const features = [
  { label: 'Pomodoro Timer', free: true },
  { label: 'Habit Tracker', free: true },
  { label: 'Water Tracker', free: true },
  { label: 'Countdown Timer', free: false },
  { label: 'Progress Bar', free: false },
  { label: 'Clock & Timer', free: false },
  { label: 'Calendar', free: false },
  { label: 'Quote of the Day', free: false },
  { label: 'Weather', free: false },
  { label: 'Edit Durations & Goals', free: false },
  { label: 'Unlimited Habits', free: false },
  { label: 'Analytics & Streaks', free: false },
  { label: 'No Branding', free: false }
]

const Check = () => (
  <Text as="span" m={0} color="success.medium" css={{ fontSize: '16px' }}>
    &#10003;
  </Text>
)

const Cross = () => (
  <Text as="span" m={0} color="primary.accent-4" css={{ fontSize: '16px', opacity: 0.4 }}>
    &#10005;
  </Text>
)

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const FeatureBullet = ({ text }: { text: string }) => (
  <Flex alignItems="center" css={{ gap: '10px' }}>
    <Box
      width="22px"
      height="22px"
      borderRadius="50%"
      bg="brand.accent-5"
      css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
    >
      <Text as="span" m={0} color="brand.accent-1" css={{ fontSize: '12px', fontWeight: 700 }}>
        &#10003;
      </Text>
    </Box>
    <Text fontSize="sm" color="foreground" m={0}>{text}</Text>
  </Flex>
)

const ComparisonTable = () => (
  <Box width="min(100%, 500px)">
    <Box
      border="1px solid"
      borderColor="primary.accent-2"
      borderRadius="md"
      overflow="hidden"
    >
      <Flex
        px="md"
        py="sm"
        bg="primary.accent-2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xs" fontWeight={700} color="foreground" m={0} css={{ flex: 1 }}>
          Widgets & Features
        </Text>
        <Box width="60px" textAlign="center">
          <Text fontSize="xs" fontWeight={700} color="foreground" m={0}>Free</Text>
        </Box>
        <Box width="60px" textAlign="center">
          <Text fontSize="xs" fontWeight={700} color="brand.accent-1" m={0}>Pro</Text>
        </Box>
      </Flex>

      {features.map((f) => (
        <Flex
          key={f.label}
          px="md"
          py="xs"
          justifyContent="space-between"
          alignItems="center"
          borderTop="1px solid"
          borderColor="primary.accent-2"
        >
          <Text fontSize="sm" color="foreground" m={0} css={{ flex: 1 }}>
            {f.label}
          </Text>
          <Box width="60px" textAlign="center">
            {f.free ? <Check /> : <Cross />}
          </Box>
          <Box width="60px" textAlign="center">
            <Check />
          </Box>
        </Flex>
      ))}
    </Box>
  </Box>
)

const PricingPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const res = await postReq('/api/payments/checkout-lifetime')
      window.location.href = res.url
    } catch (err) {
      console.error(err)
      setIsLoading(false)
    }
  }

  return (
    <>
      <Flex pt="80px" flexDirection="column" bg="background" minHeight="100vh">
        <NextSeo
          {...nextSeoConfig}
          title="Pricing — Blocs"
          description="Get lifetime access to all Blocs widgets with full customization, analytics, and no branding. One-time payment, no subscription."
          canonical="https://blocs.me/pricing"
        />
        <Nav />
        <Flex
          width="100%"
          alignItems="center"
          pt="sm"
          pb="lg"
          flexDirection="column"
          px="md"
        >
          <Text
            as="h1"
            color="foreground"
            mb="xxs"
            fontWeight="bold"
            fontSize="xl"
            textAlign="center"
            lineHeight={1.3}
          >
            The widgets Notion should&apos;ve built in
          </Text>
          <Text
            as="h2"
            mt="xxs"
            fontSize="md"
            fontWeight={400}
            color="primary.accent-4"
            textAlign="center"
            lineHeight={1.5}
            maxWidth="800px"
            mb="xxs"
          >
            Pomodoro, habits, water tracking, countdown timers, progress bars, clock, calendar, daily quotes, and live weather — fully customizable, embedded in your workspace.
          </Text>

          <Flex alignItems="center" css={{ gap: '6px' }} mb="sm">
            <Image src="/notion-logo.png" alt="Notion" width={18} height={18} />
            <Text fontSize="sm" fontWeight={600} color="foreground" m={0}>
              Trusted by 10,000+ Notion users
            </Text>
          </Flex>

          <Flex
            mt="sm"
            flexDirection="column"
            alignItems="center"
            width="min(100%, 380px)"
            border="2px solid"
            borderColor="brand.accent-1"
            borderRadius="md"
            overflow="hidden"
          >
            <Box px="md" py="sm" width="100%">
              <Flex justifyContent="space-between" alignItems="center" mb="xs" css={{ gap: '12px' }}>
                <Text fontSize="md" fontWeight={700} color="foreground" m={0}>
                  Lifetime Access
                </Text>
                <Box
                  bg="brand.accent-5"
                  borderRadius="sm"
                  py="3px"
                  px="xs"
                  css={{ flexShrink: 0 }}
                >
                  <Text fontSize="xxs" fontWeight={600} m={0} color="brand.accent-1">
                    ONE-TIME
                  </Text>
                </Box>
              </Flex>

              <Text fontSize="xs" color="primary.accent-4" m={0} mb="xs">
                Pay once, keep forever. No subscription.
              </Text>

              <Button
                className="plausible-event-name=Checkout+Lifetime"
                width="100%"
                py="xs"
                borderRadius="md"
                fontSize="sm"
                bg="brand.accent-1"
                color="neutral.white"
                onClick={handleCheckout}
                loading={isLoading}
                disabled={isLoading}
              >
                Get Blocs Pro — $17
              </Button>
            </Box>

            <Flex px="md" py="xs" bg="primary.accent-2" width="100%" justifyContent="center" alignItems="center" css={{ gap: '6px' }}>
              <Box color="primary.accent-4" css={{ display: 'flex', alignItems: 'center' }}>
                <LockIcon />
              </Box>
              <Text fontSize="xxs" color="primary.accent-4" m={0}>
                Secure payment via Stripe
              </Text>
            </Flex>
          </Flex>

          <Box mt="md">
            <ComparisonTable />
          </Box>

          <Flex css={{ gap: '8px' }} flexDirection="column" width="min(100%, 340px)" mt="md">
            <FeatureBullet text="Unlock all 9 widgets" />
            <FeatureBullet text="Full customization & custom durations" />
            <FeatureBullet text="Analytics, streaks & progress charts" />
            <FeatureBullet text="Remove Blocs branding from embeds" />
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}

export default PricingPage
