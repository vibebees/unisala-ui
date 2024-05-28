import React, {
  lazy,
  createContext,
  Dispatch,
  SetStateAction,
  Suspense,
} from "react";
import { useState } from "react";
import { Grid, Row, Col } from "@components/defaults";
import { PreLoader } from "../preloader";
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

export const Authentication = ({ state }: { state: TAuthState }) => {
  const [auth, setauth] = useState<IAuth>({
    state: state || "signin",
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
              <Suspense fallback={<PreLoader />}>
                <SignIn />
              </Suspense>
            ) : auth.state === "signup" ? (
              <Suspense fallback={<PreLoader />}>
                <SignUp />
              </Suspense>
            ) : auth.state === "SignUpVerification" ? (
              <Suspense fallback={<PreLoader />}>
                <SignUpVerification />
              </Suspense>
            ) : auth.state === "emailVerify" ? (
              <Suspense fallback={<PreLoader />}>
                <EmailVerify />
              </Suspense>
            ) : auth.state === "ForgotPasswordVerification" ? (
              <Suspense fallback={<PreLoader />}>
                <SignUpVerification />
              </Suspense>
            ) : auth.state === "resetPassword" ? (
              <Suspense fallback={<PreLoader />}>
                <ResetPassword />
              </Suspense>
            ) : auth.state === "userNotVerified" ? (
              <Suspense fallback={<PreLoader />}>
                <UserNotVerified setauth={setauth} auth={auth} />
              </Suspense>
            ) : auth.state === "welcomeForm" ? (
              <Suspense fallback={<PreLoader />}>
                <WelcomSteps allProps={{}} />
              </Suspense>
            ) : null}
          </Col>
        </Row>
      </Grid>
    </AuthenticationContext.Provider>
  );
};
export default Authentication;
