import faunaClient from '@/lambda/faunaClient'
import { getBlocsUser } from '@/lambda/helpers/faunadb/getBlocsUserRef'
import { Lambda, query as q } from 'faunadb'

const validateWidgetAuth = async (req, res, rest) => {
  const token = rest.bearerToken
  if (!token) res.status(401).json({ error: 'Unauthorized acccess' })

  try {
    const legacyTempToken = await faunaClient
      .query(q.Get(q.Match(q.Index('temp_access_tokens_by_token'), token)))
      .then((data) => data)
      .catch(() => null)

    const widget = await faunaClient
      .query(
        q.Paginate(q.Match(q.Index('widget_access_tokens_by_token'), token))
      )
      .then((res) => res)
      .catch(() => null)

    console.log({ widget })

    const userId = widget?.data?.[0] || legacyTempToken?.data?.userId

    rest.userId = userId

    await getBlocsUser(req, res, rest)

    const user = await faunaClient.query(q.Get(rest.userRef))

    res.status(200).json({
      data: {
        valid: true,
        user: {
          avatar_url: user?.data.avatar_url
        }
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Something went wrong when logging in',
      data: {
        valid: false
      }
    })
  }
}

export default validateWidgetAuth
