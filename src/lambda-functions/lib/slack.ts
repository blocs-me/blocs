const createMessage = (
  customerName: string,
  email: string,
  plan: string,
  price: string
) => {
  const customerInfo = customerName
    ? `:wink: ${customerName} (${email})`
    : `:wink: ${email}`
  const payload = {
    channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL_ID,
    text: `:tada: New Sale - You received a payment of $${price}`,
    attachments: [
      {
        color: '#00FF00',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `:package: ${plan}`,
              emoji: true
            }
          },
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `${customerInfo}`,
              emoji: true
            }
          },
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `:moneybag: $${price}`
            }
          }
        ]
      }
    ]
  }

  return payload
}

const createEnquiry = (customerName: string, email: string, msg: string) => {
  const payload = {
    channel: process.env.NEXT_PUBLIC_SLACK_CHANNEL_ID,
    text: ':tada: new product update enquiry',
    attachments: [
      {
        color: '#00FF00',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `:package: ${msg}`,
              emoji: true
            }
          },
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: `:wink: ${customerName} (${email})`,
              emoji: true
            }
          }
        ]
      }
    ]
  }

  return payload
}

export const SlackPurchaseNotification = async (body: {
  customer_name: string
  email: string
  plan_name: string
  unit_price: string
}) => {
  const { customer_name, email, plan_name, unit_price } = body
  try {
    const messageRes = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SLACK_TOKEN}`
      },
      body: JSON.stringify(
        createMessage(customer_name, email, plan_name, unit_price)
      )
    })

    if (!messageRes.ok) {
      throw new Error(
        `Something went wrong by sending a slack message ${messageRes}`
      )
    }
    return true
  } catch (err) {
    const errorMessage = 'Failed to send Slack message'
    console.error(errorMessage, err)
    return false
  }
}

export const SlackEnquiryNotification = async (body: {
  customer_name: string
  email: string
  msg: string
}) => {
  const { customer_name, email, msg } = body

  try {
    const messageRes = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SLACK_TOKEN}`
      },
      body: JSON.stringify(createEnquiry(customer_name, email, msg))
    })

    if (!messageRes.ok) {
      throw new Error(
        `Something went wrong by sending a slack message ${messageRes}`
      )
    }
    return true
  } catch (err) {
    const errorMessage = 'Failed to send Slack message'
    console.error(errorMessage, err)
    return false
  }
}
