import { NextApiRequest, NextApiResponse } from 'next'
import Ajv from 'ajv'
import {
  handle400Response,
  handle404Response
} from '../../../lambda-functions/helpers/handleResponses'
import { IWaterTrackerWidget } from '@/gtypes/water-tracker'
import { handle200Response } from '../../../lambda-functions/helpers/handleResponses'
import { supabaseQueryGuard } from '@/lambda/helpers/supabase/queryGuard'
import supabase from '@/lambda/helpers/supabase'
import userOwnsWidget from '@/lambda/helpers/supabase/userOwnsWidget'
// shows premium status of widget

const ajv = new Ajv()
const validate = (data) =>
  ajv.validate(
    {
      type: 'object',
      properties: {
        widgetToken: {
          type: 'string'
        },
        role: {
          enum: ['blocs-user', 'friend']
        }
      },
      required: ['widgetToken', 'role']
    },
    data
  )

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const isValid = validate(req.query)

  if (!isValid) return handle400Response(res)

  const { widgetToken, role } = req.query

  const widgetField = role === 'blocs-user' ? 'token' : 'shareable_token'

  const widget = await supabaseQueryGuard<IWaterTrackerWidget>(() =>
    supabase
      .from('widget_access_tokens')
      .select('*')
      .eq(widgetField, widgetToken)
      .maybeSingle()
  )

  if (!widget) return handle404Response(res)

  const hasPermission = await userOwnsWidget(widget.user_id, 'pomodoro')

  handle200Response(res, {
    data: {
      isPremium: hasPermission
    }
  })
}

export default handler
