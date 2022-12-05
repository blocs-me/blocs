import useUrlHash from '@/hooks/useUrlHash/useUrlHash'
import { WATER_TRACKER_SETTINGS_PATH } from '@/utils/endpoints'
import { IWaterTrackerWidget } from '../../../../global-types/water-tracker'
import useFetch from '@/hooks/useFetch'
import { useState } from 'react'
import useNotifications from '@/design-system/Notifications/useNotifications'
import useWaterTrackerSettings from './useWaterTrackerSettings'
import { ounceToLiter } from '@/utils/math'
import { literToOunce } from '../../../../utils/math/literToOunce'
import { useRouter } from 'next/router'

const usePatchWaterTrackerSettings = () => {
  const hash = useRouter().query
  const path = `${WATER_TRACKER_SETTINGS_PATH}?widgetType=WATER_TRACKER&widgetToken=${hash['token']}`
  const [body, setBody] = useState({})
  const [loadingUnits, setLoadingUnits] = useState(false)
  const [loadingGoal, setLoadingGoal] = useState(false)
  const notif = useNotifications()
  const { data: settings } = useWaterTrackerSettings()
  const goal = settings?.data?.goal
  const units = settings?.data?.units

  const patchSettings = async (settings: any) => {
    const res = await fetch(path, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ settings })
    })
    return await res.json()
  }

  const patchGoal = async (goal: string) => {
    setLoadingGoal(true)

    try {
      await patchSettings({ goal })
      notif.createInfo('Goal updated 🎉')
      setLoadingGoal(false)
    } catch (error) {
      setLoadingGoal(false)
      console.error(error)
      notif.createError(
        "Uh oh ! We couldn't update the goal ☹️ contact help@blocs.dev"
      )
    }
  }

  const patchUnits = async (newUnits: string) => {
    setLoadingUnits(true)

    const newGoal =
      newUnits === 'ounce' ? literToOunce(goal) : ounceToLiter(goal)

    try {
      await patchSettings({ units: newUnits, goal: newGoal })
      notif.createInfo('Unit of choice updated 🎉')
      setLoadingUnits(false)
    } catch (error) {
      setLoadingUnits(false)
      console.error(error)
      notif.createError(
        "Uh oh ! We couldn't update the units selection ☹️ contact help@blocs.dev"
      )
    }
  }

  return {
    fetcher: patchSettings,
    patchGoal,
    patchUnits,
    loadingUnits,
    loadingGoal
  }
}

export default usePatchWaterTrackerSettings
