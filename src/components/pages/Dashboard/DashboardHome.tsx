import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'
import Icon from '@/helpers/Icon'
import { useRouter } from 'next/router'
import Stopwatch from 'src/icons/stopwatch'
import { Writing } from 'src/icons/writing'
import Drop from 'src/icons/drop-icon'
import Hourglass from 'src/icons/hourglass'
import ProgressBarIcon from 'src/icons/progress-bar-icon'
import ClockIcon from 'src/icons/clock-icon'
import CalendarIcon from 'src/icons/calendar-icon'
import QuoteIcon from 'src/icons/quote-icon'
import WeatherIcon from 'src/icons/weather-icon'

const widgets = [
  { path: 'pomodoro', label: 'Pomodoro', description: 'Focus timer with work and break intervals', icon: <Stopwatch /> },
  { path: 'habit-tracker', label: 'Habit Tracker', description: 'Build daily habits with streaks', icon: <Writing /> },
  { path: 'water-tracker', label: 'Water Tracker', description: 'Track your daily water intake', icon: <Drop /> },
  { path: 'countdown', label: 'Countdown', description: 'Count down to important dates', icon: <Hourglass /> },
  { path: 'progress-bar', label: 'Progress Bar', description: 'Visualize progress toward goals', icon: <ProgressBarIcon /> },
  { path: 'clock', label: 'Clock', description: 'Live clock for your workspace', icon: <ClockIcon /> },
  { path: 'calendar', label: 'Calendar', description: 'Minimal calendar widget', icon: <CalendarIcon /> },
  { path: 'quote', label: 'Quote of the Day', description: 'Daily inspiration in your workspace', icon: <QuoteIcon /> },
  { path: 'weather', label: 'Weather', description: 'Live weather for any location', icon: <WeatherIcon /> },
]

const WidgetCard = ({ label, description, icon, onClick }: {
  label: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}) => (
  <Flex
    as="button"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    p="md"
    borderRadius="lg"
    border="1px solid"
    borderColor="primary.accent-2"
    bg="background"
    css={{
      cursor: 'pointer',
      gap: '12px',
      transition: 'all 0.15s ease',
      '&:hover': {
        borderColor: 'var(--colors-brand-accent-1)',
        backgroundColor: 'var(--colors-brand-accent-5)',
      }
    }}
    onClick={onClick}
  >
    <Flex
      size="48px"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      bg="primary.accent-2"
      color="brand.accent-1"
    >
      <Icon fill="currentColor" stroke="currentColor" width="24px" height="24px" display="flex" as="span">
        {icon}
      </Icon>
    </Flex>
    <Flex flexDirection="column" alignItems="center" css={{ gap: '4px' }}>
      <Text fontSize="sm" fontWeight={600} color="foreground" m={0}>
        {label}
      </Text>
      <Text fontSize="xxs" color="primary.accent-4" m={0} textAlign="center" lineHeight={1.4}>
        {description}
      </Text>
    </Flex>
  </Flex>
)

const DashboardHome = () => {
  const router = useRouter()

  return (
    <Box>
      <Text as="h1" fontSize="md" fontWeight={600} color="foreground" mb="xs" mt={0}>
        Your Widgets
      </Text>
      <Text fontSize="sm" color="primary.accent-4" mb="md" mt={0}>
        Choose a widget to configure and get your embed URL.
      </Text>
      <Box
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {widgets.map((widget) => (
          <WidgetCard
            key={widget.path}
            label={widget.label}
            description={widget.description}
            icon={widget.icon}
            onClick={() => router.push(`/dashboard/${widget.path}`)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default DashboardHome
