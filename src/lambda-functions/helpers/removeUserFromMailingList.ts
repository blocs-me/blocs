import mailchimpSubscriptionStates from '@/constants/mailchimpSubscriptionStates'
import md5 from 'md5'
import { BlocsUserServer } from '../../global-types/blocs-user'
import mailchimp from '../mailchimpMarketingClient'

const removeUserFromMailingList = async (user: BlocsUserServer) => {
  const nameArr = user?.name?.split(' ')
  const [FNAME = '', LNAME = ''] = [nameArr?.[0], nameArr?.slice(-1)?.[0]]
  const email_address = user?.email

  try {
    return await mailchimp.lists.setListMember(
      process.env.MAILCHIMP_LIST_ID,
      md5(user?.email),
      {
        email_address,
        status: mailchimpSubscriptionStates.UNSUBSCRIBED,
        merge_fields: {
          FNAME,
          LNAME
        },
        tags: ['deleted_user']
      }
    )
  } catch (err) {
    throw err
  }
}

export default removeUserFromMailingList
