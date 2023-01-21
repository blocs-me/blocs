import { NextApiRequest, NextApiResponse } from 'next'
import Ajv from 'ajv'
import {
  handle400Response,
  handle404Response
} from '../../../lambda-functions/helpers/handleResponses'
import { queryGuard } from '@/lambda/helpers/faunadb/queryGuard'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { AsFaunaReturn } from '@/gtypes/fauna'
import { IWaterTrackerWidget } from '@/gtypes/water-tracker'
import userOwnsWidget from '../../../lambda-functions/helpers/faunadb/userOwnsWidget'
import { handle200Response } from '../../../lambda-functions/helpers/handleResponses'
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

  const widgetIndex =
    role === 'blocs-user' ? 'widget_by_token' : 'widget_by_shareable_token'

  const widget = await queryGuard<AsFaunaReturn<IWaterTrackerWidget>>(() =>
    faunaClient.query(q.Get(q.Match(q.Index(widgetIndex), widgetToken)))
  )

  if (!widget) return handle404Response(res)

  const hasPermission = await userOwnsWidget(widget.data.userId, 'pomodoro')

  // TODO: if user doesnt own widget and is 'friend' -> on front end when !isPremium then the overlay is shown
  // TODO: if user doesnt own widget and is 'admin'  -> on front end when !isPremium then the caret buttons are disabled and on click they show the overlay / show a notif

  handle200Response(res, {
    data: {
      isPremium: false
    }
  })
}

export default handler
