import React from "react"
import EmailVerify from "../Verification/ForgotPassword/EmailVerify"
import ForgotPasswordVerification from "../Verification/ForgotPassword/ForgotPasswordVerification"
import ResetPassword from "../Verification/ForgotPassword/ResetPassword"
import SignUpVerification from "../Verification/SignUpVerification"
import UserNotVerified from "../Verification/UserNotVerified"
import { IonCol } from "@ionic/react"
import clsx from "clsx"

const AuthTemplate = ({
  setauth,
  children,
  auth,
  showSignup,
  singupTrueClass,
  singupFalseClass
}) => {
  return (
    <IonCol className={clsx(showSignup ? singupTrueClass : singupFalseClass)}>
      {auth.state === "SignUpVerification" ? (
        <SignUpVerification setauth={setauth} auth={auth} />
      ) : auth.state === "emailVerify" ? (
        <EmailVerify setauth={setauth} />
      ) : auth.state === "ForgotPasswordVerification" ? (
        <ForgotPasswordVerification setauth={setauth} auth={auth} />
      ) : auth.state === "resetPassword" ? (
        <ResetPassword setauth={setauth} auth={auth} />
      ) : auth.state === "userNotVerified" ? (
        <UserNotVerified setauth={setauth} auth={auth} />
      ) : null}
      {children}
    </IonCol>
  )
}

export default AuthTemplate
