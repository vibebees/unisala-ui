import axios from "axios";
import { universityServer, userServer } from "../../servers/endpoints";
import {
  MESSAGE_TO_PROFILE,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_SUCCESS_FINALLY,
  SEEN_MESSAGE,
  REMOVE_SEEN_MESSAGE,
} from "../types/messengerType";
import {
  UNI_SEARCH_RESULT,
  UNI_SERV_SIGNED_URL,
  USER_SERV_SIGNED_URL,
} from "../types/userActivity";

export const sendMessageTo = (data) => {
    return (dispatch) => {
      dispatch({
        type: MESSAGE_TO_PROFILE,
        payload: data,
      });
    };
  },
  messageUpdated = () => (dispatch) => {
    dispatch({ type: MESSAGE_SEND_SUCCESS });
    setTimeout(() => dispatch({ type: MESSAGE_SEND_SUCCESS_FINALLY }), 1000);
  },
  addSeenEye = (seenBy) => (dispatch) => {
    dispatch({ type: SEEN_MESSAGE, payload: seenBy });
  },
  removeSeenEye = (seenBy) => (dispatch) => {
    dispatch({ type: REMOVE_SEEN_MESSAGE, payload: seenBy });
  },
  searchUniFromBar = (uniName = " ", numberOfSuggestion = 5, setResult) => {
    return async () => {
      uniName.length > 0 &&
        (await axios
          .get(
            universityServer +
              `/keyword/schoolname/${uniName}/${numberOfSuggestion}`
          )
          .then((res) => {
            setResult(res?.data);
          })
          .catch((err) => {
            console.log(err);
          }));
    };
  };
