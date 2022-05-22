export const BASE_URL =
  process.env.NEXT_PUBLIC_ENV?.toLowerCase() === 'local'
    ? 'http://localhost:3000'
    : ''
