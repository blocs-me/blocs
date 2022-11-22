import Flex from "@/helpers/Flex"


type Props = { width: number, height: number}

const EmptyState = ({ width, height }: Props) => {

  return (
    <Flex width={width} height={height}>
      

    </Flex>
  )
}

export default EmptyState