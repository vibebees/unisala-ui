import React, { lazy, createContext, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Col, Grid, Row } from "../../components/defaults";
const SignIn = lazy(
  () => import("@components/packages/authentication/SignIn/Index")
);

const SignUp = lazy(
  () => import("@components/packages/authentication/SignUp/Index")
);

const EmailVerify = lazy(
  () =>
    import(
      "@components/packages/authentication/Verification/ForgotPassword/EmailVerify"
    )
);
const SignUpVerification = lazy(
  () =>
    import(
      "@components/packages/authentication/Verification/SignUpVerification"
    )
);
const ForgotPasswordVerification = lazy(
  () =>
    import(
      "@components/packages/authentication/Verification/ForgotPassword/ForgotPasswordVerification"
    )
);
const ResetPassword = lazy(
  () =>
    import(
      "@components/packages/authentication/Verification/ForgotPassword/ResetPassword"
    )
);
const UserNotVerified = lazy(
  () =>
    import("@components/packages/authentication/Verification/UserNotVerified")
);
const WelcomSteps = lazy(
  () => import("@components/packages/authentication/Welcome")
);

interface IAuthenticationContext {
  auth: IAuth;
  setauth: Dispatch<SetStateAction<IAuth>>;
}

export const AuthenticationContext = createContext<
  IAuthenticationContext | undefined
>(undefined);

export const Login = () => {
  const [auth, setauth] = useState<IAuth>({
    state: "signin",
    email: "",
    code: 0,
  });

  return (
    <AuthenticationContext.Provider
      value={{
        auth,
        setauth,
      }}
    >
      <Grid className="ion-no-padding ion-no-margin">
        <Row style={{ overflow: "hidden" }}>
          <Col>
            {auth.state === "signin" ? (
              <SignIn />
            ) : auth.state === "signup" ? (
              <SignUp />
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
              <WelcomSteps allProps={{}} />
            ) : null}
          </Col>
        </Row>
      </Grid>
    </AuthenticationContext.Provider>
  );
};
export default Login;
