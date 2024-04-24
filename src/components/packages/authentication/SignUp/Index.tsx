import React from "react";
import GoogleAuth from "../GoogleAuth";
import SignUpForm from "./SignUpForm";
import "../auth.css";
import { Typography } from "../../../defaults/index";

export const SignUp = () => {
  const params = new URLSearchParams(window.location.search);
  const isInvited = params.get("org");
  return (
    <div className="sign-content border border-red-700 bg-white">
      <Typography variant="p" className=" border-blue-400 w-fit border-b-2">
        Start for free
      </Typography>
      <Typography className="font-semibold text-neutral-600 text-xl">
        Create a new account.
      </Typography>
      <br />
      <br />
      {!isInvited && (
        <div className="auth-button">
          <div
            style={{
              width: "234px",
            }}
          >
            <GoogleAuth />
          </div>
          <div className="auth-or">
            <p className="auth-or-p">OR</p>
          </div>
        </div>
      )}
      {/* <div className="auth-button">
        <AppleAuth />
      </div> */}

      <SignUpForm />
    </div>
  );
};
export default SignUp;
