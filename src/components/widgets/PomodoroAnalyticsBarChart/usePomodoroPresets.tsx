import useUrlHash from '@/hooks/useUrlHash'
import useSWR from 'swr'
import { POMODORO_PRESETS_PATH } from '@/utils/endpoints'

type Preset = {
  label: string
  id: string
  labelColor: string
}

type Data = {
  data: Preset[]
}

const usePomodoroPresets = () => {
  const { token, role } = useUrlHash<{ token: string; role: string }>()

  const response = useSWR<Data>(token ? 'pomo-presets' : null, () =>
    fetch(`${POMODORO_PRESETS_PATH}?filter=none&role=${role}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((res) => res.json())
  )

  return response
}

export default usePomodoroPresets
