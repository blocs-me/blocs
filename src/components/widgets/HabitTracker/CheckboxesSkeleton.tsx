import Skeleton from '@/helpers/Skeleton'

const SkeletonItem = () => (
  <Skeleton borderRadius="md" width="100%" height="40px" />
)

const CheckoboxesSkeleton = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null

  return (
    <>
      {Array(10)
        .fill('-')
        .map((_, i) => (
          <SkeletonItem key={i} />
        ))}
    </>
  )
}

export default CheckoboxesSkeleton
