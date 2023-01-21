import { NextApiRequest, NextApiResponse } from 'next'
import Rest from '@/lambda/lib/rest'
import createHabit from '@/lambda/routers/habit-tracker/createHabit'
import deleteHabit from '../../../../lambda-functions/routers/habit-tracker/deleteHabit'
import getHabits from '../../../../lambda-functions/routers/habit-tracker/getHabits'
import { validateHabitTrackerQueryParams } from '@/lambda/lib/restValidator/jsonValidator'
import editHabit from '@/lambda/routers/habit-tracker/editHabit'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rest = new Rest(req, res)

  const isValid = validateHabitTrackerQueryParams(req.query)

  if (!isValid) {
    res.status(400).json({
      status: 400,
      error: {
        message: '[Bad Request] Provided data is incorrect'
      }
    })

    console.error('[Bad Request] Provided data is incorrect')

    return null
  }

  // await rest.post()

  await rest.post(createHabit as any)
  await rest.delete(deleteHabit as any)
  await rest.get(getHabits as any)
  await rest.patch(editHabit as any)
}

export default handler
