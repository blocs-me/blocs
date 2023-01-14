import Head from 'next/head'
import Dashboard from '@/pages/Dashboard'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'

const MainDashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Manage blocs notion widgets</title>
      </Head>
      <SupabaseAuthProvider>
        <BlocsThemeProvider>
          <Dashboard />
        </BlocsThemeProvider>
      </SupabaseAuthProvider>
    </>
  )
}

export default MainDashboard
