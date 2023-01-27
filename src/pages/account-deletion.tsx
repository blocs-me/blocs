import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import { ColorModeProvider } from '@/hooks/useColorMode'
import AccountDeletionPage from '@/pages/AccountDeletionPage'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'

const AccountDeletion = () => {
  

  return (
    <SupabaseAuthProvider>
      <BlocsThemeProvider>
        <ColorModeProvider>
          <AccountDeletionPage />
        </ColorModeProvider>
      </BlocsThemeProvider>
    </SupabaseAuthProvider>
  )
}

export default AccountDeletion
