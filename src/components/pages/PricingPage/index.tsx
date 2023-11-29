import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import { postReq } from '@/utils/fetchingUtils'
import PricingCard from './PricingCard'
import PricingCardCheckbox from './PricingCardCheckbox/PricingCardCheckbox'
import stripePriceIds from '../../../constants/stripePriceIds'
import { useRouter } from 'next/router'
import getStripe from '@/hooks/getStripe'
import Stripe from 'stripe'
import { MouseEvent, useEffect, useState } from 'react'
import BuyMultipleWidgetsModals from './BuyMultipleWidgetsModal'
import useBlocsUser from '@/hooks/useBlocsUser'
import { BlocsUserClient } from '../../../global-types/blocs-user'
import Modal from '@/design-system/Modal'
import Button from '@/design-system/Button'
import Sparkles from '@/design-system/Sparkles'
import float from '@/keyframes/float'
import { NextSeo } from 'next-seo'
import Nav from '@/design-system/Nav'
import nextSeoConfig from '@/constants/next-seo.config'
import { Round } from 'faunadb'

const handleEv = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

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
    const stripe = await getStripe()

    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id
    })

    throw error
  } catch (err) {
    console.error(err)
  }
}

const buyLifetimeAccess = (blocsUser: BlocsUserClient) => {
  handleStripeCheckout([
    {
      price: stripePriceIds.lifetimeAccess,
      quantity: 1
    }
  ])
}

const PricingPage = () => {
  const router = useRouter()
  const { user, purchases } = useBlocsUser()
  const [showSignInMessage, setShowSignInMessage] = useState(false)
  const [showMultiWidgetModal, setShowMultiWidgetModal] = useState(false)
  const [isLifetimeAccessLoading, setIsLifeTimeAccessLoading] = useState(false)
  const [daysLeft, setDaysLeft] = useState(0);


  useEffect(() => {
    setDaysLeft(Math.round((new Date("2023-12-04").getTime() - new Date().getTime() )/ (1000 * 60 * 60 * 24)));
  },[])

  const handleBuyMultiWidgets = (e: MouseEvent) => {
    handleEv(e)

    if (!user) return setShowSignInMessage(true)
    if (purchases?.lifetimeAccess) return null

    setShowMultiWidgetModal(true)
  }

  const handleBuyLifetimeAccess = (e: MouseEvent) => {
    handleEv(e)
    if (!user) return setShowSignInMessage(true)
    if (!purchases?.lifetimeAccess) {
      setIsLifeTimeAccessLoading(true)
      buyLifetimeAccess(user)
    }
  }

  const handleRedirect = () => router.push('/sign-in')

  return (
    <>
      <Flex pt="80px" flexDirection="column" bg="background" maxWidth="100vw">
        <NextSeo
          {...nextSeoConfig}
          title="Pricing | blocs notion widgets | habit tracker"
          description="Pricing for blocs widgets | $69 for lifetime access | $32 for any blocs notion widget; own it forever"
          canonical="https://www.blocs.me/pricing"
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
              priceAnchor=''
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
                text="Weekly / monthly analytics"
                isChecked={false}
              />
            </PricingCard>
            <PricingCard
              header="Lifetime Access"
              isLifetime
              price="65"
              priceAnchor='39'
              priceDescSmall="Unlimited access"
              priceDescLarge="Pay once and use forever!"
              cta="Buy now"
              ctaColor="brand.accent-1"
              ctaTrackEventName="buy-lifetime-access"
              isPremium
              onClick={handleBuyLifetimeAccess}
              css={{
                '@media (min-width: 1100px)': {
                  transform: 'scale(1.05)'
                },
                '@media (max-width: 767px)': {
                  order: -1
                }
              }}
              boxShadow="lg"
              isLoading={isLifetimeAccessLoading}
            >
              <PricingCardCheckbox text="Pomodoro" />
              <PricingCardCheckbox text="Water Analytics" />
              <PricingCardCheckbox text="Habit Tracker" />
              <PricingCardCheckbox text="All future widgets..." />
              <Text variant="pSmall">Analytics:</Text>
              <PricingCardCheckbox text="Unlimited analytics data retention" />
              <PricingCardCheckbox text="Weekly / monthly analytics" />

              <Text variant="pSmall">Extras:</Text>
              <PricingCardCheckbox text="Share your progress with friends" />
              <PricingCardCheckbox text="Save data to notion (coming soon)" />
              <Box
                position="absolute"
                color="background"
                bg="brand.accent-1"
                borderRadius="10px"
                top={['xs', , , 'sm']}
                right={['xxs', , , 'sm']}
                border="solid 2px"
                borderColor="brand.accent-4"
                py="3px"
                px="xs"
                css={{
                  animation: `${float} 1s ease-in-out infinite alternate`
                }}
              >
                <Sparkles
                  minSize={8}
                  maxSize={15}
                  duration={800}
                  numOfStars={3}
                  // css={{ marginTop: '-10px' }}
                >
                  <Text
                    fontSize="xxs"
                    m={0}
                    lineHeight={1.4}
                    textAlign="center"
                    color="neutral.white"
                  >
                    <span>Limited Offer<br/>{daysLeft} seats left</span>
                    <br />
                    {/* TODO: Show realtime data for countdown 👇 */}
                  </Text>
                </Sparkles>
              </Box>
            </PricingCard>
            <PricingCard
              header="Per widget"
              price="32"
              priceAnchor='19'
              priceDescSmall="Access premium features of the purchased widget"
              priceDescLarge="Pay once and use forever!"
              cta="Buy a widget"
              isPremium
              onClick={handleBuyMultiWidgets}
            >
              <PricingCardCheckbox text="Pomodoro" />
              <PricingCardCheckbox text="or Water Analytics" />
              <PricingCardCheckbox text="or Habit Tracker" />
              <Box height="20px" />
              <Text variant="pSmall">Analytics:</Text>
              <PricingCardCheckbox text="Unlimited analytics data retention" />
              <PricingCardCheckbox text="Weekly / monthly analytics" />

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

      <Modal
        visible={showSignInMessage}
        hideModal={() => setShowSignInMessage(false)}
      >
        <Text variant="mediumBold" textAlign="center">
          Thanks for your interest in the premium widgets!
        </Text>
        <Text fontSize="md" textAlign="center" color="primary.accent-4">
          You need to sign in to make the purchase
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
