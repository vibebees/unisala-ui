import axios from "axios"
import jwtDecode from "jwt-decode"
import {userServer} from "servers/endpoints"
import {getUserProfile} from "store/action/userProfile"

export const getNewToken = async (dispatch = () => {}) => {
  let prevRefreshToken = localStorage.getItem("refreshToken")
  if (!prevRefreshToken) {
    window.location.assign("/login")
  }
  try {
    const {data = {}} = await axios.post(userServer + "/refreshToken", {}, {
      headers: {
        "Authorization": `Bearer ${prevRefreshToken}`
      }
    })
    const {accessToken, refreshToken} = data.data
    if (!data.success) {
      const { error } = data || {}
      if (error?.name === "TokenExpiredError") {
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        window.location.assign("/login")
      }
      dispatch(getUserProfile({ user: {}, loggedIn: false }))
    }

    data?.refreshToken &&
      localStorage.setItem("refreshToken", refreshToken || "")
    data?.accessToken &&
      localStorage.setItem("accessToken", accessToken || "")
    const decode = jwtDecode(accessToken)

    dispatch(getUserProfile({ user: { ...decode }, loggedIn: Boolean(decode) }))
    return data?.accessToken
  } catch (error) {
    console.log(error)
  }
}
