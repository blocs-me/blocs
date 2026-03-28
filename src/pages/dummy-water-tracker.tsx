import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import WidgetPage from '@/widgets/WidgetPage'
import { useState, useEffect } from 'react'

const DummyWaterTrackerPage = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setProgress(1)
    }, 500)
  }, [])

  return (
    <WidgetPage bg="bg.notion" p="sm">
      <DummyWaterTracker
        progress={progress}
        onClickUp={() => setProgress(Math.min(3, progress + 1))}
        onClickDown={() => setProgress(Math.max(0, progress - 1))}
      />
    </WidgetPage>
  )
}

export default DummyWaterTrackerPage
