import Flex from '@/helpers/Flex'
import Skeleton from '@/helpers/Skeleton'
import { BlocsLogo } from 'src/icons/blocs-logo'

const Cell = () => <Skeleton height="15px" borderRadius="50px" width="50px" />

const DashboardNavSkeleton = () => {
  return (
    <Flex
      width="100%"
      height="80px"
      justifyContent={'space-between'}
      alignItems="center"
      px="md"
      borderBottom="solid 1px"
      borderColor="primary.accent-2"
    >
      <Flex size="50px">
        <BlocsLogo />
      </Flex>

      <Flex gap="md">
        <Cell />
        <Cell />
        <Cell />
      </Flex>
    </Flex>
  )
}

export default DashboardNavSkeleton
