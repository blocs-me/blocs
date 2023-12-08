import faunaClient from '@/lambda/faunaClient'
import { BlocsUserServer } from 'src/global-types/blocs-user'
import { queryGuard } from './queryGuard'
import { query as q } from 'faunadb'

const getBlocsUserByStripeCustomerId = async (stripeCustomerId: string) => {
  const blocsUser: BlocsUserServer = await queryGuard(() =>
    faunaClient.query(
      q.Get(q.Match(q.Index('all_users_by_stripe_id'), stripeCustomerId))
    )
  )
  return blocsUser
}

export default getBlocsUserByStripeCustomerId
