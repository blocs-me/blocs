import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import Box from "../../components/Box"
import Dashboard from "../../components/Dashboard"
import Link from "../../components/Link"
import Modal from "../../components/Modal.js"
import NotionSignInButton from "../../components/NotionSignInButton"
import Text from "../../components/Text"
import { ERROR, SUCCESS } from "../../constants/fetchStates"
import globalContext from "../../contexts/GlobalContextProvider/globalContext"
import useAuth from "../../hooks/useAuth"
import useUser from "../../hooks/useUser"
import getAccessToken from "../../utils/getAccessToken"
import { USER_PATH } from "../../utils/paths"

const MainDashboard = () => {
  const [{ authState, authValid, loggingOut }] = useContext(globalContext)
  const [promptUserSignIn, setPromptUserSignIn] = useState(false)
  const [preregisterThankYou, setPreregisterThankYou] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  useAuth() // auth checker

  useEffect(() => {
    if (authState === ERROR) {
      !promptUserSignIn && !loggingOut && setPromptUserSignIn(true)
    } else {
      promptUserSignIn && setPromptUserSignIn(false)
    }
  }, [authState, promptUserSignIn, loggingOut])

  useState(() => {
    if (authValid) {
      const user = getAccessToken() || {}
      const { firstTimeSignIn, preregisteredForPremium } = user.data || {}
      preregisteredForPremium && setPreregisterThankYou(true)

      if ((firstTimeSignIn && preregisteredForPremium) || firstTimeSignIn) {
        setShowThankYou(true)
      }

      localStorage.setItem(
        USER_PATH,
        JSON.stringify({
          ...user,
          data: {
            ...user.data,
            firstTimeSignIn: false,
          },
        })
      )
    } else {
      setShowThankYou(false)
    }
  }, [authValid])

  return (
    <>
      <Head>
        <title>Dashboard | Manage blocs notion widgets</title>
      </Head>
      <Dashboard title="DASHBOARD" />
      <Modal
        visible={showThankYou}
        hideModal={() => setShowThankYou(false)}
        backButton
        redirectTo="/dashboard"
      >
        <Box maxWidth="350px">
          <Text as="div" textAlign="center">
            <Text
              color="primary.default"
              fontWeight="bold"
              fontSize="md"
              as="h3"
              mb="xs"
              mt={0}
            >
              Thank you 🎉
            </Text>
            <Text color="primary.light" fontWeight="300" fontSize="sm">
              {(preregisterThankYou &&
                "Thank you for signing up for premium") ||
                "Thank you for signing up"}
              <br />
              We&#39;re working hard to get blocs out and we&#39;ll inform you
              as soon as it&#39;s ready
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
        </Box>
      </Modal>
      <Modal
        visible={promptUserSignIn}
        // hideModal={() => setPromptUserSignIn(false)}
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
            try logging in again
          </Text>
          <NotionSignInButton mx="auto" mb="md" text="login with notion" />
          <Text fontSize="xxs" mb={0}>
            if the problem persists contact{" "}
            <Link inline underline passHref href="mailto:moniet@blocs.me">
              moniet@blocs.me
            </Link>
          </Text>
        </Text>
      </Modal>
    </>
  )
}

export default MainDashboard
