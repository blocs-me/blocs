import widgetTypes from '@/constants/widgetTypes'

import { NextApiRequest, NextApiResponse } from 'next'
import { validateWaterTrackerSettings } from '@/lambda/lib/restValidator/jsonValidator'
import { IWaterTrackerWidget } from '../../../global-types/water-tracker'
import supabase from '@/lambda/helpers/supabase'

const updateWaterTrackerSetting = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken, widgetType } = req.query
  const body = req.body
  const settings = body.settings as IWaterTrackerWidget['settings']

  const isValid = validateWaterTrackerSettings(settings)

  if (!isValid) {
    console.error('Water tracker request body not valid')
    res.status(400).json({
      status: 400,
      error: {
        message: 'The settings format is incorrect'
      }
    })
  }

  try {
    const { data: widget } = await supabase
      .from('widget_access_tokens')
      .select('*')
      .eq('token', widgetToken)
      .maybeSingle()

    if (!widget || widgetType !== widgetTypes.WATER_TRACKER)
      res.status(404).json({
        status: 404,
        error: {
          message: 'Widget not found'
        }
      })

    const newSettings = JSON.parse(
      JSON.stringify({
        ...widget.settings,
        ...settings
      })
    )

    const { data: newWidget } = await supabase
      .from('widget_access_tokens')
      .update({
        settings: newSettings
      })
      .eq('id', widget.id)
      .select()
      .single()

    res.status(200).json({
      status: 200,
      data: {
        settings: {
          ...(newWidget?.settings || {})
        }
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: {
        message: 'Something went wrong'
      }
    })
  }
}

export default updateWaterTrackerSetting
