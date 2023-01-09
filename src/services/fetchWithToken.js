const defaultOptions = {}

const fetchWithToken = (path, token) =>
  fetch(path, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => res.json())

export default fetchWithToken
