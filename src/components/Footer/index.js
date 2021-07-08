/** @jsxImportSource @emotion/react */
import Box from "../Box"
import Flex from "../Flex"
import Grid from "../Grid"
import Link from "../Link"
import { PageGutters } from "../PageLayout"
import Text from "../Text"

const Footer = () => (
  <Box as="footer" bg="#FCFCFC">
    <PageGutters py="lg">
      <Grid
        width="100%"
        mx="auto"
        gridTemplateColumns={["1fr", "1fr", "1fr", "repeat(2, 1fr)"]}
        gridGap={["sm", "sm", "lg", "auto"]}
      >
        <Box width="min(100%, 350px)">
          <Text
            as="h3"
            fontSize="md"
            color="primary.accent-3"
            fontWeight="bold"
            mb="sm"
            mt={0}
          >
            CONTACT
          </Text>
          <Text fontSize="sm" fontWeight="400" color="primary.accent-2">
            found a bug, have a feature request or simply want to get in touch ?
          </Text>
          <Text fontSize="sm" fontWeight="400" color="primary.accent-2">
            reach out to me at{" "}
            <Link href="mailto:moniet@blocs.me" inline underline passHref>
              {" "}
              moniet@blocs.me 🖖{" "}
            </Link>
          </Text>
        </Box>
        <Box width="min(100%, 350px)">
          <Text
            as="h3"
            fontSize="md"
            color="primary.accent-3"
            fontWeight="bold"
            mb="sm"
            mt={0}
          >
            WHAT IS BLOCS DOING NEXT ?
          </Text>
          <Text fontSize="sm" fontWeight="400" color="primary.accent-2">
            we have tons of new widgets lined up, from goal setters to sleep and
            workout trackers
          </Text>
          <Text fontSize="sm" fontWeight="400" color="primary.accent-2">
            take a little looksy 👀 at our{" "}
            <Link
              href="https://www.notion.so/81a847e283ca4d3583651d7d0d55f692?v=eb4ecf38b53949a6b531e387e90df22a"
              passHref
              inline
              underline
              rel="noopener"
            >
              roadmap
            </Link>{" "}
            to see how we&#39;re progressing
          </Text>
        </Box>
        <Box width="min(100%, 350px)">
          <Text
            as="h3"
            fontSize="md"
            color="primary.accent-3"
            fontWeight="bold"
            mb="sm"
            mt={0}
          >
            COMMUNITY
          </Text>
          <Text fontSize="sm" fontWeight="400" color="primary.accent-2">
            if you like to have a chat about all things productivity you can
            join our{" "}
            <Link
              href="https://discord.gg/AS6mSgPm"
              rel="noopener"
              passHref
              inline
              underline
            >
              discord server
            </Link>
          </Text>
        </Box>
      </Grid>
    </PageGutters>
    <Box bg="primary.accent-4" py="xs">
      <PageGutters>
        <Text
          color="primary.accent-1"
          mb={0}
          fontWeight="400"
          fontSize={[, "xxs", "xs"]}
          letterSpacing="sm"
          textAlign="center"
        >
          © 2021 blocs.me{" "}
          <Text
            as="span"
            color="primary.accent-1"
            mb={0}
            fontWeight="300"
            fontSize={[, "xxs", "xs"]}
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
)

export default Footer
