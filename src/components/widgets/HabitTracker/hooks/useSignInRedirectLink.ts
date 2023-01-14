const redirectLinks = {
  local: 'http://localhost:3000/dashboard/sign-in',
  production: 'https://blocs.me/dashboard/sign-in',
  preview: 'https://blocs-dev.vercel.app/dashboard/sign-in',
  development: 'https://blocs-dev.vercel.app/dashboard/sign-in'
}

const vercel_env = process.env.NEXT_PUBLIC_VERCEL_ENV

const useSignInRedirectLink = () => {
  const redirecLink: string = redirectLinks[vercel_env]
  return redirecLink
}

export default useSignInRedirectLink
