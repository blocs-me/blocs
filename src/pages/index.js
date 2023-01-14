import LandingPage from '@/pages/LandingPage'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'

function Landing() {
  return (
    <SupabaseAuthProvider>
      <LandingPage />
    </SupabaseAuthProvider>
  )
}

export default Landing
