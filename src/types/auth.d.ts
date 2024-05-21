/* eslint-disable no-unused-vars */

interface IAuth {
  state:
    | "signin"
    | "signup"
    | "SignUpVerification"
    | "emailVerify"
    | "ForgotPasswordVerification"
    | "resetPassword"
    | "userNotVerified"
    | "welcomeForm";
  email: string | null;
  code: number;
}

interface ILoginInput {
  email: string;
  password: string;
  spaceOrgName: string | null;
  type: string | null;
  code: number | null;
}

interface ILoginInputErrors {
  email?: string;
  password?: string | null;
}

interface ISignupInput extends ILoginInput {
  firstName: string;
  lastName: string;
}

interface ISignupErrors extends ILoginInputErrors {
  firstName?: string;
  lastName?: string;
}
