import { validateWaterTrackerAnalytics } from '@/lambda/lib/restValidator/jsonValidator'
import { NextApiRequest, NextApiResponse } from 'next'
import canPerformAction from '@/lambda/helpers/supabase/canPerformAction'
import supabase from '@/lambda/helpers/supabase'

type Request = {
  date: number
  isoDateString: string
  waterConsumed: number
}

type AnalyticsSchema = {
  lastUpdatedAt: number
  isoDateString: string
  widgetId: string
  waterConsumed: number
}

const saveWaterTrackerAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken } = req.query
  const isValid = validateWaterTrackerAnalytics(req.body)

  if (!isValid) {
    return res.status(400).json({
      error: {
        message: 'Request format is incorrect'
      }
    })
  }

  const data = req.body as Request

  const { data: widget } = await supabase
    .from('widget_access_tokens')
    .select('*')
    .eq('token', widgetToken)
    .maybeSingle()

  if (!widget) {
    res.status(404).json({
      error: {
        message: 'Widget was not found'
      }
    })
    return null
  }

  const hasPermission = await canPerformAction(
    widget.user_id,
    'waterTracker',
    res
  )
  if (!hasPermission) return null

  const { data: existingData } = await supabase
    .from('water_tracker_analytics')
    .select('*')
    .eq('iso_date_string', data.isoDateString)
    .eq('widget_id', widget.id)
    .maybeSingle()

  if (existingData) {
    const { data: updatedData, error: updatedDataError } = await supabase
      .from('water_tracker_analytics')
      .update({
        last_updated_at: new Date(data.date),
        water_consumed: data.waterConsumed
      })
      .eq('id', existingData.id)
      .select()
      .single()

    res.status(200).json({
      status: 200,
      data: {
        waterConsumed: updatedData?.water_consumed,
        lastUpdatedAt: updatedData?.last_updated_at
      }
    })

    return null
  }

  try {
    const { data: createdData } = await supabase
      .from('water_tracker_analytics')
      .insert({
        water_consumed: data.waterConsumed,
        last_updated_at: new Date(data.date),
        created_at: new Date(data.isoDateString),
        iso_date_string: data.isoDateString,
        widget_id: widget.id
      })
      .select()
      .single()

    res.status(200).json({
      status: 200,
      waterConsumed: createdData.water_consumed,
      lastUpdatedAt: createdData.last_updated_at
    })
  } catch (err) {
    console.error(err)

    res.status(500).json({
      status: 500,
      error: {
        message: 'Internal server error'
      }
    })
  }
}

export default saveWaterTrackerAnalytics
