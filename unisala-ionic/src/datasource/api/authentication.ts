import axios from "axios"
import jwtDecode from "jwt-decode"
import {userServer} from "../servers/endpoints"
import {getUserProfile} from "../store/action/userProfile"
import { getCache, removeCache, setCache } from "@utils/cache"

// Function to update the refreshToken in localStorage
function updateToken(updatedToken, key = "accessToken") {
  // Retrieve the existing authData from localStorage
  const authDataString = localStorage.getItem('authData');

  // Check if authData exists
  if (authDataString) {
    // Parse the JSON string back into an object
    const authData = JSON.parse(authDataString);

    // Update the refreshToken field with the new value
    authData[key] = updatedToken;

    // Convert the updated object back to a JSON string
    const updatedAuthDataString = JSON.stringify(authData);

    // Save the updated JSON string back to localStorage
    localStorage.setItem('authData', updatedAuthDataString);
  } else {
    console.log("No authData found in localStorage.");
  }
}

// Example usage: Assuming you have a new refresh token to store

export const getNewToken = async () => {
  try {
    let authData = getCache('authData') || {refreshToken: false},
      { refreshToken : currentRefreshToken } = authData || { refreshToken: false};
   if (!currentRefreshToken) {
    // let them scroll
    // window.location.assign("/login")
  }
    const {data = {}} = currentRefreshToken?.length > 0 && await axios.post(userServer + "/refreshToken", {}, {
      headers: {
        "Authorization": `Bearer ${currentRefreshToken}`
      }
    })
    const {accessToken, refreshToken} = data?.data ?? {};
    if (!data.success) {
      const { error } = data || {}
      if (error?.name === "TokenExpiredError") {
        window.location.assign("/login")
      }
    }
    refreshToken &&  updateToken(refreshToken, "refreshToken");
    accessToken && updateToken(accessToken, "accessToken");
    return accessToken
  } catch (error) {
    console.log(error)
  }
}


export async function refreshTokenAndRetry(operation) {
  try {
    const newToken = await getNewToken();
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${newToken}`
      }
    }));

    return forward(operation);
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; // Rethrow to be caught by subscriber's error handler
  }
}