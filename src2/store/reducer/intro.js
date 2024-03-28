import { PRE_LOADING } from "../action/types"

export const initial = {
    test: [],
    loading: false,
    accessToken: localStorage.getItem("accessToken")
}
const intro = (state = initial, action) => {
    switch (action.type) {
        case "INTRODUCTORY_QUESTION":
            state = {
                ...state,
                test: action.payload
            }
            return state

        case "USER_LOGIN":
            return state
        case PRE_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}
export default intro
