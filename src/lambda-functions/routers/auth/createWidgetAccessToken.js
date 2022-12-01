import faunaClient from '@/lambda/faunaClient'
import getNotionUser from '@/lambda/helpers/getNotionUser'
import { validateWidgetTokenReq } from '@/lambda/lib/jsonValidator'
import { query as q } from 'faunadb'

const createWidgetAccessToken = async (req, res) => {
  try {
    const isValid = validateWidgetTokenReq(req.body)

    if (!isValid) {
      const error = validateWidgetTokenReq.errors
      console.error(error)
      return res.status(400).json({ error })
    }

    // req
    const accessToken = req.body.access_token
    const widgetType = req.body.widgetType

    // user data
    const notionUser = await getNotionUser(accessToken)
    const userEmail = notionUser?.person?.email
    const blocsUser = await faunaClient.query(
      q.Get(q.Match(q.Index('all_users_by_email'), userEmail))
    )

    if (!blocsUser?.ref) throw new Error('blocs user not defined')

    const blocsUserId = blocsUser?.ref?.id

    const widgetToken = await faunaClient
      .query(
        q.Paginate(
          q.Match(q.Index('widget_access_tokens_by_user_id'), blocsUserId)
        )
      )
      .then((res) => {
        return res?.data?.find(([type]) => type === widgetType)
      })
      .catch(() => null)

    const shouldCreateToken = !widgetToken

    if (shouldCreateToken) {
      const newWidgetTokenData = await faunaClient.query(
        q.Create(q.Collection('widget_access_tokens'), {
          data: {
            userId: blocsUserId,
            token: crypto.randomUUID(),
            shareableToken: crypto.randomUUID(),
            widgetType: widgetType
          }
        })
      )

      const token = newWidgetTokenData.data.token

      return res.status(200).json({
        data: {
          token
        }
      })
    }

    res.status(200).json({
      data: {
        token: widgetToken[2]
      }
    })
  } catch (error) {
    console.error(error || 'Internal Server Error')
    res.status(500).json({ error: error?.message || 'Interval Server Error' })
  }
}

export default createWidgetAccessToken
