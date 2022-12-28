import Button from '@/design-system/Button'
import Flex from '@/helpers/Flex'
import LinkIcon from 'src/icons/link-icon'

const WidgetLinkWrapper = ({
  onClick = () => {},
  children,
  isLoading = false
}) => {
  return (
    <Flex alignItems="center" flexDirection="column">
      {children}
      <Button
        disabled={isLoading}
        loading={isLoading}
        onClick={() => onClick()}
        mt="sm"
        border="solid 1px"
        borderColor="brand.accent-1"
        color="brand.accent-1"
        borderRadius={'md'}
        fontWeight={200}
        fontSize="sm"
        py="xs"
        px="sm"
        hoverBg="brand.accent-5"
        icon={<LinkIcon />}
        gap={'xs'}
      >
        Copy Link
      </Button>
    </Flex>
  )
}

export default WidgetLinkWrapper
