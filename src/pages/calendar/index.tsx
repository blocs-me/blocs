import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { configFromParams } from '@/widgets/Calendar/calendarConfig'
import { useCalendar } from '@/widgets/Calendar/useCalendar'
import MonthView from '@/widgets/Calendar/MonthView'
import YearView from '@/widgets/Calendar/YearView'
import WidgetSettingsPopover from '@/widgets/Clock/WidgetSettingsPopover'
import type { CalendarView } from '@/widgets/Calendar/calendarConfig'

const CalendarPage = () => {
  const router = useRouter()

  const config = useMemo(() => {
    if (!router.isReady) return null
    return configFromParams(new URLSearchParams(router.asPath.split('?')[1] || ''))
  }, [router.isReady, router.asPath])

  if (!config) return null

  return <CalendarWidget config={config} />
}

const CalendarWidget = ({ config }: { config: ReturnType<typeof configFromParams> }) => {
  const [viewOverride, setViewOverride] = useState<CalendarView | null>(null)
  const activeView = viewOverride ?? config.view

  const calendar = useCalendar({
    timezone: config.timezone,
    startOfWeek: config.startOfWeek
  })

  const handleSelectMonth = (month: number) => {
    calendar.goToMonth(month, calendar.year)
    setViewOverride('month')
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <WidgetSettingsPopover
        currentMode={activeView}
        onModeChange={(mode) => setViewOverride(mode as CalendarView)}
        modes={[
          { value: 'month', label: 'Month' },
          { value: 'year', label: 'Year' }
        ]}
        dashboardPath="/dashboard/calendar"
      />
      {config.showTitle && config.title && (
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '13px',
          fontWeight: 500,
          color: config.theme === 'dark' ? '#cccccc' : '#666666',
          zIndex: 1
        }}>
          {config.title}
        </div>
      )}
      {activeView === 'month' ? (
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
          onSelectMonth={handleSelectMonth}
          onPrevYear={calendar.goToPrevYear}
          onNextYear={calendar.goToNextYear}
        />
      )}
    </div>
  )
}

export default CalendarPage
