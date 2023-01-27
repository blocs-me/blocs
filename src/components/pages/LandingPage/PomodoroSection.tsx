import float from '@/keyframes/float'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import SlideIn from './LandingDemo/SlideIn'
import WidgetExplainerSection from './WidgetExplainerSection'

const paraOne =
  'Blocs Pomodoro widget is packed with features to help you be a master of your time.'
const paraTwo =
  "You can create different presets for each task and the best thing, with Pomodoro analytics you can see exactly how you're spending time!"

const PomodoroSection = () => {
  return (
    <WidgetExplainerSection
      header="Pomodoro"
      paraOne={paraOne}
      paraTwo={paraTwo}
    >
      {(reveal) => (
        <>
          <SlideIn
            pause={!reveal}
            delay={0.3}
            css={{ animation: `${float} 1s ease infinite alternate` }}
          >
            <DummyPomodoro
              height={'auto'}
              width={['300px', , , '320px']}
              css={{ transform: 'translateY(-20px)' }}
            />
          </SlideIn>
          <SlideIn
            pause={!reveal}
            delay={0.5}
            css={{ animation: `${float} 1s ease 0.2s infinite alternate` }}
          >
            <DummyAnalyticsBarChart
              width={['300px', , , '340px']}
              height={['350px', , , '380px']}
              units="hr"
              css={{ transform: 'translateY(10%)' }}
            />
          </SlideIn>
        </>
      )}
    </WidgetExplainerSection>
  )
}

export default PomodoroSection
