import { useOpenPanel } from '@openpanel/nextjs'
import Text from '../Text'
import usePomodoroAuth from '@/widgets/PomodoroAnalyticsBarChart/usePomodoroAuth'

const PoweredBy = ({ type = '' }) => {
  const op = useOpenPanel()
  const { auth } = usePomodoroAuth()

  const isPaidUser = auth && !auth?.isPremium
  console.log('isPaidUser', isPaidUser)
  if (isPaidUser) return null

  return (
    <a
      href="https://blocs.me"
      onClick={() => op.track('powered-by-click', { widget_type: type })}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Text
        fontSize="10px"
        textAlign="center"
        color="foreground"
        mt="8px"
        mb="-6px"
      >
        🎉 Powered by Blocs
      </Text>
    </a>
  )
}

export default PoweredBy
