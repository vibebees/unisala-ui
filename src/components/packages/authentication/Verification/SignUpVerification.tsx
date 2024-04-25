import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import { useIonToast } from "@ionic/react";
import { IonSpinner } from "@ionic/react";
import "../auth.css";
import {
  SendVerficationMailMutation,
  VerifyEmailMutation,
} from "src/types/gqlTypes/graphql";
import { SendVerificationMail, VerifyEmail } from "@datasource/graphql/user";
import { useMutation } from "@apollo/client";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { AuthenticationContext } from "@features/login";
import { Typography } from "@components/defaults";
import AuthInput from "../AuthInput";

const SignUpVerification = () => {
  const { auth, setauth } = useContext(AuthenticationContext)!;
  const [present, dismiss] = useIonToast();

  const [input, setInput] = useState({
    verificationCode: "",
  });

  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const [SignupVerification, { loading }] = useMutation<VerifyEmailMutation>(
    VerifyEmail,
    {
      context: { server: USER_SERVICE_GQL },
      variables: {
        email: auth?.email,
        verificationCode: Number(input.verificationCode),
      },
      onCompleted: () => {
        present({
          message: "Account has been verified",
          duration: 3000,
          color: "success",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
        setauth((prev) => {
          if (prev.state === "ForgotPasswordVerification") {
            return {
              ...prev,
              state: "resetPassword",
            };
          }
          return {
            ...prev,
          };
        });
      },
      onError: (error) => {
        present({
          message: error.message,
          duration: 3000,
          color: "danger",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
      },
    }
  );

  const [sendVerificationMail, { loading: isLoading }] =
    useMutation<SendVerficationMailMutation>(SendVerificationMail, {
      context: { server: USER_SERVICE_GQL },
      variables: {
        email: auth?.email,
      },
      onCompleted: () => {
        present({
          message: "Verification Code has been sent to your email",
          duration: 3000,
          color: "success",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
      },
      onError: (error) => {
        present({
          message: error.message,
          duration: 3000,
          color: "danger",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
      },
    });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (input.verificationCode.length < 6) {
      present({
        message: "Verification Code should be of 6 digits",
        duration: 3000,
        color: "danger",
        buttons: [{ text: "X", handler: () => dismiss() }],
      });
      return;
    }
    SignupVerification();
  };

  return (
    <form onSubmit={submitHandler} className="sign-content">
      <Typography variant="p" className="ion-margin-bottom verify-dec">
        Verification Code has been mailed to you. Wait for a few minutes, it
        might take a while. Account get deprecated if not verified within a
        month.
      </Typography>
      <div className="auth-input-div ion-margin-top">
        <label className="auth-label">Verification Code</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="text"
          validation={undefined}
          name="verificationCode"
          value={input?.verificationCode}
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        onSubmit={submitHandler}
        className="block mt-5 text-center bg-blue-600 w-full outline-none text-sm text-white uppercase rounded-2xl tracking-wide py-2 text-opacity-90 hover:opacity-90"
      >
        {loading ? <IonSpinner></IonSpinner> : "Next"}
      </button>
      <Typography variant="p" color="primary" className="auth-change">
        <p
          onClick={() => {
            sendVerificationMail();
          }}
        >
          Didn’t receive a code?
          {isLoading ? <IonSpinner></IonSpinner> : "Resend"}
        </p>
      </Typography>
    </form>
  );
};
export default SignUpVerification;
