import { useState } from "react"
import { IonButton, IonText, IonSpinner, useIonToast } from "@ionic/react"
import axios from "axios"
import AuthInput from "../../AuthInput"
import "../../auth.css"
import {userServer} from "servers/endpoints"

export const EmailVerify = ({ setauth }) => {
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState("")
  const HandleChange = (e) => {
    setEmail(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const receiveCode = () => {
    if (!email) {
      return present({
        duration: 2000,
        message: "Enter valid email",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios"
      })
    }
    setLoading(true)
    axios
      .post(userServer + `/sendVerficationMail`, { email })
      .then((res) => {
        setLoading(false)
        if (res.data.success) {
          present({
            duration: 2000,
            message: res.data.message,
            buttons: [{ text: "X", handler: () => dismiss() }],
            color: "primary",
            mode: "ios"
          })
          setauth({ state: "ForgotPasswordVerification", email })
        }
        if (!res.data.success) {
          present({
            duration: 2000,
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
          duration: 2000,
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
        <h4>Verify your email address</h4>
      </IonText>
      <div className="auth-input-div ion-margin-top">
        <label className="auth-label">Email</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="text"
          name="email"
          value={email}
        />
      </div>
      <IonButton
        disabled={loading}
        type="submit"
        className="ion-margin-top"
        expand="full"
        shape="round"
        onClick={receiveCode}
      >
        {loading ? <IonSpinner></IonSpinner> : "Next"}
      </IonButton>
    </form>
  )
}
export default EmailVerify
