import float from '@/keyframes/float'
import DummyAnalyticsBarChart from '@/widgets/AnalyticsBarChart/DummyAnalyticsBarChart'
import DummyPomodoro from '@/widgets/Pomodoro/DummyPomodoro'
import WidgetExplainerSection from './WidgetExplainerSection'
import Link from 'next/link'
import Button from '@/design-system/Button'

const paraOne =
  'Stay on task with a Pomodoro timer embedded right in your Notion workspace. Create custom presets for different tasks and track your focus time with built-in analytics.'

const PomodoroSection = () => {
  return (
    <WidgetExplainerSection
      header="Pomodoro"
      paraOne={paraOne}
      paraTwo={
        <Link href="/pomodoro-timer" passHref>
          <Button
            as="a"
            bg="brand.accent-1"
            color="background"
            borderRadius="sm"
            px="md"
            py="xs"
            fontSize="xs"
            fontWeight="bold"
            height="40px"
          >
            Try the free Pomodoro timer →
          </Button>
        </Link>
      }
    >
      {() => (
        <>
          <DummyPomodoro
            role="img"
            aria-label="Pomodoro Visual Example"
            height={'auto'}
            width={['300px', , , '320px']}
            css={{
              animation: `${float} 1s ease infinite alternate`,
              transform: 'translateY(-20px)'
            }}
          />
          <DummyAnalyticsBarChart
            role="img"
            aria-label="Pomodoro Analytics Bar Chart Visual Example"
            width={['300px', , , '340px']}
            height={['350px', , , '380px']}
            units="hr"
            css={{
              animation: `${float} 1s ease 0.2s infinite alternate`,
              transform: 'translateY(10%)'
            }}
          />
        </>
      )}
    </WidgetExplainerSection>
  )
}

export default PomodoroSection
