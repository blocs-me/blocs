import Head from 'next/head'
import Dashboard from '@/pages/Dashboard'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'

const MainDashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Manage blocs notion widgets</title>
      </Head>
      <BlocsThemeProvider>
        <Dashboard />
      </BlocsThemeProvider>
    </>
  )
}

export default MainDashboard
