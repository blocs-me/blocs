import Text from '../Text'
import usePomodoroAuth from '@/widgets/PomodoroAnalyticsBarChart/usePomodoroAuth'

const PoweredBy = ({ type = '' }) => {
  const { auth } = usePomodoroAuth()

  const isPaidUser = auth?.isPremium
  if (isPaidUser) return null

  return (
    <a
      href="https://blocs.me"
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
