import faunaClient from '@/lambda/faunaClient'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

const getWaterTrackerSettings = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { widgetToken } = req.query

  try {
    const widget = await faunaClient
      .query(q.Get(q.Match(q.Index('widget_by_token'), widgetToken)))
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

    res.status(200).json({
      status: 200,
      data: {
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
