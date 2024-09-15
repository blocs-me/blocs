import BarChart from '@/design-system/BarChart'
import Flex from '@/helpers/Flex'
import { BarChartProps } from '../../design-system/BarChart/types'
import Controls from './Controls'
import useAnalyticsBarChart from './useAnalyticsBarChart/useAnalyticsBarChart'
import Box from '@/helpers/Box'
import largestFreq from '@/utils/math/largestFreq'
import Text from '@/design-system/Text'
import getMonthStr from '../../../utils/dateUtils/getMonthStr'
import WidgetMenuButton from '@/design-system/WidgetMenuButton'
import { useResizeObserver } from 'beautiful-react-hooks'
import { useRef, lazy, Suspense, useState } from 'react'
import { useRouter } from 'next/router'
import AnalyticsBarChartMenu from './AnalyticsBarChartMenu'
import FadeIn from '@/helpers/FadeIn'
import Notifications from '@/design-system/Notifications'
import Loader from '@/design-system/Loader'
import Button from '@/design-system/Button'
import PoweredBy from '@/design-system/PoweredBy'
const PremiumOverlay = lazy(() => import('@/pages/Dashboard/PremiumOverlay'))

type Props = {
  units: string
  menuPage: string
  mainPage: string
  showPremiumOverlay?: boolean
  disableControls?: boolean
  isOverlayEscapable?: boolean
} & Required<Pick<BarChartProps, 'data' | 'renderTooltip' | 'minY'>>

const AnalyticsBarChart = ({
  data,
  units,
  renderTooltip,
  minY,
  mainPage,
  menuPage,
  showPremiumOverlay,
  disableControls,
  isOverlayEscapable
}: Props) => {
  const [{ timePeriod, page }, dispatch] = useAnalyticsBarChart()
  const container = useRef()
  const { slug } = useRouter().query
  const [premiumOverlay, setPremiumOverlay] = useState(false)

  const isMainPage = !slug
  const isMenuPage = slug?.[0] === 'menu'

  const { width, height } = useResizeObserver(container) || {}

  const currentMonth = (() => {
    const mostCommonMonth = largestFreq(
      data?.map((data) => new Date(data.date).getMonth())
    )
    const mostCommonYear = largestFreq(
      data?.map((data) => new Date(data.date).getFullYear())
    )

    return new Date(mostCommonYear, mostCommonMonth, 1)
  })()

  const setNextDateRange = () => {
    if (disableControls) return setPremiumOverlay(true)
    !disableControls &&
      dispatch({
        type: 'SET_PAGE',
        payload: page + 1
      })
  }

  const setPrevDateRange = () => {
    if (disableControls) return setPremiumOverlay(true)
    !disableControls && dispatch({ type: 'SET_PAGE', payload: page - 1 })
  }

  return (
    <Flex
      p="sm"
      borderRadius="lg"
      bg="background"
      flexDirection="column"
      boxShadow="default"
      width="100%"
      height="100%"
      maxHeight="500px"
      minHeight="300px"
      minWidth="300px"
      maxWidth="700px"
      position="relative"
    >
      <Notifications zIndex="2000">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb="sm"
          position="sticky"
          top="sm"
          zIndex="5"
        >
          {isMainPage && (
            <>
              <Controls
                onClickLeft={setPrevDateRange}
                onClickRight={setNextDateRange}
              />
              <Text
                color="foreground"
                lineHeight={0}
                m={0}
                fontSize={['xs', , 'sm']}
              >
                {getMonthStr(currentMonth)} {currentMonth.getFullYear()}
              </Text>
            </>
          )}
          {isMenuPage && <Box />}
          <Box css={{ alignSelf: 'end' }}>
            <WidgetMenuButton
              href={isMainPage ? menuPage : mainPage}
              isOpen={isMenuPage}
            />
          </Box>
        </Flex>

        <FadeIn
          css={{
            width: '100%',
            height: '100%',
            display: isMainPage ? 'block' : 'none'
          }}
        >
          <Box
            borderRadius="lg"
            p="md"
            pb="sm"
            bg="primary.accent-2"
            ref={container}
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              width={width}
              height={height}
              minY={minY}
              timePeriod={timePeriod}
              formatYLabel={(label) => `${label} ${units}`}
              renderTooltip={renderTooltip}
            />
          </Box>
        </FadeIn>

        {isMenuPage && <AnalyticsBarChartMenu />}

        <div id="bar-chart-modal-wrapper" />
      </Notifications>
      {(showPremiumOverlay || premiumOverlay) && (
        <Box
          zIndex="100000"
          size="100%"
          position="absolute"
          top={0}
          left={0}
          onClick={() => {
            if (isOverlayEscapable) {
              setPremiumOverlay(false)
            }
          }}
        >
          <Suspense
            fallback={
              <Flex
                size="100%"
                alignItems="center"
                justifyContent="center"
                bg="rgba(0,0,0,0.2)"
                css={{
                  backdropFilter: 'blur(5px) saturate(50%)'
                }}
              >
                <Loader width="40px" height="40px" />
              </Flex>
            }
          >
            <PremiumOverlay borderRadius="md" p="sm" />
          </Suspense>
        </Box>
      )}
      <PoweredBy type="bar-chart" />
    </Flex>
  )
}

export default AnalyticsBarChart
