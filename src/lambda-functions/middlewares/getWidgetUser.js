import { query as q } from 'faunadb'
import faunaClient from '../faunaClient'

const getWidgetUser = async (req, res, rest) => {
  const token = rest.bearerToken

  try {
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized acccess' })
    }

    const legacyTokenData = await faunaClient
      .query(q.Get(q.Match(q.Index('temp_access_tokens_by_token'), [token])))
      .then((data) => data)
      .catch(() => null)

    const widget = await faunaClient
      .query(q.Get(q.Match(q.Index('widget_access_tokens_by_token'), token)))
      .then((data) => data)
      .catch((err) => null)

    const userId = widget?.data?.userId || legacyTokenData?.data?.userId
    const widgetToken = widget?.data?.token || legacyTokenData?.data?.token

    if (!userId || !widgetToken) {
      throw new Error('Unauthorized Access')
    }

    rest.userId = userId
    rest.widgetToken = widgetToken
  } catch (error) {
    rest.terminate()
    res.status(401).json({ error: 'Unauthorized' })
  }
}

export default getWidgetUser
