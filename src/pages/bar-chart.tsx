import BarChart from '@/design-system/BarChart'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import { ThemeProvider } from '@emotion/react'
import { darkModeColors } from 'src/styles/theme'
import { BarChartProps } from '@/design-system/BarChart/types'

const Chart = () => {
  const dummyData = (period) =>
    Array(period === 'weekly' ? 7 : 30)
      .fill('-')
      .map((_, id) => ({
        value: Math.round(Math.max(1, Math.random() * 20)),
        date: new Date(2022, 0, id + 3).toISOString(),
        id
      }))

  const dummyProps: BarChartProps = {
    data: dummyData('weekly'),
    timePeriod: 'weekly',
    formatYLabel: (label) => `${label} hr`,
    renderTooltip: () => <div />
  }

  return (
    <ThemeProvider theme={darkModeColors}>
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
    </ThemeProvider>
  )
}

export default Chart
