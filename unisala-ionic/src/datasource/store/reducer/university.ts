import {
    SEARCH_GET_REQUEST,
    SEARCH_GET_SUCCESS,
    SEARCH_GET_ERROR,
    GET_UNI_DATA,
    SIMILAR_COLLAGE,
    POLL,
    REPORT,
    IS_SIDE_BAR
} from "../action/types"

const initialState = {
    searchData: [],
    searchFetching: false,
    searchError: [],
    uniData: false,
    isSideBar: false,
    similarCollages: false,
    report: false,
    campusLife: false,
    applicants: false,
    library: false,
    grants: false,
    testScore: false,
    visitWebsite: false,
    professors: false
}

const University = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SEARCH_GET_REQUEST:
            return {
                ...state,
                searchFetching: true
            }
        case SEARCH_GET_SUCCESS:
            return {
                ...state,
                searchData: payload,
                searchFetching: false
            }
        case SEARCH_GET_ERROR:
            return {
                ...state,
                searchError: payload,
                searchFetching: false
            }
        case GET_UNI_DATA:
            return {
                ...state,
                uniData: payload
            }
        case IS_SIDE_BAR:
            return {
                ...state,
                isSideBar: payload
            }
        case SIMILAR_COLLAGE:
            return {
                ...state,
                similarCollages: payload
            }
        case POLL:
            return {
                ...state,
                campusLife: payload
            }
        case REPORT:
            return {
                ...state,
                report: payload
            }
        default:
            return state
    }
}

export default University
