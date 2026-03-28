import { useState, useEffect } from 'react'
import Flex from '@/helpers/Flex'
import Box from '@/helpers/Box'
import Text from '@/design-system/Text'
import MonthView from '@/widgets/Calendar/MonthView'
import YearView from '@/widgets/Calendar/YearView'
import CalendarSettings from '@/widgets/Calendar/CalendarSettings'
import { useCalendar } from '@/widgets/Calendar/useCalendar'
import { CalendarWidgetConfig, getDefaultConfig, configToEmbedUrl } from '@/widgets/Calendar/calendarConfig'
import CopyLinkButton from '../CopyLinkButton'
import HowToEmbedButton from '../HowToEmbedButton'
import storage from '@/utils/storage'

const STORAGE_KEY = 'calendarConfig'

function loadConfig(): CalendarWidgetConfig {
  try {
    const saved = storage.getItem(STORAGE_KEY)
    if (saved) return { ...getDefaultConfig(), ...JSON.parse(saved) }
  } catch {}
  return getDefaultConfig()
}

const CalendarDashboard = () => {
  const [config, setConfig] = useState<CalendarWidgetConfig>(loadConfig)

  useEffect(() => {
    storage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  const handleChange = (updates: Partial<CalendarWidgetConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const calendar = useCalendar({
    timezone: config.timezone,
    startOfWeek: config.startOfWeek
  })

  const embedUrl = configToEmbedUrl(config)

  return (
    <Flex css={{ gap: '24px' }}>
      <Box css={{ flex: '1 1 0', minWidth: 0 }}>
        <Flex justifyContent="space-between" alignItems="center" mb="sm">
          <Text as="h2" fontSize="lg" fontWeight={700} color="foreground" m={0}>
            Calendar
          </Text>
          <Flex css={{ gap: '8px' }} alignItems="center">
            <HowToEmbedButton />
            <CopyLinkButton url={embedUrl} />
          </Flex>
        </Flex>

        <Box
          borderRadius="md"
          border="1px solid"
          borderColor="primary.accent-2"
          overflow="hidden"
          mb="md"
          minHeight="380px"
          css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {config.view === 'month' ? (
            <MonthView
              grid={calendar.grid}
              markers={config.markers}
              fillColor={config.fillColor}
              headerColor={config.headerColor}
              theme={config.theme}
              showWeekNumbers={config.showWeekNumbers}
              startOfWeek={config.startOfWeek}
              monthLabel={calendar.monthLabel}
              onPrevMonth={calendar.goToPrevMonth}
              onNextMonth={calendar.goToNextMonth}
            />
          ) : (
            <YearView
              year={calendar.year}
              today={calendar.today}
              markers={config.markers}
              fillColor={config.fillColor}
              headerColor={config.headerColor}
              theme={config.theme}
              startOfWeek={config.startOfWeek}
              onSelectMonth={(m) => {
                calendar.goToMonth(m, calendar.year)
                handleChange({ view: 'month' })
              }}
              onPrevYear={calendar.goToPrevYear}
              onNextYear={calendar.goToNextYear}
            />
          )}
        </Box>
      </Box>

      <Box
        css={{ flex: '0 0 300px', alignSelf: 'flex-start' }}
        p="sm"
        borderRadius="md"
        border="1px solid"
        borderColor="primary.accent-2"
      >
        <CalendarSettings config={config} onChange={handleChange} />
      </Box>
    </Flex>
  )
}

export default CalendarDashboard
