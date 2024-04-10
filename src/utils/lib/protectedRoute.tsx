import { useSelector } from "react-redux"
import { Redirect, useLocation } from "react-router-dom"

export function ProtectedRoute({ children }) {
  const { loggedIn } = useSelector((state) => state?.userProfile || {})
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
  if (!loggedIn && allowedRoutes.includes(route)) {
    return children
  }

  if (!loggedIn) {
    return <Redirect to="/login" />
  }
  return children
}

