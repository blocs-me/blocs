'use client' // NextJS 13 requires this. Remove if you are using NextJS 12 or lower
import { useContext, useEffect, useState } from 'react'
import Gleap from 'gleap'
import useUser from '@/hooks/useUser'
import { useSessionContext } from '@supabase/auth-helpers-react'
import useBlocsUser from '@/hooks/useBlocsUser'

const GleapApp = () => {
  const { user } = useBlocsUser()
  const isPremium = !!user?.data?.purchasedProducts?.length
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const win = window

    if (!isInitialized) {
      Gleap.initialize('jTqbzbdOluQ5oPAVzGp8Z7JDk2NHBOIQ')
      Gleap.setEnvironment(
        process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
      )
      setIsInitialized(true)
    }

    if (!user) return

    const plan = isPremium ? 'Paid' : 'Free'

    if (!Gleap.isUserIdentified()) {
      const gleapUser = {
        email: user.data.email,
        plan: plan,
        name: user.data.name
      }
      Gleap.identify(user.data.email, gleapUser)
    } else {
      const { currentPlan } = Gleap.getIdentity()
      plan !== currentPlan && Gleap.updateContact({ plan: plan })
    }
  }, [user, isInitialized, isPremium])

  return null
}

export default GleapApp
