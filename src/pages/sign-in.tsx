import Notifications from '@/design-system/Notifications'
import SignInPage from '@/pages/SignInPage'

const SignIn = () => {
  return (
    <Notifications zIndex="notification" pt="md">
      <SignInPage />
    </Notifications>
  )
}

export default SignIn
