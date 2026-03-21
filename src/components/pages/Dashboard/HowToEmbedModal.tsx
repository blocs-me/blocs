import Modal from '@/design-system/Modal'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'

const Step = ({ num, children }: { num: number; children: React.ReactNode }) => (
  <Flex alignItems="start" css={{ gap: '12px' }} mb="sm">
    <Flex
      size="24px"
      borderRadius="50%"
      bg="brand.accent-5"
      color="brand.accent-1"
      alignItems="center"
      justifyContent="center"
      css={{ flexShrink: 0, fontSize: '12px', fontWeight: 700 }}
    >
      {num}
    </Flex>
    <Text fontSize="sm" color="foreground" m={0} lineHeight={1.5}>
      {children}
    </Text>
  </Flex>
)

const HowToEmbedModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal visible={isOpen} hideModal={onClose}>
    <Box p="sm">
      <Text fontSize="md" fontWeight={700} color="foreground" m={0} mb="md">
        How to embed in Notion
      </Text>
      <Step num={1}>
        Click <strong>Copy Link</strong> on the widget you want to embed.
      </Step>
      <Step num={2}>
        In Notion, type <Box as="code" px="4px" py="2px" borderRadius="sm" bg="primary.accent-2" fontSize="xs">/embed</Box> and press Enter.
      </Step>
      <Step num={3}>
        Paste the copied link and click <strong>Embed link</strong>.
      </Step>
      <Text fontSize="xs" color="primary.accent-4" m={0} mt="sm">
        The widget will appear as an interactive iframe inside your Notion page.
      </Text>
    </Box>
  </Modal>
)

export default HowToEmbedModal
