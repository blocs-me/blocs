import LandingPage from '@/pages/LandingPage'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'

function Landing() {
  return (
    <SupabaseAuthProvider>
      <BlocsThemeProvider>
        <LandingPage />
      </BlocsThemeProvider>
    </SupabaseAuthProvider>
  )
}

export default Landing
