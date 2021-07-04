export const isDevelopmentEnv = ["development", "preview"].includes(
  process.env.VERCEL_ENV
)
const BASE_URL =
  process.env.NODE_ENV.toLowerCase() === "development"
    ? "http://localhost:3000/api"
    : "/api"

const getPath = (path) => `${BASE_URL}${path}`

export const USER_PATH = getPath("/users")
export const VALIDATE_USER_AUTH_PATH = getPath("/auth/validate")
export const DISCORD_USER_SIGNUPS_WEBOOK =
  "https://discord.com/api/webhooks/861179086280982539/feZRPcZ4u781vaZ1Bh3ZV64hrIhuLor3_wODIJcUrZ22nYst45pcickxslhlmsxC1_52"
