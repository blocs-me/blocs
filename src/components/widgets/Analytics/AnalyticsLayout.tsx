import Box from '@/helpers/Box'
import Stack from '@/helpers/Stack'
import { ReactNode } from 'react'

const AnalyticsLayout = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => (
  <Box
    bg="bg.default"
    boxShadow="default"
    width="100%"
    minWidth="280px"
    maxWidth="600px"
    borderRadius="lg"
    mx="sm"
    p="sm"
    className={className}
  >
    <Stack pt="xs">{children}</Stack>
  </Box>
)

export default AnalyticsLayout
