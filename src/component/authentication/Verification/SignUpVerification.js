import { useState } from "react"
import { useIonToast } from "@ionic/react"
import axios from "axios"
import { useDispatch } from "react-redux"
import "../auth.css"
import VerificationCode from "./VerificationCode"
import { USER_LOGIN } from "../../../store/action/types"
import { userServer } from "../../../servers/endpoints"

const SignUpVerification = ({ auth, setauth }) => {
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    verificationCode: ""
  })

  const HandleChange = (e) => {
    const { name, value } = e.target
    setInput((pre) => {
      return { ...pre, [name]: value }
    })
  }

  const verify = () => {
    if (input.verificationCode.length < 6) {
      return present({
        duration: 3000,
        message: "Invalid code!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }

    setLoading(true)
    const emailInput = localStorage.getItem("email") || ""
    localStorage.removeItem("email")

    axios
      .post(userServer + `/verifyEmail`, {
        ...input,
        email: emailInput
      })
      .then((res) => {
        setLoading(false)
        if (res.data.success === true) {
          localStorage.setItem("accessToken", res?.data?.accessToken)
          localStorage.setItem("refreshToken", res?.data?.refreshToken)
          dispatch({
            type: USER_LOGIN,
            payload: {
              accessToken: res?.data?.accessToken,
              refreshToken: res?.data?.refreshToken
            }
          })
          localStorage.setItem("newUser", "true")

          window.innerWidth < 768
            ? window.location.replace("/home")
            : window.location.replace("/")
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        present({
          duration: 3000,
          message: err.response.data.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      })
  }

  return (
    <VerificationCode
      HandleChange={HandleChange}
      input={input}
      verify={verify}
      loading={loading}
      email={auth?.email}
    />
  )
}
export default SignUpVerification
