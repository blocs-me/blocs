import Head from 'next/head'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import HabitTracker from '@/widgets/HabitTracker'
import DummyHabitTracker from '@/widgets/HabitTracker/DummyHabitTracker'
import WidgetPage from '@/widgets/WidgetPage'
import Text from '@/design-system/Text'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import storage from '@/utils/storage'

const STORAGE_KEY = 'blocsHabitTrackerDemo'

const getTodayKey = () => new Date().toISOString().slice(0, 10)

const createHabit = (title: string, id: number) => ({ id, title })

const demoHabits = {
  data: [
    createHabit('Study math', 1),
    createHabit('Exercise', 2),
    createHabit('Reading, 30 mins', 3)
  ]
}

const loadChecked = (): number[] => {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (!saved) return []
    const parsed = JSON.parse(saved)
    if (parsed.date !== getTodayKey()) return []
    return parsed.checked ?? []
  } catch {
    return []
  }
}

const saveChecked = (checked: number[]) => {
  storage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), checked }))
}

const PoweredByBlocs = () => (
  <a
    href="https://blocs.me/habit-tracker-widget"
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}
  >
    <Text
      fontSize="10px"
      textAlign="center"
      color="primary.accent-4"
      mt="8px"
      mb={0}
    >
      Powered by Blocs
    </Text>
  </a>
)

const DemoHabitTracker = () => {
  const [checked, setChecked] = useState<number[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setChecked(loadChecked())
    setLoaded(true)
  }, [])

  const handleCheck = useCallback((checked: number[]) => {
    setChecked(checked)
    saveChecked(checked)
  }, [])

  if (!loaded) return null

  return (
    <BlocsThemeProvider>
      <WidgetPage p="sm" bg="bg.notion" flexDirection="column">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <URLHashProvider hash={{ role: 'blocs-user' }}>
          <DummyHabitTracker
            smallScreenAt="600px"
            isEditable
            isAnalyticsHidden
            habits={demoHabits}
            checkedValues={checked}
            onCheckedChange={handleCheck}
          />
          <PoweredByBlocs />
        </URLHashProvider>
      </WidgetPage>
    </BlocsThemeProvider>
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
