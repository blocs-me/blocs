import Head from 'next/head'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import DummyWaterTracker from '@/widgets/WaterTracker/DummyWaterTracker'
import WaterTracker from '@/widgets/WaterTracker'
import WidgetPage from '@/widgets/WidgetPage'
import Text from '@/design-system/Text'
import { useRouter } from 'next/router'
import { useState } from 'react'

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

  return (
    <WidgetPage bg="bg.notion" p="sm">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <BlocsThemeProvider>
        <DummyWaterTracker
          progress={progress}
          onClickUp={() => setProgress((p) => Math.min(3, p + 1))}
          onClickDown={() => setProgress((p) => Math.max(0, p - 1))}
        />
        <PoweredByBlocs />
      </BlocsThemeProvider>
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
