import { Update } from "faunadb"
import faunaClient from "../../faunaClient"

const updateUserData = async (user, data) => {
  try {
    const updatedUser = await faunaClient.query(
      Update(user.ref, {
        data,
      })
    )

    return updatedUser.data
  } catch (err) {
    throw err
  }
}

export default updateUserData
