import Head from 'next/head'
import Dashboard from '@/pages/Dashboard'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'
import SupabaseAuthProvider from '@/helpers/SupabaseAuthProvider'

const DashboardIndex = () => {
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

export default DashboardIndex
