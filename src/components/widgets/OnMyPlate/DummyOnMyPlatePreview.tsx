import OnMyPlateDisplay from './OnMyPlateDisplay'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Link from 'next/link'
import Button from '@/design-system/Button'

type Props = {
  theme?: 'light' | 'dark'
  showCta?: boolean
}

const SAMPLE_ITEMS = [
  'Thesis draft',
  'Reply to emails',
  'Mom’s birthday',
  'Gym',
  'Side project',
  'Groceries',
  'Read a book'
]

const DummyOnMyPlatePreview = ({ theme = 'light', showCta = true }: Props) => {
  return (
    <Box position="relative">
      <OnMyPlateDisplay
        title="On My Plate"
        showTitle
        items={SAMPLE_ITEMS}
        theme={theme}
        plateStyle="ceramic"
        plateColor="#e8e2d9"
        itemColor="#7c9c8b"
        showCount
      />
      {showCta && (
        <Flex
          justifyContent="center"
          css={{ marginTop: '-4px', paddingBottom: '16px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }}
        >
          <Link href="/pricing" style={{ textDecoration: 'none' }}>
            <Button
              className="plausible-event-name=CTA+Customize+OnMyPlate"
              bg="brand.accent-1"
              color="neutral.white"
              borderRadius="sm"
              px="sm"
              py="4px"
              fontSize="xxs"
              fontWeight="bold"
              css={{ '&:hover': { opacity: 0.85 } }}
            >
              Build your own plate →
            </Button>
          </Link>
        </Flex>
      )}
    </Box>
  )
}

export default DummyOnMyPlatePreview
