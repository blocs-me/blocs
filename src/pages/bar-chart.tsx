import BarChart from '@/design-system/BarChart'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import { ThemeProvider } from '@emotion/react'
import { BarChartProps } from '@/design-system/BarChart/types'
import React from 'react'
import useColorMode, { ColorModeProvider } from '@/hooks/useColorMode'
import ClientSideOnly from '@/helpers/ClientSideOnly'
import { useState, useEffect } from 'react'
import { TooltipData } from '../components/design-system/BarChart/types'
import AnalyticsBarChart from '@/widgets/AnalyticsBarChart'
import { AnalyticsBarChartProvider } from '@/widgets/AnalyticsBarChart/useAnalyticsBarChart'

const timePeriod = 'monthly'

const Tooltip = ({ value }: TooltipData) => {
  return <div>{value} hrs</div>
}

const renderTooltip = (props: TooltipData) => <Tooltip {...props} />

const dummyData = (period) =>
  Array(period === 'weekly' ? 7 : 30)
    .fill('-')
    .map((_, id) => ({
      value: Math.round(Math.max(1, Math.random() * 10)),
      date: new Date(2022, 10, id + 1).toISOString(),
      id
    }))

const Chart = () => {
  const dummyProps = {
    data: dummyData('weekly'),
    timePeriod,
    renderTooltip,
    formatYLabel: (label) => `${label} hr`
  }

  // useEffect(() => {
  //   document.addEventListener('click', () => {
  //     setData(dummyData(timePeriod))
  //   })
  // }, [])

  return (
    <AnalyticsBarChartProvider>
      <Flex
        width="100vw"
        height="100vh"
        bg="bg.notion"
        alignItems="center"
        justifyContent="center"
      >
        <AnalyticsBarChart
          data={dummyProps.data}
          units="hr"
          renderTooltip={renderTooltip}
        />
      </Flex>
    </AnalyticsBarChartProvider>
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
