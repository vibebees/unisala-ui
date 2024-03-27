import { useState } from "react"
import { IonCol, IonGrid, IonRow, IonContent, IonCard } from "@ionic/react"
import SignIn from "../../component/authentication/SignIn/Index"
import SignUp from "../../component/authentication/SignUp/Index"
import EmailVerify from "../../component/authentication/Verification/ForgotPassword/EmailVerify"
import SignUpVerification from "../../component/authentication/Verification/SignUpVerification"
import ForgotPasswordVerification from "../../component/authentication/Verification/ForgotPassword/ForgotPasswordVerification"
import ResetPassword from "../../component/authentication/Verification/ForgotPassword/ResetPassword"
import UserNotVerified from "../../component/authentication/Verification/UserNotVerified"
import WelcomSteps from "../../component/authentication/Welcome"

export const Login = ({ allProps }) => {
  const [auth, setauth] = useState({
    state: allProps?.routeState || "signin",
    email: "",
    code: 0
  })
  return (
    <IonGrid className="ion-no-padding ion-no-margin">
      <IonRow style={{ overflow: "hidden" }}>
        <IonCol>
          {auth.state === "signin" ? (
            <SignIn auth={auth} setauth={setauth} />
          ) : auth.state === "signup" ? (
            <SignUp setauth={setauth} auth={auth} />
          ) : auth.state === "SignUpVerification" ? (
            <SignUpVerification setauth={setauth} auth={auth} />
          ) : auth.state === "emailVerify" ? (
            <EmailVerify setauth={setauth} />
          ) : auth.state === "ForgotPasswordVerification" ? (
            <ForgotPasswordVerification setauth={setauth} auth={auth} />
          ) : auth.state === "resetPassword" ? (
            <ResetPassword setauth={setauth} auth={auth} />
          ) : auth.state === "userNotVerified" ? (
            <UserNotVerified setauth={setauth} auth={auth} />
          ) : auth.state === "welcomeForm" ? (
            <WelcomSteps />
          ) : null}
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}
export default Login
