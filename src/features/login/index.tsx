import React from "react"
import { useState } from "react"
import { Col, Grid, Row } from "../../components/defaults"
import SignIn from "../../components/packages/authentication/SignIn/Index"
import SignUp from "../../components/packages/authentication/SignUp/Index"
import EmailVerify from "../../components/packages/authentication/Verification/ForgotPassword/EmailVerify"
import SignUpVerification from "../../components/packages/authentication/Verification/SignUpVerification"
import ForgotPasswordVerification from "../../components/packages/authentication/Verification/ForgotPassword/ForgotPasswordVerification"
import ResetPassword from "../../components/packages/authentication/Verification/ForgotPassword/ResetPassword"
import UserNotVerified from "../../components/packages/authentication/Verification/UserNotVerified"
import WelcomSteps from "../../components/packages/authentication/Welcome"

export const Login = ({ allProps }) => {
  const [auth, setauth] = useState({
    state: allProps?.routeState || "signin",
    email: "",
    code: 0
  })
  return (
    <Grid className="ion-no-padding ion-no-margin">
      <Row style={{ overflow: "hidden" }}>
        <Col>
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
        </Col>
      </Row>
    </Grid>
  )
}
export default Login
