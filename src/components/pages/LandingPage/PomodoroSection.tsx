import float from '@/keyframes/float'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import SlideIn from './LandingDemo/SlideIn'
import WidgetExplainerSection from './WidgetExplainerSection'

const paraOne =
  'Stay on task with a Pomodoro timer embedded right in your Notion workspace. Create custom presets for different tasks and track your focus time with built-in analytics.'

const PomodoroSection = () => {
  return (
    <WidgetExplainerSection
      header="Pomodoro"
      paraOne={paraOne}
    >
      {(reveal) => (
        <>
          <SlideIn
            pause={!reveal}
            delay={0.3}
            css={{ animation: `${float} 1s ease infinite alternate` }}
          >
            <DummyPomodoro
              role="img"
              aria-label="Pomodoro Visual Example"
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
              role="img"
              aria-label="Pomodoro Analytics Bar Chart Visual Example"
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
