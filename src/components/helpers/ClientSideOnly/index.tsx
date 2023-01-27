import useDidMount from '@/hooks/useDidMount'

const ClientSideOnly = ({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const mounted = useDidMount()
  if (!mounted) return null

  return <div>{children}</div>
}

export default ClientSideOnly
