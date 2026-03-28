import WidgetExplainerSection from './WidgetExplainerSection'
import Link from 'next/link'
import Button from '@/design-system/Button'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import DummyCalendarPreview from '@/widgets/Calendar/DummyCalendarPreview'

const ProBadge = () => (
  <Flex
    as="span"
    alignItems="center"
    css={{
      gap: '4px',
      display: 'inline-flex',
      verticalAlign: 'middle',
      marginLeft: '8px',
      padding: '2px 8px',
      borderRadius: '4px',
      backgroundColor: 'var(--colors-brand-accent-5)',
      fontSize: '11px',
      fontWeight: 700,
      color: 'var(--colors-brand-accent-1)',
      letterSpacing: '0.5px'
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
    Pro
  </Flex>
)

const paraOne =
  'A clean visual calendar for your Notion workspace. See the current month at a glance, highlight important dates, and switch between month and year views. No database required.'

const CalendarSection = () => {
  return (
    <WidgetExplainerSection
      header="Calendar"
      headerExtra={<ProBadge />}
      paraOne={paraOne}
      paraTwo={
        <Link href="/calendar-widget" style={{ textDecoration: 'none' }}>
          <Button
            className="plausible-event-name=Landing+See+Calendar"
            bg="brand.accent-1"
            color="background"
            borderRadius="sm"
            px="md"
            py="xs"
            fontSize="xs"
            fontWeight="bold"
            height="40px"
          >
            See Calendar Widget →
          </Button>
        </Link>
      }
    >
      {() => (
        <Box
          width={['300px', , , '400px']}
          borderRadius="md"
          overflow="hidden"
          border="1px solid"
          borderColor="primary.accent-1"
        >
          <DummyCalendarPreview showCta={false} />
        </Box>
      )}
    </WidgetExplainerSection>
  )
}

export default CalendarSection
