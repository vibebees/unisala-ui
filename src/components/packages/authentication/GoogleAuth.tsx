import React, { useRef } from "react";
import { useIonToast } from "@ionic/react";
import "./auth.css";
import { useHistory } from "react-router";
import { useScript } from "../../../hooks/useScript";
import { useMutation } from "@apollo/client";
import { GoogleLogin } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { LoginMutation } from "src/types/gqlTypes/graphql";
import { useAuth } from "@context/AuthContext";
import { AnyObject } from "chart.js/dist/types/basic";

export const GoogleAuth = () => {
  const { UpdateAuth } = useAuth();
  const [present, dismiss] = useIonToast();
  const googlebuttonref = useRef<AnyObject>(),
    history = useHistory();

  const params = new URLSearchParams(window.location.search);

  const [Googlelogin, { loading }] = useMutation<LoginMutation>(GoogleLogin, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      console.log("login data", data);
      if (data.login?.status?.success && data.login && data.login.data) {
        console.log("login data", data.login.data);
        UpdateAuth({
          id: data.login?.data.id!,
          firstName: data.login.data?.firstName!,
          lastName: data.login.data.lastName!,
          username: data.login.data?.username!,
          accessToken: data.login.data?.accessToken!,
          refreshToken: data.login.data?.refreshToken!,
          newUser: data.login.data?.newUser!,
          role: data.login.data?.role!,
        });
        present({
          message: "Login Successful",
          duration: 3000,
          color: "success",
          buttons: [{ text: "X", handler: () => dismiss() }],
        });
        history.push("/feed");
      }
    },
    onError: (error) => {
      console.log("login error", error);
      present({
        message: error.message,
        duration: 3000,
        color: "danger",
        buttons: [{ text: "X", handler: () => dismiss() }],
      });
    },
  });

  const onGoogleSignIn = (user) => {
    const { credential } = user;
    let payload = {
      email: params.get("email"),
      spaceOrgName: params.get("org"),
      code: params.get("code"),
      token: credential,
      type: params.get("org") && "invitation",
    };
    Googlelogin({ variables: payload });
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    // @ts-ignore
    window?.google.accounts.id.initialize({
      client_id:
        "1001592245381-rbpoecv2se6v3avlkisbbsfpl09cjfs4.apps.googleusercontent.com",
      callback: onGoogleSignIn,
      auto_select: false,
    });

    // @ts-ignore
    window.google.accounts.id.renderButton(googlebuttonref.current, {
      size: "large",
      shape: "circle",
      theme: "outline",
    });
  });

  return <div ref={googlebuttonref} />;
};
export default GoogleAuth;
