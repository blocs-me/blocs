import ClockDisplay from './ClockDisplay'
import { useClock } from './useClock'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import Link from 'next/link'
import Button from '@/design-system/Button'

type Props = {
  style?: 'digital' | 'flip' | 'minimal'
  theme?: 'light' | 'dark'
  showCta?: boolean
}

const DummyClockPreview = ({ style = 'flip', theme = 'light', showCta = true }: Props) => {
  const clock = useClock({
    format: '12h',
    showSeconds: true,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    showDate: false,
    dateFormat: 'short'
  })

  return (
    <Box position="relative">
      <ClockDisplay
        hours={clock.hours}
        minutes={clock.minutes}
        seconds={clock.seconds}
        ampm={clock.ampm}
        style={style}
        theme={theme}
        showSeconds
      />
      {showCta && (
        <Flex justifyContent="center" css={{ marginTop: '-4px', paddingBottom: '16px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }}>
          <Link href="/pricing" style={{ textDecoration: 'none' }}>
            <Button
              className="plausible-event-name=CTA+Customize+Clock"
              bg="brand.accent-1"
              color="neutral.white"
              borderRadius="sm"
              px="sm"
              py="4px"
              fontSize="xxs"
              fontWeight="bold"
              css={{ '&:hover': { opacity: 0.85 } }}
            >
              Customize your clock →
            </Button>
          </Link>
        </Flex>
      )}
    </Box>
  )
}

export default DummyClockPreview
