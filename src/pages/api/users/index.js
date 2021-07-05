// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import faunaClient from "../../../lambda-functions/faunaClient"
import { Collection, Create, Get, Index, Match, query } from "faunadb"
import authenticateNotionUser from "../../../lambda-functions/helpers/authenticateNotionUser"
import getNotionUser from "../../../lambda-functions/helpers/getNotionUser"
import updateUserData from "../../../lambda-functions/helpers/updateUserData"

const checkIfUserExists = async (email) => {
  try {
    const user = await faunaClient.query(
      Get(Match(Index("all_users_by_email"), email))
    )
    return user
  } catch (err) {
    return false
  }
}

const saveUser = async (userData, preregisteredForPremium = false) => {
  const { person } = userData
  const userExists = await checkIfUserExists(person?.email)

  if (
    // if already signed up user clicks the pre-register button on the pricing page
    userExists &&
    !userExists.data.preregisteredForPremium &&
    preregisteredForPremium
  ) {
    const updatedUser = await updateUserData(userExists, {
      preregisteredForPremium: true,
    })
    return {
      ...userExists.data,
      ...updatedUser.data,
      firstTimeSignIn: true,
      preregisteredForPremium: true,
    }
  }

  if (userExists) return userExists.data

  if (!userExists) {
    try {
      const user = await faunaClient.query(
        Create(Collection("users"), {
          data: {
            email: userData.person.email,
            avatar_url: userData.avatar_url,
            name: userData.name,
            preregisteredForPremium,
          },
        })
      )

      return { ...user.data, firstTimeSignIn: true }
    } catch (error) {
      console.error("Could not create or find user in Fauna DB")
      throw new Error(error)
    }
  }
}

const handler = async (req, res) => {
  const { code, preregisteredForPremium, access_token } = req.body

  if (preregisteredForPremium && typeof preregisteredForPremium !== "boolean") {
    return res.status(400).json({
      err: "Invalid json : premium registered",
    })
  }

  if (req.method === "POST") {
    if (!code) {
      return res
        .status(400)
        .json({ error: "Unable to sign into notion : 'code' not defined" })
    }

    try {
      const authData = await authenticateNotionUser(code)
      const notionUser = await getNotionUser(authData?.access_token)
      const user = await saveUser(notionUser, preregisteredForPremium)

      if (!user) res.status(400).json({ err })

      res
        .status(200)
        .json({ data: user, status: 200, access_token: authData.access_token })
    } catch (err) {
      console.error(err)
      res.status(400).json({ err, status: 400 })
    }
  }

  if (req.method === "PATCH") {
    if (!access_token)
      return res
        .status(401)
        .json({ err: "Unauthorized : access_token required" })

    try {
      const notionUser = await getNotionUser(access_token)
      const { person } = notionUser || {}

      if (person) {
        const existingUser = await checkIfUserExists(person?.email)
        const updatedUser = await updateUserData(existingUser, {
          preregisteredForPremium,
        })

        const recentlySignedUpForPremium =
          !existingUser.data?.preregisteredForPremium && preregisteredForPremium
        const showThankYouMessageOnClient = recentlySignedUpForPremium
          ? { firstTimeSignIn: true, preregisteredForPremium: true }
          : {}

        res.status(200).json({
          data: { ...updatedUser, ...showThankYouMessageOnClient },
          status: 200,
          access_token,
        })
      }
    } catch (err) {
      console.error(err)
      res
        .status(401)
        .json({ err: "Unauthorized : unable to get get user data" })
    }
  }
}

export default handler
