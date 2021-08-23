const defaultOptions = {}

const fetchWithToken =
  (options = {}) =>
  (path) =>
    fetch(path, {
      ...options,
      method: options.method || "GET",
      headers: {
        credentials: "same-origin",
        ...(options?.headers || {}),
      },
    })

export default fetchWithToken
