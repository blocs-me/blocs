import Link from '@/design-system/Link'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Icon from '@/helpers/Icon'
import Skeleton from '@/helpers/Skeleton'
import useBlocsUser from '@/hooks/useBlocsUser'
import { useTheme } from '@emotion/react'
import { Theme } from 'src/styles/theme'
import { Past } from '../../../../icons/Past'
import daysBetween from '@/utils/dateUtils/daysBetween'
import { MouseEvent } from 'react'
import { postReq } from '@/utils/fetchingUtils'
import PricingCardCheckbox from '@/pages/PricingPage/PricingCardCheckbox'
import styled from '@emotion/styled'
import { BlocsUserClient } from '@/gtypes/blocs-user'
import stripeProductIds from '@/constants/stripeProductIds'

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

function hasProductActivated(user: BlocsUserClient, product: string) {
  const products = user?.purchasedProducts
  if (products.includes(stripeProductIds.lifestylePro) || products.includes(stripeProductIds.lifetimeAccess)) return true
  return products?.includes(product)
}

const FreeTrailStatus = () => {
  const { user } = useBlocsUser()
  const fourteenDays = 1000 * 60 * 60 * 24 * 14
  const daysLeft = Math.max(
    0,
    14 -
    daysBetween(
      new Date(),
      new Date(
        user?.freeTrialStartedAt || new Date().getTime() - fourteenDays
      )
    )
  )

  return (
    <Box
      borderRadius="md"
      bg="brand.accent-5"
      p="sm"
      mb="sm"
      position="relative"
    >
      <Text
        color="foreground"
        fontSize="sm"
        fontWeight={'bold'}
        lineHeight={1}
        mb={0}
      >
        {daysLeft ? 'Free 14 day trial' : 'Free'}
      </Text>
      <Text color="primary.accent-4" fontSize="xs" mb={0}>
        Includes access to{' '}
        <Link
          href="/pricing"
          underline
          css={{ display: 'inline-block' }}
          color="primary.accent-4"
          borderColor="primary.accent-4"
        >
          basic features
        </Link>
      </Text>

      <Box position="absolute" top="0" right="0" p="sm">
        <Box
          fontSize="xs"
          as="div"
          fontWeight={'bold'}
          color="primary.accent-4"
          display="flex"
          css={{ alignItems: 'center' }}
        >
          <Icon
            as="span"
            fill="primary.accent-4"
            width="15px"
            mr="xs"
            display="flex"
          >
            <Past />
          </Icon>
          <Text fontSize="xs" as="span">
            {daysLeft} day{daysLeft === 1 ? '' : 's'}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

const PremiumStatus = () => {
  const theme = useTheme() as Theme
  const { user } = useBlocsUser()
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    postReq('/api/payments/customer-portal-session').then((res) => {
      const url = res.url

      const anchor = document.createElement('a')
      anchor.href = url
      document.body.appendChild(anchor)
      anchor.click()
    })
  }

  return (
    <Box
      onClick={handleClick}
      borderRadius="md"
      bg="brand.accent-5"
      p="sm"
      mb="sm"
      position="relative"
      border="solid 1px transparent"
      css={{
        transition: 'border-color ease 0.2s',
        cursor: 'pointer',
        '&:hover': {
          border: `solid 1px ${theme.colors.brand['accent-1']}`
        }
      }}
    >
      <Text
        color="foreground"
        fontSize="sm"
        fontWeight={'bold'}
        lineHeight={1}
        mb={0}
      >
        Premium User
      </Text>
      <Text color="primary.accent-4" fontSize="xs" mb={0}>
        Includes access to widget(s), analytics and extras
      </Text>
      <Text variant="pSmall" mt="16px">Activated Widgets:</Text>
      <ChildrenContainer>
        <PricingCardCheckbox text="Pomodoro" isChecked={hasProductActivated(user, stripeProductIds.pomodoro)} />
        <PricingCardCheckbox text="Habit Tracker" isChecked={hasProductActivated(user, stripeProductIds.habitTracker)} />
        <PricingCardCheckbox text="Water Tracker" isChecked={hasProductActivated(user, stripeProductIds.waterTracker)} />
      </ChildrenContainer>
      <Text
        fontWeight="light"
        color="success.medium"
        fontSize="xxs"
        mb={0}
        mt="sm"
        fontStyle="italic"
      >
        *Manage your payment details and subscription
      </Text>

      <button
        type="submit"
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%'
        }}
      />
    </Box>
  )
}

const LoadingState = () => {
  return <Skeleton height="80px" width="100%" borderRadius="md" mb="sm" />
}

const UserSettingsPaymentSection = () => {
  const { user } = useBlocsUser()
  const isPremium = !!user?.purchasedProducts?.length

  if (!user) return <LoadingState />

  return isPremium ? <PremiumStatus /> : <FreeTrailStatus />
}

export default UserSettingsPaymentSection
