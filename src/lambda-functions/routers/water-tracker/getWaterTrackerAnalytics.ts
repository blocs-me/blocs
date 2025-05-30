import { NextApiRequest, NextApiResponse } from 'next'
import { validateWaterTrackerQueryParams } from '@/lambda/lib/restValidator/jsonValidator'
import canPerformAction from '@/lambda/helpers/supabase/canPerformAction'
import supabase from '@/lambda/helpers/supabase'

type AnalyticsData = {
  data: {
    waterConsumed: number
    isoDateString: number
    lastUpdatedAt: number
  }
}

const getWaterTrackerAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const isValidParams = validateWaterTrackerQueryParams(req.query)

  if (!isValidParams || !Number.isInteger(Number(req.query.date))) {
    return res.status(400).json({
      error: {
        message: "Looks like there's something wrong with the request"
      }
    })
  }

  const { role, widgetToken, isoDateString, date } = req.query

  const field = role === 'friend' ? 'shareable_token' : 'token'

  const { data: widget } = await supabase
    .from('widget_access_tokens')
    .select('*')
    .eq(field, widgetToken)
    .maybeSingle()

  if (!widget) {
    return res.status(404).json({
      status: 404,
      error: {
        message: 'The requested widget was not found.'
      }
    })
  }

  const hasPermission = await canPerformAction(
    widget.user_id,
    'waterTracker',
    res
  )
  if (!hasPermission) return null

  const { data: currentAnalyticsData } = await supabase
    .from('water_tracker_analytics')
    .select('*')
    .eq('iso_date_string', isoDateString)
    .eq('widget_id', widget.id)
    .maybeSingle()

  try {
    if (!currentAnalyticsData) {
      const { data: madeData, error: madeDataError } = await supabase
        .from('water_tracker_analytics')
        .insert({
          water_consumed: 0,
          iso_date_string: isoDateString,
          last_updated_at: new Date(Number(date)),
          created_at: new Date(isoDateString as string),
          widget_id: widget.id
        })
        .select()
        .single()

      return res.status(200).json({
        data: {
          waterConsumed: madeData.water_consumed,
          isoDateString: madeData.iso_date_string,
          lastUpdatedAt: madeData.last_updated_at
        }
      })
    }

    res.status(200).json({
      status: 200,
      data: {
        waterConsumed: currentAnalyticsData.water_consumed,
        isoDateString: currentAnalyticsData.iso_date_string,
        lastUpdatedAt: currentAnalyticsData.last_updated_at
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: {
        message: 'Something went wrong on the server.'
      }
    })
  }
}

export default getWaterTrackerAnalytics
