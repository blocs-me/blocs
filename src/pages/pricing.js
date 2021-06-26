/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { themeGet } from "@styled-system/theme-get"
import Head from "next/head"
import { useContext } from "react"
import Box from "../components/Box"
import Button from "../components/Button"
import Flex from "../components/Flex"
import Grid from "../components/Grid"
import Loader from "../components/Loader"
import NotionSignInButton from "../components/NotionSignInButton"
import PageLayout from "../components/PageLayout"
import Stack from "../components/Stack"
import Text from "../components/Text"
import globalContext from "../contexts/GlobalContextProvider/globalContext"
import useAuth from "../hooks/useAuth"
import useFetch from "../hooks/useFetch"
import useUser from "../hooks/useUser"
import { USER_PATH } from "../utils/paths"
import Modal from "../components/Modal.js"
import Link from "../components/Link"

const Li = styled.li`
  text-transform: lowercase;
  list-style-type: none;
  font-size: ${themeGet("fontSizes.sm")};
  font-weight: 300;
  letter-spacing: ${themeGet("letterSpacings.sm")};
  color: ${themeGet("colors.primary.light")};
  padding: 0;
  line-height: 1;

  @media (min-width: 320px) {
    font-size: ${themeGet("fontSizes.xs")};
  }
  @media (min-width: 415px) {
    font-size: ${themeGet("fontSizes.sm")};
  }
`

const PricingPage = () => {
  const [{ authValid, accessToken }] = useContext(globalContext)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const { user } = useUser({
    shouldFetch: false,
  })

  const {
    fetcher: updateUserData,
    loading: updatingUser,
    data: updatedUserdata,
    error,
  } = useFetch(USER_PATH, {
    method: "PATCH",
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
  }, [error])

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

      <Box mt="80px" pt={["lg", "lg", , , "0"]} />
      <Flex
        width="100%"
        minHeight="calc(100vh - 80px)"
        flexDirection={["column", "column", , , "row"]}
        position="relative"
      >
        <Flex
          flex="1"
          alignItems={["center", "center", , , "start"]}
          justifyContent="center"
          flexDirection="column"
          height="calc(100vh - 80px)"
          borderRightWidth="1px"
          borderRightColor="primary.lightest"
          borderRightStyle={["none", "none", , , "solid"]}
        >
          <div>
            <Text as="div" textAlign="center">
              <Text
                fontSize={["xs", "xxs", "xs"]}
                m="0"
                p="0"
                fontWeight="300"
                color="primary.light"
                letterSpacing="sm"
              >
                BASIC FEATURES ARE{" "}
                <Text as="span" fontWeight="400">
                  TOTALLY FREE
                </Text>
              </Text>
              <Text
                as="h1"
                letterSpacing={["sm", "sm", "lg"]}
                fontSize={["xl", "xl", "gigantic"]}
                fontWeight="bold"
                color="primary.default"
                mt="sm"
                mb="0"
                p={0}
              >
                $15 / month
              </Text>
              <Text
                fontSize={["xxs", "xxs", "xs"]}
                color="primary.light"
                fontWeight="300"
                p={0}
                m={0}
                letterSpacing="sm"
              >
                for all the widgets and premium features
              </Text>
            </Text>
            <Text as="div" textAlign="center" mt="md" letterSpacing="sm">
              {!preregisteredForPremium && !authValid && (
                <NotionSignInButton
                  state="pre-register-for-premium"
                  text="pre-register for premium"
                />
              )}

              {authValid && !preregisteredForPremium && (
                <Button
                  fontSize={["xs", "xs", "sm"]}
                  bg="primary.dark"
                  color="primary.lightest"
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
              {preregisteredForPremium && (
                <Button
                  variant="primary"
                  bg="primary.dark"
                  p="sm"
                  borderRadius="sm"
                  as="div"
                >
                  {" "}
                  🎉 Thank you for signing up for premium
                </Button>
              )}
              <Text
                color="danger"
                fontSize={["xxs", "xxs", "xs"]}
                fontWeight="300"
                mt="xs"
              >
                no payment info required !
              </Text>
            </Text>
          </div>
        </Flex>
        <Text
          as="div"
          textAlign={["center", "center", , , , "left"]}
          css={{ flex: 1, position: "relative" }}
        >
          <Grid
            gridAutoRows="minmax(min-content, max-content)"
            pl={[0, 0, , , "md"]}
            gridGap={["sm", "sm", , "md", 0]}
            py="lg"
            gridTemplateColumns="repeat(2, minmax(min-content, 225px))"
            justifyContent={["center", "center", , , "end"]}
          >
            <Text
              as="h3"
              m={0}
              fontWeight="500"
              fontSize={["sm", "sm", , , , "md"]}
              color="secondary"
              letterSpacing="sm"
            >
              BASIC FEATURES
            </Text>
            <div>
              <Text
                as="h3"
                m={0}
                fontWeight="500"
                fontSize={["sm", "sm", , , , "md"]}
                color="secondary"
                letterSpacing="sm"
              >
                PREMIUM FEATURES
              </Text>
            </div>
            <Text
              as="h4"
              fontSize="sm"
              fontWeight="500"
              color="primary.default"
              letterSpacing="sm"
              m={0}
              mt="lg"
            >
              WIDGETS
            </Text>
            <Text
              as="h4"
              fontSize="sm"
              fontWeight="500"
              color="primary.default"
              letterSpacing="sm"
              m={0}
              mt="lg"
            >
              WIDGETS
            </Text>

            <Stack as="ul" mt="sm">
              <Li>pomdoro</Li>
              <Li>water tracker</Li>
              <Li>habit tracker</Li>
            </Stack>
            <Stack as="ul" mt="sm">
              <Li>pomdoro</Li>
              <Li>water tracker</Li>
              <Li>habit tracker</Li>
              <Li>goal setter</Li>
              <Li>sleep tracker</Li>
              <Li>recurring task manager</Li>
              <Li>database visualizer</Li>
              <Li>
                <Text color="highlight" as="span">
                  and tons more...
                </Text>
              </Li>
            </Stack>
            <Text
              as="h4"
              fontSize="sm"
              fontWeight="500"
              color="primary.default"
              letterSpacing="sm"
              m={0}
              mt="lg"
            >
              ANALYTICS
            </Text>
            <Text
              as="h4"
              fontSize="sm"
              fontWeight="500"
              color="primary.default"
              letterSpacing="sm"
              m={0}
              mt="lg"
            >
              ANALYTICS
            </Text>
            <Stack as="ul" mt="sm">
              <Li>daily progress</Li>
              <Li>weekly progress</Li>
            </Stack>
            <Stack as="ul" mt="sm">
              <Li>daily progress</Li>
              <Li>weekly progress</Li>
              <Li>monthly progress</Li>
              <Li>yearly progress</Li>
              <Li>habit streaks 🔥</Li>
            </Stack>
          </Grid>
        </Text>
      </Flex>

      <Modal
        visible={showErrorModal}
        hideModal={() => setShowErrorModal(false)}
        backButton
        redirectTo="/"
      >
        <Text as="div" textAlign="center">
          <Text
            color="primary.default"
            fontWeight="bold"
            fontSize="md"
            as="h3"
            mb="xs"
            mt={0}
          >
            oh no ! 😞
          </Text>
          <Text color="primary.light" fontWeight="300" fontSize="sm">
            looks like something went wrong <br />
            try signing up again
          </Text>
          <NotionSignInButton text="sign up with notion" mx="auto" mb="md" />
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
