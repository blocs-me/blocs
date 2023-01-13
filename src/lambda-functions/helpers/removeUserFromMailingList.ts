import mailchimpSubscriptionStates from '@/constants/mailchimpSubscriptionStates'
import md5 from 'md5'
import { BlocsUserServer } from '../../global-types/blocs-user'
import mailchimp from '../mailchimpMarketingClient'

const removeUserFromMailingList = async (user: BlocsUserServer) => {
  const nameArr = user?.data?.name?.split(' ')
  const [FNAME = '', LNAME = ''] = [nameArr?.[0], nameArr?.slice(-1)?.[0]]
  const email_address = user?.data?.email

  try {
    return await mailchimp.lists.setListMember(
      process.env.MAILCHIMP_LIST_ID,
      md5(user?.data?.email),
      {
        email_address,
        status: mailchimpSubscriptionStates.UNSUBSCRIBED,
        merge_fields: {
          FNAME,
          LNAME
        }
      }
    )
  } catch (err) {
    throw err
  }
}

export default removeUserFromMailingList
