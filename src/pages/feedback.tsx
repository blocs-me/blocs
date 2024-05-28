import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import FeedbackPage from '@/pages/Feedback'

const Feedback = () => {
  return (
    <SupabaseAuthProvider>
      <BlocsThemeProvider>
        <FeedbackPage />
      </BlocsThemeProvider>
    </SupabaseAuthProvider>
  )
}

export default Feedback
