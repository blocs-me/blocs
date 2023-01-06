import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { ERROR } from '@/constants/fetchStates'
import globalContext from '@/contexts/GlobalContextProvider/globalContext'
import useAuth from '@/hooks/useAuth'
import Dashboard from '@/pages/Dashboard'
import Box from '@/helpers/Box'
import Link from '@/design-system/Link/index.js'
import Modal from '@/design-system/Modal/index.js'
import NotionSignInButton from '@/helpers/NotionSignInButton'
import Text from '@/design-system/Text'
import { USER_PATH } from '@/utils/endpoints'
import getAccessToken from '@/utils/getAccessToken'
import { ThemeProvider, useTheme } from '@emotion/react'
import BlocsThemeProvider from '@/helpers/BlocsThemeProvider'

const MainDashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Manage blocs notion widgets</title>
      </Head>
      <BlocsThemeProvider>
        <Dashboard title="DASHBOARD" />
      </BlocsThemeProvider>
    </>
  )
}

export default MainDashboard
