import { useMemo } from 'react'
import CountdownDisplay from './CountdownDisplay'
import { useCountdown, autoDetectUnits } from './useCountdown'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import Flex from '@/helpers/Flex'
import Link from 'next/link'
import Button from '@/design-system/Button'

type Props = {
  theme?: 'light' | 'dark'
  showCta?: boolean
}

const DummyCountdownPreview = ({ theme = 'light', showCta = true }: Props) => {
  const endDate = useMemo(() => {
    const d = new Date()
    d.setHours(d.getHours() + 12)
    return d
  }, [])

  const { parts, visibleUnits } = useCountdown({
    endDate,
    countUp: false,
    visibleUnits: ['days', 'hours', 'minutes', 'seconds']
  })

  return (
    <Box position="relative">
      <CountdownDisplay
        title="Product Launch"
        showTitle
        parts={parts}
        visibleUnits={visibleUnits}
        theme={theme}
      />
      {showCta && (
        <Flex justifyContent="center" css={{ marginTop: '-4px', paddingBottom: '16px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }}>
          <Link href="/pricing" style={{ textDecoration: 'none' }}>
            <Button
              className="plausible-event-name=CTA+Customize+Countdown"
              bg="brand.accent-1"
              color="neutral.white"
              borderRadius="sm"
              px="sm"
              py="4px"
              fontSize="xxs"
              fontWeight="bold"
              css={{ '&:hover': { opacity: 0.85 } }}
            >
              Set your own countdown →
            </Button>
          </Link>
        </Flex>
      )}
    </Box>
  )
}

export default DummyCountdownPreview
