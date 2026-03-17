import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import { postReq } from '@/utils/fetchingUtils'
import PricingCard from './PricingCard'
import PricingCardCheckbox from './PricingCardCheckbox/PricingCardCheckbox'
import stripePriceIds from '../../../constants/stripePriceIds'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { MouseEvent, useState } from 'react'
import useBlocsUser from '@/hooks/useBlocsUser'
import { BlocsUserClient } from '../../../global-types/blocs-user'
import Modal from '@/design-system/Modal'
import Button from '@/design-system/Button'
import { NextSeo } from 'next-seo'
import Nav from '@/design-system/Nav'
import nextSeoConfig from '@/constants/next-seo.config'
import Switch from '@/design-system/Switch'
import { isLifestylePlan, isLifestylePro } from '@/lambda/helpers/subscriptionChecker'

type Products = {
  price: string
  quantity: 1
}[]

const handleStripeCheckout = async (products: Products) => {
  try {
    const checkoutSession: Stripe.Checkout.Session = await postReq(
      '/api/payments/checkout',
      {
        body: {
          products
        }
      }
    )
    window.location.href = checkoutSession.url;
  } catch (err) {
    console.error(err)
  }
}

const subscribePro = async (blocsUser: BlocsUserClient, yearly: boolean = false) => {
  await handleStripeCheckout([
    {
      price: yearly ? stripePriceIds.yearly.lifestylePro : stripePriceIds.monthly.lifestylePro,
      quantity: 1
    }
  ])
}

const PricingPage = () => {
  const router = useRouter()
  const { user, purchases } = useBlocsUser()
  const [showSignInMessage, setShowSignInMessage] = useState(false)
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
  const [isYearly, setIsYearly] = useState(true)

  const handleBuyPro = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) return setShowSignInMessage(true)
    if (!purchases?.lifestylePro) {
      setIsCheckoutLoading(true)
      await subscribePro(user, isYearly)
    }
  }

  const handleRedirect = () => router.push('/sign-in')

  return (
    <>
      <Flex pt="80px" flexDirection="column" bg="background" maxWidth="100vw">
        <NextSeo
          {...nextSeoConfig}
          title="Pricing | Blocs — Notion Widgets for Focus & Habits"
          description="Stay focused inside Notion with Pomodoro, Habit Tracker, and Water Tracker widgets. Pro plan from $3/mo."
          canonical="https://blocs.me/pricing"
        />
        <Nav />
        <Flex
          width="100%"
          height="100%"
          alignItems="center"
          pt="md"
          pb="xl"
          flexDirection="column"
          px="md"
        >
          <Box maxWidth="560px">
            <Text
              as="h1"
              color="foreground"
              mb="xs"
              fontWeight={'bold'}
              fontSize="xl"
              textAlign="center"
              lineHeight={1.3}
            >
              Pays for itself the first time you stay focused instead of switching tabs
            </Text>
            <Text
              as="h2"
              mt="xs"
              fontSize="md"
              fontWeight={400}
              color="primary.accent-4"
              textAlign="center"
              lineHeight={1.5}
            >
              Pomodoro timer, habit tracker, and water tracker — all embedded directly in your Notion workspace.
            </Text>
            <Flex flexDirection='row' justifyContent="center" alignItems="center" mt="md" mb="sm">
              <Text
                mt={0}
                mb={0}
                mr={16}
                fontSize="md"
                fontWeight={isYearly ? 200 : 600}
                color={isYearly ? "primary.accent-4" : "foreground"}
                textAlign="center"
              >
                Monthly
              </Text>
              <Switch
                checked={isYearly}
                id={'payment-switch'}
                ariaLabel={'payment-switch'}
                onChange={() => setIsYearly(!isYearly)}
              />
              <Text
                mt={0}
                mb={0}
                ml={16}
                fontSize="md"
                fontWeight={isYearly ? 600 : 200}
                color={isYearly ? "foreground" : "primary.accent-4"}
                textAlign="center"
              >
                Yearly
              </Text>
              {isYearly && (
                <Box
                  bg="brand.accent-5"
                  borderRadius="sm"
                  py="3px"
                  px="xs"
                  ml="xs"
                >
                  <Text
                    fontSize="xxs"
                    fontWeight={600}
                    m={0}
                    color="brand.accent-1"
                  >
                    Save 40%
                  </Text>
                </Box>
              )}
            </Flex>
          </Box>

          <Flex
            width="100%"
            justifyContent="center"
            mt="md"
          >
            <PricingCard
              header="Focus Pro"
              isLifetime
              price={isYearly ? "36" : "5"}
              priceAnchor=''
              priceDescSmall={isYearly ? "/ year" : "/ month"}
              priceDescFootprint={''}
              priceDescLarge={isYearly
                ? "That's $3/mo — less than a single coffee."
                : "Cancel anytime. No commitment."
              }
              cta={isLifestylePro(purchases) ? "Current Plan" : "Get Focus Pro"}
              ctaColor="brand.accent-1"
              ctaTrackEventName="buy-lifestyle-pro"
              isPremium
              onClick={handleBuyPro}
              boxShadow="lg"
              useCheckoutButton
              isCurrentPlan={isLifestylePro(purchases)}
              disableButton={isLifestylePlan(purchases)}
              isLoading={isCheckoutLoading}
              width={["100%", , "380px"]}
            >
              <PricingCardCheckbox text="Pomodoro timer with custom presets" />
              <PricingCardCheckbox text="Habit tracker with streaks" />
              <PricingCardCheckbox text="Water tracker with daily goals" />
              <PricingCardCheckbox text="Unlimited analytics history" />
              <PricingCardCheckbox text="Weekly and monthly progress reports" />
              <PricingCardCheckbox text="Share progress with friends" />
              <PricingCardCheckbox text="All future widgets included" />
              <PricingCardCheckbox text="No branding on your widgets" />
            </PricingCard>
          </Flex>

          <Text
            mt="md"
            fontSize="sm"
            color="primary.accent-4"
            textAlign="center"
            lineHeight={1.6}
          >
            We also offer a{' '}
            <Text
              as="a"
              fontSize="sm"
              color="brand.accent-1"
              css={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => router.push('/sign-in?start-free-trial=true')}
            >
              free 14-day trial
            </Text>
            {' '}so you can try everything before you commit.
          </Text>
        </Flex>
        <Footer />
      </Flex>

      <Modal
        visible={showSignInMessage}
        hideModal={() => setShowSignInMessage(false)}
      >
        <Text variant="mediumBold" textAlign="center">
          One quick step before checkout
        </Text>
        <Text fontSize="md" textAlign="center" color="primary.accent-4">
          Sign in to your account to complete your purchase.
        </Text>
        <Button
          bg="brand.accent-1"
          color="background"
          borderRadius="sm"
          mt="sm"
          width="100%"
          height="50px"
          onClick={() => handleRedirect()}
        >
          Sign In
        </Button>
      </Modal>
    </>
  )
}

export default PricingPage
