import faunaClient from '@/lambda/faunaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { queryGuard } from '../../helpers/faunadb/queryGuard'
import {
  IPomdoroWidget,
  PomodoroAnalayticsBody
} from '../../../global-types/pomodoro'
import {
  handle400Response,
  handle404Response,
  handle500Response
} from '../../helpers/handleResponses'
import { validatePomodoroAnalytics } from '@/lambda/lib/restValidator/jsonValidator'
import { handle200Response } from '../../helpers/handleResponses'

const savePomodoroAnalytics = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { token } = req.query
  const pomoSession = req.body as PomodoroAnalayticsBody

  const isValid = validatePomodoroAnalytics(pomoSession)

  if (!isValid) return handle400Response(res)

  const widget = await queryGuard<IPomdoroWidget>(() =>
    faunaClient.query(q.Get(q.Match(q.Index('widget_by_token'), token)))
  )

  if (!widget) return handle404Response(res)

  try {
    await faunaClient.query(
      q.Create(q.Collection('pomodoro_analytics'), {
        data: {
          ...pomoSession,
          createdAt: q.Date(pomoSession.isoDateString),
          widgetRef: widget.ref
        }
      })
    )

    return handle200Response(res)
  } catch (err) {
    console.error(err)
    handle500Response(res)
  }
}

export default savePomodoroAnalytics
