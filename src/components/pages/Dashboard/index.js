/** @jsxImportSource @emotion/react */
import { useState } from "react"
import useUser from "@/hooks/useUser"
import Avatar from "@/design-system/Avatar"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Grid from "@/helpers/Grid"
import PageLayout from "@/helpers/PageLayout"
import Pomodoro from "@/widgets/Pomodoro"
import Skeleton from "@/helpers/Skeleton"
import Stack from "@/helpers/Stack"
import Text from "@/design-system/Text"
import WaterTracker from "@/widgets/WaterTracker"
import HabitTracker from "@/widgets/HabitTracker"
import Button from "@/design-system/Button"
import useFetch from "@/hooks/useFetch"
import { TEMP_ACCESS_TOKEN_PATH } from "@/utils/endpoints"
import getAccessToken from "@/utils/getAccessToken"
import useClipboard from "@/hooks/useClipboard"
import Modal from "@/design-system/Modal/index.js"
import Confetti from "react-dom-confetti"
import DummyPomodoro from "@/widgets/Pomodoro/DummyPomodoro"

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

const ProductWrapper = ({
  children,
  title,
  showCopyLink,
  onClick,
  loading,
}) => (
  <Stack
    height="100%"
    width="100%"
    flexDirection="column"
    mt="sm"
    css={{ transform: "scale(0.9)" }}
    alignItems="center"
    justifyContent="center"
    display="flex"
  >
    <Text
      textAlign="center"
      fontSize="md"
      fontWeight="bold"
      color="primary.accent-3"
      letterSpacing="sm"
      mb={0}
    >
      {title}
    </Text>
    <Flex justifyContent="center">{children}</Flex>

    {showCopyLink && !loading && (
      <Button
        variant="default"
        // height=""
        bg="secondary"
        color="bg.default"
        borderRadius="sm"
        onClick={() => onClick()}
        width="50%"
      >
        copy link
      </Button>
    )}

    {loading && <Skeleton width="50%" borderRadius="sm" height="40px" />}

    {!showCopyLink && (
      <Text color="secondary" textAlign="center" fontSize="sm" p={0} mb={0}>
        coming soon
      </Text>
    )}
  </Stack>
)

const Dashboard = ({ links }) => {
  const { user, loading } = useUser()
  const {
    avatar_url: avatarLink,
    name: userName,
    preregisteredForPremium,
  } = user || {}

  const [pomodoroModal, setPomodoroModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const clipboard = useClipboard()

  const { access_token } = getAccessToken() || {}

  const handlePomodoroLinkSuccess = (res) => {
    const { token } = res?.data || {}
    const link = `https://blocs.me/pomodoro?token=${token}`
    clipboard(link)
    setPomodoroModal(true)

    // setTimeout(() => {
    //   setShowConfetti(true)
    // }, 500)
  }

  const { loading: pomodoroTokenLoading, fetcher: fetchPomodoroToken } =
    useFetch(TEMP_ACCESS_TOKEN_PATH, {
      shouldCache: false,
      shouldFetch: false,
      method: "POST",
      onSuccess: handlePomodoroLinkSuccess,
      body: {
        access_token,
      },
    })

  return (
    <>
      <PageLayout navTitle="DASHBOARD" links={links}>
        <Box mt="80px" />
        <Flex
          width="100%"
          minHeight="100vh"
          height="auto"
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="column"
          pt="3rem"
        >
          <Flex alignItems="center" flexDirection="column">
            <Avatar src={avatarLink} loading={loading} />
            <Flex
              justifyContent="flex-start"
              flexDirection="column"
              alignItems="center"
              minHeight="20px"
              mt="sm"
              postition="relative"
            >
              <Box minHeight="10px">
                {loading && (
                  <Skeleton width="100px" height="10px" borderRadius="sm" />
                )}
                <Text
                  m={0}
                  p={0}
                  color="primary.accent-3"
                  fontWeight="400"
                  textAlign="center"
                  lineHeight={0}
                  letterSpacing="sm"
                  fontSize="xs"
                >
                  {!loading && userName}
                </Text>
              </Box>
              <Flex
                alignItems="center"
                bg="primary.accent-3"
                height="15px"
                mt="xxs"
                mb="sm"
                px="5px"
                py="10px"
                borderRadius="5px"
                css={{
                  opacity: preregisteredForPremium ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              >
                <Text
                  as="small"
                  fontSize="10px"
                  color="primary.accent-1"
                  textAlign="center"
                  letterSpacing="sm"
                >
                  premium
                </Text>
              </Flex>
            </Flex>
            <Box
              width="18px"
              height="4px"
              bg="primary.accent-4"
              mx="auto"
              borderRadius="5px"
            />
          </Flex>

          <Grid
            width="100%"
            gridTemplateColumns="repeat(auto-fit, 300px)"
            justifyContent="center"
            gridGap={["sm", "sm", , "md"]}
            mt={"sm"}
            pb={["md", "lg", , , 0]}
          >
            <ProductWrapper
              loading={pomodoroTokenLoading}
              title="POMODORO"
              onClick={() => {
                fetchPomodoroToken()
              }}
              showCopyLink
            >
              <DummyPomodoro />
            </ProductWrapper>
            <ProductWrapper title="HABIT TRACKER">
              <HabitTracker />
            </ProductWrapper>
            <ProductWrapper title="WATER TRACKER" lastItem>
              <WaterTracker />
            </ProductWrapper>
          </Grid>
        </Flex>
      </PageLayout>

      <Modal visible={pomodoroModal} hideModal={() => setPomodoroModal(false)}>
        <Confetti config={confettiConfig} active={showConfetti} />
        <Text fontSize="md" color="primary.accent-3" textAlign="center">
          Hooray ! 🥳
        </Text>
        <Text variant="pSmall" textAlign="center">
          We copied the pomodoro link to you clipboard. <br />
        </Text>
        <Text variant="pSmall" textAlign="center" mt="xxs">
          It will be valid for{" "}
          <Text as="b" color="secondary">
            5 minutes
          </Text>
        </Text>
        <Text variant="pSmall" textAlign="center" mt="sm">
          Paste the embed in Notion like this :
        </Text>
      </Modal>
    </>
  )
}

export default Dashboard
