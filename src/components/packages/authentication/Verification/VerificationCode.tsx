import { IonButton, IonText, IonSpinner, useIonToast } from "@ionic/react"
import axios from "axios"

import AuthInput from "../AuthInput"
import "../auth.css"
import {userServer} from "../../../../datasource/servers/endpoints"

const VerificationCode = ({ verify, email, loading, HandleChange, input }) => {
  const [present, dismiss] = useIonToast()

  const submitHandler = (e) => {
    e.preventDefault()
    verify()
  }

  const receiveCode = () => {
    axios.post(userServer + `/sendVerficationMail`, { email }).then((res) => {
      if (res.data.success) {
        present({
          duration: 3000,
          message: res.data.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    })

    present({
      duration: 3000,
      message: "new code has been sent to your email",
      buttons: [{ text: "X", handler: () => dismiss() }],
      color: "primary",
      mode: "ios"
    })
  }

  return (
    <form onSubmit={submitHandler} className="sign-content">
      <IonText className="ion-margin-bottom verify-dec">
        <p>
          Verification Code has been mailed to you. Wait for a few minutes, it
          might take a while. Account get deprecated if not verified within a
          month.
        </p>
      </IonText>
      <div className="auth-input-div ion-margin-top">
        <label className="auth-label">Verification Code</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="text"
          name="verificationCode"
          value={input?.verificationCode}
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        onSubmit={verify}
        className="block mt-5 text-center bg-blue-600 w-full outline-none text-sm text-white uppercase rounded-2xl tracking-wide py-2 text-opacity-90 hover:opacity-90"
      >
        {loading ? <IonSpinner></IonSpinner> : "Next"}
      </button>
      <IonText color="primary" className="auth-change">
        <p
          onClick={() => {
            receiveCode()
          }}
        >
          Didn’t receive a code?
        </p>
      </IonText>
    </form>
  )
}
export default VerificationCode
