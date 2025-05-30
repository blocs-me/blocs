import md5 from 'md5'
import mailchimp from '../mailchimpMarketingClient'
import mailchimpSubscriptionStates from '@/constants/mailchimpSubscriptionStates'
import { BlocsUserServer } from 'src/global-types/blocs-user'

const listId = process.env.MAILCHIMP_LIST_ID

const checkIfUserIsSubscribed = async (user: BlocsUserServer) => {
  if (!user)
    throw new Error(
      'Mailchimp Error : could not retrieve user status; user not defined'
    )

  const { email } = user
  const subscriberHash = md5(email.toLowerCase())

  try {
    const response = await mailchimp.lists.getListMember(listId, subscriberHash)
    return response.status === 'subscribed'
  } catch (error) {
    if (error.status === 404) {
      return false
    }
    throw error
  }
}

export default checkIfUserIsSubscribed
