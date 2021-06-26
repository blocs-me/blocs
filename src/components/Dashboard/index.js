/** @jsxImportSource @emotion/react */
import useUser from "../../hooks/useUser"
import fadeIn from "../../keyframes/fadeIn"
import Avatar from "../Avatar"
import Box from "../Box"
import FadeIn from "../FadeIn"
import Flex from "../Flex"
import Grid from "../Grid"
import HabitTracker from "../HabitTracker"
import PageLayout from "../PageLayout"
import Pomodoro from "../Pomodoro"
import Skeleton from "../Skeleton"
import Stack from "../Stack"
import Text from "../Text"
import WaterTracker from "../WaterTracker"

const ProductWrapper = ({ children, title }) => (
  <Stack
    height="100%"
    width="100%"
    flexDirection="column"
    mt="sm"
    css={{ transform: "scale(0.9)" }}
    alignItems="center"
  >
    <Text
      textAlign="center"
      fontSize="md"
      fontWeight="bold"
      color="primary.default"
      letterSpacing="sm"
      mb={0}
    >
      {title}
    </Text>
    <Flex justifyContent="center">{children}</Flex>
    <Text color="secondary" textAlign="center" fontSize="sm" p={0} mb={0}>
      coming soon
    </Text>
  </Stack>
)

const Dashboard = ({ links }) => {
  const { user, loading } = useUser()
  const {
    avatar_url: avatarLink,
    name: userName,
    preregisteredForPremium,
  } = user || {}

  return (
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
                color="primary.default"
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
              bg="primary.default"
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
                color="primary.lightest"
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
            bg="primary.dark"
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
          <ProductWrapper title="POMODORO">
            <Pomodoro />
          </ProductWrapper>
          <ProductWrapper title="HABIT TRACKER">
            <HabitTracker />
          </ProductWrapper>
          <ProductWrapper title="WATER TRACKER" lastItem>
            <WaterTracker startingVolume={2} />
          </ProductWrapper>
        </Grid>
      </Flex>
    </PageLayout>
  )
}

export default Dashboard
