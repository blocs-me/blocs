import fetcher from './fetcher'

type Options = {
  headers?: Record<string, string>
  body?: Record<string, string | string[] | number | number[]>
}

const defaultOpts: Options = {
  headers: {
    credentials: 'same-origin',
    'Content-Type': 'application/json'
  },
  body: {}
}

const makeFetch =
  (method: string) =>
  (url: string, opts: Record<string, any> = defaultOpts) =>
    fetcher(url, {
      method,
      headers: {
        ...defaultOpts.headers,
        ...opts?.headers
      },
      body: JSON.stringify(opts.body)
    })

export const postReq = makeFetch('POST')
export const putReq = makeFetch('PUT')
export const patchReq = makeFetch('PATCH')
export const deleteReq = makeFetch('DELETE')
