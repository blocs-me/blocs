import { NextApiRequest, NextApiResponse } from 'next'
import Ajv from 'ajv'
import { queryGuard } from '@/lambda/helpers/faunadb/queryGuard'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import {
  handle200Response,
  handle404Response,
  handle400Response
} from '@/lambda/helpers/handleResponses'
import userOwnsWidget from '@/lambda/helpers/faunadb/userOwnsWidget'
import { IHabitTrackerWidget } from '../../../../global-types/habit-tracker'
import { BlocsUserServer } from '@/gtypes/blocs-user'
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

  const widget = await queryGuard<IHabitTrackerWidget>(() =>
    faunaClient.query(q.Get(q.Match(q.Index(widgetIndex), widgetToken)))
  )

  if (!widget) return handle404Response(res)

  const hasPermission = await userOwnsWidget(widget.data.userId, 'habitTracker')

  const user: BlocsUserServer = await faunaClient.query(
    q.Get(q.Ref(q.Collection('users'), widget.data.userId))
  )

  handle200Response(res, {
    data: {
      isPremium: hasPermission,
      avatar_url: user?.data.avatar_url
    }
  })
}

export default handler
