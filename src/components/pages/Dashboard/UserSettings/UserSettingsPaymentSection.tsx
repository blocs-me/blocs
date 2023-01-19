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

const FreeTrailStatus = () => {
  const { user } = useBlocsUser()
  const daysLeft = Math.max(
    0,
    14 - daysBetween(new Date(), new Date(user?.data?.freeTrialStartedAt))
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
          color="foreground"
          borderColor="foreground"
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
  return (
    <form>
      <Box
        borderRadius="md"
        bg="brand.accent-5"
        p="sm"
        mb="sm"
        position="relative"
        as="a"
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
        <Text
          fontWeight="light"
          color="success.medium"
          fontSize="xxs"
          mb={0}
          mt="sm"
          fontStyle="italic"
        >
          *Manage your payment details
        </Text>
      </Box>
    </form>
  )
}

const LoadingState = () => {
  return <Skeleton height="80px" width="100%" borderRadius="md" mb="sm" />
}

const UserSettingsPaymentSection = () => {
  const { user } = useBlocsUser()
  const isPremium = !!user?.data?.purchasedProducts.length

  if (!user) return <LoadingState />

  return isPremium ? <PremiumStatus /> : <FreeTrailStatus />
}

export default UserSettingsPaymentSection
