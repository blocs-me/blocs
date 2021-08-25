const defaultOptions = {}

const fetchWithToken = (path, token) =>
  fetch(path, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export default fetchWithToken
