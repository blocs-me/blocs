import Footer from '@/design-system/Footer'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Skeleton from '@/helpers/Skeleton'
import Stack from '@/helpers/Stack'
import DashboardNav from './DashboardNav'
import withWidgetProviders from '../../helpers/hocs/withWidgetProviders'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'

const DashboardSkeleton = ({ message = '' }) => (
  <Flex flexDirection="column" bg="background">
    <DashboardNav />
    <Flex height="calc(100vh - 80px)" maxWidth="100vw">
      <Flex
        width="300px"
        p="md"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Flex alignItems="center" flexDirection="column">
          <Skeleton borderRadius="50%" size="75px" mb="md" />
          <Skeleton borderRadius="sm" width="100%" height="50px" mb="lg" />
          <Stack width="100%" mt="xs">
            {Array(5)
              .fill('-')
              .map((_, i) => (
                <Skeleton key={i} borderRadius="sm" height="40px" />
              ))}
          </Stack>
        </Flex>

        <Skeleton
          height="50px"
          borderSolid="primary.accent-2"
          borderRadius="sm"
        />
      </Flex>
      <Flex p="md" flexDirection="column">
        {!message && (
          <>
            <Flex>
              <Skeleton
                width="250px"
                height="350px"
                mr="md"
                borderRadius="md"
              />
              <Skeleton width="400px" height="350px" borderRadius="md" />
            </Flex>
            <Flex mt="lg" css={{ gap: '1rem' }}>
              <Skeleton width="150px" height="40px" borderRadius="sm" />
              <Skeleton width="150px" height="40px" borderRadius="sm" />
              <Skeleton width="150px" height="40px" borderRadius="sm" />
            </Flex>
          </>
        )}
        {message && (
          <Box p="md" bg="primary.accent-2" borderRadius="md">
            <Text color="success.medium" fontSize="lg">
              {message.replaceAll('+', ' ')}
            </Text>
          </Box>
        )}
      </Flex>
    </Flex>
    <Footer />
  </Flex>
)

export default DashboardSkeleton
