/** @jsxImportSource @emotion/react */
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
      color="primary.accent-3"
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
          <ProductWrapper title="POMODORO">
            <Pomodoro />
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
  )
}

export default Dashboard
