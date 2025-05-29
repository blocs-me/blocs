import faunaClient from '@/lambda/faunaClient'
import { query as q } from 'faunadb'

//TODO: validate and delete this file
const getPomdoroSettings = async (req, res) => {
  // const { id }  = req.user

  try {
    const faunaRes = await faunaClient.query(
      q.Call(q.Function('pomodoro_settings_by_user_id'), 303985067693179406) // add user id dynamically
    )

    console.log(faunaRes)

    res.status(200).json({
      data: faunaRes.data
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: {} })
  }
}

export default getPomdoroSettings
