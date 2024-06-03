import { setCache } from "../../../utils/cache"
import {
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  GET_USER_FRIENDS,
  GET_USER_MESSAGES,
  MY_NETWORK_RECENT_MESSAGES,
  UNREAD_MESSAGES,
  REMOVE_UNREAD_MESSAGES
} from "./types"

export const getUserProfile = (data) => {
  setCache("userInfo", data)
    return {
      type: GET_USER_PROFILE,
      payload: data
    }
  },
  updateUserProfile = (data) => {
    return {
      type: UPDATE_USER_PROFILE,
      payload: data
    }
  },
  getUserFriends = (data) => {
    return {
      type: GET_USER_FRIENDS,
      payload: data
    }
  },
  getUserMessages = (data) => {
    return {
      type: GET_USER_MESSAGES,
      payload: data
    }
  },
  setMyNetworkRecentMessages = (data) => {
    return (dispatch) => {
      dispatch({
        type: MY_NETWORK_RECENT_MESSAGES,
        payload: data
      })
    }
  },
  updateUnreadMessages = (data) => {
    return (dispatch) => {
      dispatch({
        type: UNREAD_MESSAGES,
        payload: data
      })
    }
  },
  removeIdFromUnreadMessages = (data) => {
    return (dispatch) => {
      dispatch({
        type: REMOVE_UNREAD_MESSAGES,
        payload: data
      })
    }
  }
