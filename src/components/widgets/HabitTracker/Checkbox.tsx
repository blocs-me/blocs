import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import { useTheme } from '@emotion/react'
import { Theme } from 'src/styles/theme'

type Props = {
  isChecked: boolean
  size: string | string[]
}

const Checkbox = ({ isChecked, size }: Props) => {
  const theme = useTheme() as Theme

  return (
    <Flex
      css={{
        '--bg': isChecked ? theme.colors.success.dark : 'transparent',
        '--border-width': isChecked ? '0px' : '2px',
        cursor: 'pointer'
      }}
      size={size}
      minWidth={size}
      minHeight={size}
      borderRadius="8px"
      p="6px"
      borderStyle="solid"
      borderColor="foreground"
      bg="var(--bg)"
      borderWidth="var(--border-width)"
    >
      <svg
        viewBox="0 0 20 14"
        width="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Box
          as="path"
          d="M2 6.28571L7.81818 12L18 2"
          stroke={theme.colors.neutral.white}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="22.4263"
          strokeDashoffset={isChecked ? 0 : 22.4263}
          css={{ transition: 'stroke-dashoffset 0.2s ease' }}
        />
      </svg>
    </Flex>
  )
}

export default Checkbox
