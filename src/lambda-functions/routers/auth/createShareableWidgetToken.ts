import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { supabaseQueryGuard } from '@/lambda/helpers/supabase/queryGuard'
import supabase from '@/lambda/helpers/supabase'
import { mapWidgetAccessTokenToType } from '@/lambda/helpers/supabase/mapDbToType'

const createShareableWidgetToken = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken, widgetType } = req.query

  const { data: widgetDb, error: widgetError } = await supabase
    .from('widget_access_tokens')
    .select('*')
    .eq('token', widgetToken)
    .single()

  if (widgetError) {
    console.error(widgetError)
  }

  const widgetMapped = mapWidgetAccessTokenToType(widgetDb)
  if (!widgetMapped) {
    res.status(404).json({
      error: {
        message: 'Widget was not found'
      }
    })
    return null
  }

  const shouldCreateToken =
    !widgetMapped?.shareableToken && widgetMapped?.widgetType === widgetType

  if (!shouldCreateToken) {
    return res
      .status(200)
      .json({ status: 200, shareableToken: widgetMapped.shareableToken })
  }

  try {
    const token = crypto.randomUUID()

    await supabaseQueryGuard(() =>
      supabase
        .from('widget_access_tokens')
        .update({ shareable_token: token })
        .eq('token', widgetToken)
        .select()
    )

    res.status(200).json({
      shareableToken: token
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 500, error: {} })
  }
}

export default createShareableWidgetToken
