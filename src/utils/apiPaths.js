const BASE_URL =
  process.env.NEXT_PUBLIC_ENV.toLowerCase() === "local"
    ? "http://localhost:3000/api"
    : "/api"

const getPath = (path) => `${BASE_URL}${path}`

export const USER_PATH = getPath("/users")
export const VALIDATE_USER_AUTH_PATH = getPath("/auth/validate")
