import axios from "axios";
import {
  LOGIN,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_REGISTRATION,
} from "./types";
import { universityServer, userServer } from "../../servers/endpoints";
import {
  UNI_SERV_SIGNED_URL,
  USER_SERV_SIGNED_URL,
} from "../types/userActivity";
import { setCache } from "../../../utils/cache";

export const loginUser = ({
  input,
  setLoading,
  present,
  dismiss,
  setauth,
  history,
  redirectUrl,
  setActiveNavDrop,
}) => {
  return (dispatch) => {
    axios
      .post(userServer + `/login`, input)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          res?.data?.accessToken &&
            setCache("accessToken", res?.data?.accessToken);
          res?.data?.refreshToken &&
            setCache("refreshToken", res?.data?.refreshToken);
          res?.data && setCache("userInfo", res?.data);
          setActiveNavDrop({ profile: false });

          dispatch({
            type: USER_LOGIN,
            payload: res?.data || {},
          });

          if (redirectUrl) {
            setTimeout(() => {
              window.location.replace(`/university/${redirectUrl}&create=y`);
            }, 1000);
          } else {
            history.push("/home");
          }
        }

        if (!res.data.success) {
          present({
            duration: 3000,
            message: res.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios",
          });
          if (res.data.status === 302) {
            setauth({ state: "userNotVerified", email: input.email });
          }
        }
        return res;
      })
      .catch((error) => {
        setLoading(false);
        present({
          duration: 3000,
          message: error.response.data.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
        if (error.status === 302) {
          setauth({ state: "userNotVerified", email: input.email });
        }
      });
  };
};

export const registerUser =
  ({ input, setsave, setdatacheck, setauth, present, dismiss }) =>
  (dispatch) => {
    setsave(true); // Assuming this is meant to indicate loading

    axios
      .post(userServer + `/register`, input)
      .then((res) => {
        setsave(false); // Stop loading indication
        if (res.data.success === true) {
          setdatacheck(false); // Reset data check if successful
          setauth({ state: "SignUpVerification", email: input.email });
          dispatch({
            type: USER_REGISTRATION,
            payload: res.data, // Usually you only need the data, not the entire response
          });
        } else if (res.data.success === false) {
          // Handle case where success is explicitly false
          present({
            duration: 3000,
            message: res.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios",
          });
        }
      })
      .catch((err) => {
        setsave(false); // Stop loading indication
        setdatacheck(false); // Reset data check on error
        // Check if the error response has the expected format
        if (err.response && err.response.data.errors) {
          // Example action dispatch on error

          // Present the first error message to the user
          const firstError = err.response.data.errors[0];
          if (firstError) {
            present({
              duration: 3000,
              message: firstError.msg,
              buttons: [{ text: "X", handler: () => dismiss() }],
              color: "danger",
              mode: "ios",
            });
          }
        } else {
          console.error("An unexpected error occurred", err);
        }
      });
  };

export const googleAuthAction = ({
  present,
  dismiss,
  payload,
  redirectUrl,
  history,
  setActiveNavDrop,
}) => {
  return (dispatch) =>
    axios.post(userServer + `/auth/google`, payload).then((res) => {
      if (res.data.success) {
        setCache("accessToken", res?.data?.accessToken);
        setCache("refreshToken", res?.data?.refreshToken);
        res?.data && setCache("userInfo", res?.data);
        if (res?.data.isFirstLogin) {
          setCache("newUser", "true");
        }
        dispatch({
          type: USER_LOGIN,
          payload: res.data,
        });
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        setActiveNavDrop({ profile: false });
        history?.push("/home");
      }
      if (!res.data.success) {
        dispatch({
          type: USER_LOGIN_ERROR,
          payload: res.data,
        });

        present({
          duration: 3000,
          message: res.data.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios",
        });
      }
    });
};

const getNewRefreshToken = (refreshToken) => {
  return (dispatch) =>
    axios.post(userServer + `/refreshToken`, { refreshToken }).then((res) => {
      if (res.data.success) {
        dispatch({
          type: USER_LOGIN,
          payload: res.data,
        });
      }
    });
};

// export const isLoggedIn = (user) => {
//     try {
//         return (dispatch) => axios.post(`${backendHost}`, {
//             query: `
//                    mutation{
//                     createUser(userInput:{
//                         username:"${user.username}",
//                         email:"${user.email}",
//                         password:"${user.password}"}){
//                         email
//                         username
//                   }
//                 }`
//         }).then((result) => {
//             dispatch({
//                 type: USER_REGISTRATION,
//                 payload: result.data.data.createUser
//             })
//         })

//     } catch (e) {
//     }
// }

// export const oauth2SaveToken = (data) => {

//     try {
//         return (dispatch) => dispatch({
//             type: OAUTH,
//             payload: data
//         })

//     } catch (e) {
//     }
// }
// export const logout = () => {

//     try {
//         return (dispatch) => dispatch({
//             type: LOGOUT
//         })

//     } catch (e) {
//     }
// }
// export const holdCurrentPath = (path) => {
//     try {
//         return (dispatch) => {
//             dispatch({
//                 type: BEFORE_AUTH_TRACK_PATH,
//                 payload: path
//             })

//         }
//     } catch (e) {
//         console.log(e)
//     }
// }

// export const showAuthAlert = () => {
//     return (dispatch) => {
//         dispatch({
//             type: SHOW_ALERT,
//             payload: true
//         })
//     }
// }
// export const dismissAuthAlert = () => {
//     return (dispatch) => {
//         dispatch({
//             type: SHOW_ALERT,
//             payload: false
//         })
//     }
// }

// export const resendVerificationCode = (token) => {
//     try {
//         return (dispatch) => axios.post(`${backendHost}`, {
//             query: `
//             mutation{
//               resendVerification
//              }
//                   `
//         }, {
//             headers: {
//                 Authorization: "Bearer " + token
//             }
//         }).then((result) => {
//             dispatch({
//                 type: EMAIL_VERIFICATION_RESENT,
//                 payload: result.data.data.resendVerification
//             })
//         })

//     } catch (e) {
//     }
// }

// export const verifyEmail = (emailVerificationToken, token) => {
//     try {
//         return (dispatch) => axios.post(`${backendHost}`, {
//             query: `
//             mutation{
//              verifyEmail(token:"${emailVerificationToken}")
//              }
//                   `
//         }, {
//             headers: {
//                 Authorization: "Bearer " + token
//             }
//         }).then((result) => {
//             dispatch({
//                 type: EMAIL_VERIFICATION_RESENT,
//                 payload: result.data.data.resendVerification
//             })
//         })

//     } catch (e) {
//     }
// }

// export const resetPasswordAskEmail = (email) => {
//     return (dispatch) => axios.post(`${backendHost}`, {
//         query: `
//              mutation{
//              resetPassword(username:"${email}")
//             }
//               `
//     }).then((result) => {
//         dispatch({
//             type: PASSWORD_RESET_ASK_EMAIL,
//             payload: result.data.data.resetPassword
//         })
//     })
// }

// export const changePasswordFromConfirmationLink = (newCredentials) => {
//     try {
//         const { username, emailSentToken, password } = newCredentials
//         return (dispatch) => axios.post(`${backendHost}`, {
//             query: `
//                  mutation{
//                  confirmPasswordReset(
//                      newCredentials:{
//                          username:"${username}"
//                          password:"${password}"
//                          token:"${emailSentToken}"
//                          }
//                  )
//                 }
//                   `
//         }).then((result) => {
//             dispatch({
//                 type: PASSWORD_RESET_ASK_PASSWORD,
//                 payload: result.data.data.confirmPasswordReset
//             })
//         })

//     } catch (e) {
//     }
// }

// export const clearAuthError = () => {
//     return (dispatch) => {
//         dispatch({
//             type: CLEAR_AUTH_ERROR,
//             payload: true
//         })
//     }
// }

export const getPresingedUrl = (type) => {
  let serviceToCall = null,
    serviceThatSigned;
  if (type === "UNI") {
    serviceToCall = universityServer;
    serviceThatSigned = UNI_SERV_SIGNED_URL;
  } else {
    serviceToCall = userServer;
    serviceThatSigned = USER_SERV_SIGNED_URL;
  }
  return async (dispatch) => {
    await axios
      .get(serviceToCall + `/presignedurl`)
      .then((res) => {
        dispatch({
          type: serviceThatSigned,
          payload: res.data,
        });
        // setUsers(() => res?.data?.data?.users || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
