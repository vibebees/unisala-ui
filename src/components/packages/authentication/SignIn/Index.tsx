import React from "react";
import GoogleAuth from "../GoogleAuth";
import SignInForm from "./SignInForm";
import "../auth.css";
import { Typography } from "../../../defaults";

export const SignIn = () => {
  return (
    <div className="sign-content">
      <Typography
        variant="h2"
        className="text-2xl font-semibold auth-start border-b-4 border-blue-500 pb-2 mb-4 w-fit"
      >
        Sign in
      </Typography>

      <div className="auth-button">
        <div
          style={{
            width: "234px",
          }}
        >
          <GoogleAuth />
        </div>
      </div>
      {/* <div className="auth-button">
        <AppleAuth setauth={setauth} />
      </div> */}

      <div className="auth-or">
        <Typography variant="p" className="auth-or-p">
          or Sign in with Email!
        </Typography>
      </div>
      <SignInForm />
    </div>
  );
};
export default SignIn;
