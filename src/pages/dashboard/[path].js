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
  const [{ authState, authValid, loggingOut }] = useContext(globalContext)
  const [promptUserSignIn, setPromptUserSignIn] = useState(false)
  const [preregisterThankYou, setPreregisterThankYou] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  // useAuth() // auth checker

  // useEffect(() => {
  //   if (authState === ERROR) {
  //     !promptUserSignIn && !loggingOut && setPromptUserSignIn(true)
  //   } else {
  //     promptUserSignIn && setPromptUserSignIn(false)
  //   }
  // }, [authState, promptUserSignIn, loggingOut])

  // useState(() => {
  //   if (authValid) {
  //     const user = getAccessToken() || {}
  //     const { firstTimeSignIn, preregisteredForPremium } = user.data || {}
  //     preregisteredForPremium && setPreregisterThankYou(true)

  //     if ((firstTimeSignIn && preregisteredForPremium) || firstTimeSignIn) {
  //       setShowThankYou(true)
  //     }

  //     localStorage.setItem(
  //       USER_PATH,
  //       JSON.stringify({
  //         ...user,
  //         data: {
  //           ...user.data,
  //           firstTimeSignIn: false,
  //         },
  //       })
  //     )
  //   } else {
  //     setShowThankYou(false)
  //   }
  // }, [authValid])

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
