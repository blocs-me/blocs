import { useRouter } from "next/router"
import { useEffect } from "react"
import { ERROR } from "@/constants/fetchStates"
import Dashboard from "@/pages/Dashboard"
import {
  setAuthState,
  setAuthValid,
} from "@/contexts/GlobalContextProvider/globalActions"

const DashboardSignIn = ({ code }) => {
  const router = useRouter()
  const { error } = router.query

  useEffect(() => {
    if (error || !code) {
      router.push("/dashboard")
      setAuthState(ERROR)
      setAuthValid(false)
    }
  }, [error, router, code])

  return <Dashboard title="DASHBOARD" />
}

export const getServerSideProps = (ctx) => {
  const { code = "" } = ctx.query

  return {
    props: {
      code,
    },
  }
}

export default DashboardSignIn
