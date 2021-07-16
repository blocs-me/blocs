import mailchimp from "@/lambda/mailchimpMarketingClient"
import faunaClient from "@/lambda/faunaClient"
import {
  Paginate,
  Index,
  Match,
  query,
  Lambda,
  Get,
  Var,
  Select,
  Ref,
  Collection,
} from "faunadb"

import md5 from "md5"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const status = await mailchimp.batches.status("081a43b4e5")

    res.json({ status })
  }

  if (req.method === "POST") {
    try {
      const response = await faunaClient.query(
        query.Map(
          Paginate(Match(Index("all_users")), {
            size: 2000,
          }),
          Lambda(
            ["ref", "name"],
            [Select(["data", "email"], Get(Var("ref"))), Var("name")]
          )
        )
      )

      const allUsers = response.data

      console.log("fauna", response)

      // const listId = process.env.MAILCHIMP_LIST_ID

      // const mailchimpBatch = allUsers.map(([email, name], i) => ({
      //   method: "POST",
      //   path: `/lists/${listId}/members/${md5(email)}/tags`,
      //   operation_id: i + "",
      //   body: JSON.stringify({
      //     tags: [{ name: "blocs_updates", status: "active" }],
      //   }),
      // }))

      // const mailchimpRes = await mailchimp.batches.start({
      //   operations: mailchimpBatch,
      // })

      // console.log(mailchimpRes)

      res.status(200).json({ data: allUsers[1303] })
    } catch (error) {
      console.error(error)
      res.status(500).json({})
    }
  }
}
