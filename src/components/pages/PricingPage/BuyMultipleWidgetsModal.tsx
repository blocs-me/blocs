import stripePriceIds from '@/constants/stripePriceIds'
import Modal from '@/design-system/Modal'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import { MouseEvent, useEffect, useState } from 'react'
import CheckIcon from './PricingCardCheckbox/CheckedIcon'
import Plus from '../../../icons/plus.svg'
import Icon from '@/helpers/Icon'
import useBlocsUser from '@/hooks/useBlocsUser'
import CheckoutButton from '@/design-system/CheckoutButton'
import { $ } from '@/utils/JSelectors'

type Props = {
  isOpen: boolean
  isYearly: boolean
  onClose: () => void
}

type LineItem = {
  price_yearly: string
  price_monthly: string
  quantity: 1
}

const allItems: {
  [index: string]: LineItem
} = {
  habitTracker: {
    price_yearly: stripePriceIds.yearly.habitTracker,
    price_monthly: stripePriceIds.monthly.habitTracker,
    quantity: 1
  },
  pomodoro: {
    price_yearly: stripePriceIds.yearly.pomodoro,
    price_monthly: stripePriceIds.monthly.pomodoro,
    quantity: 1
  },
  waterTracker: {
    price_yearly: stripePriceIds.yearly.waterTracker,
    price_monthly: stripePriceIds.monthly.waterTracker,
    quantity: 1
  }
}

const PlusIcon = () => (
  <Icon width="15px" stroke="foreground" display="flex">
    <Plus />
  </Icon>
)

const ProductItem = ({
  isSelected = false,
  onClick = (e: MouseEvent) => {},
  text = ''
}) => {
  const icon = isSelected ? <CheckIcon p="2px" /> : <PlusIcon />

  return (
    <Flex
      alignItems="center"
      css={{
        cursor: 'pointer',
        // '&:hover': { opacity: 0.8 },
      }}
      px="sm"
      py="xs"
      borderRadius="md"
      border={isSelected ? 'solid 1px' : 'dashed 1px'}
      color={isSelected ? 'brand.accent-1' : 'primary.accent-4'}
      boxShadow={isSelected ? 'default' : 'none'}
      bg={isSelected ? 'brand.accent-5' : 'transparent'}
      onClick={onClick}
    >
      <Box width="20px">{icon}</Box>
      <Text fontSize="md" ml="sm" mb={0}>
        {text}
      </Text>
    </Flex>
  )
}

const BuyMultipleWidgetsModals = ({
  isOpen,
  onClose,
  isYearly,
  handleStripeCheckout
}) => {
  const [products, setProducts] = useState<LineItem[]>([])
  const { purchases } = useBlocsUser()
  const [isLoading, setIsLoading] = useState(false)
  const pricePerWidget = isYearly ? 40 : 4
  
  const totalPrice = products.length * pricePerWidget

  const pickProduct = (e: MouseEvent, productStr: keyof typeof allItems) => {
    const product: LineItem = allItems[productStr]
    const productIndex = products.findIndex(
      (prod) => prod?.price_monthly === product.price_monthly || prod?.price_yearly === product.price_yearly
    )

    if (productIndex > -1) {
      setProducts([
        ...products.slice(0, productIndex),
        ...products.slice(productIndex + 1)
      ])
    } else {
      setProducts([...products, product])
    }
  }

  const getIsProductSelected = (str: string) => {
    const priceId = allItems[str]?.price_monthly || allItems[str]?.price_yearly
    const productIndex = products.findIndex((prod) => prod?.price_monthly === priceId || prod?.price_yearly === priceId)
    return productIndex > -1
  }

  const handleSubmit = async (e: MouseEvent) => {
    setIsLoading(true)
    const productsToPurchase = products.map((prod) => ({
      price: isYearly ? prod.price_yearly : prod.price_monthly,
      quantity: prod.quantity
    }))
    await handleStripeCheckout(productsToPurchase)
    setIsLoading(false)
  }

  // if (purchases.lifetimeAccess) return null

  return (
    <Modal visible={isOpen} hideModal={onClose}>
      <Flex flexDirection="column">
        <Text
          as="h2"
          color="foreground"
          fontSize="lg"
          fontWeight="bold"
          mt={0}
          mb={'md'}
        >
          Select a widget
        </Text>
        {!purchases?.waterTracker && (
          <ProductItem
            text="Water Tracker Widget"
            isSelected={getIsProductSelected('waterTracker')}
            onClick={(e) => pickProduct(e, 'waterTracker')}
          />
        )}
        {!purchases.pomodoro && (
          <>
            <Box mt="sm" />
            <ProductItem
              text="Pomodoro Widget"
              isSelected={getIsProductSelected('pomodoro')}
              onClick={(e) => pickProduct(e, 'pomodoro')}
            />
          </>
        )}
        {!purchases.habitTracker && (
          <>
            <Box mt="sm" />
            <ProductItem
              text="Habit Tracker Tracker"
              isSelected={getIsProductSelected('habitTracker')}
              onClick={(e) => pickProduct(e, 'habitTracker')}
            />
          </>
        )}
        <Box mt="md" />
        <Text as="div" css={{ alignSelf: 'end' }} color="primary.accent-3">
          Total Price :
          <Box width="30px" as="span" display="inline-block" ml="xxs">
            ${totalPrice}
          </Box>
        </Text>

        <Box width="100%" height="2px" bg="primary.accent-1" mt="sm" />
        <CheckoutButton
          className='plausible-event-name=buy-multiple-widgets'
          variant="default"
          bg="brand.accent-1"
          borderRadius="sm"
          mt="md"
          onClick={(e) => handleSubmit(e)}
          disabled={!totalPrice || isLoading}
          loading={isLoading}
        >
          Continue
        </CheckoutButton>
      </Flex>
    </Modal>
  )
}

export default BuyMultipleWidgetsModals
