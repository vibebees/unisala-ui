import { useSelector } from "react-redux"
import { Redirect, useLocation } from "react-router-dom"
import { getCache } from "../cache"

export function ProtectedRoute({ children }) {
  const loggedIn = getCache("refreshToken")
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
  console.log("route", loggedIn)
  // Check if the route is in the allowedRoutes array and user is not logged in
  if (!loggedIn && allowedRoutes.includes(route)) {
    return children
  }

  if (!loggedIn) {
    return <Redirect to="/login" />
  }
  return children
}

