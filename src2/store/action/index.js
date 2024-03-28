import { execute, useQuery } from "@apollo/client"
import axios from "axios"
import { getUpdatedSchoolInfo } from "@graphql/uni"
import urls from "../../servers"
import { universityServer } from "../../servers/endpoints"
import {
  INTRODUCTORY_QUESTION,
  SEARCH_GET_REQUEST,
  SEARCH_GET_SUCCESS,
  SEARCH_GET_ERROR,
  GET_UNI_DATA,
  PRE_LOADING
} from "./types"

export const answerQuestion = (answer) => {
  try {
    return (dispatch) => {
      dispatch({
        type: INTRODUCTORY_QUESTION,
        payload: answer
      })
    }
  } finally {
    console.warn("done")
  }
}
export const searchGetRequest = () => {
  return {
    type: SEARCH_GET_REQUEST
  }
}

export const searchGetSuccess = (data) => {
  return {
    type: SEARCH_GET_SUCCESS,
    payload: data
  }
}

export const searchGetError = (error) => {
  return {
    type: SEARCH_GET_ERROR,
    payload: error
  }
}

export const getUniData = (data) => {
  return {
    type: GET_UNI_DATA,
    payload: data
  }
}
export const PreLoader = (data) => {
  return {
    type: PRE_LOADING,
    payload: data
  }
}

export const handleSearchSubmit = (search) => {
  return async (dispatch) => {
    await axios
      .get(universityServer + `/searchUni/${search}`)
      .then((res) => {
        res?.data?.success && dispatch(searchGetSuccess(res?.data?.data || []))
        // setUsers(() => res?.data?.data?.users || []);
      })
      .catch((err) => {
        dispatch(searchGetError(err))
      })
  }
}

export const uniQuery = () => {
  return (dispatch) => {
    const { loading, data } = execute(getUpdatedSchoolInfo)
    dispatch(getUniData(data))
  }
}
