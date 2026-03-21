/** @jsxImportSource @emotion/react */
import Box from '@/helpers/Box'
import Grid from '@/helpers/Grid'
import Link from '../Link'
import Text from '../Text'
import ClientSideOnly from '@/helpers/ClientSideOnly'
import PageGutters from '@/helpers/PageGutters'

const RegoLink = ({ children, ...rest }) => (
  <Box mb="xxs">
    <Link {...rest} color="foreground" passHref>
      <Text css={{ cursor: 'pointer' }} fontSize="sm" as="span">
        {children}
      </Text>
    </Link>
  </Box>
)

const Footer = () => (
  <ClientSideOnly>
    <Box as="footer" bg="primary.accent-2">
      <PageGutters py="lg">
        <Grid
          width="100%"
          mx="auto"
          gridTemplateColumns={['1fr', '1fr', 'repeat(3, 1fr)']}
          gridGap={['sm', 'sm', 'lg']}
        >
          <Box width="min(100%, 350px)">
            <Text
              as="h3"
              fontSize="md"
              color="foreground"
              fontWeight="bold"
              mb="sm"
              mt={0}
            >
              CONTACT
            </Text>
            <Text fontSize="sm" fontWeight="400" color="foreground">
              Found a bug, have a feature request or want to get in touch?
            </Text>
            <Text fontSize="sm" fontWeight="400" color="foreground">
              Reach out at{' '}
              <Link href="mailto:support@blocs.me" inline underline passHref>
                support@blocs.me
              </Link>
            </Text>
          </Box>
          <Box width="min(100%, 350px)">
            <Text
              as="h3"
              fontSize="md"
              color="foreground"
              fontWeight="bold"
              mb="sm"
              mt={0}
            >
              LINKS
            </Text>
            <RegoLink href="/pricing">Pricing</RegoLink>
            <RegoLink href="/faqs">FAQs</RegoLink>
            <RegoLink href="/privacy-policy.pdf">Privacy Policy</RegoLink>
            <RegoLink href="/t&c.pdf">Terms & Conditions</RegoLink>
          </Box>
          <Box width="min(100%, 350px)">
            <Text
              as="h3"
              fontSize="md"
              color="foreground"
              fontWeight="bold"
              mb="sm"
              mt={0}
            >
              FREE WIDGETS
            </Text>
            <RegoLink href="/pomodoro-timer">Pomodoro Timer</RegoLink>
            <RegoLink href="/water-tracker-widget">Water Tracker</RegoLink>
            <RegoLink href="/habit-tracker-widget">Habit Tracker</RegoLink>
          </Box>
        </Grid>
      </PageGutters>
      <Box bg="neutral.black" py="xs">
        <PageGutters>
          <Text
            color="neutral.white"
            mb={0}
            fontWeight="400"
            fontSize={[, 'xxs', 'xs']}
            letterSpacing="sm"
            textAlign="center"
          >
            &copy;{new Date().getFullYear()} blocs.me
          </Text>
        </PageGutters>
      </Box>
    </Box>
  </ClientSideOnly>
)

export default Footer
