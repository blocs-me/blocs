import { NextApiRequest, NextApiResponse } from 'next'
import Ajv from 'ajv'
import {
  handle200Response,
  handle404Response,
  handle400Response
} from '@/lambda/helpers/handleResponses'
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

  const field = role === 'blocs-user' ? 'token' : 'shareable_token'

  const { data: widget } = await supabase
    .from('widget_access_tokens')
    .select('user_id')
    .eq(field, widgetToken)
    .maybeSingle()

  if (!widget) return handle404Response(res)

  const hasPermission = await userOwnsWidget(widget.user_id, 'habitTracker')

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', widget.user_id)
    .single()

  handle200Response(res, {
    data: {
      isPremium: hasPermission,
      avatar_url: role === 'blocs-user' ? user?.avatar_url : undefined
    }
  })
}

export default handler
