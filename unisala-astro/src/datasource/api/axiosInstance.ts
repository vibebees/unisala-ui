import axios from "axios";
import {base} from "../servers/index";
import { getCache, setCache } from "../../utils/cache";


const axiosOjb = () => {
  const authBaseURL = base;
  const authData: any = getCache("authData") || { accessToken: false },
    { accessToken } = authData || { accessToken: false };
  return {
    baseURL: authBaseURL || '',
    headers: {
      Authorization: accessToken ? "Bearer " + accessToken : null,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };
};

export const authInstance = axios.create(axiosOjb());

// Add a response interceptor
authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
     
    if (
      error.response.status === 401 &&
      originalRequest.url ===  base + "/refreshToken/"
    ) {
      window.location.href = "/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = getCache("refreshToken");

      if (refreshToken) {
        const refreshTokenStr = refreshToken as string;
        const tokenParts = JSON.parse(atob(refreshTokenStr.split(".")[1] || ''));
        const now = Date.now();
        if (tokenParts.exp > now) {
          return axios
            .post(base + "/refreshToken", {
              token: refreshToken,
            })
            .then((response) => {
              setCache("accessToken", response.data.accessToken);
              setCache("refreshToken", response.data.refreshToken);

              authInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return authInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        console.log("Refresh token is expired", tokenParts.exp, now);
        window.location.href = "/";
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
