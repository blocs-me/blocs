import Button from '@/design-system/Button'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import styled from '@emotion/styled'
import { MouseEvent, ReactNode } from 'react'
import { IBox } from '../../helpers/Box/Box.types'
import CheckoutButton from '@/design-system/CheckoutButton'

type Props = {
  header: string
  price: string
  priceAnchor: string
  priceDescSmall: string
  priceDescLarge: string
  onClick: (e: MouseEvent) => void
  ctaColor?: string
  cta: string
  ctaTrackEventName?: string
  isPremium: boolean
  children?: ReactNode
  isLoading?: boolean
  isLifetime?: boolean
  useCheckoutButton?: boolean
  isCurrentPlan?: boolean
  disableButton?: boolean
}

const ChildrenContainer = styled.div`
  & > p:not(:first-of-type) {
    margin-top: 1rem;
  }

  & > p {
    margin-bottom: 0.8rem;
  }

  & [data-type='checkbox'] {
    margin-top: 0.25rem;
  }
`

const PricingCard = ({
  header,
  price,
  priceAnchor,
  priceDescLarge,
  priceDescSmall,
  onClick,
  cta,
  ctaColor = 'foreground',
  ctaTrackEventName = '',
  children,
  isPremium,
  isLoading,
  isLifetime,
  useCheckoutButton = false,
  isCurrentPlan = false,
  disableButton = false,
  ...rest
}: Props & IBox) => {
  return (
    <Flex
      position="relative"
      borderRadius="md"
      bg="background"
      boxShadow="default"
      border={isCurrentPlan ? "2px solid": ""}
      borderColor={isCurrentPlan ? 'primary.accent-4' : ''}
      p="sm"
      flexDirection="column"
      width="300px"
      css={{ gap: '1rem' }}
      {...rest}
    >
      <Text as="h3" variant="mediumBold" m={0}>
        {header}
      </Text>

      <Flex alignItems="center">
        {priceAnchor ? (<><Text
          fontSize="lg"
          fontWeight="bold"
          color="primary.accent-4"
          m={0}
          mr="xxs"
          lineHeight={1}
        >
          <del>${price}</del>
        </Text>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="foreground"
          m={0}
          mr="sm"
          lineHeight={1}
        >
          ${priceAnchor}
        </Text></>):(<Text
          fontSize="xl"
          fontWeight="bold"
          color="foreground"
          m={0}
          mr="sm"
          lineHeight={1}
        >
          ${price}
        </Text>)}
        <Text variant="pSmall" mt={0} lineHeight={1}>
          {priceDescSmall}
        </Text>
      </Flex>
      <Text variant="pSmall">{priceDescLarge}</Text>
      {!useCheckoutButton && (<Button
        width="100%"
        className={ctaTrackEventName ? `plausible-event-name=${ctaTrackEventName}`: ''}
        py="sm"
        bg={ctaColor}
        color={isLifetime ? 'neutral.white' : 'background'}
        onClick={onClick}
        fontSize="sm"
        borderRadius="sm"
        loading={isLoading}
        disabled={isLoading || disableButton}
        css={{ cursor: disableButton ? 'default' : ''}}
      >
        {cta}
      </Button>)}
      {useCheckoutButton && (<CheckoutButton
        width="100%"
        className={ctaTrackEventName ? `plausible-event-name=${ctaTrackEventName}`: ''}
        py="sm"
        bg={ctaColor}
        color={isLifetime ? 'neutral.white' : 'background'}
        onClick={onClick}
        fontSize="sm"
        borderRadius="sm"
        loading={isLoading}
        disabled={isLoading ||disableButton}
        css={{ cursor: disableButton ? 'default' : ''}}
      >
        {cta}
      </CheckoutButton>)}

      <Box width="100%" height="1px" bg="primary.accent-1" />
      <div>
        <Text color="foreground" fontSize="sm" fontWeight="bold" mb={0}>
          Features:
        </Text>
        <ChildrenContainer>
          <Text variant="pSmall">Widgets:</Text>
          {children}
        </ChildrenContainer>
      </div>
    </Flex>
  )
}

export default PricingCard
