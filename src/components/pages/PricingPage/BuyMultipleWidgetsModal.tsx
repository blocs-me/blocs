import stripePriceIds from '@/constants/stripePriceIds'
import Button from '@/design-system/Button'
import Modal from '@/design-system/Modal'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import { MouseEvent, useState } from 'react'
import CheckIcon from './PricingCardCheckbox/CheckedIcon'
import Plus from '../../../icons/plus.svg'
import Icon from '@/helpers/Icon'

type Props = {
  isOpen: boolean
  onClose: () => void
}

type LineItem = {
  price: string
  quantity: 1
}

const allItems: {
  [index: string]: LineItem
} = {
  habitTracker: {
    price: stripePriceIds.habitTracker,
    quantity: 1
  },
  pomodoro: {
    price: stripePriceIds.pomodoro,
    quantity: 1
  },
  waterTracker: {
    price: stripePriceIds.waterTracker,
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
        '&:hover': { opacity: 0.8 },
        transiiton: 'opacity 0.2s ease'
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
  handleStripeCheckout
}) => {
  const [products, setProducts] = useState<LineItem[]>([])

  const totalPrice = products.length * 4

  const pickProduct = (e: MouseEvent, productStr: keyof typeof allItems) => {
    const product: LineItem = allItems[productStr]
    const productIndex = products.findIndex(
      (prod) => prod?.price === product.price
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
    const priceId = allItems[str]?.price
    const productIndex = products.findIndex((prod) => prod?.price === priceId)
    return productIndex > -1
  }

  //TODO: if user bought one widget then disable that selection again

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
        <ProductItem
          text="Water Tracker Widget"
          isSelected={getIsProductSelected('waterTracker')}
          onClick={(e) => pickProduct(e, 'waterTracker')}
        />
        <Box mt="sm" />
        <ProductItem
          text="Pomodoro Widget"
          isSelected={getIsProductSelected('pomodoro')}
          onClick={(e) => pickProduct(e, 'pomodoro')}
        />
        <Box mt="sm" />
        <ProductItem
          text="Habit Tracker Tracker"
          isSelected={getIsProductSelected('habitTracker')}
          onClick={(e) => pickProduct(e, 'habitTracker')}
        />
        <Box mt="md" />
        <Text as="div" css={{ alignSelf: 'end' }} color="primary.accent-3">
          Total Price :
          <Box width="30px" as="span" display="inline-block" ml="xxs">
            ${totalPrice}
          </Box>
        </Text>

        <Box width="100%" height="2px" bg="primary.accent-1" mt="sm" />
        <Button
          variant="default"
          bg="brand.accent-1"
          borderRadius="sm"
          mt="md"
          onClick={(e) => handleStripeCheckout(products)}
          disabled={!totalPrice}
        >
          Continue
        </Button>
      </Flex>
    </Modal>
  )
}

export default BuyMultipleWidgetsModals
