import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

const SupabaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()

  useEffect(() => {
    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/')
      }
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [supabaseClient, router])

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
}

export default SupabaseAuthProvider
