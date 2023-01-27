import { queryGuard } from '../helpers/faunadb/queryGuard'
import faunaClient from '../faunaClient'
import { query as q } from 'faunadb'
import { BlocsUserServer } from '../../global-types/blocs-user'

const upsertBlocsUser = async (email: string, data: any) => {
  let blocsUser: BlocsUserServer = await queryGuard(() =>
    faunaClient.query(q.Get(q.Match(q.Index('all_users_by_email'), email)))
  )

  if (blocsUser) {
    blocsUser = await faunaClient.query(
      q.Update(blocsUser?.ref, {
        data
      })
    )
  } else {
    blocsUser = await faunaClient.query(
      q.Create(q.Collection('users'), {
        data
      })
    )
  }

  return blocsUser
}

export default upsertBlocsUser
