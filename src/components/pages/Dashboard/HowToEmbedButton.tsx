import { useState } from 'react'
import Text from '@/design-system/Text'
import HowToEmbedModal from './HowToEmbedModal'

const HowToEmbedButton = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Text
        as="button"
        fontSize="xs"
        color="primary.accent-4"
        m={0}
        css={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
          '&:hover': { opacity: 0.7 }
        }}
        onClick={() => setTimeout(() => setShowModal(true), 0)}
      >
        How to embed
      </Text>
      <HowToEmbedModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

export default HowToEmbedButton
