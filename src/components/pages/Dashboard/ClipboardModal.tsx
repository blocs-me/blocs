import Modal from '@/design-system/Modal'
import ClipboardSection from './ClipboardSection'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'
import Link from '@/design-system/Link'
import Flex from '@/helpers/Flex'
import Button from '@/design-system/Button'
import { useTheme } from '@emotion/react'
import { Theme } from 'src/styles/theme'

const ClipboardModal = ({ isOpen, url, shareableUrl, hideModal }) => {
  const theme = useTheme() as Theme
  return (
    <Modal visible={isOpen}>
      <Text fontSize="md" color="foreground" textAlign="center">
        Hooray ! 🥳
      </Text>
      <Text variant="pSmall" textAlign="center" color="foreground">
        Here&apos;s your{' '}
        <u>
          <b>private link</b>
        </u>
        , we&apos;ve auto copied it to your clipboard.
      </Text>
      <Text variant="pSmall" mt="xxs" textAlign="center">
        Keep it safe, and avoid putting it on public pages{' '}
      </Text>
      <Box pt="sm" />
      <ClipboardSection url={url} />
      {shareableUrl && (
        <>
          <Box pt="md" />
          <Text variant="pSmall" textAlign="center">
            Here&apos;s your{' '}
            <u>
              <b>public link</b>
            </u>
            , you can share it with friends 😉
          </Text>
          <Box pt="sm" />
          <ClipboardSection url={shareableUrl} />
        </>
      )}
      <Text variant="pSmall" textAlign="center" mt="xs">
        Check out the guide{' '}
        <Link
          className=""
          passHref
          inline
          fontWeight="bold"
          underline
          target="_blank"
          href="https://glittery-ankle-1a8.notion.site/Pomodoro-Guide-8c1c69370f904b1084b221dc3e4acd3a"
        >
          on notion
        </Link>
      </Text>
      <Flex mt="md" hoverColor="secondary">
        <Button
          m="auto"
          borderRadius="sm"
          px="sm"
          py="xs"
          fontSize="xs"
          color="background"
          bg="foreground"
          onClick={() => hideModal()}
        >
          close
        </Button>
      </Flex>
    </Modal>
  )
}

export default ClipboardModal
