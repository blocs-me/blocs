import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import styled from '@emotion/styled'
import { ReactNode, useState } from 'react'
import themeGet from '@styled-system/theme-get'
// import ClientSideOnly from '@/helpers/ClientSideOnly'
// import daysOfTheWeek from '@/constants/daysOfTheWeek';
import Text from '@/design-system/Text'
import { useTheme } from '@emotion/react'
import { Theme } from 'src/styles/theme'
import { BarChartProps } from './types'
import ClientSideOnly from '@/helpers/ClientSideOnly'

const daysOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const getDayOfTheWeek = (date: string) => daysOfTheWeek[new Date(date).getDay()]
/*

  - Bar chart plots dates evenly spaced along 'x axis'
  - 'y axis' should plot the number values
  - should be configurable to 'monthly' | 'weekly'
  - x axis should have both 'date and day of week' for the weekly format
  - smoothly resize in responsive mode

  const data = [
      { 
        id: 1, 
        date: '2022-10-01', 
        value: ''
      }
  ]

  const MyChart = () => {

    const data = useSWR(['chart-data', pageNumber], fetch)

    return (
      <Box>
          <ChartHeader />
          <BarChart 
            timePeriod="weekly | monthly"
            formatYLabel={(label) => `${label} hrs`}
            data={data}
            p={10}
            renderTooltip={(data) => {
              <Tooltip ...data />
            }}
          />
          <ChartFooter />
      </Box>
    )
  }

  
*/

const GridLine = () => {
  const theme = useTheme()

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%">
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke={(theme as Theme).colors.primary['accent-3']}
        strokeWidth="1"
        strokeDasharray="2"
      />
    </svg>
  )
}

const sortData = (data: BarChartProps['data']) =>
  data?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

const Bar = styled.div<{ height: string }>`
  width: 10px;
  border-radius: 10px 10px 0 0;
  background: ${themeGet('colors.foreground')};
  height: ${({ height }) => height};
`

const BarChart = (props: BarChartProps) => {
  const isServerSide = !global?.window

  const chart = (() => {
    const sortedData = sortData(props.data)
    // TODO: handle x and y when there is less than 7 days data
    // TODO: handle less than 8 ticks on the y axis
    // TODO: handle when the dates don't begin on monday

    const values = sortedData.map(({ value }) => value)
    const max = Math.max(...values)
    const min = Math.min(...values)
    const range = max - min
    const countY = new Set(values).size

    const ticksY = (() => {
      if (countY >= 10) return 10
      if (countY <= 5) return 5
      return countY
    })()

    const stepValue = Math.ceil((range / ticksY) * 2)
    const maxTick = stepValue * ticksY

    console.table({
      values,
      stepValue,
      maxTick,
      ticksY
    })

    const stepY = (tickIndex: number) => {
      const currentStep = tickIndex * stepValue
      return [currentStep, `calc(${(currentStep / maxTick) * 100}%)`]
    }

    return {
      data: sortedData.map(({ value, ...barData }) => ({
        ...barData,
        height: `${(value / maxTick) * 100}%`
      })),
      stepY,
      ticksY
    }
  })()

  return (
    <Box>
      <ClientSideOnly>
        <Box
          className="className"
          width={props.width}
          height={props.height}
          position="relative"
        >
          {Array(chart.ticksY + 1)
            .fill('')
            .map((_, index) => (
              <Box
                key={index}
                width="calc(100% - 35px)"
                height="1px"
                // transform="translateY(130px)"
                right="0px"
                position="absolute"
                top={chart.stepY(index)[1]}
              >
                <GridLine />
              </Box>
            ))}

          {Array(chart.ticksY + 1)
            .fill('')
            .map((_, index) => (
              <Box
                key={index}
                position="absolute"
                top={chart.stepY(chart.ticksY - index)[1]}
                transform="translateY(calc(-50% - 1px))"
              >
                <Text
                  as="div"
                  fontSize="xxs"
                  fontWeight={200}
                  color="primary.accent-4"
                  top={chart.stepY(index)[1]}
                  m={0}
                  p={0}
                  lineHeight={0}
                  css={{ verticalAlign: 'middle' }}
                >
                  {props.formatYLabel(chart.stepY(index)[0])}
                </Text>
              </Box>
            ))}

          <Flex
            position="relative"
            width="calc(100% - 35px)"
            height="100%"
            ml="35px"
            justifyContent="space-between"
            alignItems="end"
          >
            {chart.data.map(({ height, id }) => (
              <Bar key={id} height={height} />
            ))}
          </Flex>
        </Box>
        <Flex
          width="calc(100% - 35px)"
          ml="35px"
          justifyContent="space-between"
          alignItems="end"
          pt="xs"
        >
          {chart.data.map(({ date, id }) => (
            <Flex key={id} width="10px" justifyContent="center">
              <Text fontSize="xxs" color="foreground" m={0}>
                {getDayOfTheWeek(date)}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Flex
          width="calc(100% - 35px)"
          ml="35px"
          justifyContent="space-between"
          alignItems="end"
        >
          {chart.data.map(({ date, id }) => (
            <Flex key={id} width="10px" justifyContent="center">
              <Text
                fontSize="xxs"
                color="primary.accent-4"
                width="10px"
                m="0"
                fontWeight={200}
              >
                0{new Date(date).getDate()}
              </Text>
            </Flex>
          ))}
        </Flex>
      </ClientSideOnly>
    </Box>
  )
}

export default BarChart
