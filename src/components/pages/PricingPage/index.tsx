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

const NotionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 100 100" fill="currentColor">
    <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" />
    <path d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V17.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 0.333C69.893 -2.86 68.147 -2.473 61.35 0.227zM25.505 19.223c-5.58 0.453 -6.847 0.557 -10.027 -1.967L8.487 11.7c-0.807 -0.78 -0.39 -1.75 1.163 -1.943l50.833 -3.693c4.467 -0.393 6.793 1.167 8.54 2.527l8.15 5.86c0.39 0.197 1.36 1.363 0.193 1.363l-52.533 3.153 -0.327 0.257zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.497 4.86l-60.96 3.5c-3.11 0.197 -4.847 -0.78 -4.847 -4.08zM77.9 33.943c0.39 1.553 0 3.107 -1.553 3.303l-2.917 0.583v42.773c-2.527 1.36 -4.853 2.137 -6.793 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887L42.38 52.947v24.8l6.02 1.363s0 3.107 -4.277 3.107l-11.76 0.583c-0.39 -0.78 0 -2.723 1.357 -3.11l3.103 -0.78V42.353l-4.277 -0.39c-0.39 -1.553 0.58 -3.887 3.3 -4.08l12.623 -0.78 19.547 29.913V44.927L64.1 44.34c-0.39 -1.947 1.167 -3.303 2.917 -3.5z" fill="white" />
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

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
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

const PricingCard = ({ onCheckout, isLoading }: { onCheckout: () => void; isLoading: boolean }) => (
  <Box
    width="min(100%, 380px)"
    borderRadius="md"
    border="2px solid"
    borderColor="brand.accent-1"
    overflow="hidden"
  >
    <Box px="md" py="sm">
      <Flex justifyContent="space-between" alignItems="center" mb="xxs" css={{ gap: '12px' }}>
        <Text fontSize="lg" fontWeight={700} color="foreground" m={0}>
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

      <Text fontSize="sm" color="primary.accent-4" m={0} mb="xs">
        Pay once, keep forever
      </Text>

      <Flex alignItems="baseline" mb="sm">
        <Text fontSize="xxl" fontWeight={700} color="foreground" m={0} lineHeight={1}>
          $17
        </Text>
      </Flex>

      <Button
        className="plausible-event-name=Checkout+Lifetime"
        width="100%"
        py="xs"
        borderRadius="md"
        fontSize="sm"
        bg="brand.accent-1"
        color="neutral.white"
        onClick={onCheckout}
        loading={isLoading}
        disabled={isLoading}
      >
        Get Blocs Pro
      </Button>

      <Text fontSize="xs" color="primary.accent-4" textAlign="center" m={0} mt="xs">
        No subscription. No recurring charges.
      </Text>
    </Box>

    <Flex px="md" py="xs" bg="primary.accent-2" justifyContent="center" alignItems="center" css={{ gap: '6px' }}>
      <Box color="primary.accent-4" css={{ display: 'flex', alignItems: 'center' }}>
        <LockIcon />
      </Box>
      <Text fontSize="xxs" color="primary.accent-4" m={0}>
        Secure payment via Stripe
      </Text>
    </Flex>
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

          <Flex alignItems="center" css={{ gap: '8px' }} mb="sm">
            <Box css={{ display: 'flex', alignItems: 'center' }} color="foreground">
              <NotionIcon />
            </Box>
            <Text fontSize="sm" fontWeight={600} color="foreground" m={0}>
              Trusted by 10,000+ Notion users
            </Text>
          </Flex>

          <Flex css={{ gap: '8px' }} flexDirection="column" width="min(100%, 340px)" mb="sm">
            <FeatureBullet text="Unlock all 9 widgets" />
            <FeatureBullet text="Full customization & custom durations" />
            <FeatureBullet text="Analytics, streaks & progress charts" />
            <FeatureBullet text="Remove Blocs branding from embeds" />
          </Flex>

          <ComparisonTable />

          <Box mt="md">
            <PricingCard onCheckout={handleCheckout} isLoading={isLoading} />
          </Box>

          <Flex mt="md" flexDirection="column" alignItems="center" css={{ gap: '12px' }}>
            <Button
              className="plausible-event-name=Checkout+Lifetime"
              width="min(100%, 380px)"
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
            <Text fontSize="xs" color="primary.accent-4" m={0}>
              One-time payment. No subscription.
            </Text>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}

export default PricingPage
