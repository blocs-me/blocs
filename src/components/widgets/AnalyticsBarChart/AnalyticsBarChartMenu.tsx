import ButtonGroup, { ButtonGroupButton } from '@/design-system/ButtonGroup'
import Flex from '@/helpers/Flex'
import useAnalyticsBarChart from './useAnalyticsBarChart/useAnalyticsBarChart'
import Box from '@/helpers/Box'
import useColorMode from '../../../hooks/useColorMode/index'
import LinkIcon from 'src/icons/link-icon'
import Sun from 'src/icons/sun'
import Moon from 'src/icons/moon'
import useIsTrueDarkMode from '../../../hooks/useIsTrueDarkMode'
import { Calendar } from 'src/icons/calendar'
import FadeIn from '@/helpers/FadeIn'
import useUrlHash from '@/hooks/useUrlHash'
import useFetchShareableLink from '@/hooks/useFetchShareableLink'
import Icon from '@/helpers/Icon'
import { CopyIcon } from 'src/icons/copy'
import WidgetModal from '../WidgetModal'
import Text from '@/design-system/Text'
import TextInput from '@/design-system/TextInput'
import { useState } from 'react'
import useNotifications from '@/design-system/Notifications/useNotifications'
const colorModeText = {
  dark: 'Dark Mode',
  light: 'Light Mode',
  auto: 'System'
}

const getWidgetType = (pathname: string) => {
  if (pathname.includes('water-tracker')) return 'WATER_TRACKER'
  if (pathname.includes('pomodoro')) return 'POMODORO'
  return ''
}

const AnalyticsBarChartMenu = () => {
  const [{ timePeriod }, dispatch] = useAnalyticsBarChart()
  const { colorMode, setTheme, setBackground } = useColorMode()
  const isDarkMode = useIsTrueDarkMode()
  const { role } = useUrlHash<{ role: string }>()
  const { fetcher: fetchShareableLink } = useFetchShareableLink(
    getWidgetType(window?.location?.pathname) as
      | 'WATER_TRACKER'
      | 'HABIT_TRACKER'
      | 'POMODORO'
  )
  const [shareableLink, setShareableLink] = useState('')

  const changeTimePeriod = () => {
    const nextTimePeriod = timePeriod === 'weekly' ? 'monthly' : 'weekly'

    dispatch?.({
      type: 'SET_TIME_FORMAT',
      payload: nextTimePeriod
    })
  }

  const handleThemeChange = () => {
    const modes = ['dark', 'light', 'auto']
    const pos = modes.findIndex((mode) => mode == colorMode)

    const nextMode = pos + 1 >= 3 ? 0 : pos + 1
    setTheme(modes[nextMode])
    setBackground(modes[nextMode])
  }

  const notifs = useNotifications()

  const copyShareableLink = async () => {
    try {
      const data = await fetchShareableLink()
      const path = window?.location?.pathname.replace('/menu', '')
      const shareableLink = `${window.location.origin}${path}?token=${data.shareableToken}&role=friend`
      setShareableLink(shareableLink)
      try {
        window.navigator.clipboard.writeText(shareableLink)
      } catch (err) {
        console.error('Could not copy shareable link to clipboard')
      }

      notifs.createInfo('The link has been copied')
    } catch (err) {
      console.error(err)
      notifs.createError("Oops ! we couldn't create the link")
    }
  }

  return (
    <>
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        mt="-50px"
      >
        <FadeIn>
          <ButtonGroup gap={['0', , 'xs']}>
            <ButtonGroupButton
              icon={isDarkMode ? <Sun /> : <Moon />}
              onClick={() => handleThemeChange()}
            >
              {colorModeText[colorMode]}
            </ButtonGroupButton>
            {role === 'blocs-user' && (
              <ButtonGroupButton
                onClick={copyShareableLink}
                icon={<LinkIcon />}
              >
                Shareable Link
              </ButtonGroupButton>
            )}
            <ButtonGroupButton onClick={changeTimePeriod} icon={<Calendar />}>
              <Box as="span" css={{ textTransform: 'capitalize' }}>
                {timePeriod}
              </Box>
            </ButtonGroupButton>
          </ButtonGroup>
        </FadeIn>
      </Flex>

      <WidgetModal
        open={!!shareableLink}
        closeModal={() => setShareableLink('')}
        appendTo="#bar-chart-modal-wrapper"
      >
        <Flex p="md" flexDirection="column">
          <Text
            fontSize="sm"
            letterSpacing="sm"
            color="foreground"
            textAlign="center"
          >
            You can copy the link here. <br />
            <Box
              width="100%"
              as="small"
              p="xxs"
              borderRadius="5px"
              bg="primary.accent-2"
            >
              Sometimes copying doesn&apos;t work in the app, so you need to
              copy it manually
            </Box>
          </Text>
          <Box position="relative">
            <TextInput
              htmlFor="Shareable Link"
              ariaLabel="Shareable Link"
              name="Shareable Link"
              value={shareableLink}
              type="text"
              readOnly
            />

            <Box
              css={{
                transition: 'transform ease 0.1s',
                '&:active': {
                  transform: 'scale(0.9)'
                }
              }}
              bg="success.medium"
              as="button"
              boxShadow="default"
              display="flex"
              p="xxs"
              borderRadius="sm"
              width="32px"
              height="32px"
              position="absolute"
              top="6px"
              right="0.5rem"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window?.navigator?.clipboard.writeText(shareableLink)
              }}
            >
              <Icon
                as="span"
                width="20px"
                stroke="foreground"
                display="flex"
                m="auto"
              >
                <CopyIcon />
              </Icon>
            </Box>
          </Box>
        </Flex>
      </WidgetModal>
    </>
  )
}

export default AnalyticsBarChartMenu
