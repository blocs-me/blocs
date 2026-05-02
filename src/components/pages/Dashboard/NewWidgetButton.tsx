import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'

const NewWidgetButton = ({ onClick }: { onClick: () => void }) => (
  <Flex
    as="button"
    alignItems="center"
    px="sm"
    py="xs"
    borderRadius="md"
    bg="primary.accent-2"
    color="foreground"
    css={{
      border: 'none',
      cursor: 'pointer',
      gap: '4px',
      fontSize: '13px',
      fontWeight: 600,
      transition: 'all 0.15s ease',
      '&:hover': { opacity: 0.75 }
    }}
    onClick={onClick}
  >
    <Text as="span" fontSize="xs" color="foreground" m={0} fontWeight={600}>
      + New
    </Text>
  </Flex>
)

export default NewWidgetButton
