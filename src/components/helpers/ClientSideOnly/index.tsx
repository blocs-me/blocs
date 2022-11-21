import { ReactNode } from 'react'

const ClientSideOnly = ({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  if (!global.window) return null

  return <>{children}</>
}

export default ClientSideOnly
