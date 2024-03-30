import axios from "axios"
import {jwtDecode} from "jwt-decode"
import {userServer} from "../servers/endpoints"
import {getUserProfile} from "../store/action/userProfile"
import {getCache, removeCache, setCache} from "../../utils/cache"

export const getNewToken = async (dispatch = () => {}) => {
  let prevRefreshToken = getCache("refreshToken")
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
       removeCache("refreshToken")
       removeCache("accessToken")
        window.location.assign("/login")
      }
      dispatch(getUserProfile({ user: {}, loggedIn: false }))
    }

    data?.refreshToken && setCache("refreshToken", refreshToken || "")
    data?.accessToken && setCache("accessToken", accessToken || "")
    const decode = jwtDecode(accessToken)

    dispatch(getUserProfile({ user: { ...decode }, loggedIn: Boolean(decode) }))
    return data?.accessToken
  } catch (error) {
    console.log(error)
  }
}
