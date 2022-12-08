import { ColorModeProvider } from '@/hooks/useColorMode'
import { URLHashProvider } from '@/hooks/useUrlHash/useUrlHash'
import { ReactNode } from 'react'
import WidgetPage from '../WidgetPage'
import { useInitUrlHash } from '../../../hooks/useUrlHash/useUrlHash'

const AllProviders = ({ children }: { children: ReactNode }) => {
  const hash = useInitUrlHash()

  return (
    <URLHashProvider hash={hash}>
      <ColorModeProvider>
        <WidgetPage p="md">{children}</WidgetPage>
      </ColorModeProvider>
    </URLHashProvider>
  )
}

export default AllProviders
