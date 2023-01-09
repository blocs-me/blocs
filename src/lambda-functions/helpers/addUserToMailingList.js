import mailchimp from '../mailchimpMarketingClient'
import checkIfUserIsSubscribed from './checkIfUserIsSubscribed'
import mailchimpSubscriptionStates from '@/constants/mailchimpSubscriptionStates'

const addUserToMailingList = async (user = {}) => {
  const { email } = user
  if (!email)
    throw new Error('Mailchimp Error : could not add user; user not defined')

  try {
    const isUserSubscribed = await checkIfUserIsSubscribed(user)
    if (isUserSubscribed) {
      return null
    }
    const nameArr = name.split(' ')
    const [FNAME, LNAME] = [nameArr[0], nameArr.slice(-1)[0]]
    const listId = process.env.MAILCHIMP_LIST_ID

    const res = await mailchimp.lists.addListMember(listId, {
      status: mailchimpSubscriptionStates.SUBSCRIBED,
      email_address: email,
      merge_fields: {
        FNAME,
        LNAME
      },
      tags: ['blocs_updates']
    })

    return res
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default addUserToMailingList
