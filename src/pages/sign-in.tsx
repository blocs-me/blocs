import Notifications from '@/design-system/Notifications'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'
import SignInPage from '@/pages/SignInPage'

const SignIn = () => {
  return (
    <SupabaseAuthProvider>
      <BlocsThemeProvider>
        <Notifications zIndex="1000">
          <SignInPage />
        </Notifications>
      </BlocsThemeProvider>
    </SupabaseAuthProvider>
  )
}

export default SignIn
