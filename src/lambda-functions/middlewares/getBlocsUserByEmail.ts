import faunaClient from '../faunaClient'
import { queryGuard } from '../helpers/faunadb/queryGuard'
import { query as q } from 'faunadb'
import { BlocsUserServer } from 'src/global-types/blocs-user'

const getBlocsUserByEmail = async (email: string) => {
  const blocsUser: BlocsUserServer = await queryGuard(() =>
    faunaClient.query(q.Get(q.Match(q.Index('all_users_by_email'), email)))
  )

  return blocsUser
}

export default getBlocsUserByEmail
