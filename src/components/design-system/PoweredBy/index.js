import MadeWithBlocs from '@/design-system/MadeWithBlocs'
import usePomodoroAuth from '@/widgets/PomodoroAnalyticsBarChart/usePomodoroAuth'

const PoweredBy = () => {
  const { auth } = usePomodoroAuth()

  const isPaidUser = auth?.isPremium
  if (isPaidUser) return null

  return <MadeWithBlocs />
}

export default PoweredBy
