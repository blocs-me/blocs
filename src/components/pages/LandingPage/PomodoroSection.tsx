import float from '@/keyframes/float'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import SlideIn from './LandingDemo/SlideIn'
import WidgetExplainerSection from './WidgetExplainerSection'

const paraOne =
  'Blocs Pomodoro widget is packed with features to help you master your time.'
const paraTwo =
  'You can create different presets for each task and the best thing is, with Pomodoro analytics you can see exactly how you\'re spending your time!'

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
            delay={0.2}
            css={{ animation: `${float} 1s ease infinite alternate` }}
          >
            <DummyPomodoro css={{ transform: 'translateY(-10%)' }} />
          </SlideIn>
          <SlideIn
            pause={!reveal}
            delay={0.3}
            css={{ animation: `${float} 1s ease 0.2s infinite alternate` }}
          >
            <DummyAnalyticsBarChart width="350px" height="400px" units="hr" />
          </SlideIn>
        </>
      )}
    </WidgetExplainerSection>
  )
}

export default PomodoroSection
