import { useRouter } from 'next/router'
import { useMemo } from 'react'
import OnMyPlateDisplay from '@/widgets/OnMyPlate/OnMyPlateDisplay'
import { configFromParams } from '@/widgets/OnMyPlate/onMyPlateConfig'
import MadeWithBlocs from '@/design-system/MadeWithBlocs'

const OnMyPlatePage = () => {
  const router = useRouter()

  const config = useMemo(() => {
    if (!router.isReady) return null
    return configFromParams(new URLSearchParams(router.asPath.split('?')[1] || ''))
  }, [router.isReady, router.asPath])

  if (!config) return null

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <OnMyPlateDisplay
        title={config.title}
        showTitle={config.showTitle}
        items={config.items}
        theme={config.theme}
        plateStyle={config.plateStyle}
        plateColor={config.plateColor}
        itemColor={config.itemColor}
        showCount={config.showCount}
      />
      <MadeWithBlocs floating href="https://blocs.me/whats-on-my-plate" />
    </div>
  )
}

export default OnMyPlatePage
