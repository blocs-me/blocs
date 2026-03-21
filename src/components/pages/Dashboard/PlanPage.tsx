import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import Button from '@/design-system/Button'
import useBlocsUser from '@/hooks/useBlocsUser'
import { isLifestylePro } from '@/lambda/helpers/subscriptionChecker'
import stripeProductIds from '@/constants/stripeProductIds'
import { BlocsUserClient } from '@/gtypes/blocs-user'
import { postReq } from '@/utils/fetchingUtils'
import useNotifications from '@/design-system/Notifications/useNotifications'
import { useState } from 'react'
import { useRouter } from 'next/router'
import daysBetween from '@/utils/dateUtils/daysBetween'

function hasProduct(user: BlocsUserClient, product: string) {
  const products = user?.data?.purchasedProducts
  if (!products) return false
  if (products.includes(stripeProductIds.lifestylePro) || products.includes(stripeProductIds.lifetimeAccess)) return true
  return products.includes(product)
}

const features = [
  { label: 'Pomodoro Timer', product: stripeProductIds.pomodoro, free: true },
  { label: 'Habit Tracker', product: stripeProductIds.habitTracker, free: true },
  { label: 'Water Tracker', product: stripeProductIds.waterTracker, free: true },
  { label: 'Analytics Charts', product: null, free: false },
  { label: 'Custom Themes', product: null, free: false },
  { label: 'Shareable Links', product: null, free: false },
  { label: 'Unlimited Habits', product: null, free: false },
  { label: 'Custom Water Goals', product: null, free: false },
  { label: 'Pomodoro Presets', product: null, free: false }
]

const Check = () => (
  <Text as="span" m={0} color="success.medium" css={{ fontSize: '16px' }}>
    ✓
  </Text>
)

const Cross = () => (
  <Text as="span" m={0} color="primary.accent-4" css={{ fontSize: '16px', opacity: 0.4 }}>
    ✕
  </Text>
)

const PlanPage = () => {
  const { user, purchases, isUserOnFreeTrial } = useBlocsUser()
  const isPremium = isLifestylePro(purchases)
  const isLifetime = !!purchases.lifetimeAccess
  const notif = useNotifications()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const fourteenDays = 1000 * 60 * 60 * 24 * 14
  const daysLeft = isUserOnFreeTrial
    ? Math.max(0, 14 - daysBetween(new Date(), new Date(user?.data?.freeTrialStartedAt || new Date().getTime() - fourteenDays)))
    : 0

  const handleManageBilling = () => {
    setLoading(true)
    postReq('/api/payments/customer-portal-session').then((res) => {
      window.open(res.url, '_blank')
    }).catch(() => {
      notif.createError('Could not open billing portal')
    }).finally(() => setLoading(false))
  }

  const planLabel = isPremium
    ? (isLifetime ? 'Lifetime Access' : 'Pro Plan')
    : (isUserOnFreeTrial ? `Free Trial (${daysLeft} day${daysLeft === 1 ? '' : 's'} left)` : 'Free Plan')

  return (
    <Flex flexDirection="column" width="min(100%, 500px)" m="0 auto">
      <Text as="h2" fontSize="lg" fontWeight={700} color="foreground" m={0} mb="xs">
        Your Plan
      </Text>
      <Box
        px="sm"
        py="xs"
        borderRadius="sm"
        bg={isPremium ? 'brand.accent-5' : 'primary.accent-2'}
        mb="md"
        width="fit-content"
      >
        <Text fontSize="sm" fontWeight={700} color={isPremium ? 'brand.accent-1' : 'foreground'} m={0}>
          {planLabel}
        </Text>
      </Box>

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
            Feature
          </Text>
          <Box width="60px" textAlign="center">
            <Text fontSize="xs" fontWeight={700} color="foreground" m={0}>Free</Text>
          </Box>
          <Box width="60px" textAlign="center">
            <Text fontSize="xs" fontWeight={700} color="brand.accent-1" m={0}>Pro</Text>
          </Box>
        </Flex>

        {features.map((f) => {
          const userHas = isPremium || (f.free && (isUserOnFreeTrial || true))
          return (
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
          )
        })}
      </Box>

      <Box mt="lg">
        {isPremium && !isLifetime && (
          <Button
            width="100%"
            py="xs"
            borderRadius="md"
            fontSize="sm"
            border="solid 1px"
            borderColor="primary.accent-4"
            color="primary.accent-4"
            onClick={handleManageBilling}
            loading={loading}
            disabled={loading}
          >
            Cancel or Update Plan
          </Button>
        )}
        {isLifetime && (
          <Text fontSize="sm" color="primary.accent-4" m={0} textAlign="center">
            You have lifetime access. No subscription to manage.
          </Text>
        )}
        {!isPremium && (
          <Button
            width="100%"
            py="xs"
            borderRadius="md"
            fontSize="sm"
            bg="brand.accent-1"
            color="neutral.white"
            onClick={() => router.push('/pricing')}
          >
            Upgrade to Pro
          </Button>
        )}
      </Box>
    </Flex>
  )
}

export default PlanPage
