import { useMemo } from 'react'
import Box from '@/helpers/Box'
import Flex from '@/helpers/Flex'
import Text from '@/design-system/Text'

const GRID_DAYS = 30
const GRID_COLS = 6

type HistoryDay = { date: string; habitsDone: string[] }

type Props = {
  currentStreak: number
  bestStreak: number
  selectedHabitId?: string | null
  history?: HistoryDay[]
}

function computeHabitStreak(history: HistoryDay[], habitId: string) {
  const today = new Date()
  const dayMap = new Map<string, boolean>()

  for (const day of history) {
    dayMap.set(day.date.slice(0, 10), day.habitsDone.includes(habitId))
  }

  let current = 0
  let best = 0
  let streak = 0
  const cells: boolean[] = []

  for (let i = GRID_DAYS - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const done = dayMap.get(key) || false
    cells.push(done)

    if (done) {
      streak++
      best = Math.max(best, streak)
    } else {
      streak = 0
    }
  }

  current = streak
  return { current, best, cells }
}

const StreakGrid = ({ currentStreak, bestStreak, selectedHabitId, history }: Props) => {
  const habitStats = useMemo(() => {
    if (!selectedHabitId || !history?.length) return null
    return computeHabitStreak(history, selectedHabitId)
  }, [selectedHabitId, history])

  const displayStreak = habitStats ? habitStats.current : (currentStreak || 0)
  const displayBest = habitStats ? habitStats.best : (bestStreak || 0)

  const cells = habitStats
    ? habitStats.cells
    : Array.from({ length: GRID_DAYS }, (_, i) => {
        const dayIndex = GRID_DAYS - 1 - i
        return dayIndex < currentStreak
      })

  return (
    <Flex flexDirection="column" css={{ gap: '12px' }}>
      <Flex css={{ gap: '6px' }} alignItems="center">
        <Box px="xs" py="2px" borderRadius="sm" bg="brand.accent-5">
          <Text fontSize="10px" fontWeight={700} color="brand.accent-1" m={0} css={{ whiteSpace: 'nowrap' }}>
            Best: {displayBest} {displayBest === 1 ? 'day' : 'days'}
          </Text>
        </Box>
        <Box px="xs" py="2px" borderRadius="sm" bg="primary.accent-2">
          <Text fontSize="10px" fontWeight={600} color="foreground" m={0} css={{ whiteSpace: 'nowrap' }}>
            Now: {displayStreak}
          </Text>
        </Box>
      </Flex>

      <Box>
        <Text fontSize="10px" color="primary.accent-4" m={0} mb="xs" fontWeight={500}>
          {selectedHabitId ? 'This habit — last 30 days' : 'Last 30 days'}
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
