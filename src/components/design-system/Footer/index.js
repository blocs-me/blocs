/** @jsxImportSource @emotion/react */
import Box from '@/helpers/Box'
import Grid from '@/helpers/Grid'
import Link from '../Link'
import Text from '../Text'
import ClientSideOnly from '@/helpers/ClientSideOnly'
import PageGutters from '@/helpers/PageGutters'

const RegoLink = ({ children, ...rest }) => (
  <Box mb="xs">
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
          gridTemplateColumns={['1fr', '1fr', '1fr', 'repeat(2, 1fr)']}
          gridGap={['sm', 'sm', 'lg', 'auto']}
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
              Found a bug, have a feature request or simply want to get in touch
              ?
            </Text>
            <Text fontSize="sm" fontWeight="400" color="foreground">
              Reach out to me at{' '}
              <Link href="mailto:moniet@blocs.me" inline underline passHref>
                {' '}
                moniet@blocs.me 🖖{' '}
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
              WHAT IS BLOCS DOING NEXT ?
            </Text>
            <Text fontSize="sm" fontWeight="400" color="foreground">
              We have tons of new widgets lined up, from goal setters to sleep
              and workout trackers
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
            <RegoLink href="/">Home</RegoLink>
            <RegoLink href="/pricing">Pricing</RegoLink>
            <RegoLink href="/sign-in">Sign In</RegoLink>
            <RegoLink href="/privacy-policy.pdf">Privacy Policy</RegoLink>
            <RegoLink href="/t&c.pdf">Terms & Conditions</RegoLink>
            <RegoLink href="/sitemap.xml">Sitemap</RegoLink>
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
              PARTNERS
            </Text>
            <RegoLink target="_blank" href="https://www.datajumbo.co">
              Data Jumbo
            </RegoLink>
            <RegoLink target="_blank" href="https://www.notion-widgets.com">
              Notion Widgets
            </RegoLink>
            <RegoLink target="_blank" href="https://datadrop.app">
              DataDrop
            </RegoLink>
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
            ©{new Date().getFullYear()} blocs.me{' '}
            <Text
              as="span"
              color="neutral.white"
              mb={0}
              fontWeight="300"
              fontSize={[, 'xxs', 'xs']}
              letterSpacing="sm"
              textAlign="center"
            >
              | made with ❤️ and 🍺
            </Text>
          </Text>
          {/* <Text
            color="primary.accent-1"
            mb={0}
            fontWeight="300"
            fontSize={[, "xxs", "xs", "sm"]}
            as="a"
            href="/privacy-policy"
            letterSpacing="sm"
            >
            Privacy Policy
            </Text>
            <Text
            color="primary.accent-1"
            mb={0}
            as="a"
            fontWeight="300"
            fontSize={[, "xxs", "xs", "sm"]}
            href="/terms-and-conditions"
            letterSpacing="sm"
            >
            Terms and Conditions
          </Text> */}
          {/* </Grid> */}
        </PageGutters>
      </Box>
    </Box>
  </ClientSideOnly>
)

export default Footer
