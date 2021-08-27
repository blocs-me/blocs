/** @jsxImportSource @emotion/react */
import { useState } from "react"
import useUser from "@/hooks/useUser"
import Avatar from "@/design-system/Avatar"
import Box from "@/helpers/Box"
import Flex from "@/helpers/Flex"
import Grid from "@/helpers/Grid"
import PageLayout from "@/helpers/PageLayout"
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
import DummyPomodoro from "@/widgets/Pomodoro/DummyPomodoro"
import Link from "@/design-system/Link"
import { themeGet } from "@styled-system/theme-get"
import styled from "@emotion/styled"
import CopyIcon from "../../../icons/copy.svg"
import Icon from "@/helpers/Icon"
import { useTheme } from "@emotion/react"

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

const ClipboardInput = styled.input`
  border: solid 1px ${themeGet("colors.secondary")};
  border-radius: ${themeGet("space.xs")};
  padding: ${themeGet("space.sm")} ${themeGet("space.sm")};
  font-size: ${themeGet("space.sm")};
  font-weight: 300;
  color: ${themeGet("colors.primary.accent-2")};
  width: 100%;

  &:focus {
    outline: none;
  }
`

const Dashboard = ({ links }) => {
  const { user, loading } = useUser()
  const {
    avatar_url: avatarLink,
    name: userName,
    preregisteredForPremium,
  } = user || {}

  const [pomodoroModal, setPomodoroModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [pomodoroToken, setPomodoroToken] = useState(null)

  const clipboard = useClipboard()

  const { access_token } = getAccessToken() || {}

  const handlePomodoroLinkSuccess = (res) => {
    const { token } = res?.data || {}

    clipboard(`https://blocs.me/pomodoro?token=${token}`)
    setPomodoroModal(true)
    setPomodoroToken(token)
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

  const theme = useTheme()

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
              loading={pomodoroTokenLoading || loading}
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

      <Modal visible={pomodoroModal}>
        <Text fontSize="md" color="primary.accent-3" textAlign="center">
          Hooray ! 🥳
        </Text>
        <Text variant="pSmall" textAlign="center">
          Here&apos;s your link, we&apos;ve auto copied it to your clipboard.
        </Text>
        <Text variant="pSmall" mt="xxs" textAlign="center">
          Keep it safe, and avoid putting it on public pages{" "}
        </Text>
        <Box mt="md" />

        <div css={{ position: "relative" }}>
          <ClipboardInput
            type="text"
            value={`https://blocs.me/pomodoro?token=${pomodoroToken}`}
          />
          <Flex
            css={{
              transform: "translateY(-50%)",
              transition: "transform ease 0.1s",
              "&:hover": {
                background: theme.colors.primary["accent-0.5"],
              },
              "&:active": {
                transform: "translateY(-50%) scale(0.9)",
              },
            }}
            bg="white"
            position="absolute"
            top="50%"
            right="10px"
            borderRadius="sm"
            height="calc(100% - 20px)"
            width="45px"
            // border="solid 1px"
            as="button"
            boxShadow="default"
            onClick={() => {
              clipboard(`https://blocs.me/pomodoro?token=${pomodoroToken}`)
            }}
            title="copy to clipboard"
          >
            <Icon
              display="flex"
              m="auto"
              width="20px"
              stroke="primary.accent-4"
            >
              <CopyIcon css={{ margin: "auto" }} readonly />
            </Icon>
          </Flex>
        </div>
        <Text variant="pSmall" textAlign="center" mt="sm">
          Check out the guide{" "}
          <Link
            passHref
            inline
            fontWeight="bold"
            underline
            target="_blank"
            href="https://glittery-ankle-1a8.notion.site/Pomodoro-Guide-8c1c69370f904b1084b221dc3e4acd3a"
          >
            on notion
          </Link>
        </Text>
        <Flex mt="md" hoverColor="secondary">
          <Button
            m="auto"
            borderRadius="sm"
            px="sm"
            py="xs"
            fontSize="xs"
            bg="primary.accent-1"
            color="primary.accent-4"
            css={{
              "&:hover": {
                background: theme.colors.primary["accent-3"],
                color: theme.colors.primary["accent-1"],
              },
            }}
            onClick={() => setPomodoroModal(false)}
          >
            close
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default Dashboard
