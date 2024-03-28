import { useState } from "react"
import { IonButton, IonText, IonSpinner, useIonToast } from "@ionic/react"
import axios from "axios"
import AuthInput from "../../AuthInput"

import "../../auth.css"
import { userServer } from "servers/endpoints"
import { validateSignup } from "utils/components/validate"

export const ResetPassword = ({ setauth, auth }) => {
  const { code, email } = auth
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    password: "",
    confirmPassword: ""
  })
  const HandleChange = (e) => {
    const { name, value } = e.target
    setInput((pre) => {
      return { ...pre, [name]: value }
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }
  const { password } = input
  const resetPassword = () => {
    if (!input.password || !input.confirmPassword) {
      return present({
        duration: 3000,
        message: "Empty fields!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
    if (input.password !== input.confirmPassword) {
      return present({
        duration: 3000,
        message: "Passwords donot match!",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }

    const passwordErrors = validateSignup({ password: password })?.password
    if (passwordErrors) {
      return present({
        duration: 3000,
        message: passwordErrors,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }

    setLoading(true)
    axios
      .post(userServer + `/changePassword`, {
        email,
        password,
        code
      })
      .then((res) => {
        setLoading(false)
        if (res.data.success) {
          present({
            duration: 3000,
            message: res.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
          setauth({ state: "signin" })
        }
        if (!res.data.success) {
          present({
            duration: 3000,
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
          duration: 3000,
          message: err.response.data.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      })
  }

  return (
    <form onSubmit={submitHandler} className="sign-content">
      <IonText className="ion-margin-bottom">
        <h4>Change your Password</h4>
      </IonText>
      <div className="auth-input-div ion-margin-top">
        <label className="auth-label">New Password</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="password"
          name="password"
          value={input.password}
        />
        <br />
        <label className="auth-label">Confirm Password</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="password"
          name="confirmPassword"
          value={input.confirmPassword}
        />
      </div>
      <IonButton
        disabled={loading}
        type="submit"
        className="ion-margin-top"
        expand="full"
        shape="round"
        onClick={resetPassword}
      >
        {loading ? <IonSpinner></IonSpinner> : "Change Password"}
      </IonButton>
    </form>
  )
}
export default ResetPassword
