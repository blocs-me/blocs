import faunaClient from '@/lambda/faunaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

const getWaterTrackerSettings = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken, role } = req.query

  const widgetIndex =
    role === 'friend' ? 'widget_by_shareable_token' : 'widget_by_token'

  try {
    const widget = await faunaClient
      .query(q.Get(q.Match(q.Index(widgetIndex), widgetToken)))
      .then((data) => data)
      .catch((err) => {
        console.error(err)
        return null
      })

    if (!widget)
      return res.status(404).json({
        status: 404,
        error: {
          message: 'Widget not found'
        }
      })

    const isAdmin = widgetToken === widget?.data?.token

    const userAvatar =
      isAdmin &&
      (await (async () => {
        if (isAdmin) {
          const user = (await faunaClient.query(
            q.Get(q.Ref(q.Collection('users'), widget?.data?.userId))
          )) as {
            data: {
              avatar_url: string
            }
          }

          return {
            avatarUrl: user?.data?.avatar_url
          }
        }

        return {}
      })())

    res.status(200).json({
      status: 200,
      data: {
        ...(userAvatar || {}),
        ...(widget?.data.settings || {})
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: {
        message: 'Something went wrong'
      }
    })
  }
}

export default getWaterTrackerSettings
