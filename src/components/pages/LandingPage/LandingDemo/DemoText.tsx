import Text from '@/design-system/Text'
import { WithChildren } from '@/utils/tsUtils'

const DemoText = ({
  children,
  className
}: WithChildren<{ className?: string }>) => {
  return (
    <Text
      className={className}
      fontSize={['xs', , , , 'sm']}
      color="foreground"
      textAlign={'center'}
      mb={0}
      css={{ overflowWrap: 'break-word' }}
    >
      {children}
    </Text>
  )
}

export default DemoText
