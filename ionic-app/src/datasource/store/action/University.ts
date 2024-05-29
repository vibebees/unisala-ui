import { IS_SIDE_BAR, POLL, REPORT, SIMILAR_COLLAGE } from "./types"

export const similarCollages = (data) => {
    return {
        type: SIMILAR_COLLAGE,
        payload: data
    }
}
export const isReport = (value) => {
    return {
        type: REPORT,
        payload: value
    }
}
export const poll = (data) => {
    return {
        type: POLL,
        payload: data
    }
}
export const isSideBar = (data) => {
    return {
        type: IS_SIDE_BAR,
        payload: data
    }
}
