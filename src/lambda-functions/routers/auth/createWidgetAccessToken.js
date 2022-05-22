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

    const legacyTempTokens = await faunaClient
      .query(
        q.Map(
          q.Paginate(
            q.Match(q.Index('temp_access_tokens_by_user_id'), [blocsUserId])
          ),
          q.Lambda('tokenRef', q.Select(['data'], q.Get(q.Var('tokenRef'))))
        )
      )
      .then((res) => res)
      .catch((err) => [])

    const widgetToken = await faunaClient
      .query(
        q.Paginate(
          q.Match(q.Index('widget_access_tokens_by_user_id'), blocsUserId)
        )
      )
      .then((res) => res?.data?.find(([type]) => type === widgetType))
      .catch(() => null)

    const shouldCreateToken = !legacyTempTokens.data?.length && !widgetToken

    if (shouldCreateToken) {
      const newWidgetTokenData = await faunaClient.query(
        q.Call(q.Function('create_widget_access_token'), [
          blocsUserId,
          widgetType
        ])
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
        token: legacyTempTokens?.data?.[0]?.token || widgetToken[2]
      }
    })
  } catch (error) {
    console.error(error || 'Internal Server Error')
    res.status(500).json({ error: error?.message || 'Interval Server Error' })
  }
}

export default createWidgetAccessToken
