import { validateHabitSchema } from '@/lambda/lib/restValidator/jsonValidator'
import { NextApiRequest, NextApiResponse } from 'next'
import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'
import { HabitItem } from '../../../global-types/habit-tracker'

const editHabit = async (req: NextApiRequest, res: NextApiResponse) => {
  const isValid = validateHabitSchema(req.body)

  if (!isValid) {
    res.status(400).json({
      status: 400,
      error: {
        message: 'The provided data is incorrect'
      }
    })
  }

  const habit = req.body
  const { widgetToken } = req.query

  const widgetIndexKey = 'widget_by_token'

  const widget = await faunaClient
    .query(q.Get(q.Match(q.Index(widgetIndexKey), widgetToken)))
    .then((data) => data)
    .catch((error) => {
      console.error(error)
      return null
    })

  if (!widget) {
    res.status(404).json({
      error: {
        message: 'Widget was not found'
      }
    })
    return null
  }

  const prevHabits = widget.data.habits
  const shouldUpdate = widget.data.habits.find(
    (curHabit: HabitItem) => curHabit.id === habit.id
  )

  if (!shouldUpdate) {
    return res.status(401).json({
      status: 401,
      error: {
        message: 'You do not have access to make this change'
      }
    })
  }

  const editedHabit = {
    id: habit.id,
    title: habit.ti
  }

  const newHabits = prevHabits.filter(
    (curHabit: HabitItem) => curHabit.id !== habit.id
  )

  try {
    await faunaClient.query(
      q.Update(widget.ref, {
        data: {
          habits: [...newHabits, editedHabit]
        }
      })
    )

    res.status(200).json({})
  } catch (err) {
    res.status(200).json({
      status: 500,
      error: {
        message: 'Something went wrong went trying to save your habit'
      }
    })
  }
}

export default editHabit
