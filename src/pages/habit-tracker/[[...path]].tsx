import Head from 'next/head'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import HabitTracker from '@/widgets/HabitTracker'
import DummyHabitTracker from '@/widgets/HabitTracker/DummyHabitTracker'
import WidgetPage from '@/widgets/WidgetPage'
import MadeWithBlocs from '@/design-system/MadeWithBlocs'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import storage from '@/utils/storage'

const CHECKED_STORAGE_KEY = 'blocsHabitTrackerDemo'
const HABITS_STORAGE_KEY = 'blocsHabitTrackerHabits'
const MAX_FREE_HABITS = 3

const getTodayKey = () => new Date().toISOString().slice(0, 10)

type Habit = { id: number; title: string }

const loadHabits = (): Habit[] => {
  try {
    const saved = storage.getItem(HABITS_STORAGE_KEY)
    if (!saved) return []
    return JSON.parse(saved) ?? []
  } catch {
    return []
  }
}

const saveHabits = (habits: Habit[]) => {
  storage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits))
}

const loadChecked = (): number[] => {
  try {
    const saved = storage.getItem(CHECKED_STORAGE_KEY)
    if (!saved) return []
    const parsed = JSON.parse(saved)
    if (parsed.date !== getTodayKey()) return []
    return parsed.checked ?? []
  } catch {
    return []
  }
}

const saveChecked = (checked: number[]) => {
  storage.setItem(CHECKED_STORAGE_KEY, JSON.stringify({ date: getTodayKey(), checked }))
}

const DemoHabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [checked, setChecked] = useState<number[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setHabits(loadHabits())
    setChecked(loadChecked())
    setLoaded(true)
  }, [])

  const handleCheck = useCallback((checked: number[]) => {
    setChecked(checked)
    saveChecked(checked)
  }, [])

  const handleAddHabit = useCallback((title: string) => {
    setHabits(prev => {
      if (prev.length >= MAX_FREE_HABITS) return prev
      const maxId = prev.reduce((max, h) => Math.max(max, h.id), 0)
      const next = [...prev, { id: maxId + 1, title }]
      saveHabits(next)
      return next
    })
  }, [])

  const handleRemoveHabit = useCallback((id: number) => {
    setHabits(prev => {
      const next = prev.filter(h => h.id !== id)
      saveHabits(next)
      return next
    })
    setChecked(prev => {
      const next = prev.filter(v => v !== id)
      saveChecked(next)
      return next
    })
  }, [])

  if (!loaded) return null

  return (
    <WidgetPage p="sm" bg="bg.notion" flexDirection="column">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <URLHashProvider hash={{ role: 'blocs-user' }}>
        <DummyHabitTracker
          smallScreenAt="600px"
          isEditable
          isAnalyticsHidden
          habits={{ data: habits }}
          checkedValues={checked}
          onCheckedChange={handleCheck}
          onAddHabit={handleAddHabit}
          onRemoveHabit={handleRemoveHabit}
          maxHabits={MAX_FREE_HABITS}
        />
        <MadeWithBlocs href="https://blocs.me/habit-tracker-widget" />
      </URLHashProvider>
    </WidgetPage>
  )
}

export default function HabitTrackerPage() {
  const router = useRouter()

  if (!router.isReady) return null

  if (!router.query.token) return <DemoHabitTracker />

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <HabitTracker />
    </>
  )
}
