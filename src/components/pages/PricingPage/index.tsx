import Footer from '@/design-system/Footer'
import Nav from '@/design-system/Nav'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import { postReq } from '@/utils/fetchingUtils'
import { keyframes } from '@emotion/react'
import PricingCard from './PricingCard'
import PricingCardCheckbox from './PricingCardCheckbox/PricingCardCheckbox'
import stripePriceIds from '../../../constants/stripePriceIds'
import { useRouter } from 'next/router'
import getStripe from '@/hooks/getStripe'
import Stripe from 'stripe'
import { MouseEvent, useState } from 'react'
import BuyMultipleWidgetsModals from './BuyMultipleWidgetsModal'

const float = keyframes`
    from {
      transform: translateY(-2px);
    } to {
      transform: translateY(1px);
    }
`

const handleEv = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

const handleStripeCheckout = async (
  products: {
    price: string
    quantity: 1
  }[]
) => {
  try {
    const checkoutSession: Stripe.Checkout.Session = await postReq(
      '/api/payments/checkout',
      {
        body: {
          products
        }
      }
    )
    const stripe = await getStripe()

    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id
    })

    throw error
  } catch (err) {
    console.error(err)
  }
}

const buyLifetimeAccess = (e: MouseEvent) => {
  handleEv(e)
  handleStripeCheckout([
    {
      price: stripePriceIds.lifetime,
      quantity: 1
    }
  ])
}

const PricingPage = () => {
  const router = useRouter()
  const [showMultiWidgetModal, setShowMultiWidgetModal] = useState(false)

  return (
    <>
      <Flex pt="80px" flexDirection="column" bg="background" maxWidth="100vw">
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
          <div>
            <Text
              as="h1"
              color="foreground"
              mb="sm"
              fontWeight={'bold'}
              fontSize="xl"
              textAlign="center"
            >
              Flexible Pricing Plans
            </Text>
            <Text
              as="h2"
              mt={0}
              fontSize="md"
              fontWeight={200}
              letterSpacing={'md'}
              color="primary.accent-4"
              textAlign="center"
            >
              Choose a plan that works best for you!
            </Text>
          </div>

          <Flex
            css={{ gap: '1.8rem' }}
            width="100%"
            justifyContent="center"
            flexWrap="wrap"
            mt="md"
          >
            <PricingCard
              header="Free Trial"
              price="0"
              priceDescSmall="Free 14 day trial to try out premium features"
              priceDescLarge="Basic features will always be free!"
              cta="Try for free"
              isPremium={false}
              onClick={(e) => router.push('/sign-in?start-free-trial=true')}
            >
              <PricingCardCheckbox text="Pomodoro" />
              <PricingCardCheckbox text="Habit Tracker" isChecked={false} />
              <PricingCardCheckbox text="Water Tracker" isChecked={false} />

              <Text variant="pSmall">Analytics:</Text>
              <PricingCardCheckbox text="One week of data retention" />
              <PricingCardCheckbox
                text="Unlimited analytics data retention"
                isChecked={false}
              />
              <PricingCardCheckbox
                text="Weekly / monthly progress views"
                isChecked={false}
              />
            </PricingCard>
            <PricingCard
              header="Lifetime Access"
              price="30"
              priceDescSmall="unlimited access to all future widgets"
              priceDescLarge="Pay once and then never again!"
              cta="Buy now"
              ctaColor="brand.accent-1"
              isPremium
              onClick={(e) => buyLifetimeAccess(e)}
              css={{ transform: 'scale(1.05)' }}
              boxShadow="lg"
            >
              <PricingCardCheckbox text="Pomodoro" />
              <PricingCardCheckbox text="Water Analytics" />
              <PricingCardCheckbox text="Habit Tracker" />
              <PricingCardCheckbox text="All future widgets..." />
              <Text variant="pSmall">Analytics:</Text>
              <PricingCardCheckbox text="Unlimited analytics data retention" />
              <PricingCardCheckbox text="Weekly / monthly progress views" />

              <Text variant="pSmall">Extras:</Text>
              <PricingCardCheckbox text="Share your progress with friends" />
              <PricingCardCheckbox text="Save data to notion (coming soon)" />
              <Box
                position="absolute"
                color="background"
                bg="brand.accent-1"
                borderRadius="10px"
                top="sm"
                right="sm"
                css={{
                  animation: `${float} 1s ease-in-out infinite alternate`
                }}
              >
                <Text
                  fontSize="xxs"
                  m={0}
                  py="3px"
                  px="xs"
                  lineHeight={1.75}
                  textAlign="center"
                >
                  <span>Limited</span>
                  <br />
                  {/* TODO: Show realtime data for countdown 👇 */}
                </Text>
              </Box>
            </PricingCard>
            <PricingCard
              header="Per widget"
              price="5"
              priceDescSmall="Access premium features of the purchased widget"
              priceDescLarge="Own your widget forever!"
              cta="Buy a widget"
              isPremium
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowMultiWidgetModal(true)
              }}
            >
              <PricingCardCheckbox text="Pomodoro" />
              <PricingCardCheckbox text="or Water Analytics" />
              <PricingCardCheckbox text="or Habit Tracker" />
              <Box height="20px" />
              <Text variant="pSmall">Analytics:</Text>
              <PricingCardCheckbox text="Unlimited analytics data retention" />
              <PricingCardCheckbox text="Weekly / monthly progress views" />

              <Text variant="pSmall">Extras:</Text>
              <PricingCardCheckbox text="Share your progress with friends" />
              <PricingCardCheckbox text="Save data to notion (coming soon)" />
            </PricingCard>
          </Flex>
        </Flex>
        <Footer />
      </Flex>
      <BuyMultipleWidgetsModals
        isOpen={showMultiWidgetModal}
        onClose={(e) => {
          e.stopPropagation()
          setShowMultiWidgetModal(false)
        }}
        handleStripeCheckout={handleStripeCheckout}
      />
    </>
  )
}

export default PricingPage
