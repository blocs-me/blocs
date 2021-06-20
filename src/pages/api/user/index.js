// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import faunaClient from "../../../lambda-functions/faunaClient"
import { Client } from "@notionhq/client/build/src"
import { Collection, Create, Get, Index, Match } from "faunadb"
import authenticateNotionUser from "../../../lambda-functions/helpers/authenticateNotionUser"
import getNotionUser from "../../../lambda-functions/helpers/getNotionUser"

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

const saveUser = async (userData) => {
  // see if user exists
  const { person } = userData
  const userExists = await checkIfUserExists(person?.email)

  if (userExists) return userExists.data

  console.log(userExists, "user existing")

  if (!userExists) {
    try {
      const user = await faunaClient.query(
        Create(Collection("users"), {
          data: {
            email: userData.person.email,
            avatar_url: userData.avatar_url,
            name: userData.name,
            preregisteredForPremium: false,
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
  if (req.method === "POST") {
    const { code, preregisteredForPremium } = req.body

    if (!code) {
      res
        .status(400)
        .json({ error: "Unable to sign into notion : code not defined" })
    }

    try {
      const authData = await authenticateNotionUser(code)
      const notionUser = await getNotionUser(authData?.access_token)
      const user = await saveUser(notionUser)
      res
        .status(200)
        .json({ data: user, status: 200, access_token: authData.access_token })
    } catch (err) {
      console.log(err)
      res.status(400).json({ err, status: 400 })
    }
  }
}

export default handler
