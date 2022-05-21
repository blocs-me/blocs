import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'

export const getBlocsUser = async (_, res, rest) => {
  if (rest.terminated) return null

  const { userId } = rest

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' })
    rest.terminate()
  }

  const userRef = await faunaClient.query(q.Ref(q.Collection('users'), userId))

  rest.userRef = userRef
}
