import { query as q } from 'faunadb'
import faunaClient from '@/lambda/faunaClient'

const getHabits = async (req, res) => {
  const { widgetToken, role } = req.query

  const widgetIndexKey =
    role === 'blocs-user' ? 'widget_by_token' : 'widget_by_shareable_token'

  const widget = await faunaClient
    .query(q.Get(q.Match(q.Index(widgetIndexKey), widgetToken)))
    .then((data) => data)
    .catch((error) => {
      console.error(error)
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

  res.status(200).json({
    status: 200,
    data: widget.data.habits
  })
}

export default getHabits
