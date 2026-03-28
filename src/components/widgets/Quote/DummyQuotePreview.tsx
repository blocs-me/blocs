import QuoteDisplay from './QuoteDisplay'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Link from 'next/link'
import Button from '@/design-system/Button'

type Props = {
  theme?: 'light' | 'dark'
  showCta?: boolean
}

const DummyQuotePreview = ({ theme = 'light', showCta = true }: Props) => {
  return (
    <Box position="relative">
      <QuoteDisplay
        text="The only way to do great work is to love what you do."
        author="Steve Jobs"
        showAuthor={true}
        fontSize="md"
        textAlign="center"
        theme={theme}
      />
      {showCta && (
        <Flex justifyContent="center" css={{ marginTop: '-4px', paddingBottom: '16px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }}>
          <Link href="/pricing" style={{ textDecoration: 'none' }}>
            <Button
              className="plausible-event-name=CTA+Customize+Quote"
              bg="brand.accent-1"
              color="neutral.white"
              borderRadius="sm"
              px="sm"
              py="4px"
              fontSize="xxs"
              fontWeight="bold"
              css={{ '&:hover': { opacity: 0.85 } }}
            >
              Customize your quotes →
            </Button>
          </Link>
        </Flex>
      )}
    </Box>
  )
}

export default DummyQuotePreview
