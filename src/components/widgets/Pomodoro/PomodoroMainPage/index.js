import Timer from '../Timer'
import Button from '@/design-system/Button'
import Flex from '@/helpers/Flex'

import { usePomodoroStore, usePomodoroDispatch } from '../usePomodoroStore'
import {
  setCurrentPomodoroPreset,
  setDocumentTimelineStart,
  setStartedAt,
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
import { $ } from 'src/lib/JSelectors'
import storage from '@/utils/storage'

const PomodoroMainPage = () => {
  const {
    isLoggingIn,
    isLoggedIn,
    token: accessToken
  } = useWidgetAuthStore() || {}
  const loading = isLoggingIn || !isLoggedIn

  const {
    session: { startedAt },
    preferences: { deepFocus },
    currentPreset
  } = usePomodoroStore()

  const pomodoroDispatch = usePomodoroDispatch()
  const notifs = useNotifications()
  const [hovering, setHovering] = useState(false)
  const widgetLayout = $('#widget-layout')
  const cachedStartedAt = Number(storage.getItem(SET_STARTED_AT))

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

  const handleClick = () => {
    if (loading) return null
    if (startedAt) {
      // stopping the session
      pomodoroDispatch(setStartedAt(null))
      // TO DO: handle database update
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

  useEffect(() => {
    const hideBanner = storage.getItem('blocs-release-banner') === 'true'
    if (isLoggedIn && !hideBanner) {
      storage.setItem('blocs-release-banner', 'true')
      notifs.createInfo(
        'New version of blocs is releasing 16th December 🎉🥳',
        5000
      )
    }
  }, [isLoggedIn, notifs])

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
          overflow="hidden"
          mt="sm"
          height="var(--height, 40px)"
          css={{
            transition:
              'height 0.5s  ease, opacity 0.2s ease, margin 0.3s ease',
            opacity: 'var(--opacity, 1)'
          }}
          style={{
            '--height': deepFocus && startedAt && !hovering ? 0 : '40px',
            '--opacity': deepFocus && startedAt && !hovering ? 0 : 1,
            marginTop: deepFocus && startedAt && !hovering ? 0 : theme.space.sm
          }}
          zIndex="10"
        >
          {(!presets || loading) && (
            <Skeleton width="100px" height="40px" borderRadius="lg" />
          )}
          {presets && !loading && (
            <Button
              onClick={(ev) => handleClick(ev)}
              width="100px"
              variant="round"
              height="40px"
              fontSize="xs"
              letterSpacing="sm"
              aria-label="Start or stop timer"
              bg="primary.accent-3"
              zIndex="10"
            >
              {startedAt ? 'stop' : 'start'}
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default PomodoroMainPage
