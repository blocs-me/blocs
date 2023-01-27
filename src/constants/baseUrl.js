export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV?.toLowerCase() === 'local'
    ? 'http://localhost:3000'
    : ''
