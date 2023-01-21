import userOwnsWidget from '@/lambda/helpers/faunadb/userOwnsWidget'
import { handle401Response } from '@/lambda/helpers/handleResponses'
import { NextApiResponse } from 'next'
import { ProductTitles } from '../../../global-types/stripe'

const canPerformAction = async (
  userId: string,
  widgetKey: ProductTitles,
  res: NextApiResponse
) => {
  const isPremium = await userOwnsWidget(userId, widgetKey)

  if (!isPremium) {
    console.error(`[Unauthorized] user does not own ${widgetKey}`)

    handle401Response(
      res,
      'You must be a blocs premium member to perform this action'
    )
  }

  return isPremium
}

export default canPerformAction
