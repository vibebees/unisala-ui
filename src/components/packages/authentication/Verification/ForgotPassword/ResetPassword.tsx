import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { IonButton, IonText, IonSpinner, useIonToast } from "@ionic/react";
import AuthInput from "../../AuthInput";
import "../../auth.css";
import { AuthenticationContext } from "../../Authentication";
import { ChangePasswordMutation } from "src/types/gqlTypes/graphql";
import { ChangePassword } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { useMutation } from "@apollo/client";

export const ResetPassword = () => {
  const { auth, setauth } = useContext(AuthenticationContext)!;
  const [present, dismiss] = useIonToast();
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [changePassword, { loading }] = useMutation<ChangePasswordMutation>(
    ChangePassword,
    {
      context: { server: USER_SERVICE_GQL },
      variables: {
        email: auth?.email,
        code: Number(auth?.code),
        password: input.password,
      },
      onCompleted: () => {
        present({
          message: "Password reset Successfully",
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

  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (input.password !== input.confirmPassword) {
      present({
        message: "Password didn't match",
        duration: 3000,
        color: "danger",
        buttons: [{ text: "X", handler: () => dismiss() }],
      });
      return;
    }
    changePassword();
  };

  return (
    <form onSubmit={submitHandler} className="sign-content">
      <IonText className="ion-margin-bottom">
        <h4>Change your Password</h4>
      </IonText>
      <div className="auth-input-div ion-margin-top">
        <label className="auth-label">New Password</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="password"
          name="password"
          value={input.password}
          validation={null}
        />
        <br />
        <label className="auth-label">Confirm Password</label>
        <br />
        <AuthInput
          HandleChange={HandleChange}
          type="password"
          name="confirmPassword"
          value={input.confirmPassword}
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
        {loading ? <IonSpinner></IonSpinner> : "Change Password"}
      </IonButton>
    </form>
  );
};
export default ResetPassword;
