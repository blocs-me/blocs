import faunaClient from '@/lambda/faunaClient'
import { validateWidgetTokenReq } from '@/lambda/lib/restValidator/jsonValidator'
import { query as q } from 'faunadb'
import crypto from 'crypto'
import getBlocsUser from '@/lambda/middlewares/getBlocsUser'

const createWidgetAccessToken = async (req, res) => {
  try {
    const isValid = validateWidgetTokenReq(req.body)

    if (!isValid) {
      const error = validateWidgetTokenReq.errors
      console.error(error)
      return res.status(400).json({ error })
    }

    // req
    const widgetType = req.body.widgetType

    const blocsUser = await getBlocsUser(req, res)

    // if (['WATER_TRACKER', 'HABIT_TRACKER'].includes(widgetType)) // TODO: premium ownership validation

    if (!blocsUser?.ref) throw new Error('blocs user not defined')

    const blocsUserId = blocsUser?.ref?.id

    const widgetToken = await faunaClient
      .query(
        q.Paginate(
          q.Match(q.Index('widget_access_tokens_by_user'), blocsUserId)
        )
      )
      .then((res) => {
        return res?.data?.find(([type]) => type === widgetType)
      })
      .catch(() => null)

    const shouldCreateToken = !widgetToken
    const shouldCreatePublicToken = widgetToken && !widgetToken?.[3]
    let publicToken = widgetToken?.[3]

    if (shouldCreatePublicToken) {
      publicToken = crypto.randomUUID()

      const widget = await faunaClient.query(
        q.Get(q.Match(q.Index('widget_by_token'), widgetToken[2]))
      )

      await faunaClient.query(
        q.Update(widget.ref, {
          data: {
            shareableToken: publicToken
          }
        })
      )
    }

    if (shouldCreateToken) {
      const newWidgetTokenData = await faunaClient.query(
        q.Create(q.Collection('widget_access_tokens'), {
          data: {
            userId: blocsUserId,
            token: crypto.randomUUID(),
            shareableToken: crypto.randomUUID(),
            ...(widgetType === 'WATER_TRACKER'
              ? {
                  settings: {
                    goal: 2
                  }
                }
              : {}),
            widgetType: widgetType
          }
        })
      )

      const token = newWidgetTokenData.data.token
      const shareableToken = newWidgetTokenData.data.shareableToken

      return res.status(200).json({
        data: {
          token,
          shareableToken
        }
      })
    }

    res.status(200).json({
      data: {
        token: widgetToken?.[2],
        shareableToken: publicToken
      }
    })
  } catch (error) {
    console.error(error || 'Internal Server Error')
    res.status(500).json({ error: error?.message || 'Interval Server Error' })
  }
}

export default createWidgetAccessToken
