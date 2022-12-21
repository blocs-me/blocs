import Timer from '../Timer'
import Button from '@/design-system/Button'
import Flex from '@/helpers/Flex'

import { usePomodoroStore, usePomodoroDispatch } from '../usePomodoroStore'
import {
  setCurrentPomodoroPreset,
  setDocumentTimelineStart,
  setStartedAt,
  setPausedAt,
  SET_STARTED_AT
} from '../pomodoroActions'
import useSWR from 'swr'
import { POMODORO_PRESETS_PATH } from '@/utils/endpoints'
import fetcher from '@/utils/fetcher'
import useNotifications from '@/design-system/Notifications/useNotifications'
import fetchWithToken from 'src/services/fetchWithToken'
import Skeleton from '@/helpers/Skeleton'
import PomodoroActiveSessionMenu from '../PomodoroActiveSessionMenu.js'
import { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react'
import { useWidgetAuthStore } from '@/hooks/useWidgetAuth'
import { $ } from '@/utils/JSelectors'
import storage from '@/utils/storage'
import Box from '@/helpers/Box'
import { Play } from 'src/icons/play'
import { Pause } from 'src/icons/pause'
import Icon from '@/helpers/Icon'
import { Refresh } from 'src/icons/refresh'

const PomodoroMainPage = ({ isHovering }) => {
  const {
    isLoggingIn,
    isLoggedIn,
    token: accessToken
  } = useWidgetAuthStore() || {}
  const loading = isLoggingIn || !isLoggedIn

  const {
    session: { startedAt, pausedAt },
    preferences: { deepFocus },
    documentTimelineStart,
    currentPreset
  } = usePomodoroStore()

  const pomodoroDispatch = usePomodoroDispatch()
  const notifs = useNotifications()
  const [hovering, setHovering] = useState(false)
  const widgetLayout = $('#widget-layout')

  const credentials = 'same-origin'
  const handleGetPresetsError = () =>
    notifs.createError(
      'Uh oh ! We were not able to fetch your pomodoro presets'
    )

  const { data: presets } = useSWR(
    (loading || !isLoggedIn) && !accessToken
      ? null
      : [POMODORO_PRESETS_PATH, accessToken],
    fetchWithToken,
    {
      onError: () => handleGetPresetsError,
      revalidateOnFocus: false
    }
  )

  const theme = useTheme()

  const handleStop = () => {
    if (startedAt || pausedAt) {
      // stopping the session
      pomodoroDispatch(setPausedAt(''))
      pomodoroDispatch(setStartedAt(null))
      // TO DO: handle database update
      return null
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (loading) return null

    if (startedAt) {
      // pause the session
      pomodoroDispatch(setPausedAt(Date.now() - startedAt))
      pomodoroDispatch(setStartedAt(null))
      return null
    }

    // start the session
    pomodoroDispatch(setDocumentTimelineStart(document.timeline.currentTime))
    pomodoroDispatch(setStartedAt(Date.now()))
  }

  useEffect(() => {
    if (presets?.data?.length === 1) {
      const preset = presets.data[0]

      if (preset.id !== currentPreset?.id) {
        pomodoroDispatch(setCurrentPomodoroPreset(preset))
      }
    }
  }, [presets, currentPreset]) // eslint-disable-line

  // useEffect(() => {
  //   const hideBanner = storage.getItem('blocs-release-banner') === 'true'
  //   if (isLoggedIn && !hideBanner) {
  //     storage.setItem('blocs-release-banner', 'true')
  //     notifs.createInfo(
  //       'New version of blocs is releasing 16th December 🎉🥳',
  //       5000
  //     )
  //   }
  // }, [isLoggedIn, notifs])

  const handleMouseOver = (e) => {
    if (widgetLayout?.contains(e.target)) {
      setHovering(true)
    }
  }

  const handleMouseLeave = (e) => {
    setHovering(false)
  }

  return (
    <>
      <PomodoroActiveSessionMenu />
      <div id="widget-underlay" />
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        onMouseOver={(e) => handleMouseOver(e)}
        onMouseLeave={(e) => handleMouseLeave(e)}
        id="pomodoro-container"
      >
        <Timer loading={!presets || loading} />
        <Flex
          justifyContent="center"
          // overflow="hidden"
          mt="sm"
          height="var(--height, 80px)"
          css={{
            transition:
              'height 0.5s  ease, opacity 0.2s ease, margin 0.3s ease',
            opacity: 'var(--opacity, 1)'
          }}
          style={{
            '--height': deepFocus && startedAt && !isHovering ? 0 : '40px',
            '--opacity': deepFocus && startedAt && !isHovering ? 0 : 1,
            marginTop:
              deepFocus && startedAt && !isHovering ? 0 : theme.space.sm
          }}
          zIndex="10"
        >
          <Flex
            as="button"
            borderRadius="50%"
            bg="background"
            boxShadow="neumorphicDefault"
            color="foreground"
            p={0}
            width="50px"
            height="50px"
            overflow="hidden"
            onClick={(e) => handleClick(e)}
            alignItems="center"
            justifyContent="center"
          >
            {startedAt && (
              <Icon stroke="foreground" width="15px" m="auto" display="flex">
                <Pause />
              </Icon>
            )}
            {!startedAt && (
              <Icon fill="foreground" size="20px" m="auto" display="flex">
                <Play />
              </Icon>
            )}
          </Flex>
          <Flex
            ml="sm"
            as="button"
            borderRadius="50%"
            bg="background"
            boxShadow="neumorphicDefault"
            color="foreground"
            p={0}
            width="50px"
            height="50px"
            overflow="hidden"
            onClick={(e) => handleStop(e)}
            alignItems="center"
            justifyContent="center"
          >
            <Icon stroke="foreground" size="20px" m="auto" display="flex">
              <Refresh />
            </Icon>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default PomodoroMainPage
