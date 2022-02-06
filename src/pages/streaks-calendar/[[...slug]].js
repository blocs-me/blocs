import AllWidgetProviders from "@/helpers/AllWidgetProviders"
import StreaksCalendar from "@/widgets/StreaksCalendar"
import useStreaksCalendar from "@/widgets/StreaksCalendar/useStreaksCalendar"
import WidgetPage from "@/widgets/WidgetPage"

const colorModeOptions = {
  defaultColorMode: "light",
  getTheme: (theme) => ({
    light: {
      ...theme,
      colors: {
        ...theme.colors,
        primary: {
          ...theme.colors.primary,
          ["accent-2"]: "#999",
        },
      },
    },
  }),
}

const StreaksCalendarPage = () => {
  const streaksCalenderProps = useStreaksCalendar()

  return (
    <AllWidgetProviders colorModeOptions={colorModeOptions}>
      <WidgetPage>
        <StreaksCalendar {...streaksCalenderProps} />
      </WidgetPage>
    </AllWidgetProviders>
  )
}

export default StreaksCalendarPage
