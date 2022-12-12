import Rest from '@/lambda/lib/rest'
import { validateHabitTrackerQueryParams } from '@/lambda/lib/restValidator/jsonValidator'
import { NextApiRequest, NextApiResponse } from 'next'
import saveHabitTrackerAnalytics from '../../../../lambda-functions/routers/habit-tracker/saveHabitTrackerAnalytics'
import getHabitTrackerAnalytics from '../../../../lambda-functions/routers/habit-tracker/getHabitTrackerAnalytics'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rest = new Rest(req, res)

  const isValidParams = validateHabitTrackerQueryParams(req.query)

  if (!isValidParams) {
    return res.status(400).json({
      status: 400,
      error: {
        message: '[Bad Request] Provided query is incorrect'
      }
    })
  }

  await rest.put(saveHabitTrackerAnalytics as any)
  await rest.get(getHabitTrackerAnalytics as any)
}

export default handler
