import axios from "axios"
import urls from "../servers"

const authBaseURL = urls["base"]
export const authInstance = axios.create({
  baseURL: authBaseURL,
  headers: {
    Authorization: localStorage.getItem("accessToken")
      ? "Bearer " + localStorage.getItem("accessToken")
      : null,
    "Content-Type": "application/json",
    accept: "application/json"
  }
})

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config

    // Prevent infinite loops
    // eslint-disable-next-line
    if (
      error.response.status === 401 &&
      originalRequest.url === authBaseURL + "/refreshToken/"
    ) {
      window.location.href = "/"
      return Promise.reject(error)
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refreshToken")

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]))

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000)
        if (tokenParts.exp > now) {
          return axios
            .post(urls["base"] + "/refreshToken", {
              token: refreshToken
            })
            .then((response) => {
              localStorage.setItem("accessToken", response.data.accessToken)
              localStorage.setItem("refreshToken", response.data.refreshToken)

              authInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access

              return authInstance(originalRequest)
            })
            .catch((err) => {
              console.log(err)
            })
        }
        console.log("Refresh token is expired", tokenParts.exp, now)
        window.location.href = "/"
      } else {
        console.log("Refresh token not available.")
        window.location.href = "/"
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error)
  }
)
