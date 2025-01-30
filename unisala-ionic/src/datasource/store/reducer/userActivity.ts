import {MESSAGE_TO_PROFILE, MESSAGE_SEND_SUCCESS, MESSAGE_SEND_SUCCESS_FINALLY, SEEN_MESSAGE, REMOVE_SEEN_MESSAGE} from "../types/messengerType"
import {UNI_SEARCH_RESULT, UNI_SERV_SIGNED_URL, USER_SERV_SIGNED_URL} from "../types/userActivity"

const initialState = {
    messagingTo: null,
    messageUpdated: false,
    messageSeenBy: [],
    uniSearchResult: []
}

const userActivity = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case MESSAGE_TO_PROFILE:
            return {
                ...state,
                messagingTo: payload
            }
        case MESSAGE_SEND_SUCCESS:
            return {
                ...state,
                messageUpdated: true
            }
        case MESSAGE_SEND_SUCCESS_FINALLY:
            return {
                ...state,
                messageUpdated: false
            }
        case SEEN_MESSAGE:
            return {
                ...state,
                messageSeenBy: [...state.messageSeenBy, payload]
            }
        case REMOVE_SEEN_MESSAGE:
            return {
                ...state,
                messageSeenBy: [state.messageSeenBy].filter((id) => id !== payload)
            }
        case UNI_SEARCH_RESULT:
            return {
                ...state,
                uniSearchResult: payload
            }
        default:
            return state
    }
}

export default userActivity
