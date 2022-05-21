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
      q.Get(q.Match(q.Index("all_users_by_email"), userEmail))
    )

    if (!blocsUser?.ref) throw new Error("blocs user not defined")

    const blocsUserId = blocsUser?.ref?.id

    // [ ] find users token by userId, and widgetType
    // [ ] or create token with "widgetType: pomodoro" metadata

    const userTokens = await faunaClient.query(
      q.Paginate(
        q.Match(q.Index('widget_access_tokens_by_user_id'), [
          blocsUserId,
          widgetType
        ])
      )
    )

    const requestedWidgetToken = userTokens.data[0]?.find(
      ([currentWidgetType]) => currentWidgetType === widgetType
    ).token

    if (!requestedWidgetToken) {
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
        token: requestedWidgetToken
      }
    })
  } catch (error) {
    console.error(error || 'Internal Server Error')
    res.status(500).json({ error: error?.message || 'Interval Server Error' })
  }
}

export default createWidgetAccessToken
