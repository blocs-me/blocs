import { NextApiResponse } from 'next'

const getErrorJSON = (status, message) => ({
  status,
  error: {
    message
  }
})

export const handle404Response = (res: NextApiResponse, msg?: string) =>
  res
    .status(404)
    .json(
      getErrorJSON(404, msg || "We weren't able to find the data requested")
    )

export const handle401Response = (res: NextApiResponse, msg?: string) =>
  res.status(401).json({
    error: {
      message: msg || 'You are unauthorized to make this request'
    }
  })

export const handle500Response = (res: NextApiResponse, msg?: string) =>
  res
    .status(500)
    .json(
      getErrorJSON(500, msg ?? 'Uh oh ! something went wrong on the server')
    )

export const handle400Response = (res: NextApiResponse, msg?: string) =>
  res
    .status(400)
    .json(
      getErrorJSON(
        400,
        msg ??
          'Incorrect data was provided to the server and the request could not be completed'
      )
    )

export const handle200Response = (res: NextApiResponse, data = {}) =>
  res.status(200).json({
    status: 200,
    ...data
  })
