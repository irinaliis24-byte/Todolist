import { Navigate, Outlet } from "react-router"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  isNotAllowed: boolean
  redirectTo: string
}

export const ProtectedRoutes = ({ children, isNotAllowed, redirectTo }: Props) => {
  if (isNotAllowed) {
    return <Navigate to={redirectTo} />
  }
  return children || <Outlet />
}
