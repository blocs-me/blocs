import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'

const GRID_DAYS = 30
const GRID_COLS = 6

type Props = {
  currentStreak: number
  bestStreak: number
}

const StreakGrid = ({ currentStreak, bestStreak }: Props) => {
  const cells = Array.from({ length: GRID_DAYS }, (_, i) => {
    const dayIndex = GRID_DAYS - 1 - i
    return dayIndex < currentStreak
  })

  return (
    <Flex flexDirection="column" css={{ gap: '12px' }}>
      <Flex css={{ gap: '6px' }} alignItems="center">
        <Box px="xs" py="2px" borderRadius="sm" bg="brand.accent-5">
          <Text fontSize="10px" fontWeight={700} color="brand.accent-1" m={0} css={{ whiteSpace: 'nowrap' }}>
            Best: {bestStreak || 0} {bestStreak === 1 ? 'day' : 'days'}
          </Text>
        </Box>
        <Box px="xs" py="2px" borderRadius="sm" bg="primary.accent-2">
          <Text fontSize="10px" fontWeight={600} color="foreground" m={0} css={{ whiteSpace: 'nowrap' }}>
            Now: {currentStreak || 0}
          </Text>
        </Box>
      </Flex>

      <Box>
        <Text fontSize="10px" color="primary.accent-4" m={0} mb="xs" fontWeight={500}>
          Last 30 days
        </Text>
        <Box css={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`, gap: '3px' }}>
          {cells.map((isActive, i) => (
            <Box
              key={i}
              borderRadius="3px"
              bg={isActive ? 'brand.accent-1' : 'primary.accent-2'}
              css={{
                aspectRatio: '1',
                opacity: isActive ? 0.85 : 1,
                transition: 'background 0.15s ease'
              }}
            />
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default StreakGrid
