import { borderStyle } from 'styled-system'
import fetcher from './fetcher'

type Options = {
  headers?: Record<string, string>
  body?: Record<string, string | string[] | number | number[]>
}

const defaultOpts: Options = {
  headers: {
    'Content-Type': 'application/json'
  },
  body: {}
}

const makeFetch = (method) => (url, opts) =>
  fetcher(url, {
    method,
    headers: {
      ...defaultOpts.headers,
      ...opts.headers
    },
    body: JSON.stringify(opts.body)
  })

export const postReq = makeFetch('POST')
export const putReq = makeFetch('PUT')
export const deleteReq = makeFetch('DELETE')
