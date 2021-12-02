/** @jsxImportSource @emotion/react */
import { useEffect, useState, useContext } from "react"
import Image from "next/image"
import styled from "@emotion/styled"
import { themeGet } from "@styled-system/theme-get"
import Head from "next/head"
import Confetti from "react-dom-confetti"
import Link from "@/design-system/Link"
import Modal from "@/design-system/Modal/index.js"
import getAccessToken from "@/utils/getAccessToken"
import { LOADING } from "@/constants/fetchStates"
import useUser from "@/hooks/useUser"
import useAuth from "@/hooks/useAuth"
import globalContext from "@/contexts/GlobalContextProvider/globalContext"
import Text from "@/design-system/Text"
import Stack from "@/helpers/Stack"
import PageLayout from "@/helpers/PageLayout"
import NotionSignInButton from "@/helpers/NotionSignInButton"
import Loader from "@/design-system/Loader"
import Grid from "@/helpers/Grid"
import Flex from "@/helpers/Flex"
import Button from "@/design-system/Button"
import Box from "@/helpers/Box"
import useFetch from "@/hooks/useFetch"
import { USER_PATH } from "@/utils/endpoints"
import PricingCard from "@/pages/PricingPage/PricingCard"

const Li = styled.li`
  text-transform: lowercase;
  list-style-type: none;
  font-size: ${themeGet("fontSizes.sm")};
  font-weight: 300;
  letter-spacing: ${themeGet("letterSpacings.sm")};
  color: ${themeGet("colors.primary.accent-2")};
  padding: 0;
  line-height: 1.25;

  @media (min-width: 320px) {
    font-size: ${themeGet("fontSizes.xs")};
  }
  @media (min-width: 415px) {
    font-size: ${themeGet("fontSizes.sm")};
  }
`

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: "116",
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
}

const PricingPage = () => {
  const [{ authValid, accessToken, authState }] = useContext(globalContext)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const { user } = useUser({
    shouldFetch: false,
  })

  const handleSuccess = () => {
    const { access_token } = getAccessToken() || {}

    localStorage.setItem(
      USER_PATH,
      JSON.stringify({
        data: {
          ...user,
          preregisteredForPremium: true,
          firstTimeSignIn: false,
        },
        access_token,
      })
    )
    setShowThankYou(true)
  }

  const {
    fetcher: updateUserData,
    loading: updatingUser,
    data: updatedUserdata,
    error,
  } = useFetch(USER_PATH, {
    method: "PATCH",
    onSuccess: handleSuccess,
    body: {
      access_token: accessToken,
      preregisteredForPremium: true,
    },
    shouldFetch: false,
  })

  const preregisteredForPremium =
    user.preregisteredForPremium || updatedUserdata?.preregisteredForPremium

  useAuth()

  useEffect(() => {
    if (error) {
      setShowErrorModal(true)
    }
  }, [error, updatingUser])

  useEffect(() => {
    if (preregisteredForPremium) {
      setConfetti(preregisteredForPremium)
    }
  }, [preregisteredForPremium])

  return (
    <PageLayout navTitle="PRICING">
      <Head>
        <title>Pricing | Notion habit builder</title>
        <meta
          name="description"
          content="Blocs notion widgets, Price: $15 per month"
        />
        <link name="canonical" href="https://blocs.me/pricing" />
      </Head>

      <Box mt="80px" pt={["sm", , , "md"]} />
      <Flex
        width="100%"
        minHeight="calc(100vh - 80px)"
        flexDirection="column"
        position="relative"
      >
        <Flex
          flex="1"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          overflow="visible"
        >
          <Grid
            width="min(100%, 1000px)"
            gridGap="md"
            gridTemplateColumns={[
              "repeat(auto-fit, 1fr)",
              "repeat(2, 1fr)",
              ,
              "repeat(3, 1fr)",
            ]}
            placeItems={["stretch", , , "center"]}
            p="sm"
          >
            <Grid gridColumn={["span 2", , "span 1"]}>
              <PricingCard
                title="FREE"
                summary="access to basic features for :"
                price="0"
                priceSummary="it's free ya'll"
              />
            </Grid>

            <Grid gridRow={["1"]} gridColumn={["1 / 3", , , "2 / 3"]}>
              <PricingCard
                title="LIFETIME ACCESS"
                summary="unlimited access to all the widgets for :"
                price="30"
                priceSummary="pay only once, and then never again!"
                borderColor="secondary"
              />
            </Grid>
            <Grid gridColumn={["span 2", , "span 1"]}>
              <PricingCard
                title="PER WIDGET"
                summary="buy any widget for :"
                price="10"
                priceSummary="own the widget forever!"
              />
            </Grid>
          </Grid>
        </Flex>

        <Box css={{ flex: 1, position: "relative", textAlign: "center" }}>
          <Grid
            gridAutoRows="minmax(min-content, max-content)"
            gridGap={["md", , , 0]}
            pb="lg"
            gridTemplateColumns={[
              "repeat(1fr, auto)",
              ,
              "repeat(3, minmax(min-content, 1fr))",
            ]}
            maxWidth="1000px"
            m="0 auto"
          >
            <Box pt="lg">
              <Text
                as="h3"
                m={0}
                fontWeight="500"
                fontSize={["sm", "sm", , , , "md"]}
                color="secondary"
                letterSpacing="sm"
              >
                FREE FEATURES
              </Text>
              <Text
                as="h4"
                fontSize="sm"
                fontWeight="500"
                color="primary.accent-3"
                letterSpacing="sm"
                m={0}
                mt="md"
              >
                WIDGETS
              </Text>
              <Stack as="ul" mt="sm">
                <Li>pomdoro</Li>
                <Li>water tracker</Li>
                <Li>habit tracker</Li>
              </Stack>
              <Text
                as="h4"
                fontSize="sm"
                fontWeight="500"
                color="primary.accent-3"
                letterSpacing="sm"
                m={0}
                mt="lg"
              >
                ANALYTICS
              </Text>
              <Stack as="ul" mt="sm">
                <Li>
                  daily progress <br />
                  <small>(available only locally)</small>
                </Li>
              </Stack>
            </Box>
            <Box pt="lg">
              <Text
                as="h3"
                m={0}
                fontWeight="500"
                fontSize={["sm", "sm", , , , "md"]}
                color="secondary"
                letterSpacing="sm"
              >
                LIFETIME ACCESS FEATURES
              </Text>
              <Text
                as="h4"
                fontSize="sm"
                fontWeight="500"
                color="primary.accent-3"
                letterSpacing="sm"
                m={0}
                mt="md"
              >
                WIDGETS
              </Text>

              <Stack as="ul" mt="sm">
                <Li>pomdoro</Li>
                <Li>water tracker</Li>
                <Li>habit tracker</Li>
                <Li>time-boxing planner</Li>
                <Li>database visualizer</Li>
                <Li>
                  <Text color="highlight" as="span">
                    and more coming soon...
                  </Text>
                </Li>
              </Stack>
              <Text
                as="h4"
                fontSize="sm"
                fontWeight="500"
                color="primary.accent-3"
                letterSpacing="sm"
                m={0}
                mt="md"
              >
                ANALYTICS
              </Text>
              <Stack as="ul" mt="sm">
                <Li>daily progress</Li>
                <Li>weekly progress</Li>
                <Li>monthly progress</Li>
                <Li>yearly progress</Li>
                <Li>habit streaks 🔥</Li>
              </Stack>
              <Text
                as="h4"
                fontSize="sm"
                fontWeight="500"
                color="primary.accent-3"
                letterSpacing="sm"
                m={0}
                mt="md"
              >
                EXTRAS
              </Text>
              <Stack as="ul" mt="sm">
                <Li>
                  save widget data to Notion{" "}
                  <Box display="inline-block">
                    <Image
                      width="10px"
                      height="10px"
                      src="/notion-logo.png"
                      alt="notion logo"
                    />
                  </Box>
                </Li>
                <Li>
                  share your progress publically
                  <br />
                  <small>(others can help keep you accountable)</small>
                </Li>
              </Stack>
            </Box>
            <Box pt="lg">
              <Text
                as="h3"
                m={0}
                fontWeight="500"
                fontSize={["sm", "sm", , , , "md"]}
                color="secondary"
                letterSpacing="sm"
                css={{ position: "relative" }}
              >
                PER WIDGET FEATURES
              </Text>
              <Text
                as="h4"
                fontSize="sm"
                fontWeight="500"
                color="primary.accent-3"
                letterSpacing="sm"
                m={0}
                mt="md"
              >
                WIDGETS
              </Text>

              <Stack as="ul" mt="sm">
                <Li>pomdoro</Li>
                <Li>water tracker</Li>
                <Li>habit tracker</Li>
                <Li>time-boxing planner</Li>
                <Li>database visualizer</Li>
                <Li>
                  <Text color="highlight" as="span">
                    and more coming soon...
                  </Text>
                </Li>
              </Stack>
              <Text
                as="h4"
                fontSize="sm"
                fontWeight="500"
                color="primary.accent-3"
                letterSpacing="sm"
                m={0}
                mt="md"
              >
                ANALYTICS
              </Text>
              <Stack as="ul" mt="sm">
                <Li>daily progress</Li>
                <Li>weekly progress</Li>
                <Li>monthly progress</Li>
                <Li>yearly progress</Li>
                <Li>habit streaks 🔥</Li>
              </Stack>
              <Text
                as="h4"
                fontSize="sm"
                fontWeight="500"
                color="primary.accent-3"
                letterSpacing="sm"
                m={0}
                mt="md"
              >
                EXTRAS
              </Text>
              <Stack as="ul" mt="sm">
                <Li>
                  save widget data to Notion{" "}
                  <Box display="inline-block">
                    <Image
                      width="10px"
                      height="10px"
                      src="/notion-logo.png"
                      alt="notion logo"
                    />
                  </Box>
                </Li>
                <Li>
                  share your progress publically
                  <br />
                  <small>(others can help keep you accountable)</small>
                </Li>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Flex>

      {/* <Box
        position="absolute"
        top="0"
        left="calc(50% - 1px)"
        height="100%"
        borderLeftWidth="1px"
        borderLeftColor="primary.accent-1"
        borderLeftStyle={["none", "none", , , "solid"]}
        zIndex="-1"
      /> */}

      <Modal
        visible={showThankYou}
        hideModal={() => setShowThankYou(false)}
        backButton
        redirectTo="/pricing"
      >
        <Text as="div" textAlign="center">
          <Text
            color="primary.accent-3"
            fontWeight="bold"
            fontSize="md"
            as="h3"
            mb="xs"
            mt={0}
          >
            Thank you 🎉
          </Text>
          <Text color="primary.accent-2" fontWeight="300" fontSize="sm">
            Thank you for signing up for premium
            <br />
            We&#39;re working hard to release blocs ASAP and we&#39;ll inform
            when it&#39;s ready
          </Text>
          <Text fontSize="xxs" mb={0}>
            keep updated on our progress :{" "}
            <Link
              href="https://www.notion.so/81a847e283ca4d3583651d7d0d55f692?v=eb4ecf38b53949a6b531e387e90df22a"
              passHref
              inline
              underline
              color="secondary"
              rel="noopener"
            >
              notion roadmap
            </Link>{" "}
          </Text>
        </Text>
      </Modal>

      <Modal
        visible={showErrorModal}
        hideModal={() => setShowErrorModal(false)}
        backButton
        redirectTo="/pricing"
      >
        <Text as="div" textAlign="center">
          <Text
            color="primary.accent-3"
            fontWeight="bold"
            fontSize="md"
            as="h3"
            mb="xs"
            mt={0}
          >
            oh no ! 😞
          </Text>
          <Text color="primary.accent-2" fontWeight="300" fontSize="sm">
            looks like something went wrong <br />
            try pre-registering again
          </Text>

          {authValid && !preregisteredForPremium && (
            <Button
              fontSize={["xs", "xs", "sm"]}
              bg="primary.accent-4"
              color="primary.accent-1"
              borderRadius="sm"
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap",
              }}
              px="md"
              py="xs"
              variant="primary"
              width="fit-content"
              letterSpacing="sm"
              onClick={() => updateUserData()}
              alt="pre-register for premium features"
              mb="sm"
            >
              {!updatingUser && (
                <>
                  <Box
                    as="img"
                    mr={["xs", "xs", "sm"]}
                    src="/notion-logo.png"
                    size={["40px"]}
                    alt=""
                  />
                  pre-register for premium
                </>
              )}

              {updatingUser && (
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  minWidth="200px"
                >
                  <Loader />
                </Flex>
              )}
            </Button>
          )}
          <Text fontSize="xxs" mb={0}>
            if the problem persists contact{" "}
            <Link inline underline passHref href="mailto:moniet@blocs.me">
              moniet@blocs.me
            </Link>
          </Text>
        </Text>
      </Modal>
    </PageLayout>
  )
}

export default PricingPage
