import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import getUrlHash from '@/hooks/useUrlHash/getUrlHash'
import DashboardSkeleton from '@/pages/Dashboard/DashboardSkeleton'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

type UrlHashReturn = {
  access_token: string
  refresh_token: string
  error_code?: string
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
  const { error_code } = useUrlHash()
  const router = useRouter()
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (error_code === '401') {
      router.push('/sign-in')
    }
  }, [router, error_code]) // eslint-disable-line

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard/pomodoro')
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [router, supabase])

  return <DashboardSkeleton />
}

export default DashboardSignIn
