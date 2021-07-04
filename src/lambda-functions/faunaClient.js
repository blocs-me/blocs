import { Client } from "faunadb"

const faunaClient = new Client({
  secret: process.env.FAUNA_DB_SECRET,
})

export default faunaClient
