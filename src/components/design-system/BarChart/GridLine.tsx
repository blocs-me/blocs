import Box from '@/helpers/Box'
import { useTheme } from '@emotion/react'
import { Theme } from 'src/styles/theme'

const GridLine = () => {
  const theme = useTheme()

  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="1px"
      preserveAspectRatio="none"
      css={{ position: 'absolute', top: 0, left: 0 }}
    >
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke={(theme as Theme).colors.primary['accent-3']}
        strokeWidth="1"
        strokeDasharray="2"
      />
    </Box>
  )
}

export default GridLine
