import faunaClient from '@/lambda/faunaClient'
import { BlocsUserServer } from 'src/global-types/blocs-user'
import { queryGuard } from './queryGuard'
import { query as q } from 'faunadb'

const getBlocsUserById = async (userId: string) => {
  const blocsUser = await queryGuard<BlocsUserServer>(() =>
    faunaClient.query(q.Get(q.Ref(q.Collection('users'), userId)))
  )
  return blocsUser
}

export default getBlocsUserById
