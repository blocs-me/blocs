import Head from 'next/head'
import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import WaterTracker from '@/widgets/WaterTracker'
import WidgetPage from '@/widgets/WidgetPage'
import Text from '@/design-system/Text'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import storage from '@/utils/storage'

const STORAGE_KEY = 'blocsWaterTrackerDemo'

const getTodayKey = () => new Date().toISOString().slice(0, 10)

const loadProgress = (): number => {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (!saved) return 0
    const parsed = JSON.parse(saved)
    if (parsed.date !== getTodayKey()) return 0
    return parsed.progress ?? 0
  } catch {
    return 0
  }
}

const saveProgress = (progress: number) => {
  storage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayKey(), progress }))
}

const PoweredByBlocs = () => (
  <a
    href="https://blocs.me/water-tracker-widget"
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

const DemoWaterTracker = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  const handleUp = () => {
    setProgress((p) => {
      const next = Math.min(3, p + 1)
      saveProgress(next)
      return next
    })
  }

  const handleDown = () => {
    setProgress((p) => {
      const next = Math.max(0, p - 1)
      saveProgress(next)
      return next
    })
  }

  return (
    <WidgetPage bg="bg.notion" p="sm">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DummyWaterTracker
        progress={progress}
        onClickUp={handleUp}
        onClickDown={handleDown}
      />
      <PoweredByBlocs />
    </WidgetPage>
  )
}

export default function WaterTrackerPage() {
  const router = useRouter()

  if (!router.isReady) return null

  if (!router.query.token) return <DemoWaterTracker />

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <WaterTracker />
    </>
  )
}
