import MonthView from './MonthView'
import { useCalendar } from './useCalendar'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Link from 'next/link'
import Button from '@/design-system/Button'

type Props = {
  theme?: 'light' | 'dark'
  showCta?: boolean
}

const DummyCalendarPreview = ({ theme = 'light', showCta = true }: Props) => {
  const calendar = useCalendar({
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    startOfWeek: 0
  })

  return (
    <Box position="relative">
      <MonthView
        grid={calendar.grid}
        markers={[]}
        fillColor=""
        headerColor=""
        theme={theme}
        showWeekNumbers={false}
        startOfWeek={0}
        monthLabel={calendar.monthLabel}
        onPrevMonth={() => {}}
        onNextMonth={() => {}}
      />
      {showCta && (
        <Flex justifyContent="center" css={{ marginTop: '-4px', paddingBottom: '16px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }}>
          <Link href="/pricing" style={{ textDecoration: 'none' }}>
            <Button
              className="plausible-event-name=CTA+Customize+Calendar"
              bg="brand.accent-1"
              color="neutral.white"
              borderRadius="sm"
              px="sm"
              py="4px"
              fontSize="xxs"
              fontWeight="bold"
              css={{ '&:hover': { opacity: 0.85 } }}
            >
              Customize your calendar →
            </Button>
          </Link>
        </Flex>
      )}
    </Box>
  )
}

export default DummyCalendarPreview
