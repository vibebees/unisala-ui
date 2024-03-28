import { useState } from "react"
import { useIonToast } from "@ionic/react"
import axios from "axios"
import "../../auth.css"
import VerificationCode from "../VerificationCode"
import {userServer} from "servers/endpoints"

const ForgotPasswordVerification = ({ auth, setauth }) => {
  const { email } = auth
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState({
    verificationCode: ""
  })
  const HandleChange = (e) => {
    const { name, value } = e.target
    setInput((pre) => {
      return { ...pre, [name]: value }
    })
  }
  const { verificationCode } = input,
    fg = true
  const verify = () => {
    if (input.verificationCode.length < 6) {
      return present({
        duration: 20000,
        message: "Invalid code!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
    setLoading(true)
    axios
      .post(userServer + `/verifyEmail`, {
        ...input,
        email,
        fg
      })
      .then((res) => {
        setLoading(false)
        if (res.data.success) {
          setauth({
            state: "resetPassword",
            email,
            code: verificationCode
          })
        }
        if (!res.data.success) {
          present({
            duration: 20000,
            message: res.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        present({
          duration: 20000,
          message: err.response.data.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
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
      email={email}
    />
  )
}

export default ForgotPasswordVerification
