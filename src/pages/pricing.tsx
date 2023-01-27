import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'
import PricingPage from '@/pages/PricingPage'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'

const Pricing = () => {
  return (
    <SupabaseAuthProvider>
      <BlocsThemeProvider>
        <PricingPage />
      </BlocsThemeProvider>
    </SupabaseAuthProvider>
  )
}

export default Pricing
