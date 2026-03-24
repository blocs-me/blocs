import { useMemo } from 'react'
import ProgressBarDisplay from './ProgressBarDisplay'
import { useDateRangeProgress } from './useProgressBar'
import { ProgressWidgetConfig, getDefaultConfig } from './progressBarConfig'

type Props = {
  style?: 'bar' | 'ring' | 'gauge'
  theme?: 'light' | 'dark'
}

const DummyProgressBarPreview = ({ style = 'bar', theme = 'light' }: Props) => {
  const config: ProgressWidgetConfig = useMemo(() => {
    const start = new Date()
    start.setDate(start.getDate() - 20)
    const end = new Date()
    end.setDate(end.getDate() + 10)
    return {
      ...getDefaultConfig(),
      mode: 'dateRange' as const,
      style,
      theme,
      title: 'Q2 Sprint',
      startDate: start.toISOString().slice(0, 16),
      endDate: end.toISOString().slice(0, 16),
    }
  }, [style, theme])

  const { percentage } = useDateRangeProgress(config)

  return (
    <ProgressBarDisplay
      style={style}
      percentage={percentage}
      title="Q2 Sprint"
      showTitle
      theme={theme}
    />
  )
}

export default DummyProgressBarPreview
