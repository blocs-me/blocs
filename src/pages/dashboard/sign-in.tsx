import { useRouter } from 'next/router'
import { useEffect, useState, ComponentType } from 'react'
import getUrlHash from '@/hooks/useUrlHash/getUrlHash'
import DashboardSkeleton from '@/pages/Dashboard/DashboardSkeleton'
import { useUser } from '@supabase/auth-helpers-react'
import { postReq } from '@/utils/fetchingUtils'
import useNotifications from '@/design-system/Notifications/useNotifications'
import Notifications from '@/design-system/Notifications'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'

type UrlHashReturn = {
  access_token: string
  refresh_token: string
  error_code?: string
  message?: string
}

const useUrlHash = () => {
  const [hash, setHash] = useState({})

  useEffect(() => {
    const urlHash = getUrlHash()
    setHash(urlHash)
  }, [])

  return hash as UrlHashReturn
}

const withProviders = (Component: ComponentType) => {
  return () => (
    <SupabaseAuthProvider>
      <Notifications zIndex="2000">
        <BlocsThemeProvider>
          <Component />
        </BlocsThemeProvider>
      </Notifications>
    </SupabaseAuthProvider>
  )
}

const DashboardSignIn = () => {
  const { error_code, message } = useUrlHash()
  const router = useRouter()
  const user = useUser()
  const notif = useNotifications()

  useEffect(() => {
    if (error_code === '401') {
      router.push('/sign-in')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error_code])

  useEffect(() => {
    if (user && !message) {
      postReq('/api/auth/sign-in', { email: user?.email })
        .then(() => {
          router.push('/dashboard')
        })
        .catch((error) => {
          console.error(error)
          notif.createError('Uh oh! Something went wrong when signing in')
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return <DashboardSkeleton message={message} />
}

export default withProviders(DashboardSignIn)
