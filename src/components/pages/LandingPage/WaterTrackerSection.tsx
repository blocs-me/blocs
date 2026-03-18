import float from '@/keyframes/float'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import SlideIn from './LandingDemo/SlideIn'
import WidgetExplainerSection from './WidgetExplainerSection'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Box from '@/helpers/Box'

const paraOne =
  'Set a daily water goal and track your intake without leaving Notion. Watch your hydration habits improve over time with weekly and monthly analytics.'

const WaterTrackerSection = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer = setInterval(() => {
      setProgress(Math.floor(Math.max(0, Math.random() * 4)))
    }, 2500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <WidgetExplainerSection
      header="Water Tracker"
      paraOne={paraOne}
      paraTwo={
        <Link href="/water-tracker-widget" passHref>
          <Box
            as="a"
            fontSize="sm"
            color="brand.accent-1"
            fontWeight={600}
            css={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Try the free Water Tracker →
          </Box>
        </Link>
      }
      reverse
    >
      {(reveal) => (
        <>
          <SlideIn delay={0.2} pause={!reveal}>
            <DummyWaterTracker
              role="img"
              aria-label="Water Tracker Visual Example"
              width="350px"
              goal={4}
              progress={progress}
              css={{
                animation: `${float} 1s ease infinite alternate`
              }}
              mt={[0, , , , '-25px']}
            />
          </SlideIn>
          <SlideIn delay={0.3} pause={!reveal}>
            <div
              css={{
                animation: `${float} 1s ease 0.2s infinite alternate`
              }}
            >
              <DummyAnalyticsBarChart
                role="img"
                aria-label="Water Tracker Analytics Bar Chart Visual Example"
                width="350px"
                height="400px"
                units="L"
                mb={[0, , , , '-60px']}
              />
            </div>
          </SlideIn>
        </>
      )}
    </WidgetExplainerSection>
  )
}

export default WaterTrackerSection
