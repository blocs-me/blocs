import BarChart from '@/design-system/BarChart'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import { ThemeProvider } from '@emotion/react'
import { BarChartProps } from '@/design-system/BarChart/types'
import React from 'react'
import useColorMode, { ColorModeProvider } from '@/hooks/useColorMode'
import ClientSideOnly from '@/helpers/ClientSideOnly'

const timePeriod = 'monthly'
const dummyData = (period) =>
  Array(period === 'weekly' ? 7 : 30)
    .fill('-')
    .map((_, id) => ({
      value: Math.round(Math.max(1, Math.random() * 20)),
      date: new Date(2022, 0, id + 3).toISOString(),
      id
    }))

const Chart = () => {
  const dummyProps: BarChartProps = {
    data: dummyData(timePeriod),
    timePeriod,
    formatYLabel: (label) => `${label} hr`,
    renderTooltip: () => <div />
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      bg="background"
      alignItems="center"
      justifyContent="center"
    >
      <Box p="md" pb="sm" bg="primary.accent-2" borderRadius="20px">
        <BarChart width="450px" height="250px" {...dummyProps} />
      </Box>
    </Flex>
  )
}

const withColorMode = (Component: React.ComponentType) => {
  return () => {
    const { theme } = useColorMode()

    return (
      <ClientSideOnly>
        <ColorModeProvider>
          <ThemeProvider theme={theme}>
            <Component />
          </ThemeProvider>
        </ColorModeProvider>
      </ClientSideOnly>
    )
  }
}

export default withColorMode(Chart)
