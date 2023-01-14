import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import { ColorModeProvider } from '@/hooks/useColorMode'
import AccountDeletionPage from '@/pages/AccountDeletionPage'

const AccountDeletion = () => (
  <BlocsThemeProvider>
    <ColorModeProvider>
      <AccountDeletionPage />
    </ColorModeProvider>
  </BlocsThemeProvider>
)

export default AccountDeletion
