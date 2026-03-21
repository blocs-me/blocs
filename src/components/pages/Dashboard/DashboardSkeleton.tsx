import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Skeleton from '@/helpers/Skeleton'
import DashboardNavSkeleton from './DashboardNavSkeleton'

const DashboardSkeleton = ({ message = '' }) => (
  <Flex flexDirection="column" bg="background" minHeight="100vh">
    <Box width="100%" m="0 auto">
      <DashboardNavSkeleton />
    </Box>
    <Box width="min(100%, 1200px)" m="0 auto" p="md">
      {!message && (
        <Flex flexDirection="column" alignItems="center" css={{ gap: '1rem' }}>
          <Skeleton width="min(100%, 450px)" height="400px" borderRadius="lg" />
          <Skeleton width="min(100%, 550px)" height="350px" borderRadius="lg" />
        </Flex>
      )}
      {message && (
        <Box p="md" bg="primary.accent-2" borderRadius="md">
          <Text color="success.medium" fontSize="lg">
            {message.replaceAll('+', ' ')}
          </Text>
        </Box>
      )}
    </Box>
  </Flex>
)

export default DashboardSkeleton
