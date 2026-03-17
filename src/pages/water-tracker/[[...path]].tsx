import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import WaterTracker from '@/widgets/WaterTracker'
import WidgetPage from '@/widgets/WidgetPage'
import DemoBanner from '@/widgets/DemoBanner'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const DemoWaterTracker = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setProgress(1)
    }, 500)
  }, [])

  return (
    <WidgetPage bg="bg.notion" p="sm">
      <BlocsThemeProvider>
        <DummyWaterTracker
          progress={progress}
          onClickUp={() => setProgress((p) => Math.min(3, p + 1))}
          onClickDown={() => setProgress((p) => Math.max(0, p - 1))}
        />
        <DemoBanner />
      </BlocsThemeProvider>
    </WidgetPage>
  )
}

export default function WaterTrackerPage() {
  const router = useRouter()

  if (!router.isReady) return null

  if (!router.query.token) return <DemoWaterTracker />

  return <WaterTracker />
}
