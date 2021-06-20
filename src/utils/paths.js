const BASE_URL =
  process.env.NODE_ENV.toLowerCase() === "development"
    ? "http://localhost:3000/api"
    : "/api"

const getPath = (path) => `${BASE_URL}${path}`

export const USER_PATH = getPath("/user")
export const VALIDATE_USER_AUTH_PATH = getPath("/auth/validate")
export const DASHBOARD_SIGN_IN_REDIRECT_URL =
  "https://blocs.me/dashboard/sign-in"
export const PRICING_SIGN_IN_REDIRECT_URL = "https://blocs.me/pricing"
