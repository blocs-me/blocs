import widgetTypes from '@/constants/widgetTypes'

import { NextApiRequest, NextApiResponse } from 'next'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { validateWaterTrackerSettings } from '@/lambda/lib/jsonValidator'
import { IWaterTrackerWidget } from '../../../global-types/water-tracker'

const updateWaterTrackerSetting = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken, widgetType } = req.query
  const body = req.body
  const settings = body.settings as IWaterTrackerWidget['settings']

  const isValid = validateWaterTrackerSettings(settings)

  if (!isValid) {
    console.log('not valid')
    res.status(400).json({
      status: 400,
      error: {
        message: 'The settings format is incorrect'
      }
    })
  }

  try {
    const widget = (await faunaClient
      .query(q.Get(q.Match(q.Index('widget_by_token'), widgetToken)))
      .then((data) => data)
      .catch((err) => {
        console.error(err)
        return null
      })) as { ref: any; data: IWaterTrackerWidget }

    if (!widget || widgetType !== widgetTypes.WATER_TRACKER)
      res.status(404).json({
        status: 404,
        error: {
          message: 'Widget not found'
        }
      })

    const newSettings = JSON.parse(
      JSON.stringify({
        ...widget.data?.settings,
        ...settings
      })
    )

    const newWidget = (await faunaClient.query(
      q.Update(widget.ref, {
        data: {
          settings: {
            ...newSettings
          }
        }
      })
    )) as { ref: any; data: IWaterTrackerWidget }

    res.status(200).json({
      status: 200,
      data: {
        settings: {
          ...(newWidget?.data?.settings || {})
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
