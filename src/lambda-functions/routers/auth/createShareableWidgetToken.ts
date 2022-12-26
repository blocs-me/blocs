import faunaClient from '@/lambda/faunaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import Rest from '@/lambda/lib/rest'
import crypto from 'crypto'
import { queryGuard } from '@/lambda/helpers/faunadb/queryGuard'

const createShareableWidgetToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  rest: Rest
) => {
  const { widgetToken, widgetType } = req.query

  const widget = await faunaClient
    .query(q.Get(q.Match(q.Index('widget_by_token'), widgetToken)))
    .then((data) => data)
    .catch((err) => {
      console.error(err)
      return null
    })

  if (!widget) {
    res.status(404).json({
      error: {
        message: 'Widget was not found'
      }
    })
    return null
  }

  const shouldCreateToken =
    !widget?.data?.shareableToken &&
    (widget?.data?.type === widgetType ||
      widget?.data?.widgetType === widgetType)

  if (!shouldCreateToken) {
    return res
      .status(200)
      .json({ status: 200, shareableToken: widget.data.shareableToken })
  }

  try {
    const token = crypto.randomUUID()

    await queryGuard(() =>
      faunaClient.query(
        q.Update(widget.ref, {
          data: {
            shareableToken: token
          }
        })
      )
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
