import md5 from "md5"
import mailchimp from "../mailchimpMarketingClient"
import mailchimpSubscriptionStates from "@/constants/mailchimpSubscriptionStates"

const listId = process.env.MAILCHIMP_LIST_ID

const checkIfUserIsSubscribed = async (user) => {
  if (!user)
    throw new Error(
      "Mailchimp Error : could not retrieve user status; user not defined"
    )

  const { email } = user
  const subscriberHash = md5(email.toLowerCase())

  try {
    const response = await mailchimp.lists.getListMember(listId, subscriberHash)
    return Object.values(mailchimpSubscriptionStates).includes(response.status)
  } catch (error) {
    console.log(error, "checkifusererr")
    return false
  }
}

export default checkIfUserIsSubscribed
