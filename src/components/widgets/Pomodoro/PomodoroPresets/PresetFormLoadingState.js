import Skeleton from "@/helpers/Skeleton"

const { default: Stack } = require("@/helpers/Stack")

const PresetFormLoadingState = () => {
  return (
    <>
      <Skeleton width="100%" height="40px" borderRadius="md" />
      <Skeleton width="100%" height="40px" borderRadius="md" />
      <Skeleton width="100%" height="40px" borderRadius="md" />
      <Skeleton width="100%" height="40px" borderRadius="md" />
    </>
  )
}

export default PresetFormLoadingState
