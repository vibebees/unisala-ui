import React, { ChangeEvent, FormEvent, useState, useContext } from "react";
import { IonButton, IonText, IonSpinner, useIonToast } from "@ionic/react";
import { SendVerficationMailMutation } from "src/types/gqlTypes/graphql";
import { SendVerificationMail } from "@datasource/graphql/user";
import { useMutation } from "@apollo/client";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import AuthInput from "../../AuthInput";
import "../../auth.css";
import { AuthenticationContext } from "../../Authentication";

export const EmailVerify = () => {
  const { setauth } = useContext(AuthenticationContext)!;
  const [present, dismiss] = useIonToast();
  const [email, setEmail] = useState("");

  const [sendVerificationMail, { loading }] =
    useMutation<SendVerficationMailMutation>(SendVerificationMail, {
      context: { server: USER_SERVICE_GQL },
      variables: {
        email: email,
      },
      onCompleted: () => {
        present({
          message: "Verification Code has been sent to your email",
          duration: 3000,
          color: "success",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
        setauth((prev) => {
          return {
            ...prev,
            email: email,
            state: "ForgotPasswordVerification",
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
    });

  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (email === "") {
      present({
        message: "Email is required",
        duration: 3000,
        color: "danger",
        buttons: [{ text: "X", handler: () => dismiss() }],
      });
      return;
    }
    sendVerificationMail();
  };

  return (
    <form onSubmit={submitHandler} className="sign-content">
      <IonText className="ion-margin-bottom">
        <h4>Verify your email address</h4>
      </IonText>
      <div className="auth-input-div ion-margin-top">
        <label className="auth-label">Email</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="text"
          name="email"
          value={email}
          validation={null}
        />
      </div>
      <IonButton
        disabled={loading}
        type="submit"
        className="ion-margin-top"
        expand="full"
        shape="round"
      >
        {loading ? <IonSpinner></IonSpinner> : "Next"}
      </IonButton>
    </form>
  );
};
export default EmailVerify;
