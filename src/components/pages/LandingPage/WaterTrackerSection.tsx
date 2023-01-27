import float from '@/keyframes/float'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import SlideIn from './LandingDemo/SlideIn'
import WidgetExplainerSection from './WidgetExplainerSection'
import { useEffect, useState } from 'react'

const paraOne =
  'Never forget to hydrate with our water tracker widget which you can embed right next to your to do list inside Notion!'
const paraTwo =
  'The big advantage with the analytics widget is that you can be inspired by watching yourself improve over time.'

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
      paraTwo={paraTwo}
      reverse
    >
      {(reveal) => (
        <>
          <SlideIn delay={0.2} pause={!reveal}>
            <DummyWaterTracker
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
