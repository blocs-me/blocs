import { ColorModeProvider } from '@/hooks/useColorMode'
import { ReactNode } from 'react'
import WidgetPage from '../WidgetPage'
import { useInitUrlHash } from '../../../hooks/useUrlHash/useUrlHash'

const AllProviders = ({ children }: { children: ReactNode }) => {
  const { hash, URLHashProvider } = useInitUrlHash()

  return (
    <URLHashProvider hash={hash}>
      <ColorModeProvider>
        <WidgetPage p="md">{children}</WidgetPage>
      </ColorModeProvider>
    </URLHashProvider>
  )
}

export default AllProviders
