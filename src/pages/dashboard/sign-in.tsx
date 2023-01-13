import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import getUrlHash from '@/hooks/useUrlHash/getUrlHash'
import DashboardSkeleton from '@/pages/Dashboard/DashboardSkeleton'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import useBlocsUser from '@/hooks/useBlocsUser'
import { mutate } from 'swr'
import { postReq } from '@/utils/fetchingUtils'
import useNotifications from '@/design-system/Notifications/useNotifications'

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

const DashboardSignIn = () => {
  const { error_code, message } = useUrlHash()
  const router = useRouter()
  const user = useUser()
  const notif = useNotifications()

  useEffect(() => {
    if (error_code === '401') {
      router.push('/sign-in')
    }
  }, [router, error_code]) // eslint-disable-line

  useEffect(() => {
    if (user) {
      postReq('/api/auth/sign-in', { email: user?.email })
        .then(() => {
          router.push('/dashboard/pomodoro')
        })
        .catch((error) => {
          console.error(error)
          notif.createError('Uh oh! Something went wrong when signing in')
        })
    }
  }, [user, router])

  return <DashboardSkeleton message={message} />
}

export default DashboardSignIn
