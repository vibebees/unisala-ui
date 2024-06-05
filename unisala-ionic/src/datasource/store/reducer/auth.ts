import { removeCache } from "../../../utils/cache"
import {BEFORE_AUTH_TRACK_PATH, CLEAR_AUTH_ERROR, EMAIL_VERIFICATION_RESENT, LOGOUT, OAUTH, PASSWORD_RESET_ASK_EMAIL, PASSWORD_RESET_ASK_PASSWORD, SHOW_ALERT, USER_LOGIN, USER_LOGIN_ERROR, USER_REGISTRATION} from "../action/types"
import {UNI_SERV_SIGNED_URL, USER_SERV_SIGNED_URL} from "../types/userActivity"

export const AUTH_INITIAL_STATE = {
    refreshToken: null,
    accessToken: null,
    uniSeviceSignedUrl: null,
    userSeviceSignedUrl: null,
    loggedIn: false
}
const authentication = (state = AUTH_INITIAL_STATE, action) => {
    const {type, payload} = action

    switch (type) {
        case USER_REGISTRATION:
            return state

        case USER_LOGIN:
            state = {
                ...state,
                refreshToken: payload?.refreshToken,
                accessToken: payload?.accessToken,
                loggedIn: true
            }
            return state
        case OAUTH:
            state = {
                ...state,
                refreshToken: "payload?.refreshToken",
                accessToken: " payload?.accessToken",
                loggedIn: true
            }
            return state
        case LOGOUT:
            removeCache("username")
            removeCache("token")
            state = {
                ...state,
                beforeAuthPath: null,
                username: null,
                isAuth: null,
                redirect: false,
                registrationRedirect: false,
                loginError: null,
                token: null,
                userId: null,
                tokenExpiration: null,
                loginRedirect: false,
                showAuthAlert: false
            }
            return state
        case BEFORE_AUTH_TRACK_PATH:
            if (action.typeofpayload === "string") {
                state = {
                    ...state,
                    beforeAuthPath: payload
                }
            }
            return state
        case SHOW_ALERT:
            state = {
                ...state,
                showAuthAlert: payload
            }
            return state
        case EMAIL_VERIFICATION_RESENT:
            if (action.payload) {
                state = {
                    ...state,
                    emailVerificationSent: true
                }
            }
            return state
        case PASSWORD_RESET_ASK_EMAIL:
            if (action.payload) {
                state = {
                    ...state,
                    resetPasswordEmailAsked: true
                }
            }
            return state
        case PASSWORD_RESET_ASK_PASSWORD:
            if (action.payload) {
                state = {
                    ...state,
                    passwordResetCompleted: true
                }
            }
            return state
        case USER_LOGIN_ERROR:
            state = {
                ...state,
                loginFailed: true
            }
            return state
        case CLEAR_AUTH_ERROR:
            state = {
                ...state,
                loginFailed: false
            }
            return state

        case UNI_SERV_SIGNED_URL:
            state = {
                ...state,
                uniSeviceSignedUrl: payload?.url
            }
            return state
        case USER_SERV_SIGNED_URL:
            return {
                ...state,
                userSeviceSignedUrl: payload?.url
            }
        default:
            return state

    }
}
export default authentication
