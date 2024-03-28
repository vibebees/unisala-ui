import { useState } from "react"
import { IonCol, IonGrid, IonRow, IonContent, IonCard } from "@ionic/react"
import SignIn from "../../component/custom-components/authentication/SignIn/Index"
import SignUp from "../../component/custom-components/authentication/SignUp/Index"
import EmailVerify from "../../component/custom-components/authentication/Verification/ForgotPassword/EmailVerify"
import SignUpVerification from "../../component/custom-components/authentication/Verification/SignUpVerification"
import ForgotPasswordVerification from "../../component/custom-components/authentication/Verification/ForgotPassword/ForgotPasswordVerification"
import ResetPassword from "../../component/custom-components/authentication/Verification/ForgotPassword/ResetPassword"
import UserNotVerified from "../../component/custom-components/authentication/Verification/UserNotVerified"
import WelcomSteps from "../../component/custom-components/authentication/Welcome"

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
