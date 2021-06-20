import { Client } from "faunadb"

const faunaClient = new Client({
  secret: process.env.FAUNDA_DB_SECRET,
})

export default faunaClient
 