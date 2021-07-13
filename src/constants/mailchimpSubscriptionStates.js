// REFERENCE : https://mailchimp.com/developer/marketing/guides/create-your-first-audience/#check-a-contacts-subscription-status

const mailchimpSubscriptionStates = {
  SUBSCRIBED: "subscribed",
  UNSUBSCRIBED: "unsubscribed",
  PENDING: "pending",
  CLEANED: "cleaned",
  NOT_SUBSCRIBED: "not_subscribed", // this is custom and not part of the api responses
}

export default mailchimpSubscriptionStates
