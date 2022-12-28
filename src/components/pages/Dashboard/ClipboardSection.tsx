import { useState } from 'react'
import styled from '@emotion/styled'
import themeGet from '@styled-system/theme-get'
import useClipboard from '@/hooks/useClipboard'
import { useTheme } from '@emotion/react'
import Flex from '@/helpers/Flex'
import { Theme } from 'src/styles/theme'
import { CopyIcon } from 'src/icons/copy'
import Icon from '@/helpers/Icon'
import Text from '@/design-system/Text'
import Box from '@/helpers/Box'

const ClipboardInput = styled.input`
  border: solid 1px ${themeGet('colors.foreground')};
  border-radius: ${themeGet('space.xs')};
  padding: ${themeGet('space.sm')} ${themeGet('space.sm')};
  font-size: ${themeGet('space.sm')};
  font-weight: 300;
  color: ${themeGet('colors.primary.accent-4')};
  width: 100%;
  background: transparent;

  &:focus {
    outline: none;
  }
`

const ClipboardSection = ({ url }) => {
  const [showCopied, setShowCopied] = useState(false)
  const clipboard = useClipboard()
  const theme = useTheme() as Theme

  return (
    <>
      <Box css={{ position: 'relative' }}>
        <ClipboardInput readOnly type="text" value={url} />
        <Flex
          css={{
            transform: 'translateY(-50%)',
            transition: 'transform ease 0.1s',
            '&:hover': {
              background: theme.colors.primary['accent-0.5']
            },
            '&:active': {
              transform: 'translateY(-50%) scale(0.9)'
            }
          }}
          bg="background"
          position="absolute"
          top="50%"
          right="10px"
          borderRadius="sm"
          height="calc(100% - 20px)"
          width="45px"
          as="button"
          boxShadow="default"
          onClick={() => {
            setShowCopied(true)
            setTimeout(() => {
              setShowCopied(false)
            }, 3000)
            clipboard(url)
          }}
          title="copy to clipboard"
        >
          <Icon display="flex" m="auto" width="20px" stroke="primary.accent-4">
            <CopyIcon css={{ margin: 'auto' }} />
          </Icon>
        </Flex>
      </Box>
      {showCopied && (
        <Text fontSize="xxs" color="success.medium" textAlign="right" mr="xs">
          copied
        </Text>
      )}
    </>
  )
}

export default ClipboardSection
