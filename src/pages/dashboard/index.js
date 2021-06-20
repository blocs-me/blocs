import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import Dashboard from "../../components/Dashboard"
import Modal from "../../components/Modal.js"
import NotionSignInButton from "../../components/NotionSignInButton"
import Text from "../../components/Text"
import { ERROR } from "../../constants/fetchStates"
import globalContext from "../../contexts/GlobalContextProvider/globalContext"
import useAuth from "../../hooks/useAuth"

const MainDashboard = () => {
  const [{ authState }] = useContext(globalContext)
  const [promptUserSignIn, setPromptUserSignIn] = useState(false)

  useEffect(() => {
    if (authState === ERROR) {
      !promptUserSignIn && setPromptUserSignIn(true)
    } else {
      promptUserSignIn && setPromptUserSignIn(false)
    }
  }, [authState, promptUserSignIn])

  useAuth()

  return (
    <>
      <Dashboard title="DASHBOARD" />
      <Modal visible={promptUserSignIn} backButton>
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
            try signing in again
          </Text>
          <NotionSignInButton mx="auto" mb="md" />
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
