import { useOpenPanel } from '@openpanel/nextjs'
import Text from '../Text'
import useBlocsUser from '@/hooks/useBlocsUser'

const PoweredBy = ({ type = '' }) => {
  const op = useOpenPanel()
  const { user } = useBlocsUser()

  const isPaidUser = !!user?.data?.purchasedProducts?.length
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
