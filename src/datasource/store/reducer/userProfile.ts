import {
  GET_USER_PROFILE,
  GET_USER_FRIENDS,
  MY_NETWORK_RECENT_MESSAGES,
  UNREAD_MESSAGES,
  REMOVE_UNREAD_MESSAGES,
  UPDATE_USER_PROFILE,
  LOGIN
} from "../action/types"

export const USER_PROFILE_INITIAL_STATE = {
  user: {},
  loggedIn: false,
  friendList: [],
  recentMessages: [],
  unreadMessages: []
}

const UserProfile = (state = USER_PROFILE_INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        user: payload.user,
        loggedIn: payload.loggedIn
      }
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: payload.user,
        loggedIn: payload.loggedIn
      }

    case GET_USER_FRIENDS:
      return {
        ...state,
        friendList: payload
      }
    case MY_NETWORK_RECENT_MESSAGES:
      return {
        ...state,
        recentMessages: payload
      }
    case UNREAD_MESSAGES:
      if (state.unreadMessages.includes(payload)) {
        // If the ID is already in the array, return the state without modifying it
        return state
      }
      // Otherwise, add the ID to the array and return the new state
      return {
        ...state,
        unreadMessages: [...state.unreadMessages, payload]
      }
    case REMOVE_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: state.unreadMessages.filter((id) => id !== payload)
      }

    case LOGIN:
      return {
        ...state,
        loggedIn: true
      }
    default:
      return state
  }
}

export default UserProfile
