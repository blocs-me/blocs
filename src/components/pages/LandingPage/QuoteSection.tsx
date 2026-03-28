import WidgetExplainerSection from './WidgetExplainerSection'
import Link from 'next/link'
import Button from '@/design-system/Button'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import DummyQuotePreview from '@/widgets/Quote/DummyQuotePreview'

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
  'Start each day with inspiration. Get a daily quote from curated categories like motivation, productivity, and mindfulness — or add your own custom quotes.'

const QuoteSection = () => {
  return (
    <WidgetExplainerSection
      header="Quote of the Day"
      headerExtra={<ProBadge />}
      paraOne={paraOne}
      paraTwo={
        <Link href="/quote-widget" style={{ textDecoration: 'none' }}>
          <Button
            className="plausible-event-name=Landing+See+Quote"
            bg="brand.accent-1"
            color="background"
            borderRadius="sm"
            px="md"
            py="xs"
            fontSize="xs"
            fontWeight="bold"
            height="40px"
          >
            See Quote Widget →
          </Button>
        </Link>
      }
      reverse
    >
      {() => (
        <Box
          width={['300px', , , '400px']}
          borderRadius="md"
          overflow="hidden"
          border="1px solid"
          borderColor="primary.accent-1"
        >
          <DummyQuotePreview showCta={false} />
        </Box>
      )}
    </WidgetExplainerSection>
  )
}

export default QuoteSection
