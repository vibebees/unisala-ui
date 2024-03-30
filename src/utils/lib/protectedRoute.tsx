import { Redirect, useLocation } from "react-router-dom"
import { getCache } from "../cache"

export const ProtectedRoute = ({ children: any })  => {
  const accessToken = getCache("accessToken")
  const location = useLocation()

  const [_, route, id] = location.pathname.split("/")

  const allowedRoutes = [
    "thread",
    "login",
    "register",
    "roadmap",
    "university",
    "search",
    "org"
  ]

  // Check if the route is in the allowedRoutes array and user is not logged in
  if (!accessToken && allowedRoutes.includes(route)) {
    return children
  }

  if (!accessToken) {
    return <Redirect to="/" />
  }
  return children
}

